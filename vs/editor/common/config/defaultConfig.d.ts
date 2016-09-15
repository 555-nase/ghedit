import { IEditorOptions } from 'vs/editor/common/editorCommon';
export interface IConfiguration {
    editor: IEditorOptions;
}
export declare const DEFAULT_INDENTATION: {
    tabSize: number;
    insertSpaces: boolean;
    detectIndentation: boolean;
};
export declare const DEFAULT_TRIM_AUTO_WHITESPACE: boolean;
/**
 * Determined from empirical observations.
 */
export declare const GOLDEN_LINE_HEIGHT_RATIO: number;
export declare var DefaultConfig: IConfiguration;
