import { EmitterEvent } from 'vs/base/common/eventEmitter';
import { IViewEventBus, IViewEventHandler } from 'vs/editor/common/view/viewContext';
export declare class ViewEventDispatcher implements IViewEventBus {
    private _eventHandlerGateKeeper;
    private _eventHandlers;
    private _eventQueue;
    private _isConsumingQueue;
    constructor(eventHandlerGateKeeper: (callback: () => void) => void);
    addEventHandler(eventHandler: IViewEventHandler): void;
    removeEventHandler(eventHandler: IViewEventHandler): void;
    emit(eventType: string, data?: any): void;
    emitMany(events: EmitterEvent[]): void;
    private consumeQueue();
    private _doConsumeQueue();
}
