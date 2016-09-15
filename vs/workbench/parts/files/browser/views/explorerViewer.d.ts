import { TPromise } from 'vs/base/common/winjs.base';
import { IAction, ActionRunner as BaseActionRunner, IActionRunner } from 'vs/base/common/actions';
import { ContributableActionProvider } from 'vs/workbench/browser/actionBarRegistry';
import { IFilesConfiguration, ITextFileService } from 'vs/workbench/parts/files/common/files';
import { IFileService } from 'vs/platform/files/common/files';
import { IEditableData, IFileViewletState } from 'vs/workbench/parts/files/browser/fileActions';
import { IDataSource, ITree, IElementCallback, IAccessibilityProvider, IRenderer, ContextMenuEvent, ISorter, IFilter, IDragAndDrop, IDragAndDropData, IDragOverReaction } from 'vs/base/parts/tree/browser/tree';
import { DefaultController } from 'vs/base/parts/tree/browser/treeDefaults';
import { ActionsRenderer } from 'vs/base/parts/tree/browser/actionsRenderer';
import { FileStat } from 'vs/workbench/parts/files/common/explorerViewModel';
import { DragMouseEvent, IMouseEvent } from 'vs/base/browser/mouseEvent';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IPartService } from 'vs/workbench/services/part/common/partService';
import { IWorkspaceContextService } from 'vs/workbench/services/workspace/common/contextService';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IContextViewService, IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IEventService } from 'vs/platform/event/common/event';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IMessageService } from 'vs/platform/message/common/message';
import { IProgressService } from 'vs/platform/progress/common/progress';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IMenuService } from 'vs/platform/actions/common/actions';
export declare class FileDataSource implements IDataSource {
    private progressService;
    private messageService;
    private fileService;
    private partService;
    private workspace;
    constructor(progressService: IProgressService, messageService: IMessageService, fileService: IFileService, partService: IPartService, contextService: IWorkspaceContextService);
    getId(tree: ITree, stat: FileStat): string;
    hasChildren(tree: ITree, stat: FileStat): boolean;
    getChildren(tree: ITree, stat: FileStat): TPromise<FileStat[]>;
    getParent(tree: ITree, stat: FileStat): TPromise<FileStat>;
}
export declare class FileActionProvider extends ContributableActionProvider {
    private state;
    constructor(state: any);
    hasActions(tree: ITree, stat: FileStat): boolean;
    getActions(tree: ITree, stat: FileStat): TPromise<IAction[]>;
    hasSecondaryActions(tree: ITree, stat: FileStat): boolean;
    getSecondaryActions(tree: ITree, stat: FileStat): TPromise<IAction[]>;
    runAction(tree: ITree, stat: FileStat, action: IAction, context?: any): TPromise<any>;
    runAction(tree: ITree, stat: FileStat, actionID: string, context?: any): TPromise<any>;
}
export declare class FileViewletState implements IFileViewletState {
    private _actionProvider;
    private editableStats;
    constructor();
    actionProvider: FileActionProvider;
    getEditableData(stat: FileStat): IEditableData;
    setEditable(stat: FileStat, editableData: IEditableData): void;
    clearEditable(stat: FileStat): void;
}
export declare class ActionRunner extends BaseActionRunner implements IActionRunner {
    private viewletState;
    constructor(state: FileViewletState);
    run(action: IAction, context?: any): TPromise<any>;
}
export declare class FileRenderer extends ActionsRenderer implements IRenderer {
    private contextViewService;
    private state;
    constructor(state: FileViewletState, actionRunner: IActionRunner, contextViewService: IContextViewService);
    getContentHeight(tree: ITree, element: any): number;
    renderContents(tree: ITree, stat: FileStat, domElement: HTMLElement, previousCleanupFn: IElementCallback): IElementCallback;
    private iconClass(element);
}
export declare class FileAccessibilityProvider implements IAccessibilityProvider {
    getAriaLabel(tree: ITree, stat: FileStat): string;
}
export declare class FileController extends DefaultController {
    private editorService;
    private textFileService;
    private contextMenuService;
    private eventService;
    private instantiationService;
    private telemetryService;
    private contextService;
    private didCatchEnterDown;
    private state;
    private contributedContextMenu;
    private workspace;
    constructor(state: FileViewletState, editorService: IWorkbenchEditorService, textFileService: ITextFileService, contextMenuService: IContextMenuService, eventService: IEventService, instantiationService: IInstantiationService, telemetryService: ITelemetryService, contextService: IWorkspaceContextService, menuService: IMenuService, keybindingService: IKeybindingService);
    onLeftClick(tree: ITree, stat: FileStat, event: IMouseEvent, origin?: string): boolean;
    onContextMenu(tree: ITree, stat: FileStat, event: ContextMenuEvent): boolean;
    private onEnterDown(tree, event);
    private onEnterUp(tree, event);
    private onModifierEnterUp(tree, event);
    private onCopy(tree, event);
    private onPaste(tree, event);
    private openEditor(stat, preserveFocus, sideBySide, pinned?);
    private onF2(tree, event);
    private onDelete(tree, event);
    private runAction(tree, stat, id);
}
export declare class FileSorter implements ISorter {
    compare(tree: ITree, statA: FileStat, statB: FileStat): number;
}
export declare class FileFilter implements IFilter {
    private contextService;
    private hiddenExpression;
    constructor(contextService: IWorkspaceContextService);
    updateConfiguration(configuration: IFilesConfiguration): boolean;
    isVisible(tree: ITree, stat: FileStat): boolean;
    private doIsVisible(stat);
}
export declare class FileDragAndDrop implements IDragAndDrop {
    private messageService;
    private contextService;
    private eventService;
    private progressService;
    private fileService;
    private configurationService;
    private instantiationService;
    private textFileService;
    private toDispose;
    private dropEnabled;
    constructor(messageService: IMessageService, contextService: IWorkspaceContextService, eventService: IEventService, progressService: IProgressService, fileService: IFileService, configurationService: IConfigurationService, instantiationService: IInstantiationService, textFileService: ITextFileService);
    private registerListeners();
    private onConfigurationUpdated(config);
    getDragURI(tree: ITree, stat: FileStat): string;
    onDragStart(tree: ITree, data: IDragAndDropData, originalEvent: DragMouseEvent): void;
    onDragOver(tree: ITree, data: IDragAndDropData, target: FileStat, originalEvent: DragMouseEvent): IDragOverReaction;
    drop(tree: ITree, data: IDragAndDropData, target: FileStat, originalEvent: DragMouseEvent): void;
}
