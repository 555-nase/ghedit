import { Widget } from 'vs/base/browser/ui/widget';
import { IExpression } from 'vs/base/common/glob';
import { IContextViewProvider } from 'vs/base/browser/ui/contextview/contextview';
import { IInputValidator } from 'vs/base/browser/ui/inputbox/inputBox';
import CommonEvent from 'vs/base/common/event';
export interface IOptions {
    placeholder?: string;
    width?: number;
    validation?: IInputValidator;
    ariaLabel?: string;
}
export declare class PatternInputWidget extends Widget {
    private contextViewProvider;
    static OPTION_CHANGE: string;
    private onOptionChange;
    private width;
    private placeholder;
    private ariaLabel;
    private toDispose;
    private pattern;
    private domNode;
    private inputNode;
    private inputBox;
    private _onSubmit;
    onSubmit: CommonEvent<boolean>;
    constructor(parent: HTMLElement, contextViewProvider: IContextViewProvider, options?: IOptions);
    dispose(): void;
    on(eventType: string, handler: (event: Event) => void): PatternInputWidget;
    setWidth(newWidth: number): void;
    getValue(): string;
    setValue(value: string): void;
    getGlob(): IExpression;
    select(): void;
    focus(): void;
    isGlobPattern(): boolean;
    setIsGlobPattern(value: boolean): void;
    private setInputWidth();
    private render();
    private showGlobHelp();
    private onInputKeyUp(keyboardEvent);
}
