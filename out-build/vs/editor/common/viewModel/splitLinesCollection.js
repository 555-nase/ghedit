define(["require", "exports", 'vs/editor/common/core/position', 'vs/editor/common/core/range', 'vs/editor/common/editorCommon', 'vs/editor/common/viewModel/filteredLineTokens', 'vs/editor/common/viewModel/prefixSumComputer'], function (require, exports, position_1, range_1, editorCommon, filteredLineTokens_1, prefixSumComputer_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var OutputPosition = (function () {
        function OutputPosition(outputLineIndex, outputOffset) {
            this.outputLineIndex = outputLineIndex;
            this.outputOffset = outputOffset;
        }
        return OutputPosition;
    }());
    exports.OutputPosition = OutputPosition;
    var IdentitySplitLine = (function () {
        function IdentitySplitLine(isVisible) {
            this._isVisible = isVisible;
        }
        IdentitySplitLine.prototype.isVisible = function () {
            return this._isVisible;
        };
        IdentitySplitLine.prototype.setVisible = function (isVisible) {
            this._isVisible = isVisible;
        };
        IdentitySplitLine.prototype.getOutputLineCount = function () {
            if (!this._isVisible) {
                return 0;
            }
            return 1;
        };
        IdentitySplitLine.prototype.getOutputLineContent = function (model, myLineNumber, outputLineIndex) {
            if (!this._isVisible) {
                throw new Error('Not supported');
            }
            return model.getLineContent(myLineNumber);
        };
        IdentitySplitLine.prototype.getOutputLineMinColumn = function (model, myLineNumber, outputLineIndex) {
            if (!this._isVisible) {
                throw new Error('Not supported');
            }
            return model.getLineMinColumn(myLineNumber);
        };
        IdentitySplitLine.prototype.getOutputLineMaxColumn = function (model, myLineNumber, outputLineIndex) {
            if (!this._isVisible) {
                throw new Error('Not supported');
            }
            return model.getLineMaxColumn(myLineNumber);
        };
        IdentitySplitLine.prototype.getOutputLineTokens = function (model, myLineNumber, outputLineIndex) {
            if (!this._isVisible) {
                throw new Error('Not supported');
            }
            return filteredLineTokens_1.IdentityFilteredLineTokens.create(model.getLineTokens(myLineNumber, true), model.getLineMaxColumn(myLineNumber) - 1);
        };
        IdentitySplitLine.prototype.getInputColumnOfOutputPosition = function (outputLineIndex, outputColumn) {
            if (!this._isVisible) {
                throw new Error('Not supported');
            }
            return outputColumn;
        };
        IdentitySplitLine.prototype.getOutputPositionOfInputPosition = function (deltaLineNumber, inputColumn) {
            if (!this._isVisible) {
                throw new Error('Not supported');
            }
            return new position_1.Position(deltaLineNumber, inputColumn);
        };
        return IdentitySplitLine;
    }());
    var SplitLine = (function () {
        function SplitLine(positionMapper, isVisible) {
            this.positionMapper = positionMapper;
            this.wrappedIndent = this.positionMapper.getWrappedLinesIndent();
            this.wrappedIndentLength = this.wrappedIndent.length;
            this.outputLineCount = this.positionMapper.getOutputLineCount();
            this._isVisible = isVisible;
        }
        SplitLine.prototype.isVisible = function () {
            return this._isVisible;
        };
        SplitLine.prototype.setVisible = function (isVisible) {
            this._isVisible = isVisible;
        };
        SplitLine.prototype.getOutputLineCount = function () {
            if (!this._isVisible) {
                return 0;
            }
            return this.outputLineCount;
        };
        SplitLine.prototype.getInputStartOffsetOfOutputLineIndex = function (outputLineIndex) {
            return this.positionMapper.getInputOffsetOfOutputPosition(outputLineIndex, 0);
        };
        SplitLine.prototype.getInputEndOffsetOfOutputLineIndex = function (model, myLineNumber, outputLineIndex) {
            if (outputLineIndex + 1 === this.outputLineCount) {
                return model.getLineMaxColumn(myLineNumber) - 1;
            }
            return this.positionMapper.getInputOffsetOfOutputPosition(outputLineIndex + 1, 0);
        };
        SplitLine.prototype.getOutputLineContent = function (model, myLineNumber, outputLineIndex) {
            if (!this._isVisible) {
                throw new Error('Not supported');
            }
            var startOffset = this.getInputStartOffsetOfOutputLineIndex(outputLineIndex);
            var endOffset = this.getInputEndOffsetOfOutputLineIndex(model, myLineNumber, outputLineIndex);
            var r = model.getLineContent(myLineNumber).substring(startOffset, endOffset);
            if (outputLineIndex > 0) {
                r = this.wrappedIndent + r;
            }
            return r;
        };
        SplitLine.prototype.getOutputLineMinColumn = function (model, myLineNumber, outputLineIndex) {
            if (!this._isVisible) {
                throw new Error('Not supported');
            }
            if (outputLineIndex > 0) {
                return this.wrappedIndentLength + 1;
            }
            return 1;
        };
        SplitLine.prototype.getOutputLineMaxColumn = function (model, myLineNumber, outputLineIndex) {
            if (!this._isVisible) {
                throw new Error('Not supported');
            }
            return this.getOutputLineContent(model, myLineNumber, outputLineIndex).length + 1;
        };
        SplitLine.prototype.getOutputLineTokens = function (model, myLineNumber, outputLineIndex) {
            if (!this._isVisible) {
                throw new Error('Not supported');
            }
            var startOffset = this.getInputStartOffsetOfOutputLineIndex(outputLineIndex);
            var endOffset = this.getInputEndOffsetOfOutputLineIndex(model, myLineNumber, outputLineIndex);
            var deltaStartIndex = 0;
            if (outputLineIndex > 0) {
                deltaStartIndex = this.wrappedIndentLength;
            }
            return filteredLineTokens_1.FilteredLineTokens.create(model.getLineTokens(myLineNumber, true), startOffset, endOffset, deltaStartIndex);
        };
        SplitLine.prototype.getInputColumnOfOutputPosition = function (outputLineIndex, outputColumn) {
            if (!this._isVisible) {
                throw new Error('Not supported');
            }
            var adjustedColumn = outputColumn - 1;
            if (outputLineIndex > 0) {
                if (adjustedColumn < this.wrappedIndentLength) {
                    adjustedColumn = 0;
                }
                else {
                    adjustedColumn -= this.wrappedIndentLength;
                }
            }
            return this.positionMapper.getInputOffsetOfOutputPosition(outputLineIndex, adjustedColumn) + 1;
        };
        SplitLine.prototype.getOutputPositionOfInputPosition = function (deltaLineNumber, inputColumn) {
            if (!this._isVisible) {
                throw new Error('Not supported');
            }
            var r = this.positionMapper.getOutputPositionOfInputOffset(inputColumn - 1);
            var outputLineIndex = r.outputLineIndex;
            var outputColumn = r.outputOffset + 1;
            if (outputLineIndex > 0) {
                outputColumn += this.wrappedIndentLength;
            }
            //		console.log('in -> out ' + deltaLineNumber + ',' + inputColumn + ' ===> ' + (deltaLineNumber+outputLineIndex) + ',' + outputColumn);
            return new position_1.Position(deltaLineNumber + outputLineIndex, outputColumn);
        };
        return SplitLine;
    }());
    exports.SplitLine = SplitLine;
    function createSplitLine(linePositionMapperFactory, text, tabSize, wrappingColumn, columnsForFullWidthChar, wrappingIndent, isVisible) {
        var positionMapper = linePositionMapperFactory.createLineMapping(text, tabSize, wrappingColumn, columnsForFullWidthChar, wrappingIndent);
        if (positionMapper === null) {
            // No mapping needed
            return new IdentitySplitLine(isVisible);
        }
        else {
            return new SplitLine(positionMapper, isVisible);
        }
    }
    var SplitLinesCollection = (function () {
        function SplitLinesCollection(model, linePositionMapperFactory, tabSize, wrappingColumn, columnsForFullWidthChar, wrappingIndent) {
            this.model = model;
            this._validModelVersionId = -1;
            this.tabSize = tabSize;
            this.wrappingColumn = wrappingColumn;
            this.columnsForFullWidthChar = columnsForFullWidthChar;
            this.wrappingIndent = wrappingIndent;
            this.linePositionMapperFactory = linePositionMapperFactory;
            this._constructLines(true);
        }
        SplitLinesCollection.prototype.dispose = function () {
            this.hiddenAreasIds = this.model.deltaDecorations(this.hiddenAreasIds, []);
        };
        SplitLinesCollection.prototype._ensureValidState = function () {
            var modelVersion = this.model.getVersionId();
            if (modelVersion !== this._validModelVersionId) {
                throw new Error('SplitLinesCollection: attempt to access a \'newer\' model');
            }
        };
        SplitLinesCollection.prototype._constructLines = function (resetHiddenAreas) {
            var _this = this;
            this.lines = [];
            if (resetHiddenAreas) {
                this.hiddenAreasIds = [];
            }
            var values = [];
            var linesContent = this.model.getLinesContent();
            var lineCount = linesContent.length;
            var hiddenAreas = this.hiddenAreasIds.map(function (areaId) { return _this.model.getDecorationRange(areaId); }).sort(range_1.Range.compareRangesUsingStarts);
            var hiddenAreaStart = 1, hiddenAreaEnd = 0;
            var hiddenAreaIdx = -1;
            var nextLineNumberToUpdateHiddenArea = (hiddenAreaIdx + 1 < hiddenAreas.length) ? hiddenAreaEnd + 1 : lineCount + 2;
            for (var i = 0; i < lineCount; i++) {
                var lineNumber = i + 1;
                if (lineNumber === nextLineNumberToUpdateHiddenArea) {
                    hiddenAreaIdx++;
                    hiddenAreaStart = hiddenAreas[hiddenAreaIdx].startLineNumber;
                    hiddenAreaEnd = hiddenAreas[hiddenAreaIdx].endLineNumber;
                    nextLineNumberToUpdateHiddenArea = (hiddenAreaIdx + 1 < hiddenAreas.length) ? hiddenAreaEnd + 1 : lineCount + 2;
                }
                var isInHiddenArea = (lineNumber >= hiddenAreaStart && lineNumber <= hiddenAreaEnd);
                var line = createSplitLine(this.linePositionMapperFactory, linesContent[i], this.tabSize, this.wrappingColumn, this.columnsForFullWidthChar, this.wrappingIndent, !isInHiddenArea);
                values[i] = line.getOutputLineCount();
                this.lines[i] = line;
            }
            this._validModelVersionId = this.model.getVersionId();
            this.prefixSumComputer = new prefixSumComputer_1.PrefixSumComputer(values);
        };
        SplitLinesCollection.prototype.getHiddenAreas = function () {
            var _this = this;
            return this.hiddenAreasIds.map(function (decId) {
                return _this.model.getDecorationRange(decId);
            }).sort(range_1.Range.compareRangesUsingStarts);
        };
        SplitLinesCollection.prototype._reduceRanges = function (_ranges) {
            var _this = this;
            if (_ranges.length === 0) {
                return [];
            }
            var ranges = _ranges.map(function (r) { return _this.model.validateRange(r); }).sort(range_1.Range.compareRangesUsingStarts);
            var result = [];
            var currentRangeStart = ranges[0].startLineNumber;
            var currentRangeEnd = ranges[0].endLineNumber;
            for (var i = 1, len = ranges.length; i < len; i++) {
                var range = ranges[i];
                if (range.startLineNumber > currentRangeEnd + 1) {
                    result.push(new range_1.Range(currentRangeStart, 1, currentRangeEnd, 1));
                    currentRangeStart = range.startLineNumber;
                    currentRangeEnd = range.endLineNumber;
                }
                else if (range.endLineNumber > currentRangeEnd) {
                    currentRangeEnd = range.endLineNumber;
                }
            }
            result.push(new range_1.Range(currentRangeStart, 1, currentRangeEnd, 1));
            return result;
        };
        SplitLinesCollection.prototype.setHiddenAreas = function (_ranges, emit) {
            var _this = this;
            var newRanges = this._reduceRanges(_ranges);
            // BEGIN TODO@Martin: Please stop calling this method on each model change!
            var oldRanges = this.hiddenAreasIds.map(function (areaId) { return _this.model.getDecorationRange(areaId); }).sort(range_1.Range.compareRangesUsingStarts);
            if (newRanges.length === oldRanges.length) {
                var hasDifference = false;
                for (var i = 0; i < newRanges.length; i++) {
                    if (!newRanges[i].equalsRange(oldRanges[i])) {
                        hasDifference = true;
                        break;
                    }
                }
                if (!hasDifference) {
                    return false;
                }
            }
            // END TODO@Martin: Please stop calling this method on each model change!
            var newDecorations = [];
            for (var i = 0; i < newRanges.length; i++) {
                newDecorations.push({
                    range: newRanges[i],
                    options: {}
                });
            }
            this.hiddenAreasIds = this.model.deltaDecorations(this.hiddenAreasIds, newDecorations);
            var hiddenAreas = newRanges;
            var hiddenAreaStart = 1, hiddenAreaEnd = 0;
            var hiddenAreaIdx = -1;
            var nextLineNumberToUpdateHiddenArea = (hiddenAreaIdx + 1 < hiddenAreas.length) ? hiddenAreaEnd + 1 : this.lines.length + 2;
            for (var i = 0; i < this.lines.length; i++) {
                var lineNumber = i + 1;
                if (lineNumber === nextLineNumberToUpdateHiddenArea) {
                    hiddenAreaIdx++;
                    hiddenAreaStart = hiddenAreas[hiddenAreaIdx].startLineNumber;
                    hiddenAreaEnd = hiddenAreas[hiddenAreaIdx].endLineNumber;
                    nextLineNumberToUpdateHiddenArea = (hiddenAreaIdx + 1 < hiddenAreas.length) ? hiddenAreaEnd + 1 : this.lines.length + 2;
                }
                var lineChanged = false;
                if (lineNumber >= hiddenAreaStart && lineNumber <= hiddenAreaEnd) {
                    // Line should be hidden
                    if (this.lines[i].isVisible()) {
                        this.lines[i].setVisible(false);
                        lineChanged = true;
                    }
                }
                else {
                    // Line should be visible
                    if (!this.lines[i].isVisible()) {
                        this.lines[i].setVisible(true);
                        lineChanged = true;
                    }
                }
                if (lineChanged) {
                    var newOutputLineCount = this.lines[i].getOutputLineCount();
                    this.prefixSumComputer.changeValue(i, newOutputLineCount);
                }
            }
            emit(editorCommon.ViewEventNames.ModelFlushedEvent, null);
            return true;
        };
        SplitLinesCollection.prototype.inputPositionIsVisible = function (inputLineNumber, inputColumn) {
            if (inputLineNumber < 1 || inputLineNumber > this.lines.length) {
                // invalid arguments
                return false;
            }
            return this.lines[inputLineNumber - 1].isVisible();
        };
        SplitLinesCollection.prototype.setTabSize = function (newTabSize, emit) {
            if (this.tabSize === newTabSize) {
                return false;
            }
            this.tabSize = newTabSize;
            this._constructLines(false);
            emit(editorCommon.ViewEventNames.ModelFlushedEvent, null);
            return true;
        };
        SplitLinesCollection.prototype.setWrappingIndent = function (newWrappingIndent, emit) {
            if (this.wrappingIndent === newWrappingIndent) {
                return false;
            }
            this.wrappingIndent = newWrappingIndent;
            this._constructLines(false);
            emit(editorCommon.ViewEventNames.ModelFlushedEvent, null);
            return true;
        };
        SplitLinesCollection.prototype.setWrappingColumn = function (newWrappingColumn, columnsForFullWidthChar, emit) {
            if (this.wrappingColumn === newWrappingColumn && this.columnsForFullWidthChar === columnsForFullWidthChar) {
                return false;
            }
            this.wrappingColumn = newWrappingColumn;
            this.columnsForFullWidthChar = columnsForFullWidthChar;
            this._constructLines(false);
            emit(editorCommon.ViewEventNames.ModelFlushedEvent, null);
            return true;
        };
        SplitLinesCollection.prototype.onModelFlushed = function (versionId, emit) {
            this._constructLines(true);
            emit(editorCommon.ViewEventNames.ModelFlushedEvent, null);
        };
        SplitLinesCollection.prototype.onModelLinesDeleted = function (versionId, fromLineNumber, toLineNumber, emit) {
            if (versionId <= this._validModelVersionId) {
                return;
            }
            this._validModelVersionId = versionId;
            var outputFromLineNumber = (fromLineNumber === 1 ? 1 : this.prefixSumComputer.getAccumulatedValue(fromLineNumber - 2) + 1);
            var outputToLineNumber = this.prefixSumComputer.getAccumulatedValue(toLineNumber - 1);
            this.lines.splice(fromLineNumber - 1, toLineNumber - fromLineNumber + 1);
            this.prefixSumComputer.removeValues(fromLineNumber - 1, toLineNumber - fromLineNumber + 1);
            var e = {
                fromLineNumber: outputFromLineNumber,
                toLineNumber: outputToLineNumber
            };
            emit(editorCommon.ViewEventNames.LinesDeletedEvent, e);
        };
        SplitLinesCollection.prototype.onModelLinesInserted = function (versionId, fromLineNumber, toLineNumber, text, emit) {
            if (versionId <= this._validModelVersionId) {
                return;
            }
            this._validModelVersionId = versionId;
            var hiddenAreas = this.getHiddenAreas();
            var isInHiddenArea = false;
            var testPosition = new position_1.Position(fromLineNumber, 1);
            for (var i = 0; i < hiddenAreas.length; i++) {
                if (hiddenAreas[i].containsPosition(testPosition)) {
                    isInHiddenArea = true;
                    break;
                }
            }
            var outputFromLineNumber = (fromLineNumber === 1 ? 1 : this.prefixSumComputer.getAccumulatedValue(fromLineNumber - 2) + 1);
            var totalOutputLineCount = 0;
            var insertLines = [];
            var insertPrefixSumValues = [];
            for (var i = 0, len = text.length; i < len; i++) {
                var line = createSplitLine(this.linePositionMapperFactory, text[i], this.tabSize, this.wrappingColumn, this.columnsForFullWidthChar, this.wrappingIndent, !isInHiddenArea);
                insertLines.push(line);
                var outputLineCount = line.getOutputLineCount();
                totalOutputLineCount += outputLineCount;
                insertPrefixSumValues.push(outputLineCount);
            }
            this.lines = this.lines.slice(0, fromLineNumber - 1).concat(insertLines).concat(this.lines.slice(fromLineNumber - 1));
            this.prefixSumComputer.insertValues(fromLineNumber - 1, insertPrefixSumValues);
            var e = {
                fromLineNumber: outputFromLineNumber,
                toLineNumber: outputFromLineNumber + totalOutputLineCount - 1
            };
            emit(editorCommon.ViewEventNames.LinesInsertedEvent, e);
        };
        SplitLinesCollection.prototype.onModelLineChanged = function (versionId, lineNumber, newText, emit) {
            if (versionId <= this._validModelVersionId) {
                return;
            }
            this._validModelVersionId = versionId;
            var lineIndex = lineNumber - 1;
            var oldOutputLineCount = this.lines[lineIndex].getOutputLineCount();
            var isVisible = this.lines[lineIndex].isVisible();
            var line = createSplitLine(this.linePositionMapperFactory, newText, this.tabSize, this.wrappingColumn, this.columnsForFullWidthChar, this.wrappingIndent, isVisible);
            this.lines[lineIndex] = line;
            var newOutputLineCount = this.lines[lineIndex].getOutputLineCount();
            var lineMappingChanged = false;
            var changeFrom = 0;
            var changeTo = -1;
            var insertFrom = 0;
            var insertTo = -1;
            var deleteFrom = 0;
            var deleteTo = -1;
            if (oldOutputLineCount > newOutputLineCount) {
                changeFrom = (lineNumber === 1 ? 1 : this.prefixSumComputer.getAccumulatedValue(lineNumber - 2) + 1);
                changeTo = changeFrom + newOutputLineCount - 1;
                deleteFrom = changeTo + 1;
                deleteTo = deleteFrom + (oldOutputLineCount - newOutputLineCount) - 1;
                lineMappingChanged = true;
            }
            else if (oldOutputLineCount < newOutputLineCount) {
                changeFrom = (lineNumber === 1 ? 1 : this.prefixSumComputer.getAccumulatedValue(lineNumber - 2) + 1);
                changeTo = changeFrom + oldOutputLineCount - 1;
                insertFrom = changeTo + 1;
                insertTo = insertFrom + (newOutputLineCount - oldOutputLineCount) - 1;
                lineMappingChanged = true;
            }
            else {
                changeFrom = (lineNumber === 1 ? 1 : this.prefixSumComputer.getAccumulatedValue(lineNumber - 2) + 1);
                changeTo = changeFrom + newOutputLineCount - 1;
            }
            this.prefixSumComputer.changeValue(lineIndex, newOutputLineCount);
            var e1;
            var e2;
            var e3;
            if (changeFrom <= changeTo) {
                for (var i = changeFrom; i <= changeTo; i++) {
                    e1 = {
                        lineNumber: i
                    };
                    emit(editorCommon.ViewEventNames.LineChangedEvent, e1);
                }
            }
            if (insertFrom <= insertTo) {
                e2 = {
                    fromLineNumber: insertFrom,
                    toLineNumber: insertTo
                };
                emit(editorCommon.ViewEventNames.LinesInsertedEvent, e2);
            }
            if (deleteFrom <= deleteTo) {
                e3 = {
                    fromLineNumber: deleteFrom,
                    toLineNumber: deleteTo
                };
                emit(editorCommon.ViewEventNames.LinesDeletedEvent, e3);
            }
            return lineMappingChanged;
        };
        SplitLinesCollection.prototype.getOutputLineCount = function () {
            this._ensureValidState();
            return this.prefixSumComputer.getTotalValue();
        };
        SplitLinesCollection.prototype._toValidOutputLineNumber = function (outputLineNumber) {
            if (outputLineNumber < 1) {
                return 1;
            }
            var outputLineCount = this.getOutputLineCount();
            if (outputLineNumber > outputLineCount) {
                return outputLineCount;
            }
            return outputLineNumber;
        };
        SplitLinesCollection.prototype.getOutputLineContent = function (outputLineNumber) {
            this._ensureValidState();
            outputLineNumber = this._toValidOutputLineNumber(outputLineNumber);
            var r = this.prefixSumComputer.getIndexOf(outputLineNumber - 1);
            var lineIndex = r.index;
            var remainder = r.remainder;
            return this.lines[lineIndex].getOutputLineContent(this.model, lineIndex + 1, remainder);
        };
        SplitLinesCollection.prototype.getOutputLineMinColumn = function (outputLineNumber) {
            this._ensureValidState();
            outputLineNumber = this._toValidOutputLineNumber(outputLineNumber);
            var r = this.prefixSumComputer.getIndexOf(outputLineNumber - 1);
            var lineIndex = r.index;
            var remainder = r.remainder;
            return this.lines[lineIndex].getOutputLineMinColumn(this.model, lineIndex + 1, remainder);
        };
        SplitLinesCollection.prototype.getOutputLineMaxColumn = function (outputLineNumber) {
            this._ensureValidState();
            outputLineNumber = this._toValidOutputLineNumber(outputLineNumber);
            var r = this.prefixSumComputer.getIndexOf(outputLineNumber - 1);
            var lineIndex = r.index;
            var remainder = r.remainder;
            return this.lines[lineIndex].getOutputLineMaxColumn(this.model, lineIndex + 1, remainder);
        };
        SplitLinesCollection.prototype.getOutputLineTokens = function (outputLineNumber) {
            this._ensureValidState();
            outputLineNumber = this._toValidOutputLineNumber(outputLineNumber);
            var r = this.prefixSumComputer.getIndexOf(outputLineNumber - 1);
            var lineIndex = r.index;
            var remainder = r.remainder;
            return this.lines[lineIndex].getOutputLineTokens(this.model, lineIndex + 1, remainder);
        };
        SplitLinesCollection.prototype.convertOutputPositionToInputPosition = function (viewLineNumber, viewColumn) {
            this._ensureValidState();
            viewLineNumber = this._toValidOutputLineNumber(viewLineNumber);
            var r = this.prefixSumComputer.getIndexOf(viewLineNumber - 1);
            var lineIndex = r.index;
            var remainder = r.remainder;
            var inputColumn = this.lines[lineIndex].getInputColumnOfOutputPosition(remainder, viewColumn);
            // console.log('out -> in ' + viewLineNumber + ',' + viewColumn + ' ===> ' + (lineIndex+1) + ',' + inputColumn);
            return this.model.validatePosition(new position_1.Position(lineIndex + 1, inputColumn));
        };
        SplitLinesCollection.prototype.convertInputPositionToOutputPosition = function (_inputLineNumber, _inputColumn) {
            this._ensureValidState();
            var validPosition = this.model.validatePosition(new position_1.Position(_inputLineNumber, _inputColumn));
            var inputLineNumber = validPosition.lineNumber;
            var inputColumn = validPosition.column;
            var lineIndex = inputLineNumber - 1, lineIndexChanged = false;
            while (lineIndex > 0 && !this.lines[lineIndex].isVisible()) {
                lineIndex--;
                lineIndexChanged = true;
            }
            if (lineIndex === 0 && !this.lines[lineIndex].isVisible()) {
                // Could not reach a real line
                // console.log('in -> out ' + inputLineNumber + ',' + inputColumn + ' ===> ' + 1 + ',' + 1);
                return new position_1.Position(1, 1);
            }
            var deltaLineNumber = 1 + (lineIndex === 0 ? 0 : this.prefixSumComputer.getAccumulatedValue(lineIndex - 1));
            var r;
            if (lineIndexChanged) {
                r = this.lines[lineIndex].getOutputPositionOfInputPosition(deltaLineNumber, this.model.getLineMaxColumn(lineIndex + 1));
            }
            else {
                r = this.lines[inputLineNumber - 1].getOutputPositionOfInputPosition(deltaLineNumber, inputColumn);
            }
            // console.log('in -> out ' + inputLineNumber + ',' + inputColumn + ' ===> ' + r.lineNumber + ',' + r);
            return r;
        };
        return SplitLinesCollection;
    }());
    exports.SplitLinesCollection = SplitLinesCollection;
});
