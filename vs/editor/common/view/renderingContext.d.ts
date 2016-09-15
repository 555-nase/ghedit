import { IModelDecoration, IRange, IPosition } from 'vs/editor/common/editorCommon';
import { ViewLinesViewportData } from 'vs/editor/common/viewLayout/viewLinesViewportData';
import { Range } from 'vs/editor/common/core/range';
export interface IRestrictedRenderingContext {
    linesViewportData: ViewLinesViewportData;
    scrollWidth: number;
    scrollHeight: number;
    visibleRange: Range;
    bigNumbersDelta: number;
    viewportTop: number;
    viewportWidth: number;
    viewportHeight: number;
    viewportLeft: number;
    getScrolledTopFromAbsoluteTop(absoluteTop: number): number;
    getViewportVerticalOffsetForLineNumber(lineNumber: number): number;
    lineIsVisible(lineNumber: number): boolean;
    getDecorationsInViewport(): IModelDecoration[];
}
export interface IRenderingContext extends IRestrictedRenderingContext {
    linesVisibleRangesForRange(range: IRange, includeNewLines: boolean): LineVisibleRanges[];
    visibleRangeForPosition(position: IPosition): VisibleRange;
}
export declare class LineVisibleRanges {
    _lineVisibleRangesBrand: void;
    lineNumber: number;
    ranges: HorizontalRange[];
    constructor(lineNumber: number, ranges: HorizontalRange[]);
}
export declare class VisibleRange {
    _visibleRangeBrand: void;
    top: number;
    left: number;
    width: number;
    constructor(top: number, left: number, width: number);
}
export declare class HorizontalRange {
    _horizontalRangeBrand: void;
    left: number;
    width: number;
    constructor(left: number, width: number);
}
