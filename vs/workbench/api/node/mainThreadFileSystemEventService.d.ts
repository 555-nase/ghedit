import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
import { IEventService } from 'vs/platform/event/common/event';
export declare class MainThreadFileSystemEventService {
    constructor(eventService: IEventService, threadService: IThreadService);
}
