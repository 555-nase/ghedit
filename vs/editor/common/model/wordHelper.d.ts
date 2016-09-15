import { IWordAtPosition } from 'vs/editor/common/editorCommon';
export declare const USUAL_WORD_SEPARATORS: string;
/**
 * Create a word definition regular expression based on default word separators.
 * Optionally provide allowed separators that should be included in words.
 *
 * The default would look like this:
 * /(-?\d*\.\d\w*)|([^\`\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g
 */
export declare function createWordRegExp(allowInWords?: string): RegExp;
export declare const DEFAULT_WORD_REGEXP: RegExp;
export declare function ensureValidWordDefinition(wordDefinition?: RegExp): RegExp;
export declare function getWordAtText(column: number, wordDefinition: RegExp, text: string, textOffset: number): IWordAtPosition;
