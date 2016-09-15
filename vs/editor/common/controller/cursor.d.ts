import { EventEmitter } from 'vs/base/common/eventEmitter';
import { IViewModelHelper } from 'vs/editor/common/controller/oneCursor';
import { Position } from 'vs/editor/common/core/position';
import { Range } from 'vs/editor/common/core/range';
import { Selection } from 'vs/editor/common/core/selection';
import * as editorCommon from 'vs/editor/common/editorCommon';
export interface ITypingListener {
    (): void;
}
export declare class Cursor extends EventEmitter {
    private editorId;
    private configuration;
    private model;
    private modelUnbinds;
    private typingListeners;
    private cursors;
    private cursorUndoStack;
    private viewModelHelper;
    private _isHandling;
    private charactersTyped;
    private enableEmptySelectionClipboard;
    private _handlers;
    constructor(editorId: number, configuration: editorCommon.IConfiguration, model: editorCommon.IModel, viewModelHelper: IViewModelHelper, enableEmptySelectionClipboard: boolean);
    dispose(): void;
    saveState(): editorCommon.ICursorState[];
    restoreState(states: editorCommon.ICursorState[]): void;
    setEditableRange(range: editorCommon.IRange): void;
    getEditableRange(): Range;
    addTypingListener(character: string, callback: ITypingListener): void;
    removeTypingListener(character: string, callback: ITypingListener): void;
    private _onModelModeChanged();
    private _onModelContentChanged(e);
    getSelection(): Selection;
    getSelections(): Selection[];
    getPosition(): Position;
    setSelections(source: string, selections: editorCommon.ISelection[]): void;
    private _createAndInterpretHandlerCtx(eventSource, eventData, callback);
    private _onHandler(command, handler, source, data);
    private _interpretHandlerContext(ctx);
    private _interpretCommandResult(cursorState);
    private _getEditOperationsFromCommand(ctx, majorIdentifier, command, isAutoWhitespaceCommand);
    private _getEditOperations(ctx, commands, isAutoWhitespaceCommand);
    private _getLoserCursorMap(operations);
    private _collapseDeleteCommands(rawCmds, isAutoWhitespaceCommand, postOperationRunnables);
    private _internalExecuteCommands(commands, isAutoWhitespaceCommand, postOperationRunnables);
    private _arrayIsEmpty(commands);
    private _innerExecuteCommands(ctx, commands, isAutoWhitespaceCommand, postOperationRunnables);
    private emitCursorPositionChanged(source, reason);
    private emitCursorSelectionChanged(source, reason);
    private emitCursorScrollRequest(lineScrollOffset);
    private emitCursorRevealRange(revealTarget, verticalType, revealHorizontal);
    trigger(source: string, handlerId: string, payload: any): void;
    private _registerHandlers();
    private _invokeForAllSorted(ctx, callable, pushStackElementBefore?, pushStackElementAfter?);
    private _invokeForAll(ctx, callable, pushStackElementBefore?, pushStackElementAfter?);
    private _doInvokeForAll(ctx, sorted, callable, pushStackElementBefore?, pushStackElementAfter?);
    private _jumpToBracket(ctx);
    private _moveTo(inSelectionMode, ctx);
    private _cursorMove(ctx);
    private _columnSelectToLineNumber;
    private _getColumnSelectToLineNumber();
    private _columnSelectToVisualColumn;
    private _getColumnSelectToVisualColumn();
    private _columnSelectMouse(ctx);
    private _columnSelectOp(ctx, op);
    private _columnSelectLeft(ctx);
    private _columnSelectRight(ctx);
    private _columnSelectUp(isPaged, ctx);
    private _columnSelectDown(isPaged, ctx);
    private _createCursor(ctx);
    private _lastCursorMoveTo(ctx);
    private _addCursorUp(ctx);
    private _addCursorDown(ctx);
    private _moveLeft(inSelectionMode, ctx);
    private _moveWordLeft(inSelectionMode, wordNavigationType, ctx);
    private _moveRight(inSelectionMode, ctx);
    private _moveWordRight(inSelectionMode, wordNavigationType, ctx);
    private _moveDown(inSelectionMode, isPaged, ctx);
    private _moveUp(inSelectionMode, isPaged, ctx);
    private _moveToBeginningOfLine(inSelectionMode, ctx);
    private _moveToEndOfLine(inSelectionMode, ctx);
    private _moveToBeginningOfBuffer(inSelectionMode, ctx);
    private _moveToEndOfBuffer(inSelectionMode, ctx);
    private _selectAll(ctx);
    private _line(inSelectionMode, ctx);
    private _lastCursorLine(inSelectionMode, ctx);
    private _expandLineSelection(ctx);
    private _lineInsertBefore(ctx);
    private _lineInsertAfter(ctx);
    private _lineBreakInsert(ctx);
    private _word(inSelectionMode, ctx);
    private _lastCursorWord(ctx);
    private _removeSecondaryCursors(ctx);
    private _cancelSelection(ctx);
    private _type(ctx);
    private _replacePreviousChar(ctx);
    private _tab(ctx);
    private _indent(ctx);
    private _outdent(ctx);
    private _paste(ctx);
    private _scrollUp(isPaged, ctx);
    private _scrollDown(isPaged, ctx);
    private _distributePasteToCursors(ctx);
    private _deleteLeft(ctx);
    private _deleteWordLeft(whitespaceHeuristics, wordNavigationType, ctx);
    private _deleteRight(ctx);
    private _deleteWordRight(whitespaceHeuristics, wordNavigationType, ctx);
    private _deleteAllLeft(ctx);
    private _deleteAllRight(ctx);
    private _cut(ctx);
    private _undo(ctx);
    private _cursorUndo(ctx);
    private _redo(ctx);
    private _externalExecuteCommand(ctx);
    private _externalExecuteCommands(ctx);
}
