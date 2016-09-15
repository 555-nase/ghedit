import * as DomUtils from 'vs/base/browser/dom';
import { IMouseEvent, StandardMouseWheelEvent } from 'vs/base/browser/mouseEvent';
import { Widget } from 'vs/base/browser/ui/widget';
import { FastDomNode } from 'vs/base/browser/styleMutator';
import { ScrollbarState } from 'vs/base/browser/ui/scrollbar/scrollbarState';
import { ScrollbarArrowOptions } from 'vs/base/browser/ui/scrollbar/scrollbarArrow';
import { Scrollable, ScrollbarVisibility } from 'vs/base/common/scrollable';
export interface IMouseMoveEventData {
    leftButton: boolean;
    posx: number;
    posy: number;
}
export interface ScrollbarHost {
    onMouseWheel(mouseWheelEvent: StandardMouseWheelEvent): void;
    onDragStart(): void;
    onDragEnd(): void;
}
export interface AbstractScrollbarOptions {
    canUseTranslate3d: boolean;
    lazyRender: boolean;
    host: ScrollbarHost;
    scrollbarState: ScrollbarState;
    visibility: ScrollbarVisibility;
    extraScrollbarClassName: string;
    scrollable: Scrollable;
}
export declare abstract class AbstractScrollbar extends Widget {
    protected _canUseTranslate3d: boolean;
    protected _host: ScrollbarHost;
    protected _scrollable: Scrollable;
    private _lazyRender;
    private _scrollbarState;
    private _visibilityController;
    private _mouseMoveMonitor;
    domNode: FastDomNode;
    slider: FastDomNode;
    protected _shouldRender: boolean;
    constructor(opts: AbstractScrollbarOptions);
    /**
     * Creates the dom node for an arrow & adds it to the container
     */
    protected _createArrow(opts: ScrollbarArrowOptions): void;
    /**
     * Creates the slider dom node, adds it to the container & hooks up the events
     */
    protected _createSlider(top: number, left: number, width: number, height: number): void;
    setCanUseTranslate3d(canUseTranslate3d: boolean): boolean;
    protected _onElementSize(visibleSize: number): boolean;
    protected _onElementScrollSize(elementScrollSize: number): boolean;
    protected _onElementScrollPosition(elementScrollPosition: number): boolean;
    beginReveal(): void;
    beginHide(): void;
    render(): void;
    private _domNodeMouseDown(e);
    delegateMouseDown(browserEvent: MouseEvent): void;
    private _onMouseDown(e);
    private _sliderMouseDown(e);
    validateScrollPosition(desiredScrollPosition: number): number;
    setDesiredScrollPosition(desiredScrollPosition: number): boolean;
    protected abstract _renderDomNode(largeSize: number, smallSize: number): void;
    protected abstract _updateSlider(sliderSize: number, sliderPosition: number): void;
    protected abstract _mouseDownRelativePosition(e: IMouseEvent, domNodePosition: DomUtils.IDomNodePagePosition): number;
    protected abstract _sliderMousePosition(e: IMouseMoveEventData): number;
    protected abstract _sliderOrthogonalMousePosition(e: IMouseMoveEventData): number;
    protected abstract _getScrollPosition(): number;
    protected abstract _setScrollPosition(elementScrollPosition: number): void;
}
