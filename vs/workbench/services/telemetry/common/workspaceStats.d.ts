import { IFileService } from 'vs/platform/files/common/files';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
export declare class WorkspaceStats {
    private fileService;
    private contextService;
    private telemetryService;
    constructor(fileService: IFileService, contextService: IWorkspaceContextService, telemetryService: ITelemetryService);
    private searchArray(arr, regEx);
    private getWorkspaceTags();
    reportWorkspaceTags(): void;
}
