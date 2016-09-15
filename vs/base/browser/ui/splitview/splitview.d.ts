import 'vs/css!./splitview';
import ee = require('vs/base/common/eventEmitter');
import sash = require('vs/base/browser/ui/sash/sash');
import Event from 'vs/base/common/event';
export declare enum Orientation {
    VERTICAL = 0,
    HORIZONTAL = 1,
}
export declare enum ViewSizing {
    Flexible = 0,
    Fixed = 1,
}
export interface IOptions {
    orientation?: Orientation;
}
export interface ISashEvent {
    start: number;
    current: number;
}
export interface IViewOptions {
    sizing?: ViewSizing;
    fixedSize?: number;
    minimumSize?: number;
}
export interface IView extends ee.IEventEmitter {
    size: number;
    sizing: ViewSizing;
    fixedSize: number;
    minimumSize: number;
    maximumSize: number;
    render(container: HTMLElement, orientation: Orientation): void;
    layout(size: number, orientation: Orientation): void;
    focus(): void;
}
export declare abstract class View extends ee.EventEmitter implements IView {
    size: number;
    protected _sizing: ViewSizing;
    protected _fixedSize: number;
    protected _minimumSize: number;
    constructor(opts: IViewOptions);
    sizing: ViewSizing;
    fixedSize: number;
    minimumSize: number;
    maximumSize: number;
    protected setFlexible(size?: number): void;
    protected setFixed(size?: number): void;
    abstract render(container: HTMLElement, orientation: Orientation): void;
    abstract focus(): void;
    abstract layout(size: number, orientation: Orientation): void;
}
export interface IHeaderViewOptions {
    headerSize?: number;
}
export declare abstract class HeaderView extends View {
    protected headerSize: number;
    protected header: HTMLElement;
    protected body: HTMLElement;
    constructor(opts: IHeaderViewOptions);
    render(container: HTMLElement, orientation: Orientation): void;
    layout(size: number, orientation: Orientation): void;
    private layoutBodyContainer(orientation);
    dispose(): void;
    protected abstract renderHeader(container: HTMLElement): void;
    protected abstract renderBody(container: HTMLElement): void;
    protected abstract layoutBody(size: number): void;
}
export interface ICollapsibleViewOptions {
    ariaHeaderLabel?: string;
    fixedSize?: number;
    minimumSize?: number;
    headerSize?: number;
    initialState?: CollapsibleState;
}
export declare enum CollapsibleState {
    EXPANDED = 0,
    COLLAPSED = 1,
}
export declare abstract class AbstractCollapsibleView extends HeaderView {
    protected state: CollapsibleState;
    private ariaHeaderLabel;
    private headerClickListener;
    private headerKeyListener;
    private focusTracker;
    constructor(opts: ICollapsibleViewOptions);
    render(container: HTMLElement, orientation: Orientation): void;
    focus(): void;
    layout(size: number, orientation: Orientation): void;
    isExpanded(): boolean;
    expand(): void;
    collapse(): void;
    toggleExpansion(): void;
    private layoutHeader();
    protected changeState(state: CollapsibleState): void;
    dispose(): void;
}
export declare abstract class CollapsibleView extends AbstractCollapsibleView {
    private previousSize;
    constructor(opts: ICollapsibleViewOptions);
    protected changeState(state: CollapsibleState): void;
}
export interface IFixedCollapsibleViewOptions extends ICollapsibleViewOptions {
    expandedBodySize?: number;
}
export declare abstract class FixedCollapsibleView extends AbstractCollapsibleView {
    private _expandedBodySize;
    constructor(opts: IFixedCollapsibleViewOptions);
    fixedSize: number;
    private expandedSize;
    expandedBodySize: number;
    protected changeState(state: CollapsibleState): void;
}
export declare class SplitView implements sash.IHorizontalSashLayoutProvider, sash.IVerticalSashLayoutProvider {
    private orientation;
    private el;
    private size;
    private viewElements;
    private views;
    private viewChangeListeners;
    private viewFocusPreviousListeners;
    private viewFocusNextListeners;
    private viewFocusListeners;
    private initialWeights;
    private sashOrientation;
    private sashes;
    private sashesListeners;
    private measureContainerSize;
    private layoutViewElement;
    private eventWrapper;
    private animationTimeout;
    private _onFocus;
    private state;
    constructor(container: HTMLElement, options?: IOptions);
    onFocus: Event<IView>;
    addView(view: IView, initialWeight?: number, index?: number): void;
    removeView(view: IView): void;
    layout(size?: number): void;
    private onSashStart(sash, event);
    private onSashChange(sash, event);
    private expandCollapse(collapse, collapses, expands, collapseIndexes, expandIndexes);
    private initialLayout();
    private getLastFlexibleViewIndex(exceptIndex?);
    private layoutViews();
    private onViewChange(view, size);
    private setupAnimation();
    private clearAnimation();
    private voidView;
    private areAllViewsFixed();
    getVerticalSashLeft(sash: sash.Sash): number;
    getHorizontalSashTop(sash: sash.Sash): number;
    private getSashPosition(sash);
    dispose(): void;
}
