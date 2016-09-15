import { ElectronWindow } from 'vs/workbench/electron-browser/window';
import Event from 'vs/base/common/event';
export declare const IWindowService: {
    (...args: any[]): void;
    type: IWindowService;
};
export interface IWindowServices {
    windowService?: IWindowService;
}
export interface IBroadcast {
    channel: string;
    payload: any;
}
export interface IWindowService {
    _serviceBrand: any;
    getWindowId(): number;
    getWindow(): ElectronWindow;
    registerWindow(win: ElectronWindow): void;
    broadcast(b: IBroadcast, target?: string): void;
    onBroadcast: Event<IBroadcast>;
}
export declare class WindowService implements IWindowService {
    _serviceBrand: any;
    private win;
    private windowId;
    private _onBroadcast;
    constructor();
    private registerListeners();
    onBroadcast: Event<IBroadcast>;
    getWindowId(): number;
    getWindow(): ElectronWindow;
    registerWindow(win: ElectronWindow): void;
    broadcast(b: IBroadcast, target?: string): void;
}
