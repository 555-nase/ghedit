import { IGitService } from 'vs/workbench/parts/git/common/git';
import { IWorkbenchContribution } from 'vs/workbench/common/contributions';
import { IOutputService } from 'vs/workbench/parts/output/common/output';
export declare class GitOutput implements IWorkbenchContribution {
    static ID: string;
    private outputListener;
    private gitService;
    private outputService;
    constructor(gitService: IGitService, outputService: IOutputService);
    getId(): string;
    private onOutput(output);
    dispose(): void;
}
