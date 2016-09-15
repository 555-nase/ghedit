import { Position } from 'vs/editor/common/core/position';
import { IPosition, IRange } from 'vs/editor/common/editorCommon';
/**
 * A range in the editor. (startLineNumber,startColumn) is <= (endLineNumber,endColumn)
 */
export declare class Range {
    /**
     * Line number on which the range starts (starts at 1).
     */
    startLineNumber: number;
    /**
     * Column on which the range starts in line `startLineNumber` (starts at 1).
     */
    startColumn: number;
    /**
     * Line number on which the range ends.
     */
    endLineNumber: number;
    /**
     * Column on which the range ends in line `endLineNumber`.
     */
    endColumn: number;
    constructor(startLineNumber: number, startColumn: number, endLineNumber: number, endColumn: number);
    /**
     * Test if this range is empty.
     */
    isEmpty(): boolean;
    /**
     * Test if `range` is empty.
     */
    static isEmpty(range: IRange): boolean;
    /**
     * Test if position is in this range. If the position is at the edges, will return true.
     */
    containsPosition(position: IPosition): boolean;
    /**
     * Test if `position` is in `range`. If the position is at the edges, will return true.
     */
    static containsPosition(range: IRange, position: IPosition): boolean;
    /**
     * Test if range is in this range. If the range is equal to this range, will return true.
     */
    containsRange(range: IRange): boolean;
    /**
     * Test if `otherRange` is in `range`. If the ranges are equal, will return true.
     */
    static containsRange(range: IRange, otherRange: IRange): boolean;
    /**
     * A reunion of the two ranges.
     * The smallest position will be used as the start point, and the largest one as the end point.
     */
    plusRange(range: IRange): Range;
    /**
     * A reunion of the two ranges.
     * The smallest position will be used as the start point, and the largest one as the end point.
     */
    static plusRange(a: IRange, b: IRange): Range;
    /**
     * A intersection of the two ranges.
     */
    intersectRanges(range: IRange): Range;
    /**
     * A intersection of the two ranges.
     */
    static intersectRanges(a: IRange, b: IRange): Range;
    /**
     * Test if this range equals other.
     */
    equalsRange(other: IRange): boolean;
    /**
     * Test if range `a` equals `b`.
     */
    static equalsRange(a: IRange, b: IRange): boolean;
    /**
     * Return the end position (which will be after or equal to the start position)
     */
    getEndPosition(): Position;
    /**
     * Return the start position (which will be before or equal to the end position)
     */
    getStartPosition(): Position;
    /**
     * Clone this range.
     */
    cloneRange(): Range;
    /**
     * Transform to a user presentable string representation.
     */
    toString(): string;
    /**
     * Create a new range using this range's start position, and using endLineNumber and endColumn as the end position.
     */
    setEndPosition(endLineNumber: number, endColumn: number): Range;
    /**
     * Create a new range using this range's end position, and using startLineNumber and startColumn as the start position.
     */
    setStartPosition(startLineNumber: number, startColumn: number): Range;
    /**
     * Create a new empty range using this range's start position.
     */
    collapseToStart(): Range;
    /**
     * Create a new empty range using this range's start position.
     */
    static collapseToStart(range: IRange): Range;
    /**
     * Create a `Range` from an `IRange`.
     */
    static lift(range: IRange): Range;
    /**
     * Test if `obj` is an `IRange`.
     */
    static isIRange(obj: any): obj is IRange;
    /**
     * Test if the two ranges are touching in any way.
     */
    static areIntersectingOrTouching(a: IRange, b: IRange): boolean;
    /**
     * A function that compares ranges, useful for sorting ranges
     * It will first compare ranges on the startPosition and then on the endPosition
     */
    static compareRangesUsingStarts(a: IRange, b: IRange): number;
    /**
     * A function that compares ranges, useful for sorting ranges
     * It will first compare ranges on the endPosition and then on the startPosition
     */
    static compareRangesUsingEnds(a: IRange, b: IRange): number;
    /**
     * Test if the range spans multiple lines.
     */
    static spansMultipleLines(range: IRange): boolean;
}
