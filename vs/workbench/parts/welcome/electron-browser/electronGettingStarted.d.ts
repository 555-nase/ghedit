import { IWorkbenchContribution } from 'vs/workbench/common/contributions';
import { AbstractGettingStarted } from 'vs/workbench/parts/welcome/common/abstractGettingStarted';
export declare class ElectronGettingStarted extends AbstractGettingStarted implements IWorkbenchContribution {
    protected openExternal(url: string): void;
    protected handleWelcome(): void;
}
