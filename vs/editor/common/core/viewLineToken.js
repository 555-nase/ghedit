define(["require", "exports", 'vs/editor/common/core/arrays'], function (require, exports, arrays_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    /**
     * A token on a line.
     */
    var ViewLineToken = (function () {
        function ViewLineToken(startIndex, type) {
            this.startIndex = startIndex | 0; // @perf
            this.type = type.replace(/[^a-z0-9\-]/gi, ' ');
        }
        ViewLineToken.prototype.equals = function (other) {
            return (this.startIndex === other.startIndex
                && this.type === other.type);
        };
        ViewLineToken.findIndexInSegmentsArray = function (arr, desiredIndex) {
            return arrays_1.Arrays.findIndexInSegmentsArray(arr, desiredIndex);
        };
        ViewLineToken.equalsArray = function (a, b) {
            var aLen = a.length;
            var bLen = b.length;
            if (aLen !== bLen) {
                return false;
            }
            for (var i = 0; i < aLen; i++) {
                if (!a[i].equals(b[i])) {
                    return false;
                }
            }
            return true;
        };
        return ViewLineToken;
    }());
    exports.ViewLineToken = ViewLineToken;
    var ViewLineTokens = (function () {
        function ViewLineTokens(lineTokens, fauxIndentLength, textLength) {
            this._lineTokens = lineTokens;
            this._fauxIndentLength = fauxIndentLength | 0;
            this._textLength = textLength | 0;
        }
        ViewLineTokens.prototype.getTokens = function () {
            return this._lineTokens;
        };
        ViewLineTokens.prototype.getFauxIndentLength = function () {
            return this._fauxIndentLength;
        };
        ViewLineTokens.prototype.getTextLength = function () {
            return this._textLength;
        };
        ViewLineTokens.prototype.equals = function (other) {
            return (this._fauxIndentLength === other._fauxIndentLength
                && this._textLength === other._textLength
                && ViewLineToken.equalsArray(this._lineTokens, other._lineTokens));
        };
        ViewLineTokens.prototype.findIndexOfOffset = function (offset) {
            return ViewLineToken.findIndexInSegmentsArray(this._lineTokens, offset);
        };
        return ViewLineTokens;
    }());
    exports.ViewLineTokens = ViewLineTokens;
});
//# sourceMappingURL=viewLineToken.js.map