import { IWorkbenchContribution } from 'vs/workbench/common/contributions';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
import { IExtensionService } from 'vs/platform/extensions/common/extensions';
export declare class ExtHostContribution implements IWorkbenchContribution {
    private threadService;
    private instantiationService;
    private extensionService;
    constructor(threadService: IThreadService, instantiationService: IInstantiationService, extensionService: IExtensionService);
    getId(): string;
    private initExtensionSystem();
}
