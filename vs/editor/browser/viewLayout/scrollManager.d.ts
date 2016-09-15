import { IDisposable } from 'vs/base/common/lifecycle';
import { IOverviewRulerLayoutInfo } from 'vs/base/browser/ui/scrollbar/scrollableElement';
import { IConfiguration, INewScrollPosition } from 'vs/editor/common/editorCommon';
import { IViewEventBus } from 'vs/editor/common/view/viewContext';
export declare class ScrollManager implements IDisposable {
    private configuration;
    private privateViewEventBus;
    private toDispose;
    private linesContent;
    private scrollbar;
    constructor(configuration: IConfiguration, privateViewEventBus: IViewEventBus, linesContent: HTMLElement, viewDomNode: HTMLElement, overflowGuardDomNode: HTMLElement);
    dispose(): void;
    renderScrollbar(): void;
    onLayoutInfoChanged(): void;
    getOverviewRulerLayoutInfo(): IOverviewRulerLayoutInfo;
    getScrollbarContainerDomNode(): HTMLElement;
    delegateVerticalScrollbarMouseDown(browserEvent: MouseEvent): void;
    getWidth(): number;
    getScrollWidth(): number;
    getScrollLeft(): number;
    getHeight(): number;
    getScrollHeight(): number;
    getScrollTop(): number;
    setScrollPosition(position: INewScrollPosition): void;
    setScrollHeight(scrollHeight: number): void;
    setScrollWidth(scrollWidth: number): void;
}
