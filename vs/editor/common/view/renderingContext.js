define(["require", "exports"], function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var LineVisibleRanges = (function () {
        function LineVisibleRanges(lineNumber, ranges) {
            this.lineNumber = lineNumber;
            this.ranges = ranges;
        }
        return LineVisibleRanges;
    }());
    exports.LineVisibleRanges = LineVisibleRanges;
    var VisibleRange = (function () {
        function VisibleRange(top, left, width) {
            this.top = top | 0;
            this.left = left | 0;
            this.width = width | 0;
        }
        return VisibleRange;
    }());
    exports.VisibleRange = VisibleRange;
    var HorizontalRange = (function () {
        function HorizontalRange(left, width) {
            this.left = left | 0;
            this.width = width | 0;
        }
        return HorizontalRange;
    }());
    exports.HorizontalRange = HorizontalRange;
});
//# sourceMappingURL=renderingContext.js.map