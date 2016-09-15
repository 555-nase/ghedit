import { ViewLineToken } from 'vs/editor/common/core/viewLineToken';
export declare class RenderLineInput {
    _renderLineInputBrand: void;
    lineContent: string;
    tabSize: number;
    spaceWidth: number;
    stopRenderingLineAfter: number;
    renderWhitespace: boolean;
    renderControlCharacters: boolean;
    parts: ViewLineToken[];
    constructor(lineContent: string, tabSize: number, spaceWidth: number, stopRenderingLineAfter: number, renderWhitespace: boolean, renderControlCharacters: boolean, parts: ViewLineToken[]);
}
export declare class RenderLineOutput {
    _renderLineOutputBrand: void;
    charOffsetInPart: number[];
    lastRenderedPartIndex: number;
    output: string;
    constructor(charOffsetInPart: number[], lastRenderedPartIndex: number, output: string);
}
export declare function renderLine(input: RenderLineInput): RenderLineOutput;
