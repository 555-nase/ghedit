import { IDisposable } from 'vs/base/common/lifecycle';
export declare var ENABLE_TIMER: boolean;
export declare enum Topic {
    EDITOR = 0,
    LANGUAGES = 1,
    WORKER = 2,
    WORKBENCH = 3,
    STARTUP = 4,
}
export interface ITimerEvent {
    id: number;
    topic: string;
    name: string;
    description: string;
    data: any;
    startTime: Date;
    stopTime: Date;
    stop(stopTime?: Date): void;
    timeTaken(): number;
}
export interface IExistingTimerEvent {
    topic: string;
    name: string;
    description?: string;
    startTime: Date;
    stopTime: Date;
}
export interface IEventsListener {
    (events: ITimerEvent[]): void;
}
export declare class TimeKeeper {
    /**
     * After being started for 1 minute, all timers are automatically stopped.
     */
    private static _MAX_TIMER_LENGTH;
    /**
     * Every 2 minutes, a sweep of current started timers is done.
     */
    private static _CLEAN_UP_INTERVAL;
    /**
     * Collect at most 1000 events.
     */
    private static _EVENT_CACHE_LIMIT;
    private static EVENT_ID;
    static PARSE_TIME: Date;
    private cleaningIntervalId;
    private collectedEvents;
    private listeners;
    constructor();
    isEnabled(): boolean;
    start(topic: Topic | string, name: string, start?: Date, description?: string): ITimerEvent;
    dispose(): void;
    addListener(listener: IEventsListener): IDisposable;
    private addEvent(event);
    private initAutoCleaning();
    getCollectedEvents(): ITimerEvent[];
    clearCollectedEvents(): void;
    _onEventStopped(event: ITimerEvent): void;
    setInitialCollectedEvents(events: IExistingTimerEvent[], startTime?: Date): void;
}
export declare var nullEvent: ITimerEvent;
export declare function start(topic: Topic | string, name: string, start?: Date, description?: string): ITimerEvent;
export declare function getTimeKeeper(): TimeKeeper;
