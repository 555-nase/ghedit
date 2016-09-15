import { IModelService } from 'vs/editor/common/services/modelService';
import { IModeService } from 'vs/editor/common/services/modeService';
import { IWorkbenchContribution } from 'vs/workbench/common/contributions';
export declare class WorkbenchContentProvider implements IWorkbenchContribution {
    private modelService;
    private modeService;
    constructor(modelService: IModelService, modeService: IModeService);
    getId(): string;
    private start();
}
