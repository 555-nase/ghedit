import { IEventService } from 'vs/platform/event/common/event';
export declare class FileWatcher {
    private basePath;
    private ignored;
    private eventEmitter;
    private errorLogger;
    private verboseLogging;
    constructor(basePath: string, ignored: string[], eventEmitter: IEventService, errorLogger: (msg: string) => void, verboseLogging: boolean);
    startWatching(): () => void;
    private onRawFileEvents(events);
    private onError(error);
}
