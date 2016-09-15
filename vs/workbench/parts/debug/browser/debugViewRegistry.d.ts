import { IActionRunner } from 'vs/base/common/actions';
import { IViewletView } from 'vs/workbench/browser/viewlet';
export interface IDebugViewConstructorSignature {
    new (actionRunner: IActionRunner, viewletSetings: any, ...services: {
        _serviceBrand: any;
    }[]): IViewletView;
}
export interface IDebugViewRegistry {
    registerDebugView(view: IDebugViewConstructorSignature, order: number): void;
    getDebugViews(): IDebugViewConstructorSignature[];
}
export declare const DebugViewRegistry: IDebugViewRegistry;
