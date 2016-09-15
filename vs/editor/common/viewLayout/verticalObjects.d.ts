import { IEditorWhitespace, IViewWhitespaceViewportData } from 'vs/editor/common/editorCommon';
import { IPartialViewLinesViewportData } from 'vs/editor/common/viewLayout/viewLinesViewportData';
/**
 * Layouting of objects that take vertical space (by having a height) and push down other objects.
 *
 * These objects are basically either text (lines) or spaces between those lines (whitespaces).
 * This provides commodity operations for working with lines that contain whitespace that pushes lines lower (vertically).
 * This is written with no knowledge of an editor in mind.
 */
export declare class VerticalObjects {
    /**
     * Keep track of the total number of lines.
     * This is useful for doing binary searches or for doing hit-testing.
     */
    private linesCount;
    /**
     * Contains whitespace information in pixels
     */
    private whitespaces;
    constructor();
    /**
     * Set the number of lines.
     *
     * @param newLineCount New number of lines.
     */
    replaceLines(newLineCount: number): void;
    /**
     * Insert a new whitespace of a certain height after a line number.
     * The whitespace has a "sticky" characteristic.
     * Irrespective of edits above or below `afterLineNumber`, the whitespace will follow the initial line.
     *
     * @param afterLineNumber The conceptual position of this whitespace. The whitespace will follow this line as best as possible even when deleting/inserting lines above/below.
     * @param heightInPx The height of the whitespace, in pixels.
     * @return An id that can be used later to mutate or delete the whitespace
     */
    insertWhitespace(afterLineNumber: number, ordinal: number, heightInPx: number): number;
    changeWhitespace(id: number, newAfterLineNumber: number, newHeight: number): boolean;
    /**
     * Remove an existing whitespace.
     *
     * @param id The whitespace to remove
     * @return Returns true if the whitespace is found and it is removed.
     */
    removeWhitespace(id: number): boolean;
    /**
     * Notify the layouter that lines have been deleted (a continuous zone of lines).
     *
     * @param fromLineNumber The line number at which the deletion started, inclusive
     * @param toLineNumber The line number at which the deletion ended, inclusive
     */
    onModelLinesDeleted(fromLineNumber: number, toLineNumber: number): void;
    /**
     * Notify the layouter that lines have been inserted (a continuous zone of lines).
     *
     * @param fromLineNumber The line number at which the insertion started, inclusive
     * @param toLineNumber The line number at which the insertion ended, inclusive.
     */
    onModelLinesInserted(fromLineNumber: number, toLineNumber: number): void;
    /**
     * Get the sum of heights for all objects.
     *
     * @param deviceLineHeight The height, in pixels, for one rendered line.
     * @return The sum of heights for all objects.
     */
    getTotalHeight(deviceLineHeight: number): number;
    /**
     * Get the vertical offset (the sum of heights for all objects above) a certain line number.
     *
     * @param lineNumber The line number
     * @param deviceLineHeight The height, in pixels, for one rendered line.
     * @return The sum of heights for all objects above `lineNumber`.
     */
    getVerticalOffsetForLineNumber(lineNumber: number, deviceLineHeight: number): number;
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
    isAfterLines(verticalOffset: number, deviceLineHeight: number): boolean;
    /**
     * Find the first line number that is at or after vertical offset `verticalOffset`.
     * i.e. if getVerticalOffsetForLine(line) is x and getVerticalOffsetForLine(line + 1) is y, then
     * getLineNumberAtOrAfterVerticalOffset(i) = line, x <= i < y.
     *
     * @param verticalOffset The vertical offset to search at.
     * @param deviceLineHeight The height, in piexels, for one rendered line.
     * @return The line number at or after vertical offset `verticalOffset`.
     */
    getLineNumberAtOrAfterVerticalOffset(verticalOffset: number, deviceLineHeight: number): number;
    /**
     * Get the line that appears visually in the center between `verticalOffset1` and `verticalOffset2`.
     *
     * @param verticalOffset1 The beginning of the viewport
     * @param verticalOffset2 The end of the viewport.
     * @param deviceLineHeight The height, in pixels, for one rendered line.
     * @return The line number that is closest to the center between `verticalOffset1` and `verticalOffset2`.
     */
    getCenteredLineInViewport(verticalOffset1: number, verticalOffset2: number, deviceLineHeight: number): number;
    /**
     * Get all the lines and their relative vertical offsets that are positioned between `verticalOffset1` and `verticalOffset2`.
     *
     * @param verticalOffset1 The beginning of the viewport.
     * @param verticalOffset2 The end of the viewport.
     * @param deviceLineHeight The height, in pixels, for one rendered line.
     * @return A structure describing the lines positioned between `verticalOffset1` and `verticalOffset2`.
     */
    getLinesViewportData(verticalOffset1: number, verticalOffset2: number, deviceLineHeight: number): IPartialViewLinesViewportData;
    getVerticalOffsetForWhitespaceIndex(whitespaceIndex: number, deviceLineHeight: number): number;
    getWhitespaceIndexAtOrAfterVerticallOffset(verticalOffset: number, deviceLineHeight: number): number;
    /**
     * Get exactly the whitespace that is layouted at `verticalOffset`.
     *
     * @param verticalOffset The vertical offset.
     * @param deviceLineHeight The height, in pixels, for one rendered line.
     * @return Precisely the whitespace that is layouted at `verticaloffset` or null.
     */
    getWhitespaceAtVerticalOffset(verticalOffset: number, deviceLineHeight: number): IViewWhitespaceViewportData;
    /**
     * Get a list of whitespaces that are positioned between `verticalOffset1` and `verticalOffset2`.
     *
     * @param verticalOffset1 The beginning of the viewport.
     * @param verticalOffset2 The end of the viewport.
     * @param deviceLineHeight The height, in pixels, for one rendered line.
     * @return An array with all the whitespaces in the viewport. If no whitespace is in viewport, the array is empty.
     */
    getWhitespaceViewportData(verticalOffset1: number, verticalOffset2: number, deviceLineHeight: number): IViewWhitespaceViewportData[];
    getWhitespaces(deviceLineHeight: number): IEditorWhitespace[];
}
