import { IModelDecoration } from 'vs/editor/common/editorCommon';
import { IDecorationsViewportData, InlineDecoration } from 'vs/editor/common/viewModel/viewModel';
import { Range } from 'vs/editor/common/core/range';
export interface IPartialViewLinesViewportData {
    viewportTop: number;
    viewportHeight: number;
    bigNumbersDelta: number;
    visibleRangesDeltaTop: number;
    startLineNumber: number;
    endLineNumber: number;
    relativeVerticalOffset: number[];
}
export declare class ViewLinesViewportData {
    _viewLinesViewportDataBrand: void;
    viewportTop: number;
    viewportHeight: number;
    bigNumbersDelta: number;
    visibleRangesDeltaTop: number;
    /**
     * The line number at which to start rendering (inclusive).
     */
    startLineNumber: number;
    /**
     * The line number at which to end rendering (inclusive).
     */
    endLineNumber: number;
    /**
     * relativeVerticalOffset[i] is the gap that must be left between line at
     * i - 1 + `startLineNumber` and i + `startLineNumber`.
     */
    relativeVerticalOffset: number[];
    /**
     * The viewport as a range (`startLineNumber`,1) -> (`endLineNumber`,maxColumn(`endLineNumber`)).
     */
    visibleRange: Range;
    private _decorations;
    private _inlineDecorations;
    constructor(partialData: IPartialViewLinesViewportData, visibleRange: Range, decorationsData: IDecorationsViewportData);
    getDecorationsInViewport(): IModelDecoration[];
    getInlineDecorationsForLineInViewport(lineNumber: number): InlineDecoration[];
}
