import { EditorLayoutInfo } from 'vs/editor/common/editorCommon';
export interface IEditorLayoutProviderOpts {
    outerWidth: number;
    outerHeight: number;
    showGlyphMargin: boolean;
    lineHeight: number;
    showLineNumbers: boolean;
    lineNumbersMinChars: number;
    lineDecorationsWidth: number;
    maxDigitWidth: number;
    maxLineNumber: number;
    verticalScrollbarWidth: number;
    verticalScrollbarHasArrows: boolean;
    scrollbarArrowSize: number;
    horizontalScrollbarHeight: number;
}
export declare class EditorLayoutProvider {
    static compute(_opts: IEditorLayoutProviderOpts): EditorLayoutInfo;
    private static digitCount(n);
}
