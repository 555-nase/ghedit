import { IPosition } from 'vs/editor/common/editorCommon';
import { Selection } from 'vs/editor/common/core/selection';
export interface IMoveResult {
    lineNumber: number;
    column: number;
    leftoverVisibleColumns: number;
}
export interface IViewColumnSelectResult {
    viewSelections: Selection[];
    reversed: boolean;
}
export interface IColumnSelectResult extends IViewColumnSelectResult {
    selections: Selection[];
    toLineNumber: number;
    toVisualColumn: number;
}
export interface ICursorMoveHelperModel {
    getLineCount(): number;
    getLineFirstNonWhitespaceColumn(lineNumber: number): number;
    getLineMinColumn(lineNumber: number): number;
    getLineMaxColumn(lineNumber: number): number;
    getLineLastNonWhitespaceColumn(lineNumber: number): number;
    getLineContent(lineNumber: number): string;
}
/**
 * Internal indentation options (computed) for the editor.
 */
export interface IInternalIndentationOptions {
    /**
     * Tab size in spaces. This is used for rendering and for editing.
     */
    tabSize: number;
    /**
     * Insert spaces instead of tabs when indenting or when auto-indenting.
     */
    insertSpaces: boolean;
}
export interface IConfiguration {
    getIndentationOptions(): IInternalIndentationOptions;
}
export declare class CursorMoveHelper {
    private configuration;
    constructor(configuration: IConfiguration);
    getLeftOfPosition(model: ICursorMoveHelperModel, lineNumber: number, column: number): IPosition;
    getRightOfPosition(model: ICursorMoveHelperModel, lineNumber: number, column: number): IPosition;
    getPositionUp(model: ICursorMoveHelperModel, lineNumber: number, column: number, leftoverVisibleColumns: number, count: number, allowMoveOnFirstLine: boolean): IMoveResult;
    getPositionDown(model: ICursorMoveHelperModel, lineNumber: number, column: number, leftoverVisibleColumns: number, count: number, allowMoveOnLastLine: boolean): IMoveResult;
    columnSelect(model: ICursorMoveHelperModel, fromLineNumber: number, fromVisibleColumn: number, toLineNumber: number, toVisibleColumn: number): IViewColumnSelectResult;
    getColumnAtBeginningOfLine(model: ICursorMoveHelperModel, lineNumber: number, column: number): number;
    getColumnAtEndOfLine(model: ICursorMoveHelperModel, lineNumber: number, column: number): number;
    visibleColumnFromColumn(model: ICursorMoveHelperModel, lineNumber: number, column: number): number;
    static visibleColumnFromColumn(model: ICursorMoveHelperModel, lineNumber: number, column: number, tabSize: number): number;
    static visibleColumnFromColumn2(line: string, column: number, tabSize: number): number;
    columnFromVisibleColumn(model: ICursorMoveHelperModel, lineNumber: number, visibleColumn: number): number;
    /**
     * ATTENTION: This works with 0-based columns (as oposed to the regular 1-based columns)
     */
    static nextTabColumn(column: number, tabSize: number): number;
    /**
     * ATTENTION: This works with 0-based columns (as oposed to the regular 1-based columns)
     */
    static prevTabColumn(column: number, tabSize: number): number;
}
