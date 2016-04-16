define(["require", "exports", 'vs/editor/common/editorCommon'], function (require, exports, editorCommon_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var RangeUtil = (function () {
        function RangeUtil() {
        }
        RangeUtil._createRange = function () {
            if (!this._handyReadyRange) {
                this._handyReadyRange = document.createRange();
            }
            return this._handyReadyRange;
        };
        RangeUtil._detachRange = function (range, endNode) {
            // Move range out of the span node, IE doesn't like having many ranges in
            // the same spot and will act badly for lines containing dashes ('-')
            range.selectNodeContents(endNode);
        };
        RangeUtil._readClientRects = function (startElement, startOffset, endElement, endOffset, endNode) {
            var range = this._createRange();
            try {
                range.setStart(startElement, startOffset);
                range.setEnd(endElement, endOffset);
                return range.getClientRects();
            }
            catch (e) {
                // This is life ...
                return null;
            }
            finally {
                this._detachRange(range, endNode);
            }
        };
        RangeUtil._createHorizontalRangesFromClientRects = function (clientRects, clientRectDeltaLeft, scaleRatio) {
            if (!clientRects || clientRects.length === 0) {
                return null;
            }
            var result = [];
            var prevLeft = Math.max(0, clientRects[0].left * scaleRatio - clientRectDeltaLeft);
            var prevWidth = clientRects[0].width * scaleRatio;
            for (var i = 1, len = clientRects.length; i < len; i++) {
                var myLeft = Math.max(0, clientRects[i].left * scaleRatio - clientRectDeltaLeft);
                var myWidth = clientRects[i].width * scaleRatio;
                if (myLeft < prevLeft) {
                    console.error('Unexpected: RangeUtil._createHorizontalRangesFromClientRects: client rects are not sorted');
                }
                if (prevLeft + prevWidth + 0.9 /* account for browser's rounding errors*/ >= myLeft) {
                    prevWidth = Math.max(prevWidth, myLeft + myWidth - prevLeft);
                }
                else {
                    result.push(new editorCommon_1.HorizontalRange(prevLeft, prevWidth));
                    prevLeft = myLeft;
                    prevWidth = myWidth;
                }
            }
            result.push(new editorCommon_1.HorizontalRange(prevLeft, prevWidth));
            return result;
        };
        RangeUtil.readHorizontalRanges = function (domNode, startChildIndex, startOffset, endChildIndex, endOffset, clientRectDeltaLeft, scaleRatio, endNode) {
            // Panic check
            var min = 0;
            var max = domNode.children.length - 1;
            if (min > max) {
                return null;
            }
            startChildIndex = Math.min(max, Math.max(min, startChildIndex));
            endChildIndex = Math.min(max, Math.max(min, endChildIndex));
            // If crossing over to a span only to select offset 0, then use the previous span's maximum offset
            // Chrome is buggy and doesn't handle 0 offsets well sometimes.
            if (startChildIndex !== endChildIndex) {
                if (endChildIndex > 0 && endOffset === 0) {
                    endChildIndex--;
                    endOffset = Number.MAX_VALUE;
                }
            }
            var startElement = domNode.children[startChildIndex].firstChild;
            var endElement = domNode.children[endChildIndex].firstChild;
            if (!startElement || !endElement) {
                return null;
            }
            startOffset = Math.min(startElement.textContent.length, Math.max(0, startOffset));
            endOffset = Math.min(endElement.textContent.length, Math.max(0, endOffset));
            var clientRects = this._readClientRects(startElement, startOffset, endElement, endOffset, endNode);
            return this._createHorizontalRangesFromClientRects(clientRects, clientRectDeltaLeft, scaleRatio);
        };
        return RangeUtil;
    }());
    exports.RangeUtil = RangeUtil;
});
//# sourceMappingURL=rangeUtil.js.map