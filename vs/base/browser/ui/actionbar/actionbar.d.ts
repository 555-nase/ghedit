import 'vs/css!./actionbar';
import lifecycle = require('vs/base/common/lifecycle');
import { Promise } from 'vs/base/common/winjs.base';
import { Builder } from 'vs/base/browser/builder';
import { IAction, IActionRunner, Action, IActionChangeEvent } from 'vs/base/common/actions';
import { IEventEmitter, EventEmitter } from 'vs/base/common/eventEmitter';
export interface IActionItem extends IEventEmitter {
    actionRunner: IActionRunner;
    setActionContext(context: any): void;
    render(element: HTMLElement): void;
    isEnabled(): boolean;
    focus(): void;
    blur(): void;
    dispose(): void;
}
export declare class BaseActionItem extends EventEmitter implements IActionItem {
    builder: Builder;
    _callOnDispose: lifecycle.IDisposable[];
    _context: any;
    _action: IAction;
    private gesture;
    private _actionRunner;
    constructor(context: any, action: IAction);
    protected _handleActionChangeEvent(event: IActionChangeEvent): void;
    callOnDispose: lifecycle.IDisposable[];
    actionRunner: IActionRunner;
    getAction(): IAction;
    isEnabled(): boolean;
    setActionContext(newContext: any): void;
    render(container: HTMLElement): void;
    onClick(event: Event): void;
    focus(): void;
    blur(): void;
    protected _updateEnabled(): void;
    protected _updateLabel(): void;
    protected _updateTooltip(): void;
    protected _updateClass(): void;
    protected _updateChecked(): void;
    dispose(): void;
}
export declare class Separator extends Action {
    static ID: string;
    constructor(label?: string, order?: any);
}
export interface IActionItemOptions {
    icon?: boolean;
    label?: boolean;
    keybinding?: string;
}
export declare class ActionItem extends BaseActionItem {
    protected $e: Builder;
    protected options: IActionItemOptions;
    private cssClass;
    constructor(context: any, action: IAction, options?: IActionItemOptions);
    render(container: HTMLElement): void;
    focus(): void;
    _updateLabel(): void;
    _updateTooltip(): void;
    _updateClass(): void;
    _updateEnabled(): void;
    _updateChecked(): void;
}
export declare enum ActionsOrientation {
    HORIZONTAL = 1,
    VERTICAL = 2,
}
export interface IActionItemProvider {
    (action: IAction): IActionItem;
}
export interface IActionBarOptions {
    orientation?: ActionsOrientation;
    context?: any;
    actionItemProvider?: IActionItemProvider;
    actionRunner?: IActionRunner;
    ariaLabel?: string;
    animated?: boolean;
}
export interface IActionOptions extends IActionItemOptions {
    index?: number;
}
export declare class ActionBar extends EventEmitter implements IActionRunner {
    options: IActionBarOptions;
    private _actionRunner;
    private _context;
    items: IActionItem[];
    private focusedItem;
    private focusTracker;
    domNode: HTMLElement;
    private actionsList;
    private toDispose;
    constructor(container: HTMLElement, options?: IActionBarOptions);
    constructor(container: Builder, options?: IActionBarOptions);
    setAriaLabel(label: string): void;
    private updateFocusedItem();
    context: any;
    actionRunner: IActionRunner;
    getContainer(): Builder;
    push(actions: IAction, options?: IActionOptions): void;
    push(actions: IAction[], options?: IActionOptions): void;
    clear(): void;
    length(): number;
    isEmpty(): boolean;
    onContentsChange(): void;
    focus(selectFirst?: boolean): void;
    private focusNext();
    private focusPrevious();
    private updateFocus();
    private doTrigger(event);
    private cancel();
    run(action: IAction, context?: any): Promise;
    dispose(): void;
}
export declare class SelectActionItem extends BaseActionItem {
    private select;
    private options;
    private selected;
    protected toDispose: lifecycle.IDisposable[];
    constructor(ctx: any, action: IAction, options: string[], selected: number);
    setOptions(options: string[], selected: number): void;
    private registerListeners();
    protected getActionContext(option: string): string;
    focus(): void;
    blur(): void;
    render(container: HTMLElement): void;
    protected getSelected(): string;
    private doSetOptions();
    private createOption(value);
    dispose(): void;
}
