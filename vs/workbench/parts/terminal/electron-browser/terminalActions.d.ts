import { Action, IAction } from 'vs/base/common/actions';
import { ITerminalService } from 'vs/workbench/parts/terminal/electron-browser/terminal';
import { SelectActionItem } from 'vs/base/browser/ui/actionbar/actionbar';
import { TPromise } from 'vs/base/common/winjs.base';
export declare class ToggleTerminalAction extends Action {
    private terminalService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, terminalService: ITerminalService);
    run(event?: any): TPromise<any>;
}
export declare class KillTerminalAction extends Action {
    private terminalService;
    static ID: string;
    static LABEL: string;
    static PANEL_LABEL: string;
    constructor(id: string, label: string, terminalService: ITerminalService);
    run(event?: any): TPromise<any>;
}
/**
 * Copies the terminal selection. Note that since the command palette takes focus from the terminal,
 * this can only be triggered via a keybinding.
 */
export declare class CopyTerminalSelectionAction extends Action {
    private terminalService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, terminalService: ITerminalService);
    run(event?: any): TPromise<any>;
}
export declare class CreateNewTerminalAction extends Action {
    private terminalService;
    static ID: string;
    static LABEL: string;
    static PANEL_LABEL: string;
    constructor(id: string, label: string, terminalService: ITerminalService);
    run(event?: any): TPromise<any>;
}
export declare class FocusTerminalAction extends Action {
    private terminalService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, terminalService: ITerminalService);
    run(event?: any): TPromise<any>;
}
export declare class FocusNextTerminalAction extends Action {
    private terminalService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, terminalService: ITerminalService);
    run(event?: any): TPromise<any>;
}
export declare class FocusPreviousTerminalAction extends Action {
    private terminalService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, terminalService: ITerminalService);
    run(event?: any): TPromise<any>;
}
export declare class TerminalPasteAction extends Action {
    private terminalService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, terminalService: ITerminalService);
    run(event?: any): TPromise<any>;
}
export declare class RunSelectedTextInTerminalAction extends Action {
    private terminalService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, terminalService: ITerminalService);
    run(event?: any): TPromise<any>;
}
export declare class SwitchTerminalInstanceAction extends Action {
    private terminalService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, terminalService: ITerminalService);
    run(item?: string): TPromise<any>;
}
export declare class SwitchTerminalInstanceActionItem extends SelectActionItem {
    private terminalService;
    constructor(action: IAction, terminalService: ITerminalService);
    private updateItems();
}
