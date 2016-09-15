import * as editorCommon from 'vs/editor/common/editorCommon';
import { IViewModel } from 'vs/editor/common/viewModel/viewModel';
import { ViewLinesViewportData } from 'vs/editor/common/viewLayout/viewLinesViewportData';
/**
 * Layouting of objects that take vertical space (by having a height) and push down other objects.
 *
 * These objects are basically either text (lines) or spaces between those lines (whitespaces).
 * This provides commodity operations for working with lines that contain whitespace that pushes lines lower (vertically).
 * This is a thin wrapper around VerticalObjects.VerticalObjects, with knowledge of the editor.
 */
export declare class LinesLayout {
    private configuration;
    private model;
    private verticalObjects;
    private _lineHeight;
    private _scrollBeyondLastLine;
    constructor(configuration: editorCommon.IConfiguration, model: IViewModel);
    onConfigurationChanged(e: editorCommon.IConfigurationChangedEvent): void;
    /**
     * Insert a new whitespace of a certain height after a line number.
     * The whitespace has a "sticky" characteristic.
     * Irrespective of edits above or below `afterLineNumber`, the whitespace will follow the initial line.
     *
     * @param afterLineNumber The conceptual position of this whitespace. The whitespace will follow this line as best as possible even when deleting/inserting lines above/below.
     * @param heightInPx The height of the whitespace, in pixels.
     * @return An id that can be used later to mutate or delete the whitespace
     */
    insertWhitespace(afterLineNumber: number, ordinal: number, height: number): number;
    changeWhitespace(id: number, newAfterLineNumber: number, newHeight: number): boolean;
    /**
     * Remove an existing whitespace.
     *
     * @param id The whitespace to remove
     * @return Returns true if the whitespace is found and it is removed.
     */
    removeWhitespace(id: number): boolean;
    /**
     * Event handler, call when the model associated to this view has been flushed.
     */
    onModelFlushed(): void;
    /**
     * Event handler, call when the model has had lines deleted.
     */
    onModelLinesDeleted(e: editorCommon.IViewLinesDeletedEvent): void;
    /**
     * Event handler, call when the model has had lines inserted.
     */
    onModelLinesInserted(e: editorCommon.IViewLinesInsertedEvent): void;
    /**
     * Get the vertical offset (the sum of heights for all objects above) a certain line number.
     *
     * @param lineNumber The line number
     * @return The sum of heights for all objects above `lineNumber`.
     */
    getVerticalOffsetForLineNumber(lineNumber: number): number;
    getLinesTotalHeight(): number;
    /**
     * Get the sum of heights for all objects and compute basically the `scrollHeight` for the editor content.
     *
     * Take into account the `scrollBeyondLastLine` and `reserveHorizontalScrollbarHeight` and produce a scrollHeight that is at least as large as `viewport`.height.
     *
     * @param viewport The viewport.
     * @param reserveHorizontalScrollbarHeight The height of the horizontal scrollbar.
     * @return Basically, the `scrollHeight` for the editor content.
     */
    getTotalHeight(viewport: editorCommon.Viewport, reserveHorizontalScrollbarHeight: number): number;
    isAfterLines(verticalOffset: number): boolean;
    /**
     * Find the first line number that is at or after vertical offset `verticalOffset`.
     * i.e. if getVerticalOffsetForLine(line) is x and getVerticalOffsetForLine(line + 1) is y, then
     * getLineNumberAtOrAfterVerticalOffset(i) = line, x <= i < y.
     *
     * @param verticalOffset The vertical offset to search at.
     * @return The line number at or after vertical offset `verticalOffset`.
     */
    getLineNumberAtOrAfterVerticalOffset(verticalOffset: number): number;
    /**
     * Get the height, in pixels, for line `lineNumber`.
     *
     * @param lineNumber The line number
     * @return The height, in pixels, for line `lineNumber`.
     */
    getHeightForLineNumber(lineNumber: number): number;
    /**
     * Get a list of whitespaces that are positioned inside `viewport`.
     *
     * @param viewport The viewport.
     * @return An array with all the whitespaces in the viewport. If no whitespace is in viewport, the array is empty.
     */
    getWhitespaceViewportData(visibleBox: editorCommon.Viewport): editorCommon.IViewWhitespaceViewportData[];
    getWhitespaces(): editorCommon.IEditorWhitespace[];
    /**
     * Get exactly the whitespace that is layouted at `verticalOffset`.
     *
     * @param verticalOffset The vertical offset.
     * @return Precisely the whitespace that is layouted at `verticaloffset` or null.
     */
    getWhitespaceAtVerticalOffset(verticalOffset: number): editorCommon.IViewWhitespaceViewportData;
    /**
     * Get all the lines and their relative vertical offsets that are positioned inside `viewport`.
     *
     * @param viewport The viewport.
     * @return A structure describing the lines positioned between `verticalOffset1` and `verticalOffset2`.
     */
    getLinesViewportData(visibleBox: editorCommon.Viewport): ViewLinesViewportData;
    /**
     * Get the line that appears visually in the center of `viewport`.
     *
     * @param viewport The viewport.
     * @return The line number that is closest to the center of `viewport`.
     */
    getCenteredLineInViewport(visibleBox: editorCommon.Viewport): number;
    /**
     * Returns the accumulated height of whitespaces before the given line number.
     *
     * @param lineNumber The line number
     */
    getWhitespaceAccumulatedHeightBeforeLineNumber(lineNumber: number): number;
    /**
     * Returns if there is any whitespace in the document.
     */
    hasWhitespace(): boolean;
}
