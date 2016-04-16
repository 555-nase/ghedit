var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/base/browser/browser', 'vs/base/browser/styleMutator', 'vs/editor/browser/editorBrowser', 'vs/editor/browser/view/viewLayer'], function (require, exports, browser, styleMutator_1, editorBrowser, viewLayer_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var ViewOverlays = (function (_super) {
        __extends(ViewOverlays, _super);
        function ViewOverlays(context, layoutProvider) {
            _super.call(this, context);
            this._dynamicOverlays = [];
            this._isFocused = false;
            this._layoutProvider = layoutProvider;
            this.domNode.setClassName('view-overlays');
        }
        ViewOverlays.prototype.shouldRender = function () {
            if (_super.prototype.shouldRender.call(this)) {
                return true;
            }
            for (var i = 0, len = this._dynamicOverlays.length; i < len; i++) {
                var dynamicOverlay = this._dynamicOverlays[i];
                if (dynamicOverlay.shouldRender()) {
                    return true;
                }
            }
            return false;
        };
        ViewOverlays.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._layoutProvider = null;
            for (var i = 0, len = this._dynamicOverlays.length; i < len; i++) {
                var dynamicOverlay = this._dynamicOverlays[i];
                dynamicOverlay.dispose();
            }
            this._dynamicOverlays = null;
        };
        ViewOverlays.prototype.getDomNode = function () {
            return this.domNode.domNode;
        };
        ViewOverlays.prototype.addDynamicOverlay = function (overlay) {
            this._dynamicOverlays.push(overlay);
        };
        // ----- event handlers
        ViewOverlays.prototype.onViewFocusChanged = function (isFocused) {
            this._isFocused = isFocused;
            return true;
        };
        // ----- end event handlers
        ViewOverlays.prototype._createLine = function () {
            var r = new ViewOverlayLine(this._context, this._dynamicOverlays);
            return r;
        };
        ViewOverlays.prototype.prepareRender = function (ctx) {
            var toRender = this._dynamicOverlays.filter(function (overlay) { return overlay.shouldRender(); });
            for (var i = 0, len = toRender.length; i < len; i++) {
                var dynamicOverlay = toRender[i];
                dynamicOverlay.prepareRender(ctx);
                dynamicOverlay.onDidRender();
            }
            return null;
        };
        ViewOverlays.prototype.render = function (ctx) {
            // Overwriting to bypass `shouldRender` flag
            this._viewOverlaysRender(ctx);
            this.domNode.toggleClassName('focused', this._isFocused);
        };
        ViewOverlays.prototype._viewOverlaysRender = function (ctx) {
            _super.prototype._renderLines.call(this, ctx.linesViewportData);
        };
        return ViewOverlays;
    }(viewLayer_1.ViewLayer));
    exports.ViewOverlays = ViewOverlays;
    var ViewOverlayLine = (function () {
        function ViewOverlayLine(context, dynamicOverlays) {
            this._context = context;
            this._lineHeight = this._context.configuration.editor.lineHeight;
            this._dynamicOverlays = dynamicOverlays;
            this._domNode = null;
            this._renderPieces = null;
        }
        ViewOverlayLine.prototype.getDomNode = function () {
            if (!this._domNode) {
                return null;
            }
            return this._domNode.domNode;
        };
        ViewOverlayLine.prototype.setDomNode = function (domNode) {
            this._domNode = styleMutator_1.createFastDomNode(domNode);
        };
        ViewOverlayLine.prototype.onContentChanged = function () {
            // Nothing
        };
        ViewOverlayLine.prototype.onLinesInsertedAbove = function () {
            // Nothing
        };
        ViewOverlayLine.prototype.onLinesDeletedAbove = function () {
            // Nothing
        };
        ViewOverlayLine.prototype.onLineChangedAbove = function () {
            // Nothing
        };
        ViewOverlayLine.prototype.onTokensChanged = function () {
            // Nothing
        };
        ViewOverlayLine.prototype.onConfigurationChanged = function (e) {
            if (e.lineHeight) {
                this._lineHeight = this._context.configuration.editor.lineHeight;
            }
        };
        ViewOverlayLine.prototype.shouldUpdateHTML = function (startLineNumber, lineNumber, inlineDecorations) {
            var newPieces = '';
            for (var i = 0, len = this._dynamicOverlays.length; i < len; i++) {
                var dynamicOverlay = this._dynamicOverlays[i];
                newPieces += dynamicOverlay.render(startLineNumber, lineNumber);
            }
            var piecesEqual = (this._renderPieces === newPieces);
            if (!piecesEqual) {
                this._renderPieces = newPieces;
            }
            return !piecesEqual;
        };
        ViewOverlayLine.prototype.getLineOuterHTML = function (out, lineNumber, deltaTop) {
            out.push('<div lineNumber="');
            out.push(lineNumber.toString());
            out.push('" style="top:');
            out.push(deltaTop.toString());
            out.push('px;height:');
            out.push(this._lineHeight.toString());
            out.push('px;" class="');
            out.push(editorBrowser.ClassNames.VIEW_LINE);
            out.push('">');
            out.push(this.getLineInnerHTML(lineNumber));
            out.push('</div>');
        };
        ViewOverlayLine.prototype.getLineInnerHTML = function (lineNumber) {
            return this._renderPieces;
        };
        ViewOverlayLine.prototype.layoutLine = function (lineNumber, deltaTop) {
            this._domNode.setLineNumber(String(lineNumber));
            this._domNode.setTop(deltaTop);
            this._domNode.setHeight(this._lineHeight);
        };
        return ViewOverlayLine;
    }());
    var ContentViewOverlays = (function (_super) {
        __extends(ContentViewOverlays, _super);
        function ContentViewOverlays(context, layoutProvider) {
            _super.call(this, context, layoutProvider);
            this._scrollWidth = this._layoutProvider.getScrollWidth();
            this.domNode.setWidth(this._scrollWidth);
            this.domNode.setHeight(0);
        }
        ContentViewOverlays.prototype.onScrollWidthChanged = function (scrollWidth) {
            this._scrollWidth = this._layoutProvider.getScrollWidth();
            return true;
        };
        ContentViewOverlays.prototype._viewOverlaysRender = function (ctx) {
            _super.prototype._viewOverlaysRender.call(this, ctx);
            this.domNode.setWidth(this._scrollWidth);
        };
        return ContentViewOverlays;
    }(ViewOverlays));
    exports.ContentViewOverlays = ContentViewOverlays;
    var MarginViewOverlays = (function (_super) {
        __extends(MarginViewOverlays, _super);
        function MarginViewOverlays(context, layoutProvider) {
            _super.call(this, context, layoutProvider);
            this._glyphMarginLeft = context.configuration.editor.layoutInfo.glyphMarginLeft;
            this._glyphMarginWidth = context.configuration.editor.layoutInfo.glyphMarginWidth;
            this._scrollHeight = layoutProvider.getScrollHeight();
            this._contentLeft = context.configuration.editor.layoutInfo.contentLeft;
            this.domNode.setClassName(editorBrowser.ClassNames.MARGIN_VIEW_OVERLAYS + ' monaco-editor-background');
            this.domNode.setWidth(1);
        }
        MarginViewOverlays.prototype._extraDomNodeHTML = function () {
            return [
                '<div class="',
                editorBrowser.ClassNames.GLYPH_MARGIN,
                '" style="left:',
                String(this._glyphMarginLeft),
                'px;width:',
                String(this._glyphMarginWidth),
                'px;height:',
                String(this._scrollHeight),
                'px;"></div>'
            ].join('');
        };
        MarginViewOverlays.prototype._getGlyphMarginDomNode = function () {
            return this.domNode.domNode.children[0];
        };
        MarginViewOverlays.prototype.onScrollHeightChanged = function (scrollHeight) {
            this._scrollHeight = scrollHeight;
            return _super.prototype.onScrollHeightChanged.call(this, scrollHeight) || true;
        };
        MarginViewOverlays.prototype.onLayoutChanged = function (layoutInfo) {
            this._glyphMarginLeft = layoutInfo.glyphMarginLeft;
            this._glyphMarginWidth = layoutInfo.glyphMarginWidth;
            this._scrollHeight = this._layoutProvider.getScrollHeight();
            this._contentLeft = layoutInfo.contentLeft;
            return _super.prototype.onLayoutChanged.call(this, layoutInfo) || true;
        };
        MarginViewOverlays.prototype._viewOverlaysRender = function (ctx) {
            _super.prototype._viewOverlaysRender.call(this, ctx);
            if (browser.canUseTranslate3d) {
                var transform = 'translate3d(0px, ' + ctx.linesViewportData.visibleRangesDeltaTop + 'px, 0px)';
                this.domNode.setTransform(transform);
            }
            else {
                this.domNode.setTop(ctx.linesViewportData.visibleRangesDeltaTop);
            }
            var height = Math.min(this._layoutProvider.getTotalHeight(), 1000000);
            this.domNode.setHeight(height);
            this.domNode.setWidth(this._contentLeft);
            var glyphMargin = this._getGlyphMarginDomNode();
            if (glyphMargin) {
                styleMutator_1.StyleMutator.setHeight(glyphMargin, this._scrollHeight);
                styleMutator_1.StyleMutator.setLeft(glyphMargin, this._glyphMarginLeft);
                styleMutator_1.StyleMutator.setWidth(glyphMargin, this._glyphMarginWidth);
            }
        };
        return MarginViewOverlays;
    }(ViewOverlays));
    exports.MarginViewOverlays = MarginViewOverlays;
});
