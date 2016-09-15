import { TPromise } from 'vs/base/common/winjs.base';
import { ITelemetryService, ITelemetryInfo } from 'vs/platform/telemetry/common/telemetry';
import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
export declare class RemoteTelemetryService implements ITelemetryService {
    _serviceBrand: any;
    private _name;
    private _proxy;
    constructor(name: string, threadService: IThreadService);
    isOptedIn: boolean;
    getTelemetryInfo(): TPromise<ITelemetryInfo>;
    publicLog(eventName: string, data?: any): TPromise<void>;
    timedPublicLog(): any;
    addTelemetryAppender(): any;
}
