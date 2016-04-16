var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/base/common/errors', 'vs/base/browser/styleMutator', 'vs/editor/browser/editorBrowser', 'vs/editor/browser/view/viewPart'], function (require, exports, errors_1, styleMutator_1, editorBrowser_1, viewPart_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var ViewZones = (function (_super) {
        __extends(ViewZones, _super);
        function ViewZones(context, whitespaceManager) {
            _super.call(this, context);
            this._lineHeight = this._context.configuration.editor.lineHeight;
            this._whitespaceManager = whitespaceManager;
            this.domNode = document.createElement('div');
            this.domNode.className = editorBrowser_1.ClassNames.VIEW_ZONES;
            this.domNode.style.position = 'absolute';
            this.domNode.setAttribute('role', 'presentation');
            this.domNode.setAttribute('aria-hidden', 'true');
            this._zones = {};
        }
        ViewZones.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._whitespaceManager = null;
            this._zones = {};
        };
        // ---- begin view event handlers
        ViewZones.prototype._recomputeWhitespacesProps = function () {
            var hadAChange = false;
            var keys = Object.keys(this._zones);
            for (var i = 0, len = keys.length; i < len; i++) {
                var id = keys[i];
                var zone = this._zones[id];
                var props = this._computeWhitespaceProps(zone.delegate);
                if (this._whitespaceManager.changeWhitespace(parseInt(id, 10), props.afterViewLineNumber, props.heightInPx)) {
                    this._safeCallOnComputedHeight(zone.delegate, props.heightInPx);
                    hadAChange = true;
                }
            }
            return hadAChange;
        };
        ViewZones.prototype.onConfigurationChanged = function (e) {
            if (e.lineHeight) {
                this._lineHeight = this._context.configuration.editor.lineHeight;
                return this._recomputeWhitespacesProps();
            }
            return false;
        };
        ViewZones.prototype.onLineMappingChanged = function () {
            return this._recomputeWhitespacesProps();
        };
        ViewZones.prototype.onLayoutChanged = function (layoutInfo) {
            return true;
        };
        ViewZones.prototype.onScrollChanged = function (e) {
            return e.vertical;
        };
        ViewZones.prototype.onScrollWidthChanged = function (newScrollWidth) {
            return true;
        };
        ViewZones.prototype.onZonesChanged = function () {
            return true;
        };
        ViewZones.prototype.onModelLinesDeleted = function (e) {
            return true;
        };
        ViewZones.prototype.onModelLinesInserted = function (e) {
            return true;
        };
        // ---- end view event handlers
        ViewZones.prototype._getZoneOrdinal = function (zone) {
            if (typeof zone.afterColumn !== 'undefined') {
                return zone.afterColumn;
            }
            return 10000;
        };
        ViewZones.prototype._computeWhitespaceProps = function (zone) {
            if (zone.afterLineNumber === 0) {
                return {
                    afterViewLineNumber: 0,
                    heightInPx: this._heightInPixels(zone)
                };
            }
            var zoneAfterModelPosition;
            if (typeof zone.afterColumn !== 'undefined') {
                zoneAfterModelPosition = this._context.model.validateModelPosition({
                    lineNumber: zone.afterLineNumber,
                    column: zone.afterColumn
                });
            }
            else {
                var validAfterLineNumber = this._context.model.validateModelPosition({
                    lineNumber: zone.afterLineNumber,
                    column: 1
                }).lineNumber;
                zoneAfterModelPosition = {
                    lineNumber: validAfterLineNumber,
                    column: this._context.model.getModelLineMaxColumn(validAfterLineNumber)
                };
            }
            var zoneBeforeModelPosition;
            if (zoneAfterModelPosition.column === this._context.model.getModelLineMaxColumn(zoneAfterModelPosition.lineNumber)) {
                zoneBeforeModelPosition = this._context.model.validateModelPosition({
                    lineNumber: zoneAfterModelPosition.lineNumber + 1,
                    column: 1
                });
            }
            else {
                zoneBeforeModelPosition = this._context.model.validateModelPosition({
                    lineNumber: zoneAfterModelPosition.lineNumber,
                    column: zoneAfterModelPosition.column + 1
                });
            }
            var viewPosition = this._context.model.convertModelPositionToViewPosition(zoneAfterModelPosition.lineNumber, zoneAfterModelPosition.column);
            var isVisible = this._context.model.modelPositionIsVisible(zoneBeforeModelPosition);
            return {
                afterViewLineNumber: viewPosition.lineNumber,
                heightInPx: (isVisible ? this._heightInPixels(zone) : 0)
            };
        };
        ViewZones.prototype.addZone = function (zone) {
            var props = this._computeWhitespaceProps(zone);
            var whitespaceId = this._whitespaceManager.addWhitespace(props.afterViewLineNumber, this._getZoneOrdinal(zone), props.heightInPx);
            var myZone = {
                whitespaceId: whitespaceId,
                delegate: zone,
                isVisible: false
            };
            this._safeCallOnComputedHeight(myZone.delegate, props.heightInPx);
            myZone.delegate.domNode.style.position = 'absolute';
            myZone.delegate.domNode.style.width = '100%';
            styleMutator_1.StyleMutator.setDisplay(myZone.delegate.domNode, 'none');
            this._zones[myZone.whitespaceId.toString()] = myZone;
            myZone.delegate.domNode.setAttribute('monaco-view-zone', myZone.whitespaceId.toString());
            this.domNode.appendChild(myZone.delegate.domNode);
            this.setShouldRender();
            return myZone.whitespaceId;
        };
        ViewZones.prototype.removeZone = function (id) {
            if (this._zones.hasOwnProperty(id.toString())) {
                var zone = this._zones[id.toString()];
                delete this._zones[id.toString()];
                this._whitespaceManager.removeWhitespace(zone.whitespaceId);
                zone.delegate.domNode.removeAttribute('monaco-visible-view-zone');
                zone.delegate.domNode.removeAttribute('monaco-view-zone');
                zone.delegate.domNode.parentNode.removeChild(zone.delegate.domNode);
                this.setShouldRender();
                return true;
            }
            return false;
        };
        ViewZones.prototype.layoutZone = function (id) {
            var changed = false;
            if (this._zones.hasOwnProperty(id.toString())) {
                var zone = this._zones[id.toString()];
                var props = this._computeWhitespaceProps(zone.delegate);
                // let newOrdinal = this._getZoneOrdinal(zone.delegate);
                changed = this._whitespaceManager.changeWhitespace(zone.whitespaceId, props.afterViewLineNumber, props.heightInPx) || changed;
                // TODO@Alex: change `newOrdinal` too
                if (changed) {
                    this.setShouldRender();
                }
            }
            return changed;
        };
        ViewZones.prototype.shouldSuppressMouseDownOnViewZone = function (id) {
            if (this._zones.hasOwnProperty(id.toString())) {
                var zone = this._zones[id.toString()];
                return zone.delegate.suppressMouseDown;
            }
            return false;
        };
        ViewZones.prototype._heightInPixels = function (zone) {
            if (typeof zone.heightInPx === 'number') {
                return zone.heightInPx;
            }
            if (typeof zone.heightInLines === 'number') {
                return this._lineHeight * zone.heightInLines;
            }
            return this._lineHeight;
        };
        ViewZones.prototype._safeCallOnComputedHeight = function (zone, height) {
            if (typeof zone.onComputedHeight === 'function') {
                try {
                    zone.onComputedHeight(height);
                }
                catch (e) {
                    errors_1.onUnexpectedError(e);
                }
            }
        };
        ViewZones.prototype._safeCallOnDomNodeTop = function (zone, top) {
            if (typeof zone.onDomNodeTop === 'function') {
                try {
                    zone.onDomNodeTop(top);
                }
                catch (e) {
                    errors_1.onUnexpectedError(e);
                }
            }
        };
        ViewZones.prototype.prepareRender = function (ctx) {
            // Nothing to read
            if (!this.shouldRender()) {
                throw new Error('I did not ask to render!');
            }
        };
        ViewZones.prototype.render = function (ctx) {
            var visibleWhitespaces = this._whitespaceManager.getWhitespaceViewportData();
            var visibleZones = {};
            var hasVisibleZone = false;
            for (var i = 0, len = visibleWhitespaces.length; i < len; i++) {
                visibleZones[visibleWhitespaces[i].id.toString()] = visibleWhitespaces[i];
                hasVisibleZone = true;
            }
            var keys = Object.keys(this._zones);
            for (var i = 0, len = keys.length; i < len; i++) {
                var id = keys[i];
                var zone = this._zones[id];
                if (visibleZones.hasOwnProperty(id)) {
                    // zone is visible
                    styleMutator_1.StyleMutator.setTop(zone.delegate.domNode, (visibleZones[id].verticalOffset - ctx.bigNumbersDelta));
                    styleMutator_1.StyleMutator.setHeight(zone.delegate.domNode, visibleZones[id].height);
                    if (!zone.isVisible) {
                        styleMutator_1.StyleMutator.setDisplay(zone.delegate.domNode, 'block');
                        zone.delegate.domNode.setAttribute('monaco-visible-view-zone', 'true');
                        zone.isVisible = true;
                    }
                    this._safeCallOnDomNodeTop(zone.delegate, ctx.getScrolledTopFromAbsoluteTop(visibleZones[id].verticalOffset));
                }
                else {
                    if (zone.isVisible) {
                        styleMutator_1.StyleMutator.setDisplay(zone.delegate.domNode, 'none');
                        zone.delegate.domNode.removeAttribute('monaco-visible-view-zone');
                        zone.isVisible = false;
                    }
                    this._safeCallOnDomNodeTop(zone.delegate, ctx.getScrolledTopFromAbsoluteTop(-1000000));
                }
            }
            if (hasVisibleZone) {
                styleMutator_1.StyleMutator.setWidth(this.domNode, ctx.scrollWidth);
            }
        };
        return ViewZones;
    }(viewPart_1.ViewPart));
    exports.ViewZones = ViewZones;
});
//# sourceMappingURL=viewZones.js.map