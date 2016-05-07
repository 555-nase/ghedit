/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/base/browser/styleMutator', 'vs/editor/browser/editorBrowser', 'vs/editor/browser/view/viewPart', 'vs/css!./overlayWidgets'], function (require, exports, styleMutator_1, editorBrowser_1, viewPart_1) {
    'use strict';
    var ViewOverlayWidgets = (function (_super) {
        __extends(ViewOverlayWidgets, _super);
        function ViewOverlayWidgets(context) {
            _super.call(this, context);
            this._widgets = {};
            this._verticalScrollbarWidth = 0;
            this._horizontalScrollbarHeight = 0;
            this._editorHeight = 0;
            this._editorWidth = 0;
            this.domNode = document.createElement('div');
            this.domNode.className = editorBrowser_1.ClassNames.OVERLAY_WIDGETS;
        }
        ViewOverlayWidgets.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._widgets = null;
        };
        // ---- begin view event handlers
        ViewOverlayWidgets.prototype.onLayoutChanged = function (layoutInfo) {
            this._verticalScrollbarWidth = layoutInfo.verticalScrollbarWidth;
            this._horizontalScrollbarHeight = layoutInfo.horizontalScrollbarHeight;
            this._editorHeight = layoutInfo.height;
            this._editorWidth = layoutInfo.width;
            return true;
        };
        // ---- end view event handlers
        ViewOverlayWidgets.prototype.addWidget = function (widget) {
            this._widgets[widget.getId()] = {
                widget: widget,
                preference: null
            };
            // This is sync because a widget wants to be in the dom
            var domNode = widget.getDomNode();
            domNode.style.position = 'absolute';
            domNode.setAttribute('widgetId', widget.getId());
            this.domNode.appendChild(domNode);
            this.setShouldRender();
        };
        ViewOverlayWidgets.prototype.setWidgetPosition = function (widget, preference) {
            var widgetData = this._widgets[widget.getId()];
            if (widgetData.preference === preference) {
                return false;
            }
            widgetData.preference = preference;
            this.setShouldRender();
            return true;
        };
        ViewOverlayWidgets.prototype.removeWidget = function (widget) {
            var widgetId = widget.getId();
            if (this._widgets.hasOwnProperty(widgetId)) {
                var widgetData = this._widgets[widgetId];
                var domNode = widgetData.widget.getDomNode();
                delete this._widgets[widgetId];
                domNode.parentNode.removeChild(domNode);
                this.setShouldRender();
            }
        };
        ViewOverlayWidgets.prototype._renderWidget = function (widgetData) {
            var _RESTORE_STYLE_TOP = 'data-editor-restoreStyleTop', domNode = widgetData.widget.getDomNode();
            if (widgetData.preference === null) {
                if (domNode.hasAttribute(_RESTORE_STYLE_TOP)) {
                    var previousTop = domNode.getAttribute(_RESTORE_STYLE_TOP);
                    domNode.removeAttribute(_RESTORE_STYLE_TOP);
                    domNode.style.top = previousTop;
                }
                return;
            }
            if (widgetData.preference === editorBrowser_1.OverlayWidgetPositionPreference.TOP_RIGHT_CORNER) {
                if (!domNode.hasAttribute(_RESTORE_STYLE_TOP)) {
                    domNode.setAttribute(_RESTORE_STYLE_TOP, domNode.style.top);
                }
                styleMutator_1.StyleMutator.setTop(domNode, 0);
                styleMutator_1.StyleMutator.setRight(domNode, (2 * this._verticalScrollbarWidth));
            }
            else if (widgetData.preference === editorBrowser_1.OverlayWidgetPositionPreference.BOTTOM_RIGHT_CORNER) {
                if (!domNode.hasAttribute(_RESTORE_STYLE_TOP)) {
                    domNode.setAttribute(_RESTORE_STYLE_TOP, domNode.style.top);
                }
                var widgetHeight = domNode.clientHeight;
                styleMutator_1.StyleMutator.setTop(domNode, (this._editorHeight - widgetHeight - 2 * this._horizontalScrollbarHeight));
                styleMutator_1.StyleMutator.setRight(domNode, (2 * this._verticalScrollbarWidth));
            }
            else if (widgetData.preference === editorBrowser_1.OverlayWidgetPositionPreference.TOP_CENTER) {
                if (!domNode.hasAttribute(_RESTORE_STYLE_TOP)) {
                    domNode.setAttribute(_RESTORE_STYLE_TOP, domNode.style.top);
                }
                styleMutator_1.StyleMutator.setTop(domNode, 0);
                domNode.style.right = '50%';
            }
        };
        ViewOverlayWidgets.prototype.prepareRender = function (ctx) {
            // Nothing to read
            if (!this.shouldRender()) {
                throw new Error('I did not ask to render!');
            }
        };
        ViewOverlayWidgets.prototype.render = function (ctx) {
            styleMutator_1.StyleMutator.setWidth(this.domNode, this._editorWidth);
            var keys = Object.keys(this._widgets);
            for (var i = 0, len = keys.length; i < len; i++) {
                var widgetId = keys[i];
                this._renderWidget(this._widgets[widgetId]);
            }
        };
        return ViewOverlayWidgets;
    }(viewPart_1.ViewPart));
    exports.ViewOverlayWidgets = ViewOverlayWidgets;
});
//# sourceMappingURL=overlayWidgets.js.map