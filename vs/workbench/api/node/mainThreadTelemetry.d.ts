import { TPromise } from 'vs/base/common/winjs.base';
import { ITelemetryService, ITelemetryInfo } from 'vs/platform/telemetry/common/telemetry';
import { MainThreadTelemetryShape } from './extHost.protocol';
/**
 * Helper always instantiated in the main process to receive telemetry events from remote telemetry services
 */
export declare class MainThreadTelemetry extends MainThreadTelemetryShape {
    private _telemetryService;
    constructor(telemetryService: ITelemetryService);
    $publicLog(eventName: string, data?: any): void;
    $getTelemetryInfo(): TPromise<ITelemetryInfo>;
}
