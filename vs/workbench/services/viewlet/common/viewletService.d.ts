import { TPromise } from 'vs/base/common/winjs.base';
import Event from 'vs/base/common/event';
import { IViewlet } from 'vs/workbench/common/viewlet';
import { ServiceIdentifier } from 'vs/platform/instantiation/common/instantiation';
export declare const IViewletService: {
    (...args: any[]): void;
    type: IViewletService;
};
export interface IViewletService {
    _serviceBrand: ServiceIdentifier<any>;
    onDidActiveViewletChange: Event<IViewlet>;
    /**
     * Opens a viewlet with the given identifier and pass keyboard focus to it if specified.
     */
    openViewlet(id: string, focus?: boolean): TPromise<IViewlet>;
    /**
     * Returns the current active viewlet or null if none
     */
    getActiveViewlet(): IViewlet;
}
