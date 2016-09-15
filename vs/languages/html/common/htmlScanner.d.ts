import EditorCommon = require('vs/editor/common/editorCommon');
export interface IHTMLScanner {
    getTokenType(): string;
    isOpenBrace(): boolean;
    isAtTokenStart(): boolean;
    isAtTokenEnd(): boolean;
    getTokenContent(): string;
    scanBack(): boolean;
    scanForward(): boolean;
    getTokenPosition(): EditorCommon.IPosition;
    getTokenRange(): EditorCommon.IRange;
    getModel(): EditorCommon.ITokenizedModel;
}
export declare function getScanner(model: EditorCommon.ITokenizedModel, position: EditorCommon.IPosition): IHTMLScanner;
