import Event from 'vs/base/common/event';
import { Range } from 'vs/editor/common/core/range';
import { EndOfLinePreference, IRange } from 'vs/editor/common/editorCommon';
import { Position } from 'vs/editor/common/core/position';
export interface IClipboardEvent {
    canUseTextData(): boolean;
    setTextData(text: string): void;
    getTextData(): string;
}
export interface ICompositionEvent {
    data: string;
    locale: string;
}
export interface IKeyboardEventWrapper {
    _actual: any;
    equals(keybinding: number): boolean;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
}
export interface ITextAreaWrapper {
    onKeyDown: Event<IKeyboardEventWrapper>;
    onKeyUp: Event<IKeyboardEventWrapper>;
    onKeyPress: Event<IKeyboardEventWrapper>;
    onCompositionStart: Event<ICompositionEvent>;
    onCompositionUpdate: Event<ICompositionEvent>;
    onCompositionEnd: Event<ICompositionEvent>;
    onInput: Event<void>;
    onCut: Event<IClipboardEvent>;
    onCopy: Event<IClipboardEvent>;
    onPaste: Event<IClipboardEvent>;
    getValue(): string;
    setValue(reason: string, value: string): void;
    getSelectionStart(): number;
    getSelectionEnd(): number;
    setSelectionRange(selectionStart: number, selectionEnd: number): void;
    isInOverwriteMode(): boolean;
}
export interface ISimpleModel {
    getLineMaxColumn(lineNumber: number): number;
    getEOL(): string;
    getValueInRange(range: IRange, eol: EndOfLinePreference): string;
    getModelLineContent(lineNumber: number): string;
    getLineCount(): number;
    convertViewPositionToModelPosition(viewLineNumber: number, viewColumn: number): Position;
}
export interface ITypeData {
    text: string;
    replaceCharCnt: number;
}
export declare enum TextAreaStrategy {
    IENarrator = 0,
    NVDA = 1,
}
export declare function createTextAreaState(strategy: TextAreaStrategy): TextAreaState;
export declare abstract class TextAreaState {
    protected previousState: TextAreaState;
    protected value: string;
    protected selectionStart: number;
    protected selectionEnd: number;
    protected isInOverwriteMode: boolean;
    constructor(previousState: TextAreaState, value: string, selectionStart: number, selectionEnd: number, isInOverwriteMode: boolean);
    protected abstract shallowClone(): TextAreaState;
    abstract toEmpty(): TextAreaState;
    abstract toString(): string;
    abstract toStrategy(strategy: TextAreaStrategy): TextAreaState;
    abstract equals(other: TextAreaState): boolean;
    abstract fromTextArea(textArea: ITextAreaWrapper): TextAreaState;
    abstract fromEditorSelection(model: ISimpleModel, selection: Range): any;
    abstract fromText(text: string): TextAreaState;
    updateComposition(): ITypeData;
    abstract resetSelection(): TextAreaState;
    getSelectionStart(): number;
    getValue(): string;
    applyToTextArea(reason: string, textArea: ITextAreaWrapper, select: boolean): void;
    deduceInput(): ITypeData;
}
export declare class IENarratorTextAreaState extends TextAreaState {
    static EMPTY: IENarratorTextAreaState;
    private selectionToken;
    constructor(previousState: TextAreaState, value: string, selectionStart: number, selectionEnd: number, isInOverwriteMode: boolean, selectionToken: number);
    protected shallowClone(): TextAreaState;
    toEmpty(): TextAreaState;
    toString(): string;
    toStrategy(strategy: TextAreaStrategy): TextAreaState;
    equals(other: TextAreaState): boolean;
    fromTextArea(textArea: ITextAreaWrapper): TextAreaState;
    fromEditorSelection(model: ISimpleModel, selection: Range): TextAreaState;
    fromText(text: string): TextAreaState;
    resetSelection(): TextAreaState;
}
export declare class NVDAPagedTextAreaState extends TextAreaState {
    static EMPTY: NVDAPagedTextAreaState;
    private static _LINES_PER_PAGE;
    constructor(previousState: TextAreaState, value: string, selectionStart: number, selectionEnd: number, isInOverwriteMode: boolean);
    protected shallowClone(): TextAreaState;
    toEmpty(): TextAreaState;
    toString(): string;
    toStrategy(strategy: TextAreaStrategy): TextAreaState;
    equals(other: TextAreaState): boolean;
    fromTextArea(textArea: ITextAreaWrapper): TextAreaState;
    private static _getPageOfLine(lineNumber);
    private static _getRangeForPage(page);
    fromEditorSelection(model: ISimpleModel, selection: Range): TextAreaState;
    fromText(text: string): TextAreaState;
    resetSelection(): TextAreaState;
}
export declare class NVDAFullTextAreaState extends TextAreaState {
    static EMPTY: NVDAFullTextAreaState;
    constructor(previousState: TextAreaState, value: string, selectionStart: number, selectionEnd: number, isInOverwriteMode: boolean);
    protected shallowClone(): TextAreaState;
    toEmpty(): TextAreaState;
    toString(): string;
    toStrategy(strategy: TextAreaStrategy): TextAreaState;
    equals(other: TextAreaState): boolean;
    fromTextArea(textArea: ITextAreaWrapper): TextAreaState;
    fromEditorSelection(model: ISimpleModel, selection: Range): TextAreaState;
    fromText(text: string): TextAreaState;
    resetSelection(): TextAreaState;
}
