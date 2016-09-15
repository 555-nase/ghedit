import { TPromise } from 'vs/base/common/winjs.base';
import { Range } from 'vs/editor/common/core/range';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { TextModelWithDecorations } from 'vs/editor/common/model/textModelWithDecorations';
import { IMode } from 'vs/editor/common/modes';
import { Selection } from 'vs/editor/common/core/selection';
import { IDisposable } from 'vs/base/common/lifecycle';
export interface IValidatedEditOperation {
    sortIndex: number;
    identifier: editorCommon.ISingleEditOperationIdentifier;
    range: Range;
    rangeLength: number;
    lines: string[];
    forceMoveMarkers: boolean;
    isAutoWhitespaceEdit: boolean;
}
export declare class EditableTextModel extends TextModelWithDecorations implements editorCommon.IEditableTextModel {
    onDidChangeRawContent(listener: (e: editorCommon.IModelContentChangedEvent) => void): IDisposable;
    onDidChangeContent(listener: (e: editorCommon.IModelContentChangedEvent2) => void): IDisposable;
    private _commandManager;
    private _isUndoing;
    private _isRedoing;
    private _hasEditableRange;
    private _editableRangeId;
    private _trimAutoWhitespaceLines;
    constructor(allowedEventTypes: string[], rawText: editorCommon.IRawText, modeOrPromise: IMode | TPromise<IMode>);
    dispose(): void;
    _resetValue(e: editorCommon.IModelContentChangedFlushEvent, newValue: editorCommon.IRawText): void;
    pushStackElement(): void;
    pushEditOperations(beforeCursorState: Selection[], editOperations: editorCommon.IIdentifiedSingleEditOperation[], cursorStateComputer: editorCommon.ICursorStateComputer): Selection[];
    /**
     * Transform operations such that they represent the same logic edit,
     * but that they also do not cause OOM crashes.
     */
    private _reduceOperations(operations);
    _toSingleEditOperation(operations: IValidatedEditOperation[]): IValidatedEditOperation;
    private static _sortOpsAscending(a, b);
    private static _sortOpsDescending(a, b);
    applyEdits(rawOperations: editorCommon.IIdentifiedSingleEditOperation[]): editorCommon.IIdentifiedSingleEditOperation[];
    /**
     * Assumes `operations` are validated and sorted ascending
     */
    static _getInverseEditRanges(operations: IValidatedEditOperation[]): Range[];
    private _applyEdits(operations);
    _assertLineNumbersOK(): void;
    undo(): Selection[];
    redo(): Selection[];
    setEditableRange(range: editorCommon.IRange): void;
    hasEditableRange(): boolean;
    getEditableRange(): Range;
    private _createLineChangedEvent(lineNumber);
    private _createLinesDeletedEvent(fromLineNumber, toLineNumber);
    private _createLinesInsertedEvent(fromLineNumber, toLineNumber, newLinesContent);
}
