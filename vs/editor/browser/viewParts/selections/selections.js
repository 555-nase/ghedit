/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/editor/browser/view/dynamicViewOverlay', 'vs/css!./selections'], function (require, exports, dynamicViewOverlay_1) {
    'use strict';
    var CornerStyle;
    (function (CornerStyle) {
        CornerStyle[CornerStyle["EXTERN"] = 0] = "EXTERN";
        CornerStyle[CornerStyle["INTERN"] = 1] = "INTERN";
        CornerStyle[CornerStyle["FLAT"] = 2] = "FLAT";
    })(CornerStyle || (CornerStyle = {}));
    var HorizontalRangeWithStyle = (function () {
        function HorizontalRangeWithStyle(other) {
            this.left = other.left;
            this.width = other.width;
            this.startStyle = null;
            this.endStyle = null;
        }
        return HorizontalRangeWithStyle;
    }());
    var LineVisibleRangesWithStyle = (function () {
        function LineVisibleRangesWithStyle(lineNumber, ranges) {
            this.lineNumber = lineNumber;
            this.ranges = ranges;
        }
        return LineVisibleRangesWithStyle;
    }());
    function toStyledRange(item) {
        return new HorizontalRangeWithStyle(item);
    }
    function toStyled(item) {
        return new LineVisibleRangesWithStyle(item.lineNumber, item.ranges.map(toStyledRange));
    }
    // TODO@Alex: Remove this once IE11 fixes Bug #524217
    // The problem in IE11 is that it does some sort of auto-zooming to accomodate for displays with different pixel density.
    // Unfortunately, this auto-zooming is buggy around dealing with rounded borders
    var isIEWithZoomingIssuesNearRoundedBorders = ((navigator.userAgent.indexOf('Trident/7.0') >= 0)
        || (navigator.userAgent.indexOf('Edge/12') >= 0));
    var SelectionsOverlay = (function (_super) {
        __extends(SelectionsOverlay, _super);
        function SelectionsOverlay(context) {
            _super.call(this);
            this._previousFrameVisibleRangesWithStyle = [];
            this._context = context;
            this._lineHeight = this._context.configuration.editor.lineHeight;
            this._roundedSelection = this._context.configuration.editor.roundedSelection;
            this._selections = [];
            this._renderResult = null;
            this._context.addEventHandler(this);
        }
        SelectionsOverlay.prototype.dispose = function () {
            this._context.removeEventHandler(this);
            this._context = null;
            this._selections = null;
            this._renderResult = null;
        };
        // --- begin event handlers
        SelectionsOverlay.prototype.onModelFlushed = function () {
            return true;
        };
        SelectionsOverlay.prototype.onModelDecorationsChanged = function (e) {
            // true for inline decorations that can end up relayouting text
            return e.inlineDecorationsChanged;
        };
        SelectionsOverlay.prototype.onModelLinesDeleted = function (e) {
            return true;
        };
        SelectionsOverlay.prototype.onModelLineChanged = function (e) {
            return true;
        };
        SelectionsOverlay.prototype.onModelLinesInserted = function (e) {
            return true;
        };
        SelectionsOverlay.prototype.onCursorPositionChanged = function (e) {
            return false;
        };
        SelectionsOverlay.prototype.onCursorSelectionChanged = function (e) {
            this._selections = [e.selection];
            this._selections = this._selections.concat(e.secondarySelections);
            return true;
        };
        SelectionsOverlay.prototype.onCursorRevealRange = function (e) {
            return false;
        };
        SelectionsOverlay.prototype.onConfigurationChanged = function (e) {
            if (e.lineHeight) {
                this._lineHeight = this._context.configuration.editor.lineHeight;
            }
            if (e.roundedSelection) {
                this._roundedSelection = this._context.configuration.editor.roundedSelection;
            }
            return true;
        };
        SelectionsOverlay.prototype.onLayoutChanged = function (layoutInfo) {
            return true;
        };
        SelectionsOverlay.prototype.onScrollChanged = function (e) {
            return e.scrollTopChanged;
        };
        SelectionsOverlay.prototype.onZonesChanged = function () {
            return true;
        };
        // --- end event handlers
        SelectionsOverlay.prototype._visibleRangesHaveGaps = function (linesVisibleRanges) {
            var i, len, lineVisibleRanges;
            for (i = 0, len = linesVisibleRanges.length; i < len; i++) {
                lineVisibleRanges = linesVisibleRanges[i];
                if (lineVisibleRanges.ranges.length > 1) {
                    // There are two ranges on the same line
                    return true;
                }
            }
            return false;
        };
        SelectionsOverlay.prototype._enrichVisibleRangesWithStyle = function (linesVisibleRanges, previousFrame) {
            var curLineRange, curLeft, curRight, prevLeft, prevRight, nextLeft, nextRight, startStyle, endStyle, i, len;
            var previousFrameTop = null, previousFrameBottom = null;
            if (previousFrame && previousFrame.length > 0 && linesVisibleRanges.length > 0) {
                var topLineNumber = linesVisibleRanges[0].lineNumber;
                for (var i = 0; !previousFrameTop && i < previousFrame.length; i++) {
                    if (previousFrame[i].lineNumber === topLineNumber) {
                        previousFrameTop = previousFrame[i].ranges[0];
                    }
                }
                var bottomLineNumber = linesVisibleRanges[linesVisibleRanges.length - 1].lineNumber;
                for (var i = previousFrame.length - 1; !previousFrameBottom && i >= 0; i--) {
                    if (previousFrame[i].lineNumber === bottomLineNumber) {
                        previousFrameBottom = previousFrame[i].ranges[0];
                    }
                }
                if (previousFrameTop && !previousFrameTop.startStyle) {
                    previousFrameTop = null;
                }
                if (previousFrameBottom && !previousFrameBottom.startStyle) {
                    previousFrameBottom = null;
                }
            }
            for (i = 0, len = linesVisibleRanges.length; i < len; i++) {
                // We know for a fact that there is precisely one range on each line
                curLineRange = linesVisibleRanges[i].ranges[0];
                curLeft = curLineRange.left;
                curRight = curLineRange.left + curLineRange.width;
                startStyle = {
                    top: CornerStyle.EXTERN,
                    bottom: CornerStyle.EXTERN
                };
                endStyle = {
                    top: CornerStyle.EXTERN,
                    bottom: CornerStyle.EXTERN
                };
                if (i > 0) {
                    // Look above
                    prevLeft = linesVisibleRanges[i - 1].ranges[0].left;
                    prevRight = linesVisibleRanges[i - 1].ranges[0].left + linesVisibleRanges[i - 1].ranges[0].width;
                    if (curLeft === prevLeft) {
                        startStyle.top = CornerStyle.FLAT;
                    }
                    else if (curLeft > prevLeft) {
                        startStyle.top = CornerStyle.INTERN;
                    }
                    if (curRight === prevRight) {
                        endStyle.top = CornerStyle.FLAT;
                    }
                    else if (prevLeft < curRight && curRight < prevRight) {
                        endStyle.top = CornerStyle.INTERN;
                    }
                }
                else if (previousFrameTop) {
                    // Accept some hick-ups near the viewport edges to save on repaints
                    startStyle.top = previousFrameTop.startStyle.top;
                    endStyle.top = previousFrameTop.endStyle.top;
                }
                if (i + 1 < len) {
                    // Look below
                    nextLeft = linesVisibleRanges[i + 1].ranges[0].left;
                    nextRight = linesVisibleRanges[i + 1].ranges[0].left + linesVisibleRanges[i + 1].ranges[0].width;
                    if (curLeft === nextLeft) {
                        startStyle.bottom = CornerStyle.FLAT;
                    }
                    else if (nextLeft < curLeft && curLeft < nextRight) {
                        startStyle.bottom = CornerStyle.INTERN;
                    }
                    if (curRight === nextRight) {
                        endStyle.bottom = CornerStyle.FLAT;
                    }
                    else if (curRight < nextRight) {
                        endStyle.bottom = CornerStyle.INTERN;
                    }
                }
                else if (previousFrameBottom) {
                    // Accept some hick-ups near the viewport edges to save on repaints
                    startStyle.bottom = previousFrameBottom.startStyle.bottom;
                    endStyle.bottom = previousFrameBottom.endStyle.bottom;
                }
                curLineRange.startStyle = startStyle;
                curLineRange.endStyle = endStyle;
            }
        };
        SelectionsOverlay.prototype._getVisibleRangesWithStyle = function (selection, ctx, previousFrame) {
            var _linesVisibleRanges = ctx.linesVisibleRangesForRange(selection, true) || [];
            var linesVisibleRanges = _linesVisibleRanges.map(toStyled);
            var visibleRangesHaveGaps = this._visibleRangesHaveGaps(linesVisibleRanges);
            if (!isIEWithZoomingIssuesNearRoundedBorders && !visibleRangesHaveGaps && this._roundedSelection) {
                this._enrichVisibleRangesWithStyle(linesVisibleRanges, previousFrame);
            }
            // The visible ranges are sorted TOP-BOTTOM and LEFT-RIGHT
            return linesVisibleRanges;
        };
        SelectionsOverlay.prototype._createSelectionPiece = function (top, height, className, left, width) {
            return ('<div class="cslr '
                + className
                + '" style="top:'
                + top.toString()
                + 'px;left:'
                + left.toString()
                + 'px;width:'
                + width.toString()
                + 'px;height:'
                + height
                + 'px;"></div>');
        };
        SelectionsOverlay.prototype._actualRenderOneSelection = function (output2, visibleStartLineNumber, hasMultipleSelections, visibleRanges) {
            var visibleRangesHaveStyle = (visibleRanges.length > 0 && visibleRanges[0].ranges[0].startStyle);
            var fullLineHeight = (this._lineHeight).toString();
            var reducedLineHeight = (this._lineHeight - 1).toString();
            var firstLineNumber = (visibleRanges.length > 0 ? visibleRanges[0].lineNumber : 0);
            var lastLineNumber = (visibleRanges.length > 0 ? visibleRanges[visibleRanges.length - 1].lineNumber : 0);
            for (var i = 0, len = visibleRanges.length; i < len; i++) {
                var lineVisibleRanges = visibleRanges[i];
                var lineNumber = lineVisibleRanges.lineNumber;
                var lineIndex = lineNumber - visibleStartLineNumber;
                var lineHeight = hasMultipleSelections ? (lineNumber === lastLineNumber || lineNumber === firstLineNumber ? reducedLineHeight : fullLineHeight) : fullLineHeight;
                var top_1 = hasMultipleSelections ? (lineNumber === firstLineNumber ? 1 : 0) : 0;
                var lineOutput = '';
                for (var j = 0, lenJ = lineVisibleRanges.ranges.length; j < lenJ; j++) {
                    var visibleRange = lineVisibleRanges.ranges[j];
                    if (visibleRangesHaveStyle) {
                        if (visibleRange.startStyle.top === CornerStyle.INTERN || visibleRange.startStyle.bottom === CornerStyle.INTERN) {
                            // Reverse rounded corner to the left
                            // First comes the selection (blue layer)
                            lineOutput += this._createSelectionPiece(top_1, lineHeight, SelectionsOverlay.SELECTION_CLASS_NAME, visibleRange.left - SelectionsOverlay.ROUNDED_PIECE_WIDTH, SelectionsOverlay.ROUNDED_PIECE_WIDTH);
                            // Second comes the background (white layer) with inverse border radius
                            var className_1 = SelectionsOverlay.EDITOR_BACKGROUND_CLASS_NAME;
                            if (visibleRange.startStyle.top === CornerStyle.INTERN) {
                                className_1 += ' ' + SelectionsOverlay.SELECTION_TOP_RIGHT;
                            }
                            if (visibleRange.startStyle.bottom === CornerStyle.INTERN) {
                                className_1 += ' ' + SelectionsOverlay.SELECTION_BOTTOM_RIGHT;
                            }
                            lineOutput += this._createSelectionPiece(top_1, lineHeight, className_1, visibleRange.left - SelectionsOverlay.ROUNDED_PIECE_WIDTH, SelectionsOverlay.ROUNDED_PIECE_WIDTH);
                        }
                        if (visibleRange.endStyle.top === CornerStyle.INTERN || visibleRange.endStyle.bottom === CornerStyle.INTERN) {
                            // Reverse rounded corner to the right
                            // First comes the selection (blue layer)
                            lineOutput += this._createSelectionPiece(top_1, lineHeight, SelectionsOverlay.SELECTION_CLASS_NAME, visibleRange.left + visibleRange.width, SelectionsOverlay.ROUNDED_PIECE_WIDTH);
                            // Second comes the background (white layer) with inverse border radius
                            var className_2 = SelectionsOverlay.EDITOR_BACKGROUND_CLASS_NAME;
                            if (visibleRange.endStyle.top === CornerStyle.INTERN) {
                                className_2 += ' ' + SelectionsOverlay.SELECTION_TOP_LEFT;
                            }
                            if (visibleRange.endStyle.bottom === CornerStyle.INTERN) {
                                className_2 += ' ' + SelectionsOverlay.SELECTION_BOTTOM_LEFT;
                            }
                            lineOutput += this._createSelectionPiece(top_1, lineHeight, className_2, visibleRange.left + visibleRange.width, SelectionsOverlay.ROUNDED_PIECE_WIDTH);
                        }
                    }
                    var className = SelectionsOverlay.SELECTION_CLASS_NAME;
                    if (visibleRangesHaveStyle) {
                        if (visibleRange.startStyle.top === CornerStyle.EXTERN) {
                            className += ' ' + SelectionsOverlay.SELECTION_TOP_LEFT;
                        }
                        if (visibleRange.startStyle.bottom === CornerStyle.EXTERN) {
                            className += ' ' + SelectionsOverlay.SELECTION_BOTTOM_LEFT;
                        }
                        if (visibleRange.endStyle.top === CornerStyle.EXTERN) {
                            className += ' ' + SelectionsOverlay.SELECTION_TOP_RIGHT;
                        }
                        if (visibleRange.endStyle.bottom === CornerStyle.EXTERN) {
                            className += ' ' + SelectionsOverlay.SELECTION_BOTTOM_RIGHT;
                        }
                    }
                    lineOutput += this._createSelectionPiece(top_1, lineHeight, className, visibleRange.left, visibleRange.width);
                }
                output2[lineIndex] += lineOutput;
            }
        };
        SelectionsOverlay.prototype.prepareRender = function (ctx) {
            if (!this.shouldRender()) {
                throw new Error('I did not ask to render!');
            }
            var output = [];
            var visibleStartLineNumber = ctx.visibleRange.startLineNumber;
            var visibleEndLineNumber = ctx.visibleRange.endLineNumber;
            for (var lineNumber = visibleStartLineNumber; lineNumber <= visibleEndLineNumber; lineNumber++) {
                var lineIndex = lineNumber - visibleStartLineNumber;
                output[lineIndex] = '';
            }
            var thisFrameVisibleRangesWithStyle = [];
            for (var i = 0, len = this._selections.length; i < len; i++) {
                var selection = this._selections[i];
                if (selection.isEmpty()) {
                    thisFrameVisibleRangesWithStyle.push(null);
                    continue;
                }
                var visibleRangesWithStyle = this._getVisibleRangesWithStyle(selection, ctx, this._previousFrameVisibleRangesWithStyle[i]);
                thisFrameVisibleRangesWithStyle.push(visibleRangesWithStyle);
                this._actualRenderOneSelection(output, visibleStartLineNumber, this._selections.length > 1, visibleRangesWithStyle);
            }
            this._previousFrameVisibleRangesWithStyle = thisFrameVisibleRangesWithStyle;
            this._renderResult = output;
        };
        SelectionsOverlay.prototype.render = function (startLineNumber, lineNumber) {
            if (!this._renderResult) {
                return '';
            }
            var lineIndex = lineNumber - startLineNumber;
            if (lineIndex < 0 || lineIndex >= this._renderResult.length) {
                throw new Error('Unexpected render request');
            }
            return this._renderResult[lineIndex];
        };
        SelectionsOverlay.SELECTION_CLASS_NAME = 'selected-text';
        SelectionsOverlay.SELECTION_TOP_LEFT = 'top-left-radius';
        SelectionsOverlay.SELECTION_BOTTOM_LEFT = 'bottom-left-radius';
        SelectionsOverlay.SELECTION_TOP_RIGHT = 'top-right-radius';
        SelectionsOverlay.SELECTION_BOTTOM_RIGHT = 'bottom-right-radius';
        SelectionsOverlay.EDITOR_BACKGROUND_CLASS_NAME = 'monaco-editor-background';
        SelectionsOverlay.ROUNDED_PIECE_WIDTH = 10;
        return SelectionsOverlay;
    }(dynamicViewOverlay_1.DynamicViewOverlay));
    exports.SelectionsOverlay = SelectionsOverlay;
});
//# sourceMappingURL=selections.js.map