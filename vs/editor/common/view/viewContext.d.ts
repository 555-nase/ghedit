import { IConfiguration } from 'vs/editor/common/editorCommon';
import { EmitterEvent } from 'vs/base/common/eventEmitter';
import { IViewModel } from 'vs/editor/common/viewModel/viewModel';
export interface IViewEventBus {
    emit(eventType: string, data?: any): void;
}
export interface IViewEventHandler {
    handleEvents(events: EmitterEvent[]): void;
}
export declare class ViewContext {
    configuration: IConfiguration;
    model: IViewModel;
    privateViewEventBus: IViewEventBus;
    addEventHandler: (eventHandler: IViewEventHandler) => void;
    removeEventHandler: (eventHandler: IViewEventHandler) => void;
    constructor(configuration: IConfiguration, model: IViewModel, privateViewEventBus: IViewEventBus, addEventHandler: (eventHandler: IViewEventHandler) => void, removeEventHandler: (eventHandler: IViewEventHandler) => void);
}
