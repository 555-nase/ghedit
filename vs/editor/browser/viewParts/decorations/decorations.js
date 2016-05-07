/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/editor/browser/view/dynamicViewOverlay', 'vs/css!./decorations'], function (require, exports, dynamicViewOverlay_1) {
    'use strict';
    var DecorationsOverlay = (function (_super) {
        __extends(DecorationsOverlay, _super);
        function DecorationsOverlay(context) {
            _super.call(this);
            this._context = context;
            this._lineHeight = this._context.configuration.editor.lineHeight;
            this._renderResult = null;
            this._context.addEventHandler(this);
        }
        DecorationsOverlay.prototype.dispose = function () {
            this._context.removeEventHandler(this);
            this._context = null;
            this._renderResult = null;
        };
        // --- begin event handlers
        DecorationsOverlay.prototype.onModelFlushed = function () {
            return true;
        };
        DecorationsOverlay.prototype.onModelDecorationsChanged = function (e) {
            return true;
        };
        DecorationsOverlay.prototype.onModelLinesDeleted = function (e) {
            return true;
        };
        DecorationsOverlay.prototype.onModelLineChanged = function (e) {
            return true;
        };
        DecorationsOverlay.prototype.onModelLinesInserted = function (e) {
            return true;
        };
        DecorationsOverlay.prototype.onCursorPositionChanged = function (e) {
            return false;
        };
        DecorationsOverlay.prototype.onCursorSelectionChanged = function (e) {
            return false;
        };
        DecorationsOverlay.prototype.onCursorRevealRange = function (e) {
            return false;
        };
        DecorationsOverlay.prototype.onConfigurationChanged = function (e) {
            if (e.lineHeight) {
                this._lineHeight = this._context.configuration.editor.lineHeight;
            }
            return true;
        };
        DecorationsOverlay.prototype.onLayoutChanged = function (layoutInfo) {
            return true;
        };
        DecorationsOverlay.prototype.onScrollChanged = function (e) {
            return e.vertical;
        };
        DecorationsOverlay.prototype.onZonesChanged = function () {
            return true;
        };
        DecorationsOverlay.prototype.onScrollWidthChanged = function (scrollWidth) {
            return true;
        };
        DecorationsOverlay.prototype.onScrollHeightChanged = function (scrollHeight) {
            return false;
        };
        // --- end event handlers
        DecorationsOverlay.prototype.prepareRender = function (ctx) {
            if (!this.shouldRender()) {
                throw new Error('I did not ask to render!');
            }
            var decorations = ctx.getDecorationsInViewport();
            // Keep only decorations with `className`
            decorations = decorations.filter(function (d) { return !!d.options.className; });
            // Sort decorations for consistent render output
            decorations = decorations.sort(function (a, b) {
                if (a.options.className < b.options.className) {
                    return -1;
                }
                if (a.options.className > b.options.className) {
                    return 1;
                }
                if (a.range.startLineNumber === b.range.startLineNumber) {
                    if (a.range.startColumn === b.range.startColumn) {
                        if (a.range.endLineNumber === b.range.endLineNumber) {
                            return a.range.endColumn - b.range.endColumn;
                        }
                        return a.range.endLineNumber - b.range.endLineNumber;
                    }
                    return a.range.startColumn - b.range.startColumn;
                }
                return a.range.startLineNumber - b.range.startLineNumber;
            });
            var visibleStartLineNumber = ctx.visibleRange.startLineNumber;
            var visibleEndLineNumber = ctx.visibleRange.endLineNumber;
            var output = [];
            for (var lineNumber = visibleStartLineNumber; lineNumber <= visibleEndLineNumber; lineNumber++) {
                var lineIndex = lineNumber - visibleStartLineNumber;
                output[lineIndex] = '';
            }
            // Render first whole line decorations and then regular decorations
            this._renderWholeLineDecorations(ctx, decorations, output);
            this._renderNormalDecorations(ctx, decorations, output);
            this._renderResult = output;
        };
        DecorationsOverlay.prototype._renderWholeLineDecorations = function (ctx, decorations, output) {
            var lineHeight = String(this._lineHeight);
            var visibleStartLineNumber = ctx.visibleRange.startLineNumber;
            var visibleEndLineNumber = ctx.visibleRange.endLineNumber;
            for (var i = 0, lenI = decorations.length; i < lenI; i++) {
                var d = decorations[i];
                if (!d.options.isWholeLine) {
                    continue;
                }
                var decorationOutput = ('<div class="cdr '
                    + d.options.className
                    + '" style="left:0;width:100%;height:'
                    + lineHeight
                    + 'px;"></div>');
                var startLineNumber = Math.max(d.range.startLineNumber, visibleStartLineNumber);
                var endLineNumber = Math.min(d.range.endLineNumber, visibleEndLineNumber);
                for (var j = startLineNumber; j <= endLineNumber; j++) {
                    var lineIndex = j - visibleStartLineNumber;
                    output[lineIndex] += decorationOutput;
                }
            }
        };
        DecorationsOverlay.prototype._renderNormalDecorations = function (ctx, decorations, output) {
            var lineHeight = String(this._lineHeight);
            var visibleStartLineNumber = ctx.visibleRange.startLineNumber;
            for (var i = 0, lenI = decorations.length; i < lenI; i++) {
                var d = decorations[i];
                if (d.options.isWholeLine) {
                    continue;
                }
                var linesVisibleRanges = ctx.linesVisibleRangesForRange(d.range, false);
                if (!linesVisibleRanges) {
                    continue;
                }
                var className = d.options.className;
                for (var j = 0, lenJ = linesVisibleRanges.length; j < lenJ; j++) {
                    var lineVisibleRanges = linesVisibleRanges[j];
                    var lineIndex = lineVisibleRanges.lineNumber - visibleStartLineNumber;
                    for (var k = 0, lenK = lineVisibleRanges.ranges.length; k < lenK; k++) {
                        var visibleRange = lineVisibleRanges.ranges[k];
                        var decorationOutput = ('<div class="cdr '
                            + className
                            + '" style="left:'
                            + String(visibleRange.left)
                            + 'px;width:'
                            + String(visibleRange.width)
                            + 'px;height:'
                            + lineHeight
                            + 'px;"></div>');
                        output[lineIndex] += decorationOutput;
                    }
                }
            }
        };
        DecorationsOverlay.prototype.render = function (startLineNumber, lineNumber) {
            if (!this._renderResult) {
                return '';
            }
            var lineIndex = lineNumber - startLineNumber;
            if (lineIndex < 0 || lineIndex >= this._renderResult.length) {
                throw new Error('Unexpected render request');
            }
            return this._renderResult[lineIndex];
        };
        return DecorationsOverlay;
    }(dynamicViewOverlay_1.DynamicViewOverlay));
    exports.DecorationsOverlay = DecorationsOverlay;
});
//# sourceMappingURL=decorations.js.map