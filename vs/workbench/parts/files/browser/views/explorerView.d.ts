import { TPromise } from 'vs/base/common/winjs.base';
import { Builder } from 'vs/base/browser/builder';
import URI from 'vs/base/common/uri';
import { IActionRunner, IAction } from 'vs/base/common/actions';
import { ITree } from 'vs/base/parts/tree/browser/tree';
import { IFileService } from 'vs/platform/files/common/files';
import { FileViewletState } from 'vs/workbench/parts/files/browser/views/explorerViewer';
import { IEditorGroupService } from 'vs/workbench/services/group/common/groupService';
import { CollapsibleViewletView } from 'vs/workbench/browser/viewlet';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IPartService } from 'vs/workbench/services/part/common/partService';
import { IStorageService } from 'vs/platform/storage/common/storage';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IEventService } from 'vs/platform/event/common/event';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IProgressService } from 'vs/platform/progress/common/progress';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IMessageService } from 'vs/platform/message/common/message';
export declare class ExplorerView extends CollapsibleViewletView {
    private instantiationService;
    private editorGroupService;
    private eventService;
    private storageService;
    private contextService;
    private progressService;
    private editorService;
    private fileService;
    private partService;
    private configurationService;
    private static EXPLORER_FILE_CHANGES_REACT_DELAY;
    private static EXPLORER_FILE_CHANGES_REFRESH_DELAY;
    private static EXPLORER_IMPORT_REFRESH_DELAY;
    private static MEMENTO_LAST_ACTIVE_FILE_RESOURCE;
    private static MEMENTO_EXPANDED_FOLDER_RESOURCES;
    private workspace;
    private explorerViewer;
    private filter;
    private viewletState;
    private explorerRefreshDelayer;
    private explorerImportDelayer;
    private resourceContext;
    private shouldRefresh;
    private autoReveal;
    private settings;
    constructor(viewletState: FileViewletState, actionRunner: IActionRunner, settings: any, headerSize: number, messageService: IMessageService, contextMenuService: IContextMenuService, instantiationService: IInstantiationService, editorGroupService: IEditorGroupService, eventService: IEventService, storageService: IStorageService, contextService: IWorkspaceContextService, progressService: IProgressService, editorService: IWorkbenchEditorService, fileService: IFileService, partService: IPartService, keybindingService: IKeybindingService, configurationService: IConfigurationService);
    renderHeader(container: HTMLElement): void;
    renderBody(container: HTMLElement): void;
    getActions(): IAction[];
    create(): TPromise<void>;
    private onEditorsChanged();
    private onConfigurationUpdated(configuration, refresh?);
    focusBody(): void;
    setVisible(visible: boolean): TPromise<void>;
    private openFocusedElement(preserveFocus?);
    private getActiveEditorInputResource();
    private getInput();
    createViewer(container: Builder): ITree;
    getOptimalWidth(): number;
    private onLocalFileChange(e);
    private onFileChanges(e);
    private shouldRefreshFromEvent(e);
    private filterToAddRemovedOnWorkspacePath(e, fn);
    private refreshFromEvent();
    /**
     * Refresh the contents of the explorer to get up to date data from the disk about the file structure.
     */
    refresh(): TPromise<void>;
    private doRefresh();
    /**
     * Given a stat, fills an array of path that make all folders below the stat that are resolved directories.
     */
    private getResolvedDirectories(stat, resolvedDirectories);
    /**
     * Selects and reveal the file element provided by the given resource if its found in the explorer. Will try to
     * resolve the path from the disk in case the explorer is not yet expanded to the file yet.
     */
    select(resource: URI, reveal?: boolean): TPromise<void>;
    private hasSelection(resource);
    private doSelect(fileStat, reveal);
    shutdown(): void;
    dispose(): void;
}
