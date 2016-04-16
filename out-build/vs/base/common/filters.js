define(["require", "exports", 'vs/base/common/strings'], function (require, exports, strings) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    // Combined filters
    /**
     * @returns A filter which combines the provided set
     * of filters with an or. The *first* filters that
     * matches defined the return value of the returned
     * filter.
     */
    function or() {
        var filter = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filter[_i - 0] = arguments[_i];
        }
        return function (word, wordToMatchAgainst) {
            for (var i = 0, len = filter.length; i < len; i++) {
                var match = filter[i](word, wordToMatchAgainst);
                if (match) {
                    return match;
                }
            }
            return null;
        };
    }
    exports.or = or;
    /**
     * @returns A filter which combines the provided set
     * of filters with an and. The combines matches are
     * returned if *all* filters match.
     */
    function and() {
        var filter = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filter[_i - 0] = arguments[_i];
        }
        return function (word, wordToMatchAgainst) {
            var result = [];
            for (var i = 0, len = filter.length; i < len; i++) {
                var match = filter[i](word, wordToMatchAgainst);
                if (!match) {
                    return null;
                }
                result = result.concat(match);
            }
            return result;
        };
    }
    exports.and = and;
    // Prefix
    exports.matchesStrictPrefix = function (word, wordToMatchAgainst) { return _matchesPrefix(false, word, wordToMatchAgainst); };
    exports.matchesPrefix = function (word, wordToMatchAgainst) { return _matchesPrefix(true, word, wordToMatchAgainst); };
    function _matchesPrefix(ignoreCase, word, wordToMatchAgainst) {
        if (wordToMatchAgainst.length === 0 || wordToMatchAgainst.length < word.length) {
            return null;
        }
        if (ignoreCase) {
            word = word.toLowerCase();
            wordToMatchAgainst = wordToMatchAgainst.toLowerCase();
        }
        for (var i = 0; i < word.length; i++) {
            if (word[i] !== wordToMatchAgainst[i]) {
                return null;
            }
        }
        return word.length > 0 ? [{ start: 0, end: word.length }] : [];
    }
    // Contiguous Substring
    function matchesContiguousSubString(word, wordToMatchAgainst) {
        var index = wordToMatchAgainst.toLowerCase().indexOf(word.toLowerCase());
        if (index === -1) {
            return null;
        }
        return [{ start: index, end: index + word.length }];
    }
    exports.matchesContiguousSubString = matchesContiguousSubString;
    // Substring
    function matchesSubString(word, wordToMatchAgainst) {
        return _matchesSubString(word.toLowerCase(), wordToMatchAgainst.toLowerCase(), 0, 0);
    }
    exports.matchesSubString = matchesSubString;
    function _matchesSubString(word, wordToMatchAgainst, i, j) {
        if (i === word.length) {
            return [];
        }
        else if (j === wordToMatchAgainst.length) {
            return null;
        }
        else {
            if (word[i] === wordToMatchAgainst[j]) {
                var result = null;
                if (result = _matchesSubString(word, wordToMatchAgainst, i + 1, j + 1)) {
                    return join({ start: j, end: j + 1 }, result);
                }
            }
            return _matchesSubString(word, wordToMatchAgainst, i, j + 1);
        }
    }
    // CamelCase
    function isLower(code) {
        return 97 <= code && code <= 122;
    }
    function isUpper(code) {
        return 65 <= code && code <= 90;
    }
    function isNumber(code) {
        return 48 <= code && code <= 57;
    }
    function isWhitespace(code) {
        return [32, 9, 10, 13].indexOf(code) > -1;
    }
    function isAlphanumeric(code) {
        return isLower(code) || isUpper(code) || isNumber(code);
    }
    function join(head, tail) {
        if (tail.length === 0) {
            tail = [head];
        }
        else if (head.end === tail[0].start) {
            tail[0].start = head.start;
        }
        else {
            tail.unshift(head);
        }
        return tail;
    }
    function nextAnchor(camelCaseWord, start) {
        for (var i = start; i < camelCaseWord.length; i++) {
            var c = camelCaseWord.charCodeAt(i);
            if (isUpper(c) || isNumber(c) || (i > 0 && !isAlphanumeric(camelCaseWord.charCodeAt(i - 1)))) {
                return i;
            }
        }
        return camelCaseWord.length;
    }
    function _matchesCamelCase(word, camelCaseWord, i, j) {
        if (i === word.length) {
            return [];
        }
        else if (j === camelCaseWord.length) {
            return null;
        }
        else if (word[i] !== camelCaseWord[j].toLowerCase()) {
            return null;
        }
        else {
            var result = null;
            var nextUpperIndex = j + 1;
            result = _matchesCamelCase(word, camelCaseWord, i + 1, j + 1);
            while (!result && (nextUpperIndex = nextAnchor(camelCaseWord, nextUpperIndex)) < camelCaseWord.length) {
                result = _matchesCamelCase(word, camelCaseWord, i + 1, nextUpperIndex);
                nextUpperIndex++;
            }
            return result === null ? null : join({ start: j, end: j + 1 }, result);
        }
    }
    // Heuristic to avoid computing camel case matcher for words that don't
    // look like camelCaseWords.
    function isCamelCaseWord(word) {
        if (word.length > 60) {
            return false;
        }
        var upper = 0, lower = 0, alpha = 0, numeric = 0, code = 0;
        for (var i = 0; i < word.length; i++) {
            code = word.charCodeAt(i);
            if (isUpper(code)) {
                upper++;
            }
            if (isLower(code)) {
                lower++;
            }
            if (isAlphanumeric(code)) {
                alpha++;
            }
            if (isNumber(code)) {
                numeric++;
            }
        }
        var upperPercent = upper / word.length;
        var lowerPercent = lower / word.length;
        var alphaPercent = alpha / word.length;
        var numericPercent = numeric / word.length;
        return lowerPercent > 0.2 && upperPercent < 0.8 && alphaPercent > 0.6 && numericPercent < 0.2;
    }
    // Heuristic to avoid computing camel case matcher for words that don't
    // look like camel case patterns.
    function isCamelCasePattern(word) {
        var upper = 0, lower = 0, code = 0, whitespace = 0;
        for (var i = 0; i < word.length; i++) {
            code = word.charCodeAt(i);
            if (isUpper(code)) {
                upper++;
            }
            if (isLower(code)) {
                lower++;
            }
            if (isWhitespace(code)) {
                whitespace++;
            }
        }
        if ((upper === 0 || lower === 0) && whitespace === 0) {
            return word.length <= 30;
        }
        else {
            return upper <= 5;
        }
    }
    function matchesCamelCase(word, camelCaseWord) {
        if (camelCaseWord.length === 0) {
            return null;
        }
        if (!isCamelCasePattern(word)) {
            return null;
        }
        if (!isCamelCaseWord(camelCaseWord)) {
            return null;
        }
        var result = null;
        var i = 0;
        while (i < camelCaseWord.length && (result = _matchesCamelCase(word.toLowerCase(), camelCaseWord, 0, i)) === null) {
            i = nextAnchor(camelCaseWord, i + 1);
        }
        return result;
    }
    exports.matchesCamelCase = matchesCamelCase;
    // Matches beginning of words supporting non-ASCII languages
    // E.g. "gp" or "g p" will match "Git: Pull"
    // Useful in cases where the target is words (e.g. command labels)
    function matchesWords(word, target) {
        if (target.length === 0) {
            return null;
        }
        var result = null;
        var i = 0;
        while (i < target.length && (result = _matchesWords(word.toLowerCase(), target, 0, i)) === null) {
            i = nextWord(target, i + 1);
        }
        return result;
    }
    exports.matchesWords = matchesWords;
    function _matchesWords(word, target, i, j) {
        if (i === word.length) {
            return [];
        }
        else if (j === target.length) {
            return null;
        }
        else if (word[i] !== target[j].toLowerCase()) {
            return null;
        }
        else {
            var result = null;
            var nextWordIndex = j + 1;
            result = _matchesWords(word, target, i + 1, j + 1);
            while (!result && (nextWordIndex = nextWord(target, nextWordIndex)) < target.length) {
                result = _matchesWords(word, target, i + 1, nextWordIndex);
                nextWordIndex++;
            }
            return result === null ? null : join({ start: j, end: j + 1 }, result);
        }
    }
    function nextWord(word, start) {
        for (var i = start; i < word.length; i++) {
            var c = word.charCodeAt(i);
            if (isWhitespace(c) || (i > 0 && isWhitespace(word.charCodeAt(i - 1)))) {
                return i;
            }
        }
        return word.length;
    }
    // Fuzzy
    (function (SubstringMatching) {
        SubstringMatching[SubstringMatching["Contiguous"] = 0] = "Contiguous";
        SubstringMatching[SubstringMatching["Separate"] = 1] = "Separate";
    })(exports.SubstringMatching || (exports.SubstringMatching = {}));
    var SubstringMatching = exports.SubstringMatching;
    exports.fuzzyContiguousFilter = or(exports.matchesPrefix, matchesCamelCase, matchesContiguousSubString);
    var fuzzySeparateFilter = or(exports.matchesPrefix, matchesCamelCase, matchesSubString);
    var fuzzyRegExpCache = {};
    function matchesFuzzy(word, wordToMatchAgainst, enableSeparateSubstringMatching) {
        if (enableSeparateSubstringMatching === void 0) { enableSeparateSubstringMatching = false; }
        if (typeof word !== 'string' || typeof wordToMatchAgainst !== 'string') {
            return null; // return early for invalid input
        }
        // Form RegExp for wildcard matches
        var regexp = fuzzyRegExpCache[word];
        if (!regexp) {
            regexp = new RegExp(strings.convertSimple2RegExpPattern(word), 'i');
            fuzzyRegExpCache[word] = regexp;
        }
        // RegExp Filter
        var match = regexp.exec(wordToMatchAgainst);
        if (match) {
            return [{ start: match.index, end: match.index + match[0].length }];
        }
        // Default Filter
        return enableSeparateSubstringMatching ? fuzzySeparateFilter(word, wordToMatchAgainst) : exports.fuzzyContiguousFilter(word, wordToMatchAgainst);
    }
    exports.matchesFuzzy = matchesFuzzy;
});
