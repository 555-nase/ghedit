import { ICursorMoveHelperModel, IMoveResult, IColumnSelectResult } from 'vs/editor/common/controller/cursorMoveHelper';
import { Position } from 'vs/editor/common/core/position';
import { Range } from 'vs/editor/common/core/range';
import { Selection } from 'vs/editor/common/core/selection';
import * as editorCommon from 'vs/editor/common/editorCommon';
export interface IPostOperationRunnable {
    (ctx: IOneCursorOperationContext): void;
}
export interface IOneCursorOperationContext {
    cursorPositionChangeReason: editorCommon.CursorChangeReason;
    shouldReveal: boolean;
    shouldRevealVerticalInCenter: boolean;
    shouldRevealHorizontal: boolean;
    shouldPushStackElementBefore: boolean;
    shouldPushStackElementAfter: boolean;
    executeCommand: editorCommon.ICommand;
    isAutoWhitespaceCommand: boolean;
    postOperationRunnable: IPostOperationRunnable;
    requestScrollDeltaLines: number;
}
export interface IModeConfiguration {
    electricChars: {
        [key: string]: boolean;
    };
    autoClosingPairsOpen: {
        [key: string]: string;
    };
    autoClosingPairsClose: {
        [key: string]: string;
    };
    surroundingPairs: {
        [key: string]: string;
    };
}
export interface CursorMoveArguments extends editorCommon.CursorMoveArguments {
    pageSize?: number;
    isPaged?: boolean;
}
export interface IViewModelHelper {
    viewModel: ICursorMoveHelperModel;
    getCurrentVisibleViewRangeInViewPort(): Range;
    getCurrentVisibleModelRangeInViewPort(): Range;
    convertModelPositionToViewPosition(lineNumber: number, column: number): Position;
    convertModelRangeToViewRange(modelRange: Range): Range;
    convertViewToModelPosition(lineNumber: number, column: number): Position;
    convertViewSelectionToModelSelection(viewSelection: Selection): Selection;
    convertViewRangeToModelRange(viewRange: Range): Range;
    validateViewPosition(viewLineNumber: number, viewColumn: number, modelPosition: Position): Position;
    validateViewRange(viewStartLineNumber: number, viewStartColumn: number, viewEndLineNumber: number, viewEndColumn: number, modelRange: Range): Range;
}
export interface IOneCursorState {
    selectionStart: Range;
    viewSelectionStart: Range;
    position: Position;
    viewPosition: Position;
    leftoverVisibleColumns: number;
    selectionStartLeftoverVisibleColumns: number;
}
export interface IFindWordResult {
    /**
     * The index where the word starts.
     */
    start: number;
    /**
     * The index where the word ends.
     */
    end: number;
    /**
     * The word type.
     */
    wordType: WordType;
}
export declare enum WordType {
    None = 0,
    Regular = 1,
    Separator = 2,
}
export declare enum WordNavigationType {
    WordStart = 0,
    WordEnd = 1,
}
export declare class OneCursor {
    private editorId;
    model: editorCommon.IModel;
    configuration: editorCommon.IConfiguration;
    modeConfiguration: IModeConfiguration;
    private helper;
    private viewModelHelper;
    private selectionStart;
    private viewSelectionStart;
    private selectionStartLeftoverVisibleColumns;
    private position;
    private viewPosition;
    private leftoverVisibleColumns;
    private bracketDecorations;
    private _cachedSelection;
    private _cachedViewSelection;
    private _selStartMarker;
    private _selEndMarker;
    private _selDirection;
    constructor(editorId: number, model: editorCommon.IModel, configuration: editorCommon.IConfiguration, modeConfiguration: IModeConfiguration, viewModelHelper: IViewModelHelper);
    private _set(selectionStart, selectionStartLeftoverVisibleColumns, position, leftoverVisibleColumns, viewSelectionStart, viewPosition);
    private _ensureMarker(markerId, lineNumber, column, stickToPreviousCharacter);
    saveState(): IOneCursorState;
    restoreState(state: IOneCursorState): void;
    updateModeConfiguration(modeConfiguration: IModeConfiguration): void;
    duplicate(): OneCursor;
    dispose(): void;
    adjustBracketDecorations(): void;
    private static computeSelection(selectionStart, position);
    setSelection(desiredSelection: editorCommon.ISelection): void;
    setViewSelection(desiredViewSel: editorCommon.ISelection): void;
    setSelectionStart(rng: Range, viewRng: Range): void;
    collapseSelection(): void;
    moveModelPosition(inSelectionMode: boolean, lineNumber: number, column: number, leftoverVisibleColumns: number, ensureInEditableRange: boolean): void;
    moveViewPosition(inSelectionMode: boolean, viewLineNumber: number, viewColumn: number, leftoverVisibleColumns: number, ensureInEditableRange: boolean): void;
    private _move(inSelectionMode, lineNumber, column, viewLineNumber, viewColumn, leftoverVisibleColumns, ensureInEditableRange);
    private _actualMove(inSelectionMode, position, viewPosition, leftoverVisibleColumns);
    private _recoverSelectionFromMarkers();
    recoverSelectionFromMarkers(ctx: IOneCursorOperationContext): boolean;
    getPageSize(): number;
    getSelectionStart(): Range;
    getPosition(): Position;
    getSelection(): Selection;
    getViewPosition(): Position;
    getViewSelection(): Selection;
    getValidViewPosition(): Position;
    hasSelection(): boolean;
    getBracketsDecorations(): string[];
    getLeftoverVisibleColumns(): number;
    getSelectionStartLeftoverVisibleColumns(): number;
    setSelectionStartLeftoverVisibleColumns(value: number): void;
    validatePosition(position: editorCommon.IPosition): Position;
    validateViewPosition(viewLineNumber: number, viewColumn: number, modelPosition: Position): Position;
    convertViewToModelPosition(lineNumber: number, column: number): editorCommon.IPosition;
    convertViewSelectionToModelSelection(viewSelection: Selection): Selection;
    convertModelPositionToViewPosition(lineNumber: number, column: number): editorCommon.IPosition;
    getLineFromViewPortTop(lineFromTop?: number): number;
    getCenterLineInViewPort(): number;
    getLineFromViewPortBottom(lineFromBottom?: number): number;
    getLineContent(lineNumber: number): string;
    findPreviousWordOnLine(position: Position): IFindWordResult;
    findNextWordOnLine(position: Position): IFindWordResult;
    getLeftOfPosition(lineNumber: number, column: number): editorCommon.IPosition;
    getRightOfPosition(lineNumber: number, column: number): editorCommon.IPosition;
    getPositionUp(lineNumber: number, column: number, leftoverVisibleColumns: number, count: number, allowMoveOnFirstLine: boolean): IMoveResult;
    getPositionDown(lineNumber: number, column: number, leftoverVisibleColumns: number, count: number, allowMoveOnLastLine: boolean): IMoveResult;
    getColumnAtEndOfLine(lineNumber: number, column: number): number;
    getVisibleColumnFromColumn(lineNumber: number, column: number): number;
    getColumnFromVisibleColumn(lineNumber: number, column: number): number;
    getViewVisibleColumnFromColumn(viewLineNumber: number, viewColumn: number): number;
    getViewLineCount(): number;
    getViewLineMaxColumn(lineNumber: number): number;
    getViewLineMinColumn(lineNumber: number): number;
    getViewLineCenterColumn(lineNumber: number): number;
    getViewLineSize(lineNumber: number): number;
    getViewHalfLineSize(lineNumber: number): number;
    getViewLineFirstNonWhiteSpaceColumn(lineNumber: number): number;
    getViewLineLastNonWhiteSpaceColumn(lineNumber: number): number;
    getLeftOfViewPosition(lineNumber: number, column: number): editorCommon.IPosition;
    getRightOfViewPosition(lineNumber: number, column: number): editorCommon.IPosition;
    getViewPositionUp(lineNumber: number, column: number, leftoverVisibleColumns: number, count: number, allowMoveOnFirstLine: boolean): IMoveResult;
    getViewPositionDown(lineNumber: number, column: number, leftoverVisibleColumns: number, count: number, allowMoveOnLastLine: boolean): IMoveResult;
    getColumnAtBeginningOfViewLine(lineNumber: number, column: number): number;
    getColumnAtEndOfViewLine(lineNumber: number, column: number): number;
    columnSelect(fromViewLineNumber: number, fromViewVisibleColumn: number, toViewLineNumber: number, toViewVisibleColumn: number): IColumnSelectResult;
}
export declare class OneCursorOp {
    static jumpToBracket(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    static moveTo(cursor: OneCursor, inSelectionMode: boolean, position: editorCommon.IPosition, viewPosition: editorCommon.IPosition, eventSource: string, ctx: IOneCursorOperationContext): boolean;
    static move(cursor: OneCursor, moveParams: CursorMoveArguments, eventSource: string, ctx: IOneCursorOperationContext): boolean;
    private static _columnSelectOp(cursor, toViewLineNumber, toViewVisualColumn);
    static columnSelectMouse(cursor: OneCursor, position: editorCommon.IPosition, viewPosition: editorCommon.IPosition, toViewVisualColumn: number): IColumnSelectResult;
    static columnSelectLeft(cursor: OneCursor, toViewLineNumber: number, toViewVisualColumn: number): IColumnSelectResult;
    static columnSelectRight(cursor: OneCursor, toViewLineNumber: number, toViewVisualColumn: number): IColumnSelectResult;
    static columnSelectUp(isPaged: boolean, cursor: OneCursor, toViewLineNumber: number, toViewVisualColumn: number): IColumnSelectResult;
    static columnSelectDown(isPaged: boolean, cursor: OneCursor, toViewLineNumber: number, toViewVisualColumn: number): IColumnSelectResult;
    static moveLeft(cursor: OneCursor, inSelectionMode: boolean, noOfColumns: number, ctx: IOneCursorOperationContext): boolean;
    static moveWordLeft(cursor: OneCursor, inSelectionMode: boolean, wordNavigationType: WordNavigationType, ctx: IOneCursorOperationContext): boolean;
    static moveRight(cursor: OneCursor, inSelectionMode: boolean, noOfColumns: number, ctx: IOneCursorOperationContext): boolean;
    static moveWordRight(cursor: OneCursor, inSelectionMode: boolean, wordNavigationType: WordNavigationType, ctx: IOneCursorOperationContext): boolean;
    static moveDown(cursor: OneCursor, inSelectionMode: boolean, noOfLines: number, ctx: IOneCursorOperationContext): boolean;
    static translateDown(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    static moveUp(cursor: OneCursor, inSelectionMode: boolean, noOfLines: number, ctx: IOneCursorOperationContext): boolean;
    static translateUp(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    static moveToBeginningOfLine(cursor: OneCursor, inSelectionMode: boolean, ctx: IOneCursorOperationContext): boolean;
    static moveToEndOfLine(cursor: OneCursor, inSelectionMode: boolean, ctx: IOneCursorOperationContext): boolean;
    static expandLineSelection(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    static moveToBeginningOfBuffer(cursor: OneCursor, inSelectionMode: boolean, ctx: IOneCursorOperationContext): boolean;
    static moveToEndOfBuffer(cursor: OneCursor, inSelectionMode: boolean, ctx: IOneCursorOperationContext): boolean;
    static selectAll(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    static line(cursor: OneCursor, inSelectionMode: boolean, _position: editorCommon.IPosition, _viewPosition: editorCommon.IPosition, ctx: IOneCursorOperationContext): boolean;
    static word(cursor: OneCursor, inSelectionMode: boolean, position: editorCommon.IPosition, ctx: IOneCursorOperationContext): boolean;
    static cancelSelection(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    private static _typeInterceptorEnter(cursor, ch, ctx);
    static lineInsertBefore(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    static lineInsertAfter(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    static lineBreakInsert(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    private static _enter(cursor, keepPosition, ctx, position?, range?);
    private static _typeInterceptorAutoClosingCloseChar(cursor, ch, ctx);
    private static _typeInterceptorAutoClosingOpenChar(cursor, ch, ctx);
    private static _typeInterceptorSurroundSelection(cursor, ch, ctx);
    private static _typeInterceptorElectricChar(cursor, ch, ctx);
    private static _typeInterceptorElectricCharRunnable(cursor, ctx);
    static actualType(cursor: OneCursor, text: string, keepPosition: boolean, ctx: IOneCursorOperationContext, range?: Range): boolean;
    static type(cursor: OneCursor, ch: string, ctx: IOneCursorOperationContext): boolean;
    static replacePreviousChar(cursor: OneCursor, txt: string, replaceCharCnt: number, ctx: IOneCursorOperationContext): boolean;
    private static _goodIndentForLine(cursor, lineNumber);
    private static _replaceJumpToNextIndent(cursor, selection);
    static tab(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    static indent(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    static outdent(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    static paste(cursor: OneCursor, text: string, pasteOnNewLine: boolean, ctx: IOneCursorOperationContext): boolean;
    private static _autoClosingPairDelete(cursor, ctx);
    static deleteLeft(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    private static deleteWordLeftWhitespace(cursor, ctx);
    static deleteWordLeft(cursor: OneCursor, whitespaceHeuristics: boolean, wordNavigationType: WordNavigationType, ctx: IOneCursorOperationContext): boolean;
    static deleteRight(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    private static _findFirstNonWhitespaceChar(str, startIndex);
    private static deleteWordRightWhitespace(cursor, ctx);
    static deleteWordRight(cursor: OneCursor, whitespaceHeuristics: boolean, wordNavigationType: WordNavigationType, ctx: IOneCursorOperationContext): boolean;
    static deleteAllLeft(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    static deleteAllRight(cursor: OneCursor, ctx: IOneCursorOperationContext): boolean;
    static cut(cursor: OneCursor, enableEmptySelectionClipboard: boolean, ctx: IOneCursorOperationContext): boolean;
}
