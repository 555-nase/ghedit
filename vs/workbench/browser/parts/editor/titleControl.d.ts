import 'vs/css!./media/titlecontrol';
import { IAction, Action } from 'vs/base/common/actions';
import { IEditorStacksModel, IEditorGroup, IEditorIdentifier } from 'vs/workbench/common/editor';
import { IActionItem } from 'vs/base/browser/ui/actionbar/actionbar';
import { ToolBar } from 'vs/base/browser/ui/toolbar/toolbar';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IEditorGroupService } from 'vs/workbench/services/group/common/groupService';
import { IMessageService } from 'vs/platform/message/common/message';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IQuickOpenService } from 'vs/workbench/services/quickopen/common/quickOpenService';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { CloseEditorsInGroupAction, SplitEditorAction, CloseEditorAction, KeepEditorAction, CloseOtherEditorsInGroupAction, CloseRightEditorsInGroupAction, ShowEditorsInGroupAction } from 'vs/workbench/browser/parts/editor/editorActions';
import { IDisposable } from 'vs/base/common/lifecycle';
import { IMenuService } from 'vs/platform/actions/common/actions';
export interface IToolbarActions {
    primary: IAction[];
    secondary: IAction[];
}
export interface ITitleAreaControl {
    setContext(group: IEditorGroup): void;
    allowDragging(element: HTMLElement): boolean;
    setDragged(dragged: boolean): void;
    create(parent: HTMLElement): void;
    getContainer(): HTMLElement;
    refresh(instant?: boolean): void;
    update(instant?: boolean): void;
    layout(): void;
    dispose(): void;
}
export declare abstract class TitleControl implements ITitleAreaControl {
    protected contextMenuService: IContextMenuService;
    protected instantiationService: IInstantiationService;
    protected configurationService: IConfigurationService;
    protected editorService: IWorkbenchEditorService;
    protected editorGroupService: IEditorGroupService;
    protected keybindingService: IKeybindingService;
    protected telemetryService: ITelemetryService;
    protected messageService: IMessageService;
    protected menuService: IMenuService;
    protected quickOpenService: IQuickOpenService;
    private static draggedEditor;
    protected stacks: IEditorStacksModel;
    protected context: IEditorGroup;
    protected toDispose: IDisposable[];
    protected dragged: boolean;
    protected closeEditorAction: CloseEditorAction;
    protected pinEditorAction: KeepEditorAction;
    protected closeOtherEditorsAction: CloseOtherEditorsInGroupAction;
    protected closeRightEditorsAction: CloseRightEditorsInGroupAction;
    protected closeEditorsInGroupAction: CloseEditorsInGroupAction;
    protected splitEditorAction: SplitEditorAction;
    protected showEditorsInGroupAction: ShowEditorsInGroupAction;
    private parent;
    private previewEditors;
    private showTabs;
    private currentPrimaryEditorActionIds;
    private currentSecondaryEditorActionIds;
    protected editorActionsToolbar: ToolBar;
    private mapActionsToEditors;
    private scheduler;
    private refreshScheduled;
    private resourceContext;
    private contributedTitleBarMenu;
    constructor(contextMenuService: IContextMenuService, instantiationService: IInstantiationService, configurationService: IConfigurationService, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, keybindingService: IKeybindingService, telemetryService: ITelemetryService, messageService: IMessageService, menuService: IMenuService, quickOpenService: IQuickOpenService);
    static getDraggedEditor(): IEditorIdentifier;
    setDragged(dragged: boolean): void;
    protected onEditorDragStart(editor: IEditorIdentifier): void;
    protected onEditorDragEnd(): void;
    private registerListeners();
    private onStacksChanged(e);
    private onConfigurationUpdated(config);
    private updateSplitActionEnablement();
    private onSchedule();
    setContext(group: IEditorGroup): void;
    update(instant?: boolean): void;
    refresh(instant?: boolean): void;
    create(parent: HTMLElement): void;
    getContainer(): HTMLElement;
    protected abstract doRefresh(): void;
    protected doUpdate(): void;
    layout(): void;
    allowDragging(element: HTMLElement): boolean;
    private initActions();
    protected createEditorActionsToolBar(container: HTMLElement): void;
    protected actionItemProvider(action: Action): IActionItem;
    protected getEditorActions(identifier: IEditorIdentifier): IToolbarActions;
    private getEditorActionsForContext(context);
    protected updateEditorActionsToolbar(): void;
    protected clearEditorActionsToolbar(): void;
    protected onContextMenu(identifier: IEditorIdentifier, e: Event, node: HTMLElement): void;
    protected getContextMenuActions(identifier: IEditorIdentifier): IAction[];
    dispose(): void;
}
