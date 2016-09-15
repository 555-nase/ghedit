import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
export declare class CrashReporter {
    private telemetryService;
    private configurationService;
    private isStarted;
    private config;
    private version;
    private commit;
    private sessionId;
    constructor(version: string, commit: string, telemetryService: ITelemetryService, configurationService: IConfigurationService);
    start(rawConfiguration: Electron.CrashReporterStartOptions): void;
    private doStart(rawConfiguration);
    private toConfiguration(rawConfiguration);
}
