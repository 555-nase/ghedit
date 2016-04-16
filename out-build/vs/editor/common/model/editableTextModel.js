var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/editor/common/core/range', 'vs/editor/common/editorCommon', 'vs/editor/common/model/editStack', 'vs/editor/common/model/modelLine', 'vs/editor/common/model/textModelWithDecorations'], function (require, exports, range_1, editorCommon, editStack_1, modelLine_1, textModelWithDecorations_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var EditableTextModel = (function (_super) {
        __extends(EditableTextModel, _super);
        function EditableTextModel(allowedEventTypes, rawText, modeOrPromise) {
            allowedEventTypes.push(editorCommon.EventType.ModelContentChanged);
            allowedEventTypes.push(editorCommon.EventType.ModelContentChanged2);
            _super.call(this, allowedEventTypes, rawText, modeOrPromise);
            this._commandManager = new editStack_1.EditStack(this);
            this._isUndoing = false;
            this._isRedoing = false;
            this._hasEditableRange = false;
            this._editableRangeId = null;
        }
        EditableTextModel.prototype.dispose = function () {
            this._commandManager = null;
            _super.prototype.dispose.call(this);
        };
        EditableTextModel.prototype._resetValue = function (e, newValue) {
            _super.prototype._resetValue.call(this, e, newValue);
            // Destroy my edit history and settings
            this._commandManager = new editStack_1.EditStack(this);
            this._hasEditableRange = false;
            this._editableRangeId = null;
        };
        EditableTextModel.prototype.pushStackElement = function () {
            this._commandManager.pushStackElement();
        };
        EditableTextModel.prototype.pushEditOperations = function (beforeCursorState, editOperations, cursorStateComputer) {
            var _this = this;
            return this.deferredEmit(function () {
                return _this._commandManager.pushEditOperation(beforeCursorState, editOperations, cursorStateComputer);
            });
        };
        /**
         * Transform operations such that they represent the same logic edit,
         * but that they also do not cause OOM crashes.
         */
        EditableTextModel.prototype._reduceOperations = function (operations) {
            if (operations.length < 1000) {
                // We know from empirical testing that a thousand edits work fine regardless of their shape.
                return operations;
            }
            // At one point, due to how events are emitted and how each operation is handled,
            // some operations can trigger a high ammount of temporary string allocations,
            // that will immediately get edited again.
            // e.g. a formatter inserting ridiculous ammounts of \n on a model with a single line
            // Therefore, the strategy is to collapse all the operations into a huge single edit operation
            return [this._toSingleEditOperation(operations)];
        };
        EditableTextModel.prototype._toSingleEditOperation = function (operations) {
            var forceMoveMarkers = false, firstEditRange = operations[0].range, lastEditRange = operations[operations.length - 1].range, entireEditRange = new range_1.Range(firstEditRange.startLineNumber, firstEditRange.startColumn, lastEditRange.endLineNumber, lastEditRange.endColumn), lastEndLineNumber = firstEditRange.startLineNumber, lastEndColumn = firstEditRange.startColumn, result = [];
            for (var i = 0, len = operations.length; i < len; i++) {
                var operation = operations[i], range = operation.range;
                forceMoveMarkers = forceMoveMarkers || operation.forceMoveMarkers;
                // (1) -- Push old text
                for (var lineNumber = lastEndLineNumber; lineNumber < range.startLineNumber; lineNumber++) {
                    if (lineNumber === lastEndLineNumber) {
                        result.push(this._lines[lineNumber - 1].text.substring(lastEndColumn - 1));
                    }
                    else {
                        result.push('\n');
                        result.push(this._lines[lineNumber - 1].text);
                    }
                }
                if (range.startLineNumber === lastEndLineNumber) {
                    result.push(this._lines[range.startLineNumber - 1].text.substring(lastEndColumn - 1, range.startColumn - 1));
                }
                else {
                    result.push('\n');
                    result.push(this._lines[range.startLineNumber - 1].text.substring(0, range.startColumn - 1));
                }
                // (2) -- Push new text
                if (operation.lines) {
                    for (var j = 0, lenJ = operation.lines.length; j < lenJ; j++) {
                        if (j !== 0) {
                            result.push('\n');
                        }
                        result.push(operation.lines[j]);
                    }
                }
                lastEndLineNumber = operation.range.endLineNumber;
                lastEndColumn = operation.range.endColumn;
            }
            return {
                sortIndex: 0,
                identifier: operations[0].identifier,
                range: entireEditRange,
                rangeLength: this.getValueLengthInRange(entireEditRange),
                lines: result.join('').split('\n'),
                forceMoveMarkers: forceMoveMarkers
            };
        };
        EditableTextModel._sortOpsAscending = function (a, b) {
            var r = range_1.Range.compareRangesUsingEnds(a.range, b.range);
            if (r === 0) {
                return a.sortIndex - b.sortIndex;
            }
            return r;
        };
        EditableTextModel._sortOpsDescending = function (a, b) {
            var r = range_1.Range.compareRangesUsingEnds(a.range, b.range);
            if (r === 0) {
                return b.sortIndex - a.sortIndex;
            }
            return -r;
        };
        EditableTextModel.prototype.applyEdits = function (rawOperations) {
            if (rawOperations.length === 0) {
                return [];
            }
            var operations = [];
            for (var i = 0; i < rawOperations.length; i++) {
                var op = rawOperations[i];
                var validatedRange = this.validateRange(op.range);
                operations[i] = {
                    sortIndex: i,
                    identifier: op.identifier,
                    range: validatedRange,
                    rangeLength: this.getValueLengthInRange(validatedRange),
                    lines: op.text ? op.text.split(/\r\n|\r|\n/) : null,
                    forceMoveMarkers: op.forceMoveMarkers
                };
            }
            // Sort operations ascending
            operations.sort(EditableTextModel._sortOpsAscending);
            for (var i = 0, count = operations.length - 1; i < count; i++) {
                var rangeEnd = operations[i].range.getEndPosition();
                var nextRangeStart = operations[i + 1].range.getStartPosition();
                if (nextRangeStart.isBefore(rangeEnd)) {
                    // overlapping ranges
                    throw new Error('Overlapping ranges are not allowed!');
                }
            }
            operations = this._reduceOperations(operations);
            var editableRange = this.getEditableRange();
            var editableRangeStart = editableRange.getStartPosition();
            var editableRangeEnd = editableRange.getEndPosition();
            for (var i = 0; i < operations.length; i++) {
                var operationRange = operations[i].range;
                if (!editableRangeStart.isBeforeOrEqual(operationRange.getStartPosition()) || !operationRange.getEndPosition().isBeforeOrEqual(editableRangeEnd)) {
                    throw new Error('Editing outside of editable range not allowed!');
                }
            }
            // Delta encode operations
            var reverseRanges = EditableTextModel._getInverseEditRanges(operations);
            var reverseOperations = [];
            for (var i = 0; i < operations.length; i++) {
                reverseOperations[i] = {
                    identifier: operations[i].identifier,
                    range: reverseRanges[i],
                    text: this.getValueInRange(operations[i].range),
                    forceMoveMarkers: operations[i].forceMoveMarkers
                };
            }
            this._applyEdits(operations);
            return reverseOperations;
        };
        /**
         * Assumes `operations` are validated and sorted ascending
         */
        EditableTextModel._getInverseEditRanges = function (operations) {
            var result = [];
            var prevOpEndLineNumber;
            var prevOpEndColumn;
            var prevOp = null;
            for (var i = 0, len = operations.length; i < len; i++) {
                var op = operations[i];
                var startLineNumber = void 0;
                var startColumn = void 0;
                if (prevOp) {
                    if (prevOp.range.endLineNumber === op.range.startLineNumber) {
                        startLineNumber = prevOpEndLineNumber;
                        startColumn = prevOpEndColumn + (op.range.startColumn - prevOp.range.endColumn);
                    }
                    else {
                        startLineNumber = prevOpEndLineNumber + (op.range.startLineNumber - prevOp.range.endLineNumber);
                        startColumn = op.range.startColumn;
                    }
                }
                else {
                    startLineNumber = op.range.startLineNumber;
                    startColumn = op.range.startColumn;
                }
                var resultRange = void 0;
                if (op.lines && op.lines.length > 0) {
                    // the operation inserts something
                    var lineCount = op.lines.length;
                    var firstLine = op.lines[0];
                    var lastLine = op.lines[lineCount - 1];
                    if (lineCount === 1) {
                        // single line insert
                        resultRange = new range_1.Range(startLineNumber, startColumn, startLineNumber, startColumn + firstLine.length);
                    }
                    else {
                        // multi line insert
                        resultRange = new range_1.Range(startLineNumber, startColumn, startLineNumber + lineCount - 1, lastLine.length + 1);
                    }
                }
                else {
                    // There is nothing to insert
                    resultRange = new range_1.Range(startLineNumber, startColumn, startLineNumber, startColumn);
                }
                prevOpEndLineNumber = resultRange.endLineNumber;
                prevOpEndColumn = resultRange.endColumn;
                result.push(resultRange);
                prevOp = op;
            }
            return result;
        };
        EditableTextModel.prototype._applyEdits = function (operations) {
            var _this = this;
            // Sort operations descending
            operations.sort(EditableTextModel._sortOpsDescending);
            this._withDeferredEvents(function (deferredEventsBuilder) {
                var contentChangedEvents = [];
                var contentChanged2Events = [];
                var lineEditsQueue = [];
                var queueLineEdit = function (lineEdit) {
                    if (lineEdit.startColumn === lineEdit.endColumn && lineEdit.text.length === 0) {
                        // empty edit => ignore it
                        return;
                    }
                    lineEditsQueue.push(lineEdit);
                };
                var flushLineEdits = function () {
                    if (lineEditsQueue.length === 0) {
                        return;
                    }
                    lineEditsQueue.reverse();
                    // `lineEditsQueue` now contains edits from smaller (line number,column) to larger (line number,column)
                    var currentLineNumber = lineEditsQueue[0].lineNumber, currentLineNumberStart = 0;
                    for (var i = 1, len = lineEditsQueue.length; i < len; i++) {
                        var lineNumber = lineEditsQueue[i].lineNumber;
                        if (lineNumber === currentLineNumber) {
                            continue;
                        }
                        _this._invalidateLine(currentLineNumber - 1);
                        _this._lines[currentLineNumber - 1].applyEdits(deferredEventsBuilder.changedMarkers, lineEditsQueue.slice(currentLineNumberStart, i));
                        contentChangedEvents.push(_this._createLineChangedEvent(currentLineNumber));
                        currentLineNumber = lineNumber;
                        currentLineNumberStart = i;
                    }
                    _this._invalidateLine(currentLineNumber - 1);
                    _this._lines[currentLineNumber - 1].applyEdits(deferredEventsBuilder.changedMarkers, lineEditsQueue.slice(currentLineNumberStart, lineEditsQueue.length));
                    contentChangedEvents.push(_this._createLineChangedEvent(currentLineNumber));
                    lineEditsQueue = [];
                };
                var minTouchedLineNumber = operations[operations.length - 1].range.startLineNumber;
                var maxTouchedLineNumber = operations[0].range.endLineNumber + 1;
                var totalLinesCountDelta = 0;
                for (var i = 0, len = operations.length; i < len; i++) {
                    var op = operations[i];
                    // console.log();
                    // console.log('-------------------');
                    // console.log('OPERATION #' + (i));
                    // console.log('op: ', op);
                    // console.log('<<<\n' + this._lines.map(l => l.text).join('\n') + '\n>>>');
                    var startLineNumber = op.range.startLineNumber;
                    var startColumn = op.range.startColumn;
                    var endLineNumber = op.range.endLineNumber;
                    var endColumn = op.range.endColumn;
                    if (startLineNumber === endLineNumber && startColumn === endColumn && (!op.lines || op.lines.length === 0)) {
                        // no-op
                        continue;
                    }
                    var deletingLinesCnt = endLineNumber - startLineNumber;
                    var insertingLinesCnt = (op.lines ? op.lines.length - 1 : 0);
                    var editingLinesCnt = Math.min(deletingLinesCnt, insertingLinesCnt);
                    totalLinesCountDelta += (insertingLinesCnt - deletingLinesCnt);
                    // Iterating descending to overlap with previous op
                    // in case there are common lines being edited in both
                    for (var j = editingLinesCnt; j >= 0; j--) {
                        var editLineNumber = startLineNumber + j;
                        queueLineEdit({
                            lineNumber: editLineNumber,
                            startColumn: (editLineNumber === startLineNumber ? startColumn : 1),
                            endColumn: (editLineNumber === endLineNumber ? endColumn : _this.getLineMaxColumn(editLineNumber)),
                            text: (op.lines ? op.lines[j] : ''),
                            forceMoveMarkers: op.forceMoveMarkers
                        });
                    }
                    if (editingLinesCnt < deletingLinesCnt) {
                        // Must delete some lines
                        // Flush any pending line edits
                        flushLineEdits();
                        var spliceStartLineNumber = startLineNumber + editingLinesCnt;
                        var spliceStartColumn = _this.getLineMaxColumn(spliceStartLineNumber);
                        var endLineRemains = _this._lines[endLineNumber - 1].split(deferredEventsBuilder.changedMarkers, endColumn, false);
                        _this._invalidateLine(spliceStartLineNumber - 1);
                        var spliceCnt = endLineNumber - spliceStartLineNumber;
                        // Collect all these markers
                        var markersOnDeletedLines = [];
                        for (var j = 0; j < spliceCnt; j++) {
                            var deleteLineIndex = spliceStartLineNumber + j;
                            markersOnDeletedLines = markersOnDeletedLines.concat(_this._lines[deleteLineIndex].deleteLine(deferredEventsBuilder.changedMarkers, spliceStartColumn, deleteLineIndex + 1));
                        }
                        _this._lines.splice(spliceStartLineNumber, spliceCnt);
                        // Reconstruct first line
                        _this._lines[spliceStartLineNumber - 1].append(deferredEventsBuilder.changedMarkers, endLineRemains);
                        _this._lines[spliceStartLineNumber - 1].addMarkers(markersOnDeletedLines);
                        contentChangedEvents.push(_this._createLineChangedEvent(spliceStartLineNumber));
                        contentChangedEvents.push(_this._createLinesDeletedEvent(spliceStartLineNumber + 1, spliceStartLineNumber + spliceCnt));
                    }
                    if (editingLinesCnt < insertingLinesCnt) {
                        // Must insert some lines
                        // Flush any pending line edits
                        flushLineEdits();
                        var spliceLineNumber = startLineNumber + editingLinesCnt;
                        var spliceColumn = (spliceLineNumber === startLineNumber ? startColumn : 1);
                        if (op.lines) {
                            spliceColumn += op.lines[editingLinesCnt].length;
                        }
                        // Split last line
                        var leftoverLine = _this._lines[spliceLineNumber - 1].split(deferredEventsBuilder.changedMarkers, spliceColumn, op.forceMoveMarkers);
                        contentChangedEvents.push(_this._createLineChangedEvent(spliceLineNumber));
                        _this._invalidateLine(spliceLineNumber - 1);
                        // Lines in the middle
                        var newLinesContent = [];
                        for (var j = editingLinesCnt + 1; j <= insertingLinesCnt; j++) {
                            var newLineNumber = startLineNumber + j;
                            _this._lines.splice(newLineNumber - 1, 0, new modelLine_1.ModelLine(newLineNumber, op.lines[j]));
                            newLinesContent.push(op.lines[j]);
                        }
                        newLinesContent[newLinesContent.length - 1] += leftoverLine.text;
                        // Last line
                        _this._lines[startLineNumber + insertingLinesCnt - 1].append(deferredEventsBuilder.changedMarkers, leftoverLine);
                        contentChangedEvents.push(_this._createLinesInsertedEvent(spliceLineNumber + 1, startLineNumber + insertingLinesCnt, newLinesContent.join('\n')));
                    }
                    contentChanged2Events.push({
                        range: new range_1.Range(startLineNumber, startColumn, endLineNumber, endColumn),
                        rangeLength: op.rangeLength,
                        text: op.lines ? op.lines.join(_this.getEOL()) : '',
                        eol: _this._EOL,
                        versionId: -1,
                        isUndoing: _this._isUndoing,
                        isRedoing: _this._isRedoing
                    });
                }
                flushLineEdits();
                maxTouchedLineNumber = Math.max(1, Math.min(_this.getLineCount(), maxTouchedLineNumber + totalLinesCountDelta));
                if (totalLinesCountDelta !== 0) {
                    // must update line numbers all the way to the bottom
                    maxTouchedLineNumber = _this.getLineCount();
                }
                for (var lineNumber = minTouchedLineNumber; lineNumber <= maxTouchedLineNumber; lineNumber++) {
                    _this._lines[lineNumber - 1].updateLineNumber(deferredEventsBuilder.changedMarkers, lineNumber);
                }
                if (contentChangedEvents.length !== 0 || contentChanged2Events.length !== 0) {
                    if (contentChangedEvents.length === 0) {
                        // Fabricate a fake line changed event to get an event out
                        // This most likely occurs when there edit operations are no-ops
                        contentChangedEvents.push(_this._createLineChangedEvent(minTouchedLineNumber));
                    }
                    var versionBumps = Math.max(contentChangedEvents.length, contentChanged2Events.length);
                    var finalVersionId = _this.getVersionId() + versionBumps;
                    _this._setVersionId(finalVersionId);
                    for (var i = contentChangedEvents.length - 1, versionId = finalVersionId; i >= 0; i--, versionId--) {
                        contentChangedEvents[i].versionId = versionId;
                    }
                    for (var i = contentChanged2Events.length - 1, versionId = finalVersionId; i >= 0; i--, versionId--) {
                        contentChanged2Events[i].versionId = versionId;
                    }
                    for (var i = 0, len = contentChangedEvents.length; i < len; i++) {
                        _this.emit(editorCommon.EventType.ModelContentChanged, contentChangedEvents[i]);
                    }
                    for (var i = 0, len = contentChanged2Events.length; i < len; i++) {
                        _this.emit(editorCommon.EventType.ModelContentChanged2, contentChanged2Events[i]);
                    }
                }
                // this._assertLineNumbersOK();
            });
        };
        EditableTextModel.prototype._assertLineNumbersOK = function () {
            var foundMarkersCnt = 0;
            for (var i = 0, len = this._lines.length; i < len; i++) {
                var line = this._lines[i];
                var lineNumber = i + 1;
                if (line.lineNumber !== lineNumber) {
                    throw new Error('Invalid lineNumber at line: ' + lineNumber + '; text is: ' + this.getValue());
                }
                var markers = line.getMarkers();
                for (var j = 0, lenJ = markers.length; j < lenJ; j++) {
                    foundMarkersCnt++;
                    var markerId = markers[j].id;
                    var marker = this._markerIdToMarker[markerId];
                    if (marker.line !== line) {
                        throw new Error('Misplaced marker with id ' + markerId);
                    }
                }
            }
            var totalMarkersCnt = Object.keys(this._markerIdToMarker).length;
            if (totalMarkersCnt !== foundMarkersCnt) {
                throw new Error('There are misplaced markers!');
            }
        };
        EditableTextModel.prototype.undo = function () {
            var _this = this;
            return this._withDeferredEvents(function () {
                _this._isUndoing = true;
                var r = _this._commandManager.undo();
                _this._isUndoing = false;
                if (!r) {
                    return null;
                }
                _this._overwriteAlternativeVersionId(r.recordedVersionId);
                return r.selections;
            });
        };
        EditableTextModel.prototype.redo = function () {
            var _this = this;
            return this._withDeferredEvents(function () {
                _this._isRedoing = true;
                var r = _this._commandManager.redo();
                _this._isRedoing = false;
                if (!r) {
                    return null;
                }
                _this._overwriteAlternativeVersionId(r.recordedVersionId);
                return r.selections;
            });
        };
        EditableTextModel.prototype.setEditableRange = function (range) {
            this._commandManager.clear();
            if (this._hasEditableRange) {
                this.removeTrackedRange(this._editableRangeId);
                this._editableRangeId = null;
                this._hasEditableRange = false;
            }
            if (range) {
                this._hasEditableRange = true;
                this._editableRangeId = this.addTrackedRange(range, editorCommon.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges);
            }
        };
        EditableTextModel.prototype.hasEditableRange = function () {
            return this._hasEditableRange;
        };
        EditableTextModel.prototype.getEditableRange = function () {
            if (this._hasEditableRange) {
                return this.getTrackedRange(this._editableRangeId);
            }
            else {
                return this.getFullModelRange();
            }
        };
        EditableTextModel.prototype._createLineChangedEvent = function (lineNumber) {
            return {
                changeType: editorCommon.EventType.ModelContentChangedLineChanged,
                lineNumber: lineNumber,
                detail: this._lines[lineNumber - 1].text,
                versionId: -1,
                isUndoing: this._isUndoing,
                isRedoing: this._isRedoing
            };
        };
        EditableTextModel.prototype._createLinesDeletedEvent = function (fromLineNumber, toLineNumber) {
            return {
                changeType: editorCommon.EventType.ModelContentChangedLinesDeleted,
                fromLineNumber: fromLineNumber,
                toLineNumber: toLineNumber,
                versionId: -1,
                isUndoing: this._isUndoing,
                isRedoing: this._isRedoing
            };
        };
        EditableTextModel.prototype._createLinesInsertedEvent = function (fromLineNumber, toLineNumber, newLinesContent) {
            return {
                changeType: editorCommon.EventType.ModelContentChangedLinesInserted,
                fromLineNumber: fromLineNumber,
                toLineNumber: toLineNumber,
                detail: newLinesContent,
                versionId: -1,
                isUndoing: this._isUndoing,
                isRedoing: this._isRedoing
            };
        };
        return EditableTextModel;
    }(textModelWithDecorations_1.TextModelWithDecorations));
    exports.EditableTextModel = EditableTextModel;
});
