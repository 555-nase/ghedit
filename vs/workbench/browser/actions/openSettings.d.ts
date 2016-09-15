import { TPromise } from 'vs/base/common/winjs.base';
import URI from 'vs/base/common/uri';
import { Action } from 'vs/base/common/actions';
import { StringEditorInput } from 'vs/workbench/common/editor/stringEditorInput';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IWorkspaceContextService } from 'vs/workbench/services/workspace/common/contextService';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IEditorGroupService } from 'vs/workbench/services/group/common/groupService';
import { IStorageService } from 'vs/platform/storage/common/storage';
import { IFileService } from 'vs/platform/files/common/files';
import { IMessageService } from 'vs/platform/message/common/message';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
export declare class BaseTwoEditorsAction extends Action {
    protected editorService: IWorkbenchEditorService;
    private editorGroupService;
    protected fileService: IFileService;
    protected configurationService: IConfigurationService;
    protected messageService: IMessageService;
    protected contextService: IWorkspaceContextService;
    protected keybindingService: IKeybindingService;
    protected instantiationService: IInstantiationService;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, fileService: IFileService, configurationService: IConfigurationService, messageService: IMessageService, contextService: IWorkspaceContextService, keybindingService: IKeybindingService, instantiationService: IInstantiationService);
    protected createIfNotExists(resource: URI, contents: string): TPromise<boolean>;
    protected openTwoEditors(leftHandDefaultInput: StringEditorInput, editableResource: URI, defaultEditableContents: string): TPromise<void>;
}
export declare class BaseOpenSettingsAction extends BaseTwoEditorsAction {
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, fileService: IFileService, configurationService: IConfigurationService, messageService: IMessageService, contextService: IWorkspaceContextService, keybindingService: IKeybindingService, instantiationService: IInstantiationService);
    protected open(emptySettingsContents: string, settingsResource: URI): TPromise<void>;
}
export declare class OpenGlobalSettingsAction extends BaseOpenSettingsAction {
    private storageService;
    static ID: string;
    static LABEL: string;
    private static SETTINGS_INFO_IGNORE_KEY;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, fileService: IFileService, configurationService: IConfigurationService, messageService: IMessageService, contextService: IWorkspaceContextService, keybindingService: IKeybindingService, instantiationService: IInstantiationService, storageService: IStorageService);
    run(event?: any): TPromise<void>;
}
export declare class OpenGlobalKeybindingsAction extends BaseTwoEditorsAction {
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, fileService: IFileService, configurationService: IConfigurationService, messageService: IMessageService, contextService: IWorkspaceContextService, keybindingService: IKeybindingService, instantiationService: IInstantiationService);
    run(event?: any): TPromise<void>;
}
export declare class OpenWorkspaceSettingsAction extends BaseOpenSettingsAction {
    static ID: string;
    static LABEL: string;
    run(event?: any): TPromise<void>;
}
