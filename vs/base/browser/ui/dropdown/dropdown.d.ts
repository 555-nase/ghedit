import 'vs/css!./dropdown';
import { Builder } from 'vs/base/browser/builder';
import { TPromise } from 'vs/base/common/winjs.base';
import { ActionRunner, IAction } from 'vs/base/common/actions';
import { IActionItem } from 'vs/base/browser/ui/actionbar/actionbar';
import { EventEmitter } from 'vs/base/common/eventEmitter';
import { IDisposable } from 'vs/base/common/lifecycle';
import { IContextViewProvider } from 'vs/base/browser/ui/contextview/contextview';
import { IMenuOptions } from 'vs/base/browser/ui/menu/menu';
import { Keybinding } from 'vs/base/common/keyCodes';
export interface ILabelRenderer {
    (container: HTMLElement): IDisposable;
}
export interface IBaseDropdownOptions {
    tick?: boolean;
    label?: string;
    labelRenderer?: ILabelRenderer;
    action?: IAction;
}
export declare class BaseDropdown extends ActionRunner {
    toDispose: IDisposable[];
    $el: Builder;
    private $boxContainer;
    private $action;
    private $label;
    private $contents;
    constructor(container: HTMLElement, options: IBaseDropdownOptions);
    tooltip: string;
    show(): void;
    hide(): void;
    onEvent(e: Event, activeElement: HTMLElement): void;
    dispose(): void;
}
export interface IDropdownOptions extends IBaseDropdownOptions {
    contextViewProvider: IContextViewProvider;
}
export declare class Dropdown extends BaseDropdown {
    _contextViewProvider: IContextViewProvider;
    constructor(container: HTMLElement, options: IDropdownOptions);
    contextViewProvider: IContextViewProvider;
    show(): void;
    hide(): void;
    renderContents(container: HTMLElement): IDisposable;
}
export interface IContextMenuDelegate {
    getAnchor(): HTMLElement | {
        x: number;
        y: number;
    };
    getActions(): TPromise<IAction[]>;
    getActionItem?(action: IAction): IActionItem;
    getActionsContext?(): any;
    getKeyBinding?(action: IAction): Keybinding;
    getMenuClassName?(): string;
    onHide?(didCancel: boolean): void;
}
export interface IContextMenuProvider {
    showContextMenu(delegate: IContextMenuDelegate): void;
}
export interface IActionProvider {
    getActions(): IAction[];
}
export interface IDropdownMenuOptions extends IBaseDropdownOptions {
    contextMenuProvider: IContextMenuProvider;
    actions?: IAction[];
    actionProvider?: IActionProvider;
    menuClassName?: string;
}
export declare class DropdownMenu extends BaseDropdown {
    _contextMenuProvider: IContextMenuProvider;
    private _menuOptions;
    _actions: IAction[];
    actionProvider: IActionProvider;
    private menuClassName;
    constructor(container: HTMLElement, options: IDropdownMenuOptions);
    contextMenuProvider: IContextMenuProvider;
    menuOptions: IMenuOptions;
    actions: IAction[];
    show(): void;
    hide(): void;
}
export declare class DropdownGroup extends EventEmitter {
    private el;
    constructor(container: HTMLElement);
    element: HTMLElement;
}
