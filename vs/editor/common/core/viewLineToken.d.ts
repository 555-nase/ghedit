/**
 * A token on a line.
 */
export declare class ViewLineToken {
    _viewLineTokenBrand: void;
    startIndex: number;
    type: string;
    constructor(startIndex: number, type: string);
    equals(other: ViewLineToken): boolean;
    static findIndexInSegmentsArray(arr: ViewLineToken[], desiredIndex: number): number;
    static equalsArray(a: ViewLineToken[], b: ViewLineToken[]): boolean;
}
export declare class ViewLineTokens {
    _viewLineTokensBrand: void;
    private _lineTokens;
    private _fauxIndentLength;
    private _textLength;
    constructor(lineTokens: ViewLineToken[], fauxIndentLength: number, textLength: number);
    getTokens(): ViewLineToken[];
    getFauxIndentLength(): number;
    getTextLength(): number;
    equals(other: ViewLineTokens): boolean;
    findIndexOfOffset(offset: number): number;
}
