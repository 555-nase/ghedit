define(["require", "exports", 'vs/base/common/strings', 'vs/editor/common/core/range'], function (require, exports, strings, range_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var RichEditBrackets = (function () {
        function RichEditBrackets(modeId, brackets) {
            var _this = this;
            this.brackets = brackets.map(function (b) {
                return {
                    modeId: modeId,
                    open: b[0],
                    close: b[1],
                    forwardRegex: getRegexForBracketPair({ open: b[0], close: b[1] }),
                    reversedRegex: getReversedRegexForBracketPair({ open: b[0], close: b[1] })
                };
            });
            this.forwardRegex = getRegexForBrackets(this.brackets);
            this.reversedRegex = getReversedRegexForBrackets(this.brackets);
            this.textIsBracket = {};
            this.textIsOpenBracket = {};
            this.maxBracketLength = 0;
            this.brackets.forEach(function (b) {
                _this.textIsBracket[b.open] = b;
                _this.textIsBracket[b.close] = b;
                _this.textIsOpenBracket[b.open] = true;
                _this.textIsOpenBracket[b.close] = false;
                _this.maxBracketLength = Math.max(_this.maxBracketLength, b.open.length);
                _this.maxBracketLength = Math.max(_this.maxBracketLength, b.close.length);
            });
        }
        return RichEditBrackets;
    }());
    exports.RichEditBrackets = RichEditBrackets;
    function once(keyFn, computeFn) {
        var cache = {};
        return function (input) {
            var key = keyFn(input);
            if (!cache.hasOwnProperty(key)) {
                cache[key] = computeFn(input);
            }
            return cache[key];
        };
    }
    var getRegexForBracketPair = once(function (input) { return (input.open + ";" + input.close); }, function (input) {
        return createOrRegex([input.open, input.close]);
    });
    var getReversedRegexForBracketPair = once(function (input) { return (input.open + ";" + input.close); }, function (input) {
        return createOrRegex([toReversedString(input.open), toReversedString(input.close)]);
    });
    var getRegexForBrackets = once(function (input) { return input.map(function (b) { return (b.open + ";" + b.close); }).join(';'); }, function (input) {
        var pieces = [];
        input.forEach(function (b) {
            pieces.push(b.open);
            pieces.push(b.close);
        });
        return createOrRegex(pieces);
    });
    var getReversedRegexForBrackets = once(function (input) { return input.map(function (b) { return (b.open + ";" + b.close); }).join(';'); }, function (input) {
        var pieces = [];
        input.forEach(function (b) {
            pieces.push(toReversedString(b.open));
            pieces.push(toReversedString(b.close));
        });
        return createOrRegex(pieces);
    });
    function createOrRegex(pieces) {
        var regexStr = "(" + pieces.map(strings.escapeRegExpCharacters).join(')|(') + ")";
        return strings.createRegExp(regexStr, true, false, false, false);
    }
    function toReversedString(str) {
        var reversedStr = '';
        for (var i = str.length - 1; i >= 0; i--) {
            reversedStr += str.charAt(i);
        }
        return reversedStr;
    }
    var BracketsUtils = (function () {
        function BracketsUtils() {
        }
        BracketsUtils._findPrevBracketInText = function (reversedBracketRegex, lineNumber, reversedText, offset) {
            var m = reversedText.match(reversedBracketRegex);
            if (!m) {
                return null;
            }
            var matchOffset = reversedText.length - m.index;
            var matchLength = m[0].length;
            var absoluteMatchOffset = offset + matchOffset;
            return new range_1.Range(lineNumber, absoluteMatchOffset - matchLength + 1, lineNumber, absoluteMatchOffset + 1);
        };
        BracketsUtils.findPrevBracketInToken = function (reversedBracketRegex, lineNumber, lineText, currentTokenStart, currentTokenEnd) {
            // Because JS does not support backwards regex search, we search forwards in a reversed string with a reversed regex ;)
            var currentTokenReversedText = '';
            for (var index = currentTokenEnd - 1; index >= currentTokenStart; index--) {
                currentTokenReversedText += lineText.charAt(index);
            }
            return this._findPrevBracketInText(reversedBracketRegex, lineNumber, currentTokenReversedText, currentTokenStart);
        };
        BracketsUtils.findNextBracketInText = function (bracketRegex, lineNumber, text, offset) {
            var m = text.match(bracketRegex);
            if (!m) {
                return null;
            }
            var matchOffset = m.index;
            var matchLength = m[0].length;
            var absoluteMatchOffset = offset + matchOffset;
            return new range_1.Range(lineNumber, absoluteMatchOffset + 1, lineNumber, absoluteMatchOffset + 1 + matchLength);
        };
        BracketsUtils.findNextBracketInToken = function (bracketRegex, lineNumber, lineText, currentTokenStart, currentTokenEnd) {
            var currentTokenText = lineText.substring(currentTokenStart, currentTokenEnd);
            return this.findNextBracketInText(bracketRegex, lineNumber, currentTokenText, currentTokenStart);
        };
        return BracketsUtils;
    }());
    exports.BracketsUtils = BracketsUtils;
});
