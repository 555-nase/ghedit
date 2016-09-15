import { ViewLineToken, ViewLineTokens } from 'vs/editor/common/core/viewLineToken';
import { InlineDecoration } from 'vs/editor/common/viewModel/viewModel';
export declare function createLineParts(lineNumber: number, minLineColumn: number, lineContent: string, tabSize: number, lineTokens: ViewLineTokens, rawLineDecorations: InlineDecoration[], renderWhitespace: boolean): LineParts;
export declare function getColumnOfLinePartOffset(stopRenderingLineAfter: number, lineParts: ViewLineToken[], lineMaxColumn: number, charOffsetInPart: number[], partIndex: number, partLength: number, offset: number): number;
export declare class LineParts {
    _linePartsBrand: void;
    private _parts;
    constructor(parts: ViewLineToken[]);
    getParts(): ViewLineToken[];
    equals(other: LineParts): boolean;
    findIndexOfOffset(offset: number): number;
}
export declare class DecorationSegment {
    startOffset: number;
    endOffset: number;
    className: string;
    constructor(startOffset: number, endOffset: number, className: string);
}
export declare class LineDecorationsNormalizer {
    /**
     * A number that is guaranteed to be larger than the maximum line column
     */
    private static MAX_LINE_LENGTH;
    /**
     * Normalize line decorations. Overlapping decorations will generate multiple segments
     */
    static normalize(lineNumber: number, minLineColumn: number, lineDecorations: InlineDecoration[]): DecorationSegment[];
}
