var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/base/common/strings', 'vs/editor/common/core/range', 'vs/editor/common/editorCommon'], function (require, exports, strings_1, range_1, editorCommon_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    (function (TextAreaStrategy) {
        TextAreaStrategy[TextAreaStrategy["IENarrator"] = 0] = "IENarrator";
        TextAreaStrategy[TextAreaStrategy["NVDA"] = 1] = "NVDA";
    })(exports.TextAreaStrategy || (exports.TextAreaStrategy = {}));
    var TextAreaStrategy = exports.TextAreaStrategy;
    var USE_NVDA_FULL_TEXT = false;
    function createTextAreaState(strategy) {
        if (strategy === TextAreaStrategy.IENarrator) {
            return IENarratorTextAreaState.EMPTY;
        }
        if (USE_NVDA_FULL_TEXT) {
            return NVDAFullTextAreaState.EMPTY;
        }
        return NVDAPagedTextAreaState.EMPTY;
    }
    exports.createTextAreaState = createTextAreaState;
    var TextAreaState = (function () {
        function TextAreaState(previousState, value, selectionStart, selectionEnd, isInOverwriteMode) {
            this.previousState = previousState ? previousState.shallowClone() : null;
            this.value = value;
            this.selectionStart = selectionStart;
            this.selectionEnd = selectionEnd;
            this.isInOverwriteMode = isInOverwriteMode;
        }
        TextAreaState.prototype.getSelectionStart = function () {
            return this.selectionStart;
        };
        TextAreaState.prototype.getValue = function () {
            return this.value;
        };
        TextAreaState.prototype.applyToTextArea = function (reason, textArea, select) {
            // console.log(Date.now() + ': applyToTextArea ' + reason + ': ' + this.toString());
            if (textArea.getValue() !== this.value) {
                textArea.setValue(reason, this.value);
            }
            if (select) {
                textArea.setSelectionRange(this.selectionStart, this.selectionEnd);
            }
        };
        TextAreaState.prototype.deduceInput = function () {
            if (!this.previousState) {
                // This is the EMPTY state
                return {
                    text: '',
                    replaceCharCnt: 0
                };
            }
            // console.log('------------------------deduceInput');
            // console.log('CURRENT STATE: ' + this.toString());
            // console.log('PREVIOUS STATE: ' + this.previousState.toString());
            var previousValue = this.previousState.value;
            var previousSelectionStart = this.previousState.selectionStart;
            var previousSelectionEnd = this.previousState.selectionEnd;
            var currentValue = this.value;
            var currentSelectionStart = this.selectionStart;
            var currentSelectionEnd = this.selectionEnd;
            // Strip the previous suffix from the value (without interfering with the current selection)
            var previousSuffix = previousValue.substring(previousSelectionEnd);
            var currentSuffix = currentValue.substring(currentSelectionEnd);
            var suffixLength = strings_1.commonSuffixLength(previousSuffix, currentSuffix);
            currentValue = currentValue.substring(0, currentValue.length - suffixLength);
            previousValue = previousValue.substring(0, previousValue.length - suffixLength);
            var previousPrefix = previousValue.substring(0, previousSelectionStart);
            var currentPrefix = currentValue.substring(0, currentSelectionStart);
            var prefixLength = strings_1.commonPrefixLength(previousPrefix, currentPrefix);
            currentValue = currentValue.substring(prefixLength);
            previousValue = previousValue.substring(prefixLength);
            currentSelectionStart -= prefixLength;
            previousSelectionStart -= prefixLength;
            currentSelectionEnd -= prefixLength;
            previousSelectionEnd -= prefixLength;
            // console.log('AFTER DIFFING CURRENT STATE: <' + currentValue + '>, selectionStart: ' + currentSelectionStart + ', selectionEnd: ' + currentSelectionEnd);
            // console.log('AFTER DIFFING PREVIOUS STATE: <' + previousValue + '>, selectionStart: ' + previousSelectionStart + ', selectionEnd: ' + previousSelectionEnd);
            if (currentSelectionStart === currentSelectionEnd) {
                // composition accept case
                // [blahblah] => blahblah|
                if (previousValue === currentValue
                    && previousSelectionStart === 0
                    && previousSelectionEnd === previousValue.length
                    && currentSelectionStart === currentValue.length
                    && currentValue.indexOf('\n') === -1) {
                    return {
                        text: '',
                        replaceCharCnt: 0
                    };
                }
                // no current selection
                var replacePreviousCharacters_1 = (previousPrefix.length - prefixLength);
                // console.log('REMOVE PREVIOUS: ' + (previousPrefix.length - prefixLength) + ' chars');
                return {
                    text: currentValue,
                    replaceCharCnt: replacePreviousCharacters_1
                };
            }
            // there is a current selection => composition case
            var replacePreviousCharacters = previousSelectionEnd - previousSelectionStart;
            return {
                text: currentValue,
                replaceCharCnt: replacePreviousCharacters
            };
        };
        return TextAreaState;
    }());
    exports.TextAreaState = TextAreaState;
    var IENarratorTextAreaState = (function (_super) {
        __extends(IENarratorTextAreaState, _super);
        function IENarratorTextAreaState(previousState, value, selectionStart, selectionEnd, isInOverwriteMode, selectionToken) {
            _super.call(this, previousState, value, selectionStart, selectionEnd, isInOverwriteMode);
            this.selectionToken = selectionToken;
        }
        IENarratorTextAreaState.prototype.shallowClone = function () {
            return new IENarratorTextAreaState(null, this.value, this.selectionStart, this.selectionEnd, this.isInOverwriteMode, this.selectionToken);
        };
        IENarratorTextAreaState.prototype.toEmpty = function () {
            return IENarratorTextAreaState.EMPTY;
        };
        IENarratorTextAreaState.prototype.toString = function () {
            return '[ <' + this.value + '>, selectionStart: ' + this.selectionStart + ', selectionEnd: ' + this.selectionEnd + ', isInOverwriteMode: ' + this.isInOverwriteMode + ', selectionToken: ' + this.selectionToken + ']';
        };
        IENarratorTextAreaState.prototype.toStrategy = function (strategy) {
            if (strategy === TextAreaStrategy.IENarrator) {
                return this;
            }
            if (USE_NVDA_FULL_TEXT) {
                return new NVDAFullTextAreaState(this.previousState, this.value, this.selectionStart, this.selectionEnd, this.isInOverwriteMode);
            }
            return new NVDAPagedTextAreaState(this.previousState, this.value, this.selectionStart, this.selectionEnd, this.isInOverwriteMode);
        };
        IENarratorTextAreaState.prototype.equals = function (other) {
            if (other instanceof IENarratorTextAreaState) {
                return (this.value === other.value
                    && this.selectionStart === other.selectionStart
                    && this.selectionEnd === other.selectionEnd
                    && this.isInOverwriteMode === other.isInOverwriteMode
                    && this.selectionToken === other.selectionToken);
            }
            return false;
        };
        IENarratorTextAreaState.prototype.fromTextArea = function (textArea) {
            return new IENarratorTextAreaState(this, textArea.getValue(), textArea.getSelectionStart(), textArea.getSelectionEnd(), textArea.isInOverwriteMode(), this.selectionToken);
        };
        IENarratorTextAreaState.prototype.fromEditorSelection = function (model, selection) {
            var LIMIT_CHARS = 100;
            var PADDING_LINES_COUNT = 0;
            var selectionStartLineNumber = selection.startLineNumber, selectionStartColumn = selection.startColumn, selectionEndLineNumber = selection.endLineNumber, selectionEndColumn = selection.endColumn, selectionEndLineNumberMaxColumn = model.getLineMaxColumn(selectionEndLineNumber);
            // If the selection is empty and we have switched line numbers, expand selection to full line (helps Narrator trigger a full line read)
            if (selection.isEmpty() && this.selectionToken !== selectionStartLineNumber) {
                selectionStartColumn = 1;
                selectionEndColumn = selectionEndLineNumberMaxColumn;
            }
            // `pretext` contains the text before the selection
            var pretext = '';
            var startLineNumber = Math.max(1, selectionStartLineNumber - PADDING_LINES_COUNT);
            if (startLineNumber < selectionStartLineNumber) {
                pretext = model.getValueInRange(new range_1.Range(startLineNumber, 1, selectionStartLineNumber, 1), editorCommon_1.EndOfLinePreference.LF);
            }
            pretext += model.getValueInRange(new range_1.Range(selectionStartLineNumber, 1, selectionStartLineNumber, selectionStartColumn), editorCommon_1.EndOfLinePreference.LF);
            if (pretext.length > LIMIT_CHARS) {
                pretext = pretext.substring(pretext.length - LIMIT_CHARS, pretext.length);
            }
            // `posttext` contains the text after the selection
            var posttext = '';
            var endLineNumber = Math.min(selectionEndLineNumber + PADDING_LINES_COUNT, model.getLineCount());
            posttext += model.getValueInRange(new range_1.Range(selectionEndLineNumber, selectionEndColumn, selectionEndLineNumber, selectionEndLineNumberMaxColumn), editorCommon_1.EndOfLinePreference.LF);
            if (endLineNumber > selectionEndLineNumber) {
                posttext = '\n' + model.getValueInRange(new range_1.Range(selectionEndLineNumber + 1, 1, endLineNumber, model.getLineMaxColumn(endLineNumber)), editorCommon_1.EndOfLinePreference.LF);
            }
            if (posttext.length > LIMIT_CHARS) {
                posttext = posttext.substring(0, LIMIT_CHARS);
            }
            // `text` contains the text of the selection
            var text = model.getValueInRange(new range_1.Range(selectionStartLineNumber, selectionStartColumn, selectionEndLineNumber, selectionEndColumn), editorCommon_1.EndOfLinePreference.LF);
            if (text.length > 2 * LIMIT_CHARS) {
                text = text.substring(0, LIMIT_CHARS) + String.fromCharCode(8230) + text.substring(text.length - LIMIT_CHARS, text.length);
            }
            return new IENarratorTextAreaState(this, pretext + text + posttext, pretext.length, pretext.length + text.length, false, selectionStartLineNumber);
        };
        IENarratorTextAreaState.prototype.fromText = function (text) {
            return new IENarratorTextAreaState(this, text, 0, text.length, false, 0);
        };
        IENarratorTextAreaState.prototype.resetSelection = function () {
            return new IENarratorTextAreaState(this.previousState, this.value, this.value.length, this.value.length, this.isInOverwriteMode, this.selectionToken);
        };
        IENarratorTextAreaState.EMPTY = new IENarratorTextAreaState(null, '', 0, 0, false, 0);
        return IENarratorTextAreaState;
    }(TextAreaState));
    exports.IENarratorTextAreaState = IENarratorTextAreaState;
    var NVDAPagedTextAreaState = (function (_super) {
        __extends(NVDAPagedTextAreaState, _super);
        function NVDAPagedTextAreaState(previousState, value, selectionStart, selectionEnd, isInOverwriteMode) {
            _super.call(this, previousState, value, selectionStart, selectionEnd, isInOverwriteMode);
        }
        NVDAPagedTextAreaState.prototype.shallowClone = function () {
            return new NVDAPagedTextAreaState(null, this.value, this.selectionStart, this.selectionEnd, this.isInOverwriteMode);
        };
        NVDAPagedTextAreaState.prototype.toEmpty = function () {
            return NVDAPagedTextAreaState.EMPTY;
        };
        NVDAPagedTextAreaState.prototype.toString = function () {
            return '[ <' + this.value + '>, selectionStart: ' + this.selectionStart + ', selectionEnd: ' + this.selectionEnd + ', isInOverwriteMode: ' + this.isInOverwriteMode + ']';
        };
        NVDAPagedTextAreaState.prototype.toStrategy = function (strategy) {
            if (strategy === TextAreaStrategy.NVDA) {
                return this;
            }
            return new IENarratorTextAreaState(this.previousState, this.value, this.selectionStart, this.selectionEnd, this.isInOverwriteMode, 0);
        };
        NVDAPagedTextAreaState.prototype.equals = function (other) {
            if (other instanceof NVDAPagedTextAreaState) {
                return (this.value === other.value
                    && this.selectionStart === other.selectionStart
                    && this.selectionEnd === other.selectionEnd
                    && this.isInOverwriteMode === other.isInOverwriteMode);
            }
            return false;
        };
        NVDAPagedTextAreaState.prototype.fromTextArea = function (textArea) {
            return new NVDAPagedTextAreaState(this, textArea.getValue(), textArea.getSelectionStart(), textArea.getSelectionEnd(), textArea.isInOverwriteMode());
        };
        NVDAPagedTextAreaState._getPageOfLine = function (lineNumber) {
            return Math.floor((lineNumber - 1) / NVDAPagedTextAreaState._LINES_PER_PAGE);
        };
        NVDAPagedTextAreaState._getRangeForPage = function (page) {
            var offset = page * NVDAPagedTextAreaState._LINES_PER_PAGE;
            var startLineNumber = offset + 1;
            var endLineNumber = offset + NVDAPagedTextAreaState._LINES_PER_PAGE;
            return new range_1.Range(startLineNumber, 1, endLineNumber, Number.MAX_VALUE);
        };
        NVDAPagedTextAreaState.prototype.fromEditorSelection = function (model, selection) {
            var selectionStartPage = NVDAPagedTextAreaState._getPageOfLine(selection.startLineNumber);
            var selectionStartPageRange = NVDAPagedTextAreaState._getRangeForPage(selectionStartPage);
            var selectionEndPage = NVDAPagedTextAreaState._getPageOfLine(selection.endLineNumber);
            var selectionEndPageRange = NVDAPagedTextAreaState._getRangeForPage(selectionEndPage);
            var pretextRange = selectionStartPageRange.intersectRanges(new range_1.Range(1, 1, selection.startLineNumber, selection.startColumn));
            var pretext = model.getValueInRange(pretextRange, editorCommon_1.EndOfLinePreference.LF);
            var lastLine = model.getLineCount();
            var lastLineMaxColumn = model.getLineMaxColumn(lastLine);
            var posttextRange = selectionEndPageRange.intersectRanges(new range_1.Range(selection.endLineNumber, selection.endColumn, lastLine, lastLineMaxColumn));
            var posttext = model.getValueInRange(posttextRange, editorCommon_1.EndOfLinePreference.LF);
            var text = null;
            if (selectionStartPage <= selectionEndPage) {
                // take full selection
                text = model.getValueInRange(selection, editorCommon_1.EndOfLinePreference.LF);
            }
            else {
                var selectionRange1 = selectionStartPageRange.intersectRanges(selection);
                var selectionRange2 = selectionEndPageRange.intersectRanges(selection);
                text = (model.getValueInRange(selectionRange1, editorCommon_1.EndOfLinePreference.LF)
                    + String.fromCharCode(8230)
                    + model.getValueInRange(selectionRange2, editorCommon_1.EndOfLinePreference.LF));
            }
            return new NVDAPagedTextAreaState(this, pretext + text + posttext, pretext.length, pretext.length + text.length, false);
        };
        NVDAPagedTextAreaState.prototype.fromText = function (text) {
            return new NVDAPagedTextAreaState(this, text, 0, text.length, false);
        };
        NVDAPagedTextAreaState.prototype.resetSelection = function () {
            return new NVDAPagedTextAreaState(this.previousState, this.value, this.value.length, this.value.length, this.isInOverwriteMode);
        };
        NVDAPagedTextAreaState.EMPTY = new NVDAPagedTextAreaState(null, '', 0, 0, false);
        NVDAPagedTextAreaState._LINES_PER_PAGE = 10;
        return NVDAPagedTextAreaState;
    }(TextAreaState));
    exports.NVDAPagedTextAreaState = NVDAPagedTextAreaState;
    var NVDAFullTextAreaState = (function (_super) {
        __extends(NVDAFullTextAreaState, _super);
        function NVDAFullTextAreaState(previousState, value, selectionStart, selectionEnd, isInOverwriteMode) {
            _super.call(this, previousState, value, selectionStart, selectionEnd, isInOverwriteMode);
        }
        NVDAFullTextAreaState.prototype.shallowClone = function () {
            return new NVDAFullTextAreaState(null, this.value, this.selectionStart, this.selectionEnd, this.isInOverwriteMode);
        };
        NVDAFullTextAreaState.prototype.toEmpty = function () {
            return NVDAFullTextAreaState.EMPTY;
        };
        NVDAFullTextAreaState.prototype.toString = function () {
            return '[ <ENTIRE TEXT' + '>, selectionStart: ' + this.selectionStart + ', selectionEnd: ' + this.selectionEnd + ', isInOverwriteMode: ' + this.isInOverwriteMode + ']';
        };
        NVDAFullTextAreaState.prototype.toStrategy = function (strategy) {
            if (strategy === TextAreaStrategy.NVDA) {
                return this;
            }
            return new IENarratorTextAreaState(this.previousState, this.value, this.selectionStart, this.selectionEnd, this.isInOverwriteMode, 0);
        };
        NVDAFullTextAreaState.prototype.equals = function (other) {
            if (other instanceof NVDAFullTextAreaState) {
                return (this.value === other.value
                    && this.selectionStart === other.selectionStart
                    && this.selectionEnd === other.selectionEnd
                    && this.isInOverwriteMode === other.isInOverwriteMode);
            }
            return false;
        };
        NVDAFullTextAreaState.prototype.fromTextArea = function (textArea) {
            return new NVDAFullTextAreaState(this, textArea.getValue(), textArea.getSelectionStart(), textArea.getSelectionEnd(), textArea.isInOverwriteMode());
        };
        NVDAFullTextAreaState.prototype.fromEditorSelection = function (model, selection) {
            var pretext = model.getValueInRange(new range_1.Range(1, 1, selection.startLineNumber, selection.startColumn), editorCommon_1.EndOfLinePreference.LF);
            var text = model.getValueInRange(selection, editorCommon_1.EndOfLinePreference.LF);
            var lastLine = model.getLineCount();
            var lastLineMaxColumn = model.getLineMaxColumn(lastLine);
            var posttext = model.getValueInRange(new range_1.Range(selection.endLineNumber, selection.endColumn, lastLine, lastLineMaxColumn), editorCommon_1.EndOfLinePreference.LF);
            return new NVDAFullTextAreaState(this, pretext + text + posttext, pretext.length, pretext.length + text.length, false);
        };
        NVDAFullTextAreaState.prototype.fromText = function (text) {
            return new NVDAFullTextAreaState(this, text, 0, text.length, false);
        };
        NVDAFullTextAreaState.prototype.resetSelection = function () {
            return new NVDAFullTextAreaState(this.previousState, this.value, this.value.length, this.value.length, this.isInOverwriteMode);
        };
        NVDAFullTextAreaState.EMPTY = new NVDAFullTextAreaState(null, '', 0, 0, false);
        return NVDAFullTextAreaState;
    }(TextAreaState));
    exports.NVDAFullTextAreaState = NVDAFullTextAreaState;
});
