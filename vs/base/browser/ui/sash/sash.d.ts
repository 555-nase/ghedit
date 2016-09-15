import 'vs/css!./sash';
import { EventEmitter } from 'vs/base/common/eventEmitter';
export interface ISashLayoutProvider {
}
export interface IVerticalSashLayoutProvider extends ISashLayoutProvider {
    getVerticalSashLeft(sash: Sash): number;
    getVerticalSashTop?(sash: Sash): number;
    getVerticalSashHeight?(sash: Sash): number;
}
export interface IHorizontalSashLayoutProvider extends ISashLayoutProvider {
    getHorizontalSashTop(sash: Sash): number;
    getHorizontalSashLeft?(sash: Sash): number;
    getHorizontalSashWidth?(sash: Sash): number;
}
export interface ISashEvent {
    startX: number;
    currentX: number;
    startY: number;
    currentY: number;
}
export interface ISashOptions {
    baseSize?: number;
    orientation?: Orientation;
}
export declare enum Orientation {
    VERTICAL = 0,
    HORIZONTAL = 1,
}
export declare class Sash extends EventEmitter {
    private $e;
    private gesture;
    private layoutProvider;
    private isDisabled;
    private hidden;
    private orientation;
    private size;
    constructor(container: HTMLElement, layoutProvider: ISashLayoutProvider, options?: ISashOptions);
    getHTMLElement(): HTMLElement;
    private getOrientation();
    private onMouseDown(e);
    private onTouchStart(event);
    layout(): void;
    show(): void;
    hide(): void;
    isHidden(): boolean;
    enable(): void;
    disable(): void;
    dispose(): void;
}
