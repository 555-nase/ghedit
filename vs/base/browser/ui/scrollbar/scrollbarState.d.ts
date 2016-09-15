export declare class ScrollbarState {
    private _scrollbarSize;
    private _oppositeScrollbarSize;
    private _arrowSize;
    private _visibleSize;
    private _scrollSize;
    private _scrollPosition;
    /**
     * `visibleSize` - `oppositeScrollbarSize`
     */
    private _computedAvailableSize;
    /**
     * `computedAvailableSize` - 2 * `arrowSize`
     */
    private _computedRepresentableSize;
    /**
     * `computedRepresentableSize` / `scrollSize`
     */
    private _computedRatio;
    /**
     * (`scrollSize` > `visibleSize`)
     */
    private _computedIsNeeded;
    private _computedSliderSize;
    private _computedSliderPosition;
    constructor(arrowSize: number, scrollbarSize: number, oppositeScrollbarSize: number);
    setVisibleSize(visibleSize: number): boolean;
    setScrollSize(scrollSize: number): boolean;
    setScrollPosition(scrollPosition: number): boolean;
    private _refreshComputedValues();
    getArrowSize(): number;
    getRectangleLargeSize(): number;
    getRectangleSmallSize(): number;
    isNeeded(): boolean;
    getSliderSize(): number;
    getSliderPosition(): number;
    convertSliderPositionToScrollPosition(desiredSliderPosition: number): number;
    validateScrollPosition(desiredScrollPosition: number): number;
}
