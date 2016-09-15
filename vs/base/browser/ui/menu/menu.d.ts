import 'vs/css!./menu';
import { IActionRunner, IAction } from 'vs/base/common/actions';
import { IActionItemProvider } from 'vs/base/browser/ui/actionbar/actionbar';
import { EventEmitter } from 'vs/base/common/eventEmitter';
import { Keybinding } from 'vs/base/common/keyCodes';
export interface IMenuOptions {
    context?: any;
    actionItemProvider?: IActionItemProvider;
    actionRunner?: IActionRunner;
    getKeyBinding?: (action: IAction) => Keybinding;
}
export declare class Menu extends EventEmitter {
    private actionBar;
    private listener;
    constructor(container: HTMLElement, actions: IAction[], options?: IMenuOptions);
    focus(): void;
    dispose(): void;
}
