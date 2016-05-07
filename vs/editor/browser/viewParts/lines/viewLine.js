var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/base/browser/browser', 'vs/base/browser/styleMutator', 'vs/editor/common/editorCommon', 'vs/editor/common/viewLayout/viewLineParts', 'vs/editor/common/viewLayout/viewLineRenderer', 'vs/editor/browser/editorBrowser', 'vs/editor/browser/viewParts/lines/rangeUtil'], function (require, exports, browser, styleMutator_1, editorCommon_1, viewLineParts_1, viewLineRenderer_1, editorBrowser_1, rangeUtil_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var ViewLine = (function () {
        function ViewLine(context) {
            this._context = context;
            this._renderWhitespace = this._context.configuration.editor.renderWhitespace;
            this._indentGuides = this._context.configuration.editor.indentGuides;
            this._spaceWidth = this._context.configuration.editor.spaceWidth;
            this._lineHeight = this._context.configuration.editor.lineHeight;
            this._stopRenderingLineAfter = this._context.configuration.editor.stopRenderingLineAfter;
            this._fontLigatures = this._context.configuration.editor.fontLigatures;
            this._domNode = null;
            this._isInvalid = true;
            this._isMaybeInvalid = false;
            this._lineParts = null;
            this._charOffsetInPart = [];
            this._lastRenderedPartIndex = 0;
        }
        // --- begin IVisibleLineData
        ViewLine.prototype.getDomNode = function () {
            if (!this._domNode) {
                return null;
            }
            return this._domNode.domNode;
        };
        ViewLine.prototype.setDomNode = function (domNode) {
            this._domNode = styleMutator_1.createFastDomNode(domNode);
        };
        ViewLine.prototype.onContentChanged = function () {
            this._isInvalid = true;
        };
        ViewLine.prototype.onLinesInsertedAbove = function () {
            this._isMaybeInvalid = true;
        };
        ViewLine.prototype.onLinesDeletedAbove = function () {
            this._isMaybeInvalid = true;
        };
        ViewLine.prototype.onLineChangedAbove = function () {
            this._isMaybeInvalid = true;
        };
        ViewLine.prototype.onTokensChanged = function () {
            this._isMaybeInvalid = true;
        };
        ViewLine.prototype.onModelDecorationsChanged = function () {
            this._isMaybeInvalid = true;
        };
        ViewLine.prototype.onConfigurationChanged = function (e) {
            if (e.renderWhitespace) {
                this._renderWhitespace = this._context.configuration.editor.renderWhitespace;
            }
            if (e.indentGuides) {
                this._indentGuides = this._context.configuration.editor.indentGuides;
            }
            if (e.spaceWidth) {
                this._spaceWidth = this._context.configuration.editor.spaceWidth;
            }
            if (e.lineHeight) {
                this._lineHeight = this._context.configuration.editor.lineHeight;
            }
            if (e.stopRenderingLineAfter) {
                this._stopRenderingLineAfter = this._context.configuration.editor.stopRenderingLineAfter;
            }
            if (e.fontLigatures) {
                this._fontLigatures = this._context.configuration.editor.fontLigatures;
            }
            this._isInvalid = true;
        };
        ViewLine.prototype.shouldUpdateHTML = function (startLineNumber, lineNumber, inlineDecorations) {
            var newLineParts = null;
            if (this._isMaybeInvalid || this._isInvalid) {
                // Compute new line parts only if there is some evidence that something might have changed
                newLineParts = viewLineParts_1.createLineParts(lineNumber, this._context.model.getLineMinColumn(lineNumber), this._context.model.getLineContent(lineNumber), this._context.model.getTabSize(), this._context.model.getLineTokens(lineNumber), inlineDecorations, this._renderWhitespace, this._indentGuides);
            }
            // Decide if isMaybeInvalid flips isInvalid to true
            if (this._isMaybeInvalid) {
                if (!this._isInvalid) {
                    if (!this._lineParts || !this._lineParts.equals(newLineParts)) {
                        this._isInvalid = true;
                    }
                }
                this._isMaybeInvalid = false;
            }
            if (this._isInvalid) {
                this._lineParts = newLineParts;
            }
            return this._isInvalid;
        };
        ViewLine.prototype.getLineOuterHTML = function (out, lineNumber, deltaTop) {
            out.push('<div lineNumber="');
            out.push(lineNumber.toString());
            out.push('" style="top:');
            out.push(deltaTop.toString());
            out.push('px;height:');
            out.push(this._lineHeight.toString());
            out.push('px;" class="');
            out.push(editorBrowser_1.ClassNames.VIEW_LINE);
            out.push('">');
            out.push(this.getLineInnerHTML(lineNumber));
            out.push('</div>');
        };
        ViewLine.prototype.getLineInnerHTML = function (lineNumber) {
            this._isInvalid = false;
            return this._render(lineNumber, this._lineParts);
        };
        ViewLine.prototype.layoutLine = function (lineNumber, deltaTop) {
            this._domNode.setLineNumber(String(lineNumber));
            this._domNode.setTop(deltaTop);
            this._domNode.setHeight(this._lineHeight);
        };
        // --- end IVisibleLineData
        ViewLine.prototype._render = function (lineNumber, lineParts) {
            this._cachedWidth = -1;
            var r = viewLineRenderer_1.renderLine(new viewLineRenderer_1.RenderLineInput(this._context.model.getLineContent(lineNumber), this._context.model.getTabSize(), this._spaceWidth, this._stopRenderingLineAfter, this._renderWhitespace, lineParts.getParts()));
            this._charOffsetInPart = r.charOffsetInPart;
            this._lastRenderedPartIndex = r.lastRenderedPartIndex;
            return r.output;
        };
        // --- Reading from the DOM methods
        ViewLine.prototype._getReadingTarget = function () {
            return this._domNode.domNode.firstChild;
        };
        /**
         * Width of the line in pixels
         */
        ViewLine.prototype.getWidth = function () {
            if (this._cachedWidth === -1) {
                this._cachedWidth = this._getReadingTarget().offsetWidth;
            }
            return this._cachedWidth;
        };
        /**
         * Visible ranges for a model range
         */
        ViewLine.prototype.getVisibleRangesForRange = function (startColumn, endColumn, clientRectDeltaLeft, endNode) {
            startColumn = startColumn | 0; // @perf
            endColumn = endColumn | 0; // @perf
            clientRectDeltaLeft = clientRectDeltaLeft | 0; // @perf
            var stopRenderingLineAfter = this._stopRenderingLineAfter | 0; // @perf
            if (stopRenderingLineAfter !== -1 && startColumn > stopRenderingLineAfter && endColumn > stopRenderingLineAfter) {
                // This range is obviously not visible
                return null;
            }
            if (stopRenderingLineAfter !== -1 && startColumn > stopRenderingLineAfter) {
                startColumn = stopRenderingLineAfter;
            }
            if (stopRenderingLineAfter !== -1 && endColumn > stopRenderingLineAfter) {
                endColumn = stopRenderingLineAfter;
            }
            return this._readVisibleRangesForRange(startColumn, endColumn, clientRectDeltaLeft, endNode);
        };
        ViewLine.prototype._readVisibleRangesForRange = function (startColumn, endColumn, clientRectDeltaLeft, endNode) {
            if (startColumn === endColumn) {
                return this._readRawVisibleRangesForPosition(startColumn, clientRectDeltaLeft, endNode);
            }
            else {
                return this._readRawVisibleRangesForRange(startColumn, endColumn, clientRectDeltaLeft, endNode);
            }
        };
        ViewLine.prototype._readRawVisibleRangesForPosition = function (column, clientRectDeltaLeft, endNode) {
            if (this._charOffsetInPart.length === 0) {
                // This line is empty
                return [new editorCommon_1.HorizontalRange(0, 0)];
            }
            var partIndex = findIndexInArrayWithMax(this._lineParts, column - 1, this._lastRenderedPartIndex);
            var charOffsetInPart = this._charOffsetInPart[column - 1];
            return rangeUtil_1.RangeUtil.readHorizontalRanges(this._getReadingTarget(), partIndex, charOffsetInPart, partIndex, charOffsetInPart, clientRectDeltaLeft, this._getScaleRatio(), endNode);
        };
        ViewLine.prototype._readRawVisibleRangesForRange = function (startColumn, endColumn, clientRectDeltaLeft, endNode) {
            if (startColumn === 1 && endColumn === this._charOffsetInPart.length) {
                // This branch helps IE with bidi text & gives a performance boost to other browsers when reading visible ranges for an entire line
                return [new editorCommon_1.HorizontalRange(0, this.getWidth())];
            }
            var startPartIndex = findIndexInArrayWithMax(this._lineParts, startColumn - 1, this._lastRenderedPartIndex);
            var startCharOffsetInPart = this._charOffsetInPart[startColumn - 1];
            var endPartIndex = findIndexInArrayWithMax(this._lineParts, endColumn - 1, this._lastRenderedPartIndex);
            var endCharOffsetInPart = this._charOffsetInPart[endColumn - 1];
            return rangeUtil_1.RangeUtil.readHorizontalRanges(this._getReadingTarget(), startPartIndex, startCharOffsetInPart, endPartIndex, endCharOffsetInPart, clientRectDeltaLeft, this._getScaleRatio(), endNode);
        };
        ViewLine.prototype._getScaleRatio = function () {
            return 1;
        };
        /**
         * Returns the column for the text found at a specific offset inside a rendered dom node
         */
        ViewLine.prototype.getColumnOfNodeOffset = function (lineNumber, spanNode, offset) {
            var spanNodeTextContentLength = spanNode.textContent.length;
            var spanIndex = -1;
            while (spanNode) {
                spanNode = spanNode.previousSibling;
                spanIndex++;
            }
            var lineParts = this._lineParts.getParts();
            return viewLineParts_1.getColumnOfLinePartOffset(this._stopRenderingLineAfter, lineParts, this._context.model.getLineMaxColumn(lineNumber), this._charOffsetInPart, spanIndex, spanNodeTextContentLength, offset);
        };
        return ViewLine;
    }());
    exports.ViewLine = ViewLine;
    var IEViewLine = (function (_super) {
        __extends(IEViewLine, _super);
        function IEViewLine(context) {
            _super.call(this, context);
        }
        IEViewLine.prototype._getScaleRatio = function () {
            return screen.logicalXDPI / screen.deviceXDPI;
        };
        return IEViewLine;
    }(ViewLine));
    var WebKitViewLine = (function (_super) {
        __extends(WebKitViewLine, _super);
        function WebKitViewLine(context) {
            _super.call(this, context);
        }
        WebKitViewLine.prototype._readVisibleRangesForRange = function (startColumn, endColumn, clientRectDeltaLeft, endNode) {
            var output = _super.prototype._readVisibleRangesForRange.call(this, startColumn, endColumn, clientRectDeltaLeft, endNode);
            if (this._fontLigatures && output.length === 1 && endColumn > 1 && endColumn === this._charOffsetInPart.length) {
                var lastSpanBoundingClientRect = this._getReadingTarget().lastChild.getBoundingClientRect();
                var lastSpanBoundingClientRectRight = lastSpanBoundingClientRect.right - clientRectDeltaLeft;
                if (startColumn === endColumn) {
                    output[0].left = lastSpanBoundingClientRectRight;
                    output[0].width = 0;
                }
                else {
                    output[0].width = lastSpanBoundingClientRectRight - output[0].left;
                }
                return output;
            }
            if (!output || output.length === 0 || startColumn === endColumn || (startColumn === 1 && endColumn === this._charOffsetInPart.length)) {
                return output;
            }
            // WebKit is buggy and returns an expanded range (to contain words in some cases)
            // The last client rect is enlarged (I think)
            // This is an attempt to patch things up
            // Find position of previous column
            var beforeEndVisibleRanges = this._readRawVisibleRangesForPosition(endColumn - 1, clientRectDeltaLeft, endNode);
            // Find position of last column
            var endVisibleRanges = this._readRawVisibleRangesForPosition(endColumn, clientRectDeltaLeft, endNode);
            if (beforeEndVisibleRanges && beforeEndVisibleRanges.length > 0 && endVisibleRanges && endVisibleRanges.length > 0) {
                var beforeEndVisibleRange = beforeEndVisibleRanges[0];
                var endVisibleRange = endVisibleRanges[0];
                var isLTR = (beforeEndVisibleRange.left <= endVisibleRange.left);
                var lastRange = output[output.length - 1];
                if (isLTR && lastRange.left < endVisibleRange.left) {
                    // Trim down the width of the last visible range to not go after the last column's position
                    lastRange.width = endVisibleRange.left - lastRange.left;
                }
            }
            return output;
        };
        return WebKitViewLine;
    }(ViewLine));
    function findIndexInArrayWithMax(lineParts, desiredIndex, maxResult) {
        var r = lineParts.findIndexOfOffset(desiredIndex);
        return r <= maxResult ? r : maxResult;
    }
    exports.createLine = (function () {
        if (window.screen && window.screen.deviceXDPI && (navigator.userAgent.indexOf('Trident/6.0') >= 0 || navigator.userAgent.indexOf('Trident/5.0') >= 0)) {
            // IE11 doesn't need the screen.logicalXDPI / screen.deviceXDPI ratio multiplication
            // for TextRange.getClientRects() anymore
            return createIELine;
        }
        else if (browser.isWebKit) {
            return createWebKitLine;
        }
        return createNormalLine;
    })();
    function createIELine(context) {
        return new IEViewLine(context);
    }
    function createWebKitLine(context) {
        return new WebKitViewLine(context);
    }
    function createNormalLine(context) {
        return new ViewLine(context);
    }
});
//# sourceMappingURL=viewLine.js.map