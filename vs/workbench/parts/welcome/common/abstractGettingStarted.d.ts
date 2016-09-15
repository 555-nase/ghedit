import { IWorkbenchContribution } from 'vs/workbench/common/contributions';
import { IWorkspaceContextService } from 'vs/workbench/services/workspace/common/contextService';
import { IStorageService } from 'vs/platform/storage/common/storage';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
/**
 * This extensions handles the first launch expereince for new users
 */
export declare abstract class AbstractGettingStarted implements IWorkbenchContribution {
    private storageService;
    private contextService;
    private telemetryService;
    protected static hideWelcomeSettingskey: string;
    protected welcomePageURL: string;
    protected appName: string;
    constructor(storageService: IStorageService, contextService: IWorkspaceContextService, telemetryService: ITelemetryService);
    protected handleWelcome(): void;
    private getUrl(telemetryInfo);
    protected openExternal(url: string): void;
    getId(): string;
}
