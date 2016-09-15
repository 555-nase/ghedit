import { KeyCode } from 'vs/base/common/keyCodes';
export declare function lookupKeyCode(e: KeyboardEvent): KeyCode;
export declare function setExtractKeyCode(newExtractKeyCode: (e: KeyboardEvent) => KeyCode): void;
export interface IKeyboardEvent {
    browserEvent: KeyboardEvent;
    target: HTMLElement;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
    metaKey: boolean;
    keyCode: KeyCode;
    asKeybinding(): number;
    equals(keybinding: number): boolean;
    preventDefault(): void;
    stopPropagation(): void;
}
export declare class StandardKeyboardEvent implements IKeyboardEvent {
    browserEvent: KeyboardEvent;
    target: HTMLElement;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
    metaKey: boolean;
    keyCode: KeyCode;
    private _asKeybinding;
    constructor(source: KeyboardEvent);
    preventDefault(): void;
    stopPropagation(): void;
    asKeybinding(): number;
    equals(other: number): boolean;
    private _computeKeybinding();
}
