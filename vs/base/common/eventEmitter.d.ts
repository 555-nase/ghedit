import { IDisposable } from 'vs/base/common/lifecycle';
export declare class EmitterEvent {
    private _type;
    private _data;
    constructor(eventType?: string, data?: any);
    getType(): string;
    getData(): any;
}
export interface ListenerCallback {
    (value: any): void;
}
export interface BulkListenerCallback {
    (value: EmitterEvent[]): void;
}
export interface IEventEmitter extends IDisposable {
    addListener2(eventType: string, listener: ListenerCallback): IDisposable;
    addOneTimeDisposableListener(eventType: string, listener: ListenerCallback): IDisposable;
    addBulkListener2(listener: BulkListenerCallback): IDisposable;
    addEmitter2(eventEmitter: IEventEmitter): IDisposable;
}
export interface IListenersMap {
    [key: string]: ListenerCallback[];
}
export declare class EventEmitter implements IEventEmitter {
    protected _listeners: IListenersMap;
    protected _bulkListeners: ListenerCallback[];
    private _collectedEvents;
    private _deferredCnt;
    private _allowedEventTypes;
    constructor(allowedEventTypes?: string[]);
    dispose(): void;
    private addListener(eventType, listener);
    addListener2(eventType: string, listener: ListenerCallback): IDisposable;
    addOneTimeDisposableListener(eventType: string, listener: ListenerCallback): IDisposable;
    protected addBulkListener(listener: BulkListenerCallback): IDisposable;
    addBulkListener2(listener: BulkListenerCallback): IDisposable;
    private addEmitter(eventEmitter);
    addEmitter2(eventEmitter: IEventEmitter): IDisposable;
    private _removeListener(eventType, listener);
    private _removeBulkListener(listener);
    protected _emitToSpecificTypeListeners(eventType: string, data: any): void;
    protected _emitToBulkListeners(events: EmitterEvent[]): void;
    protected _emitEvents(events: EmitterEvent[]): void;
    emit(eventType: string, data?: any): void;
    deferredEmit(callback: () => any): any;
    private _emitCollected();
}
/**
 * Same as EventEmitter, but guarantees events are delivered in order to each listener
 */
export declare class OrderGuaranteeEventEmitter extends EventEmitter {
    private _emitQueue;
    constructor(allowedEventTypes?: string[]);
    protected _emitToSpecificTypeListeners(eventType: string, data: any): void;
    protected _emitToBulkListeners(events: EmitterEvent[]): void;
    protected _emitEvents(events: EmitterEvent[]): void;
}
