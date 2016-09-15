import 'vs/css!./media/fileactions';
import { TPromise } from 'vs/base/common/winjs.base';
import URI from 'vs/base/common/uri';
import { Event } from 'vs/base/common/events';
import { Action, IAction } from 'vs/base/common/actions';
import { IInputValidator } from 'vs/base/browser/ui/inputbox/inputBox';
import { ITree } from 'vs/base/parts/tree/browser/tree';
import { LocalFileChangeEvent, ITextFileService } from 'vs/workbench/parts/files/common/files';
import { IFileService, IFileStat } from 'vs/platform/files/common/files';
import { IEditorIdentifier } from 'vs/workbench/common/editor';
import { FileStat } from 'vs/workbench/parts/files/common/explorerViewModel';
import { ExplorerView } from 'vs/workbench/parts/files/browser/views/explorerView';
import { IActionProvider } from 'vs/base/parts/tree/browser/actionsRenderer';
import { IUntitledEditorService } from 'vs/workbench/services/untitled/common/untitledEditorService';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IEditorGroupService } from 'vs/workbench/services/group/common/groupService';
import { IQuickOpenService } from 'vs/workbench/services/quickopen/common/quickOpenService';
import { IViewletService } from 'vs/workbench/services/viewlet/common/viewletService';
import { IStorageService } from 'vs/platform/storage/common/storage';
import { IEventService } from 'vs/platform/event/common/event';
import { IInstantiationService, IConstructorSignature2 } from 'vs/platform/instantiation/common/instantiation';
import { IMessageService } from 'vs/platform/message/common/message';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { Keybinding } from 'vs/base/common/keyCodes';
export interface IEditableData {
    action: IAction;
    validator: IInputValidator;
}
export interface IFileViewletState {
    actionProvider: IActionProvider;
    getEditableData(stat: IFileStat): IEditableData;
    setEditable(stat: IFileStat, editableData: IEditableData): void;
    clearEditable(stat: IFileStat): void;
}
export declare class BaseFileAction extends Action {
    private _contextService;
    private _editorService;
    private _fileService;
    private _messageService;
    private _textFileService;
    private _eventService;
    private _element;
    constructor(id: string, label: string, _contextService: IWorkspaceContextService, _editorService: IWorkbenchEditorService, _fileService: IFileService, _messageService: IMessageService, _textFileService: ITextFileService, _eventService: IEventService);
    contextService: IWorkspaceContextService;
    messageService: IMessageService;
    editorService: IWorkbenchEditorService;
    fileService: IFileService;
    eventService: IEventService;
    textFileService: ITextFileService;
    element: FileStat;
    _isEnabled(): boolean;
    _updateEnablement(): void;
    protected onError(error: any): void;
    protected onWarning(warning: any): void;
    protected onErrorWithRetry(error: any, retry: () => TPromise<any>, extraAction?: Action): void;
    protected handleDirty(): TPromise<boolean>;
}
export declare class TriggerRenameFileAction extends BaseFileAction {
    static ID: string;
    private tree;
    private renameAction;
    constructor(tree: ITree, element: FileStat, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService, instantiationService: IInstantiationService);
    validateFileName(parent: IFileStat, name: string): string;
    run(context?: any): TPromise<any>;
}
export declare abstract class BaseRenameAction extends BaseFileAction {
    constructor(id: string, label: string, element: FileStat, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService);
    run(context?: any): TPromise<any>;
    validateFileName(parent: IFileStat, name: string): string;
    abstract runAction(newName: string): TPromise<any>;
    onSuccess(stat: IFileStat): void;
}
export declare class RenameFileAction extends BaseRenameAction {
    static ID: string;
    constructor(element: FileStat, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService);
    runAction(newName: string): TPromise<any>;
}
export declare class BaseNewAction extends BaseFileAction {
    private presetFolder;
    private tree;
    private isFile;
    private renameAction;
    constructor(id: string, label: string, tree: ITree, isFile: boolean, editableAction: BaseRenameAction, element: FileStat, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService);
    run(context?: any): TPromise<any>;
}
export declare class NewFileAction extends BaseNewAction {
    constructor(tree: ITree, element: FileStat, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService, instantiationService: IInstantiationService);
}
export declare class NewFolderAction extends BaseNewAction {
    constructor(tree: ITree, element: FileStat, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService, instantiationService: IInstantiationService);
}
export declare abstract class BaseGlobalNewAction extends Action {
    private viewletService;
    private instantiationService;
    private messageService;
    private toDispose;
    constructor(id: string, label: string, viewletService: IViewletService, instantiationService: IInstantiationService, messageService: IMessageService);
    run(): TPromise<any>;
    protected abstract getAction(): IConstructorSignature2<ITree, IFileStat, Action>;
    dispose(): void;
}
export declare class GlobalNewUntitledFileAction extends Action {
    private storageService;
    private editorService;
    private textFileService;
    private untitledEditorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, storageService: IStorageService, editorService: IWorkbenchEditorService, textFileService: ITextFileService, untitledEditorService: IUntitledEditorService);
    run(): TPromise<any>;
}
export declare class GlobalNewFileAction extends BaseGlobalNewAction {
    static ID: string;
    static LABEL: string;
    protected getAction(): IConstructorSignature2<ITree, IFileStat, Action>;
}
export declare class GlobalNewFolderAction extends BaseGlobalNewAction {
    static ID: string;
    static LABEL: string;
    protected getAction(): IConstructorSignature2<ITree, IFileStat, Action>;
}
export declare abstract class BaseCreateAction extends BaseRenameAction {
    validateFileName(parent: IFileStat, name: string): string;
}
export declare class CreateFileAction extends BaseCreateAction {
    static ID: string;
    static LABEL: string;
    constructor(element: FileStat, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService);
    runAction(fileName: string): TPromise<any>;
}
export declare class CreateFolderAction extends BaseCreateAction {
    static ID: string;
    static LABEL: string;
    constructor(element: FileStat, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService);
    runAction(fileName: string): TPromise<any>;
}
export declare class BaseDeleteFileAction extends BaseFileAction {
    private tree;
    private useTrash;
    private skipConfirm;
    constructor(id: string, label: string, tree: ITree, element: FileStat, useTrash: boolean, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService);
    run(): TPromise<any>;
}
export declare class MoveFileToTrashAction extends BaseDeleteFileAction {
    static ID: string;
    constructor(tree: ITree, element: FileStat, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService);
}
export declare class DeleteFileAction extends BaseDeleteFileAction {
    static ID: string;
    constructor(tree: ITree, element: FileStat, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService);
}
export declare class ImportFileAction extends BaseFileAction {
    static ID: string;
    private tree;
    constructor(tree: ITree, element: FileStat, clazz: string, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService);
    getViewer(): ITree;
    run(context?: any): TPromise<any>;
}
/** File import event is emitted when a file is import into the workbench. */
export declare class FileImportedEvent extends LocalFileChangeEvent {
    private isNew;
    constructor(stat?: IFileStat, isNew?: boolean, originalEvent?: Event);
    gotAdded(): boolean;
    gotMoved(): boolean;
    gotUpdated(): boolean;
    gotDeleted(): boolean;
}
export declare class CopyFileAction extends BaseFileAction {
    static ID: string;
    private tree;
    constructor(tree: ITree, element: FileStat, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService);
    run(): TPromise<any>;
}
export declare class PasteFileAction extends BaseFileAction {
    private instantiationService;
    static ID: string;
    private tree;
    constructor(tree: ITree, element: FileStat, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService, instantiationService: IInstantiationService);
    _isEnabled(): boolean;
    run(): TPromise<any>;
}
export declare class DuplicateFileAction extends BaseFileAction {
    private tree;
    private target;
    constructor(tree: ITree, element: FileStat, target: FileStat, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, fileService: IFileService, messageService: IMessageService, textFileService: ITextFileService, eventService: IEventService);
    run(): TPromise<any>;
    onError(error: any): void;
    private findTarget();
    private toCopyName(name, isFolder);
}
export declare class OpenToSideAction extends Action {
    private editorService;
    static ID: string;
    static LABEL: string;
    private tree;
    private resource;
    private preserveFocus;
    constructor(tree: ITree, resource: URI, preserveFocus: boolean, editorService: IWorkbenchEditorService);
    private updateEnablement();
    run(): TPromise<any>;
}
export declare class SelectResourceForCompareAction extends Action {
    private resource;
    private tree;
    constructor(resource: URI, tree: ITree);
    run(): TPromise<any>;
}
export declare class GlobalCompareResourcesAction extends Action {
    private quickOpenService;
    private instantiationService;
    private editorService;
    private editorGroupService;
    private messageService;
    private eventService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, quickOpenService: IQuickOpenService, instantiationService: IInstantiationService, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, messageService: IMessageService, eventService: IEventService);
    run(): TPromise<any>;
}
export declare class CompareResourcesAction extends Action {
    private contextService;
    private instantiationService;
    private editorService;
    private tree;
    private resource;
    constructor(resource: URI, tree: ITree, contextService: IWorkspaceContextService, instantiationService: IInstantiationService, editorService: IWorkbenchEditorService);
    private static computeLabel();
    getLabel(): string;
    _isEnabled(): boolean;
    run(): TPromise<any>;
}
export declare class RefreshViewExplorerAction extends Action {
    constructor(explorerView: ExplorerView, clazz: string);
}
export declare abstract class BaseActionWithErrorReporting extends Action {
    private messageService;
    constructor(id: string, label: string, messageService: IMessageService);
    run(context?: any): TPromise<boolean>;
    protected abstract doRun(context?: any): TPromise<boolean>;
}
export declare abstract class BaseSaveFileAction extends BaseActionWithErrorReporting {
    private editorService;
    private textFileService;
    private untitledEditorService;
    private instantiationService;
    private resource;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, textFileService: ITextFileService, untitledEditorService: IUntitledEditorService, instantiationService: IInstantiationService, messageService: IMessageService);
    abstract isSaveAs(): boolean;
    setResource(resource: URI): void;
    protected doRun(context: any): TPromise<boolean>;
}
export declare class SaveFileAction extends BaseSaveFileAction {
    static ID: string;
    static LABEL: string;
    isSaveAs(): boolean;
}
export declare class SaveFileAsAction extends BaseSaveFileAction {
    static ID: string;
    static LABEL: string;
    isSaveAs(): boolean;
}
export declare abstract class BaseSaveAllAction extends BaseActionWithErrorReporting {
    protected editorService: IWorkbenchEditorService;
    private editorGroupService;
    private textFileService;
    private untitledEditorService;
    private instantiationService;
    private eventService;
    private toDispose;
    private lastIsDirty;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, textFileService: ITextFileService, untitledEditorService: IUntitledEditorService, instantiationService: IInstantiationService, eventService: IEventService, messageService: IMessageService);
    protected abstract getSaveAllArguments(context?: any): any;
    protected abstract includeUntitled(): boolean;
    private registerListeners();
    private updateEnablement(isDirty);
    protected doRun(context: any): TPromise<boolean>;
    dispose(): void;
}
export declare class SaveAllAction extends BaseSaveAllAction {
    static ID: string;
    static LABEL: string;
    class: string;
    protected getSaveAllArguments(): boolean;
    protected includeUntitled(): boolean;
}
export declare class SaveAllInGroupAction extends BaseSaveAllAction {
    static ID: string;
    static LABEL: string;
    class: string;
    protected getSaveAllArguments(editorIdentifier: IEditorIdentifier): any;
    protected includeUntitled(): boolean;
}
export declare class SaveFilesAction extends BaseSaveAllAction {
    static ID: string;
    static LABEL: string;
    protected getSaveAllArguments(): boolean;
    protected includeUntitled(): boolean;
}
export declare class RevertFileAction extends Action {
    private editorService;
    private textFileService;
    static ID: string;
    static LABEL: string;
    private resource;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, textFileService: ITextFileService);
    setResource(resource: URI): void;
    run(): TPromise<any>;
}
export declare class FocusOpenEditorsView extends Action {
    private viewletService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, viewletService: IViewletService);
    run(): TPromise<any>;
}
export declare class FocusFilesExplorer extends Action {
    private viewletService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, viewletService: IViewletService);
    run(): TPromise<any>;
}
export declare class ShowActiveFileInExplorer extends Action {
    private editorService;
    private viewletService;
    private contextService;
    private messageService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, viewletService: IViewletService, contextService: IWorkspaceContextService, messageService: IMessageService);
    run(): TPromise<any>;
}
export declare class CollapseExplorerView extends Action {
    private viewletService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, viewletService: IViewletService);
    run(): TPromise<any>;
}
export declare class RefreshExplorerView extends Action {
    private viewletService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, viewletService: IViewletService);
    run(): TPromise<any>;
}
export declare function keybindingForAction(id: string): Keybinding;
export declare function validateFileName(parent: IFileStat, name: string, allowOverwriting?: boolean): string;
export declare function getWellFormedFileName(filename: string): string;
