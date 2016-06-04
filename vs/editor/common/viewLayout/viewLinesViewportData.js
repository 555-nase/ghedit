define(["require", "exports"], function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var ViewLinesViewportData = (function () {
        function ViewLinesViewportData(partialData, visibleRange, decorationsData) {
            this.viewportTop = partialData.viewportTop | 0;
            this.viewportHeight = partialData.viewportHeight | 0;
            this.bigNumbersDelta = partialData.bigNumbersDelta | 0;
            this.visibleRangesDeltaTop = partialData.visibleRangesDeltaTop | 0;
            this.startLineNumber = partialData.startLineNumber | 0;
            this.endLineNumber = partialData.endLineNumber | 0;
            this.relativeVerticalOffset = partialData.relativeVerticalOffset;
            this.visibleRange = visibleRange;
            this._decorations = decorationsData.decorations;
            this._inlineDecorations = decorationsData.inlineDecorations;
        }
        ViewLinesViewportData.prototype.getDecorationsInViewport = function () {
            return this._decorations;
        };
        ViewLinesViewportData.prototype.getInlineDecorationsForLineInViewport = function (lineNumber) {
            lineNumber = lineNumber | 0;
            return this._inlineDecorations[lineNumber - this.startLineNumber];
        };
        return ViewLinesViewportData;
    }());
    exports.ViewLinesViewportData = ViewLinesViewportData;
});
//# sourceMappingURL=viewLinesViewportData.js.map