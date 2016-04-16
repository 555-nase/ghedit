/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/editor/browser/view/dynamicViewOverlay', 'vs/css!./glyphMargin'], function (require, exports, dynamicViewOverlay_1) {
    'use strict';
    var DecorationToRender = (function () {
        function DecorationToRender(startLineNumber, endLineNumber, className) {
            this.startLineNumber = +startLineNumber;
            this.endLineNumber = +endLineNumber;
            this.className = String(className);
        }
        return DecorationToRender;
    }());
    exports.DecorationToRender = DecorationToRender;
    var DedupOverlay = (function (_super) {
        __extends(DedupOverlay, _super);
        function DedupOverlay() {
            _super.apply(this, arguments);
        }
        DedupOverlay.prototype._render = function (visibleStartLineNumber, visibleEndLineNumber, decorations) {
            var output = [];
            for (var lineNumber = visibleStartLineNumber; lineNumber <= visibleEndLineNumber; lineNumber++) {
                var lineIndex = lineNumber - visibleStartLineNumber;
                output[lineIndex] = '';
            }
            if (decorations.length === 0) {
                return output;
            }
            decorations.sort(function (a, b) {
                if (a.className === b.className) {
                    if (a.startLineNumber === b.startLineNumber) {
                        return a.endLineNumber - b.endLineNumber;
                    }
                    return a.startLineNumber - b.startLineNumber;
                }
                return (a.className < b.className ? -1 : 1);
            });
            var prevClassName = null;
            var prevEndLineIndex = 0;
            for (var i = 0, len = decorations.length; i < len; i++) {
                var d = decorations[i];
                var className = d.className;
                var startLineIndex = Math.max(d.startLineNumber, visibleStartLineNumber) - visibleStartLineNumber;
                var endLineIndex = Math.min(d.endLineNumber, visibleEndLineNumber) - visibleStartLineNumber;
                if (prevClassName === className) {
                    startLineIndex = Math.max(prevEndLineIndex + 1, startLineIndex);
                    prevEndLineIndex = Math.max(prevEndLineIndex, endLineIndex);
                }
                else {
                    prevClassName = className;
                    prevEndLineIndex = endLineIndex;
                }
                for (var i_1 = startLineIndex; i_1 <= prevEndLineIndex; i_1++) {
                    output[i_1] += ' ' + prevClassName;
                }
            }
            return output;
        };
        return DedupOverlay;
    }(dynamicViewOverlay_1.DynamicViewOverlay));
    exports.DedupOverlay = DedupOverlay;
    var GlyphMarginOverlay = (function (_super) {
        __extends(GlyphMarginOverlay, _super);
        function GlyphMarginOverlay(context) {
            _super.call(this);
            this._context = context;
            this._lineHeight = this._context.configuration.editor.lineHeight;
            this._glyphMargin = this._context.configuration.editor.glyphMargin;
            this._glyphMarginLeft = 0;
            this._glyphMarginWidth = 0;
            this._renderResult = null;
            this._context.addEventHandler(this);
        }
        GlyphMarginOverlay.prototype.dispose = function () {
            this._context.removeEventHandler(this);
            this._context = null;
            this._renderResult = null;
        };
        // --- begin event handlers
        GlyphMarginOverlay.prototype.onModelFlushed = function () {
            return true;
        };
        GlyphMarginOverlay.prototype.onModelDecorationsChanged = function (e) {
            return true;
        };
        GlyphMarginOverlay.prototype.onModelLinesDeleted = function (e) {
            return true;
        };
        GlyphMarginOverlay.prototype.onModelLineChanged = function (e) {
            return true;
        };
        GlyphMarginOverlay.prototype.onModelLinesInserted = function (e) {
            return true;
        };
        GlyphMarginOverlay.prototype.onCursorPositionChanged = function (e) {
            return false;
        };
        GlyphMarginOverlay.prototype.onCursorSelectionChanged = function (e) {
            return false;
        };
        GlyphMarginOverlay.prototype.onCursorRevealRange = function (e) {
            return false;
        };
        GlyphMarginOverlay.prototype.onConfigurationChanged = function (e) {
            if (e.lineHeight) {
                this._lineHeight = this._context.configuration.editor.lineHeight;
            }
            if (e.glyphMargin) {
                this._glyphMargin = this._context.configuration.editor.glyphMargin;
            }
            return true;
        };
        GlyphMarginOverlay.prototype.onLayoutChanged = function (layoutInfo) {
            this._glyphMarginLeft = layoutInfo.glyphMarginLeft;
            this._glyphMarginWidth = layoutInfo.glyphMarginWidth;
            return true;
        };
        GlyphMarginOverlay.prototype.onScrollChanged = function (e) {
            return e.vertical;
        };
        GlyphMarginOverlay.prototype.onZonesChanged = function () {
            return true;
        };
        GlyphMarginOverlay.prototype.onScrollWidthChanged = function (scrollWidth) {
            return false;
        };
        GlyphMarginOverlay.prototype.onScrollHeightChanged = function (scrollHeight) {
            return false;
        };
        // --- end event handlers
        GlyphMarginOverlay.prototype._getDecorations = function (ctx) {
            var decorations = ctx.getDecorationsInViewport();
            var r = [];
            for (var i = 0, len = decorations.length; i < len; i++) {
                var d = decorations[i];
                if (d.options.glyphMarginClassName) {
                    r.push(new DecorationToRender(d.range.startLineNumber, d.range.endLineNumber, d.options.glyphMarginClassName));
                }
            }
            return r;
        };
        GlyphMarginOverlay.prototype.prepareRender = function (ctx) {
            if (!this.shouldRender()) {
                throw new Error('I did not ask to render!');
            }
            if (!this._glyphMargin) {
                this._renderResult = null;
                return;
            }
            var visibleStartLineNumber = ctx.visibleRange.startLineNumber;
            var visibleEndLineNumber = ctx.visibleRange.endLineNumber;
            var toRender = this._render(visibleStartLineNumber, visibleEndLineNumber, this._getDecorations(ctx));
            var lineHeight = this._lineHeight.toString();
            var left = this._glyphMarginLeft.toString();
            var width = this._glyphMarginWidth.toString();
            var common = '" style="left:' + left + 'px;width:' + width + 'px' + ';height:' + lineHeight + 'px;"></div>';
            var output = [];
            for (var lineNumber = visibleStartLineNumber; lineNumber <= visibleEndLineNumber; lineNumber++) {
                var lineIndex = lineNumber - visibleStartLineNumber;
                var classNames = toRender[lineIndex];
                if (classNames.length === 0) {
                    output[lineIndex] = '';
                }
                else {
                    output[lineIndex] = ('<div class="cgmr'
                        + classNames
                        + common);
                }
            }
            this._renderResult = output;
        };
        GlyphMarginOverlay.prototype.render = function (startLineNumber, lineNumber) {
            if (!this._renderResult) {
                return '';
            }
            var lineIndex = lineNumber - startLineNumber;
            if (lineIndex < 0 || lineIndex >= this._renderResult.length) {
                throw new Error('Unexpected render request');
            }
            return this._renderResult[lineIndex];
        };
        return GlyphMarginOverlay;
    }(DedupOverlay));
    exports.GlyphMarginOverlay = GlyphMarginOverlay;
});
