import { Disposable } from 'vs/base/common/lifecycle';
import Event from 'vs/base/common/event';
export declare enum ScrollbarVisibility {
    Auto = 1,
    Hidden = 2,
    Visible = 3,
}
export interface ScrollEvent {
    width: number;
    scrollWidth: number;
    scrollLeft: number;
    height: number;
    scrollHeight: number;
    scrollTop: number;
    widthChanged: boolean;
    scrollWidthChanged: boolean;
    scrollLeftChanged: boolean;
    heightChanged: boolean;
    scrollHeightChanged: boolean;
    scrollTopChanged: boolean;
}
export interface INewScrollState {
    width?: number;
    scrollWidth?: number;
    scrollLeft?: number;
    height?: number;
    scrollHeight?: number;
    scrollTop?: number;
}
export declare class Scrollable extends Disposable {
    _scrollableBrand: void;
    private _width;
    private _scrollWidth;
    private _scrollLeft;
    private _height;
    private _scrollHeight;
    private _scrollTop;
    private _onScroll;
    onScroll: Event<ScrollEvent>;
    constructor();
    getWidth(): number;
    getScrollWidth(): number;
    getScrollLeft(): number;
    getHeight(): number;
    getScrollHeight(): number;
    getScrollTop(): number;
    updateState(newState: INewScrollState): void;
}
