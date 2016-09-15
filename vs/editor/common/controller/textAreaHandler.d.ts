import Event from 'vs/base/common/event';
import { Disposable } from 'vs/base/common/lifecycle';
import { ICompositionEvent, IKeyboardEventWrapper, ISimpleModel, ITextAreaWrapper, ITypeData, TextAreaStrategy } from 'vs/editor/common/controller/textAreaState';
import { Position } from 'vs/editor/common/core/position';
import { Range } from 'vs/editor/common/core/range';
export interface IBrowser {
    isIPad: boolean;
    isChrome: boolean;
    isIE11orEarlier: boolean;
    isFirefox: boolean;
    enableEmptySelectionClipboard: boolean;
}
export interface IPasteData {
    text: string;
    pasteOnNewLine: boolean;
}
export interface ICompositionStartData {
    showAtLineNumber: number;
    showAtColumn: number;
}
export declare class TextAreaHandler extends Disposable {
    private _onKeyDown;
    onKeyDown: Event<IKeyboardEventWrapper>;
    private _onKeyUp;
    onKeyUp: Event<IKeyboardEventWrapper>;
    private _onCut;
    onCut: Event<void>;
    private _onPaste;
    onPaste: Event<IPasteData>;
    private _onType;
    onType: Event<ITypeData>;
    private _onCompositionStart;
    onCompositionStart: Event<ICompositionStartData>;
    private _onCompositionUpdate;
    onCompositionUpdate: Event<ICompositionEvent>;
    private _onCompositionEnd;
    onCompositionEnd: Event<ICompositionEvent>;
    private Browser;
    private textArea;
    private model;
    private flushAnyAccumulatedEvents;
    private selection;
    private selections;
    private hasFocus;
    private asyncTriggerCut;
    private lastCompositionEndTime;
    private cursorPosition;
    private textAreaState;
    private textareaIsShownAtCursor;
    private lastCopiedValue;
    private lastCopiedValueIsFromEmptySelection;
    private _nextCommand;
    constructor(Browser: IBrowser, strategy: TextAreaStrategy, textArea: ITextAreaWrapper, model: ISimpleModel, flushAnyAccumulatedEvents: () => void);
    dispose(): void;
    setStrategy(strategy: TextAreaStrategy): void;
    setHasFocus(isFocused: boolean): void;
    setCursorSelections(primary: Range, secondary: Range[]): void;
    setCursorPosition(primary: Position): void;
    private setTextAreaState(reason, textAreaState);
    private _onKeyDownHandler(e);
    private _onKeyPressHandler(e);
    private executePaste(txt);
    writePlaceholderAndSelectTextAreaSync(): void;
    private _writePlaceholderAndSelectTextArea(reason);
    private _ensureClipboardGetsEditorSelection(e);
    private _getPlainTextToCopy();
}
