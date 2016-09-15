import { GitService } from 'vs/workbench/parts/git/browser/gitServices';
import { ILifecycleService } from 'vs/platform/lifecycle/common/lifecycle';
import { IOutputService } from 'vs/workbench/parts/output/common/output';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IEventService } from 'vs/platform/event/common/event';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IMessageService } from 'vs/platform/message/common/message';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { IStorageService } from 'vs/platform/storage/common/storage';
export declare class ElectronGitService extends GitService {
    private static USE_REMOTE_PROCESS_SERVICE;
    constructor(instantiationService: IInstantiationService, eventService: IEventService, messageService: IMessageService, editorService: IWorkbenchEditorService, outputService: IOutputService, contextService: IWorkspaceContextService, lifecycleService: ILifecycleService, storageService: IStorageService, configurationService: IConfigurationService);
}
