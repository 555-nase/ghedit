import { AbstractScrollbar, ScrollbarHost, IMouseMoveEventData } from 'vs/base/browser/ui/scrollbar/abstractScrollbar';
import { IMouseEvent } from 'vs/base/browser/mouseEvent';
import { IDomNodePagePosition } from 'vs/base/browser/dom';
import { ScrollableElementResolvedOptions } from 'vs/base/browser/ui/scrollbar/scrollableElementOptions';
import { Scrollable, ScrollEvent } from 'vs/base/common/scrollable';
export declare class VerticalScrollbar extends AbstractScrollbar {
    constructor(scrollable: Scrollable, options: ScrollableElementResolvedOptions, host: ScrollbarHost);
    protected _updateSlider(sliderSize: number, sliderPosition: number): void;
    protected _renderDomNode(largeSize: number, smallSize: number): void;
    onDidScroll(e: ScrollEvent): boolean;
    protected _mouseDownRelativePosition(e: IMouseEvent, domNodePosition: IDomNodePagePosition): number;
    protected _sliderMousePosition(e: IMouseMoveEventData): number;
    protected _sliderOrthogonalMousePosition(e: IMouseMoveEventData): number;
    protected _getScrollPosition(): number;
    protected _setScrollPosition(scrollPosition: number): void;
}
