import 'vs/css!./media/commandsHandler';
import { TPromise } from 'vs/base/common/winjs.base';
import { IAutoFocus } from 'vs/base/parts/quickopen/common/quickOpen';
import { QuickOpenModel } from 'vs/base/parts/quickopen/browser/quickOpenModel';
import { IMenuService } from 'vs/platform/actions/common/actions';
import { QuickOpenHandler, QuickOpenAction } from 'vs/workbench/browser/quickopen';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IMessageService } from 'vs/platform/message/common/message';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IQuickOpenService } from 'vs/workbench/services/quickopen/common/quickOpenService';
export declare const ALL_COMMANDS_PREFIX: string;
export declare const EDITOR_COMMANDS_PREFIX: string;
export declare class ShowAllCommandsAction extends QuickOpenAction {
    static ID: string;
    static LABEL: string;
    constructor(actionId: string, actionLabel: string, quickOpenService: IQuickOpenService);
}
export declare class CommandsHandler extends QuickOpenHandler {
    private editorService;
    private instantiationService;
    private messageService;
    private keybindingService;
    private menuService;
    constructor(editorService: IWorkbenchEditorService, instantiationService: IInstantiationService, messageService: IMessageService, keybindingService: IKeybindingService, menuService: IMenuService);
    protected includeWorkbenchCommands(): boolean;
    getResults(searchValue: string): TPromise<QuickOpenModel>;
    private actionDescriptorsToEntries(actionDescriptors, searchValue);
    private editorActionsToEntries(actions, searchValue);
    private otherActionsToEntries(actions, searchValue);
    getAutoFocus(searchValue: string): IAutoFocus;
    getClass(): string;
    getEmptyLabel(searchString: string): string;
}
export declare class EditorCommandsHandler extends CommandsHandler {
    protected includeWorkbenchCommands(): boolean;
}
