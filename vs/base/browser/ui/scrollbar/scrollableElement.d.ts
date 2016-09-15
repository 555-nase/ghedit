import 'vs/css!./media/scrollbars';
import { ScrollableElementCreationOptions, ScrollableElementChangeOptions } from 'vs/base/browser/ui/scrollbar/scrollableElementOptions';
import { ScrollEvent, INewScrollState } from 'vs/base/common/scrollable';
import { Widget } from 'vs/base/browser/ui/widget';
import Event from 'vs/base/common/event';
export interface IOverviewRulerLayoutInfo {
    parent: HTMLElement;
    insertBefore: HTMLElement;
}
export declare class ScrollableElement extends Widget {
    private _options;
    private _scrollable;
    private _verticalScrollbar;
    private _horizontalScrollbar;
    private _domNode;
    private _leftShadowDomNode;
    private _topShadowDomNode;
    private _topLeftShadowDomNode;
    private _listenOnDomNode;
    private _mouseWheelToDispose;
    private _isDragging;
    private _mouseIsOver;
    private _hideTimeout;
    private _shouldRender;
    private _onScroll;
    onScroll: Event<ScrollEvent>;
    constructor(element: HTMLElement, options: ScrollableElementCreationOptions);
    dispose(): void;
    /**
     * Get the generated 'scrollable' dom node
     */
    getDomNode(): HTMLElement;
    getOverviewRulerLayoutInfo(): IOverviewRulerLayoutInfo;
    /**
     * Delegate a mouse down event to the vertical scrollbar.
     * This is to help with clicking somewhere else and having the scrollbar react.
     */
    delegateVerticalScrollbarMouseDown(browserEvent: MouseEvent): void;
    updateState(newState: INewScrollState): void;
    getWidth(): number;
    getScrollWidth(): number;
    getScrollLeft(): number;
    getHeight(): number;
    getScrollHeight(): number;
    getScrollTop(): number;
    /**
     * Update the class name of the scrollable element.
     */
    updateClassName(newClassName: string): void;
    /**
     * Update configuration options for the scrollbar.
     * Really this is Editor.IEditorScrollbarOptions, but base shouldn't
     * depend on Editor.
     */
    updateOptions(newOptions: ScrollableElementChangeOptions): void;
    private _setListeningToMouseWheel(shouldListen);
    private _onMouseWheel(e);
    private _onDidScroll(e);
    /**
     * Render / mutate the DOM now.
     * Should be used together with the ctor option `lazyRender`.
     */
    renderNow(): void;
    private _render();
    private _onDragStart();
    private _onDragEnd();
    private _onMouseOut(e);
    private _onMouseOver(e);
    private _reveal();
    private _hide();
    private _scheduleHide();
}
export declare class DomScrollableElement extends ScrollableElement {
    private _element;
    constructor(element: HTMLElement, options: ScrollableElementCreationOptions);
    scanDomNode(): void;
}
