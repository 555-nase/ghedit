import { IPosition } from 'vs/editor/common/editorCommon';
/**
 * A position in the editor.
 */
export declare class Position {
    /**
     * line number (starts at 1)
     */
    lineNumber: number;
    /**
     * column (the first character in a line is between column 1 and column 2)
     */
    column: number;
    constructor(lineNumber: number, column: number);
    /**
     * Test if this position equals other position
     */
    equals(other: IPosition): boolean;
    /**
     * Test if position `a` equals position `b`
     */
    static equals(a: IPosition, b: IPosition): boolean;
    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be false.
     */
    isBefore(other: IPosition): boolean;
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be false.
     */
    static isBefore(a: IPosition, b: IPosition): boolean;
    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be true.
     */
    isBeforeOrEqual(other: IPosition): boolean;
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be true.
     */
    static isBeforeOrEqual(a: IPosition, b: IPosition): boolean;
    /**
     * Clone this position.
     */
    clone(): Position;
    /**
     * Convert to a human-readable representation.
     */
    toString(): string;
    /**
     * Create a `Position` from an `IPosition`.
     */
    static lift(pos: IPosition): Position;
    /**
     * Test if `obj` is an `IPosition`.
     */
    static isIPosition(obj: any): obj is IPosition;
}
