import 'vs/css!./leftRightWidget';
import { Builder } from 'vs/base/browser/builder';
import { IDisposable } from 'vs/base/common/lifecycle';
export interface IRenderer {
    (container: HTMLElement): IDisposable;
}
export declare class LeftRightWidget {
    private $el;
    private toDispose;
    constructor(container: Builder, renderLeftFn: IRenderer, renderRightFn: IRenderer);
    constructor(container: HTMLElement, renderLeftFn: IRenderer, renderRightFn: IRenderer);
    dispose(): void;
}
