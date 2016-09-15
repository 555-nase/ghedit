import 'vs/css!./checkbox';
import { Widget } from 'vs/base/browser/ui/widget';
import { IKeyboardEvent } from 'vs/base/browser/keyboardEvent';
export interface ICheckboxOpts {
    actionClassName: string;
    title: string;
    isChecked: boolean;
    onChange: (viaKeyboard: boolean) => void;
    onKeyDown?: (e: IKeyboardEvent) => void;
}
export declare class Checkbox extends Widget {
    private _opts;
    domNode: HTMLElement;
    private _checked;
    constructor(opts: ICheckboxOpts);
    focus(): void;
    checked: boolean;
    private _className();
    width(): number;
    enable(): void;
    disable(): void;
}
