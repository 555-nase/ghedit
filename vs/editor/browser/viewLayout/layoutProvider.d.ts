import { IDisposable } from 'vs/base/common/lifecycle';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { ViewEventHandler } from 'vs/editor/common/viewModel/viewEventHandler';
import { IViewModel } from 'vs/editor/common/viewModel/viewModel';
import { ViewLinesViewportData } from 'vs/editor/common/viewLayout/viewLinesViewportData';
import { IViewEventBus } from 'vs/editor/common/view/viewContext';
export interface IWhitespaceManager {
    /**
     * Reserve rendering space.
     * @param height is specified in pixels.
     * @return an identifier that can be later used to remove or change the whitespace.
     */
    addWhitespace(afterLineNumber: number, ordinal: number, height: number): number;
    /**
     * Change the properties of a whitespace.
     * @param height is specified in pixels.
     */
    changeWhitespace(id: number, newAfterLineNumber: number, newHeight: number): boolean;
    /**
     * Remove rendering space
     */
    removeWhitespace(id: number): boolean;
    /**
     * Get the layout information for whitespaces currently in the viewport
     */
    getWhitespaceViewportData(): editorCommon.IViewWhitespaceViewportData[];
    getWhitespaces(): editorCommon.IEditorWhitespace[];
}
export interface ILayoutProvider extends IVerticalLayoutProvider, IScrollingProvider {
    dispose(): void;
    getCenteredViewLineNumberInViewport(): number;
    getCurrentViewport(): editorCommon.Viewport;
    onMaxLineWidthChanged(width: number): void;
    saveState(): editorCommon.IViewState;
    restoreState(state: editorCommon.IViewState): void;
}
export interface IScrollingProvider {
    getOverviewRulerInsertData(): {
        parent: HTMLElement;
        insertBefore: HTMLElement;
    };
    getScrollbarContainerDomNode(): HTMLElement;
    delegateVerticalScrollbarMouseDown(browserEvent: MouseEvent): void;
    getScrolledTopFromAbsoluteTop(top: number): number;
    getScrollWidth(): number;
    getScrollLeft(): number;
    getScrollHeight(): number;
    getScrollTop(): number;
    setScrollPosition(position: editorCommon.INewScrollPosition): void;
}
export interface IVerticalLayoutProvider {
    /**
     * Compute vertical offset (top) of line number
     */
    getVerticalOffsetForLineNumber(lineNumber: number): number;
    /**
     * Returns the height in pixels for `lineNumber`.
     */
    heightInPxForLine(lineNumber: number): number;
    /**
     * Return line number at `verticalOffset` or closest line number
     */
    getLineNumberAtVerticalOffset(verticalOffset: number): number;
    /**
     * Compute content height (including one extra scroll page if necessary)
     */
    getTotalHeight(): number;
    /**
     * Compute the lines that need to be rendered in the current viewport position.
     */
    getLinesViewportData(): ViewLinesViewportData;
}
export declare class LayoutProvider extends ViewEventHandler implements IDisposable, ILayoutProvider, IWhitespaceManager {
    static LINES_HORIZONTAL_EXTRA_PX: number;
    private configuration;
    private privateViewEventBus;
    private model;
    private scrollManager;
    private linesLayout;
    constructor(configuration: editorCommon.IConfiguration, model: IViewModel, privateViewEventBus: IViewEventBus, linesContent: HTMLElement, viewDomNode: HTMLElement, overflowGuardDomNode: HTMLElement);
    dispose(): void;
    private updateLineCount();
    onZonesChanged(): boolean;
    onModelFlushed(): boolean;
    onModelLinesDeleted(e: editorCommon.IViewLinesDeletedEvent): boolean;
    onModelLinesInserted(e: editorCommon.IViewLinesInsertedEvent): boolean;
    onConfigurationChanged(e: editorCommon.IConfigurationChangedEvent): boolean;
    private _updateHeight();
    getCurrentViewport(): editorCommon.Viewport;
    getCenteredViewLineNumberInViewport(): number;
    private _emitLayoutChangedEvent();
    emitLayoutChangedEvent(): void;
    private _computeScrollWidth(maxLineWidth, viewportWidth);
    onMaxLineWidthChanged(maxLineWidth: number): void;
    saveState(): editorCommon.IViewState;
    restoreState(state: editorCommon.IViewState): void;
    addWhitespace(afterLineNumber: number, ordinal: number, height: number): number;
    changeWhitespace(id: number, newAfterLineNumber: number, newHeight: number): boolean;
    removeWhitespace(id: number): boolean;
    getVerticalOffsetForLineNumber(lineNumber: number): number;
    heightInPxForLine(lineNumber: number): number;
    isAfterLines(verticalOffset: number): boolean;
    getLineNumberAtVerticalOffset(verticalOffset: number): number;
    getTotalHeight(): number;
    getWhitespaceAtVerticalOffset(verticalOffset: number): editorCommon.IViewWhitespaceViewportData;
    getLinesViewportData(): ViewLinesViewportData;
    getWhitespaceViewportData(): editorCommon.IViewWhitespaceViewportData[];
    getWhitespaces(): editorCommon.IEditorWhitespace[];
    getOverviewRulerInsertData(): {
        parent: HTMLElement;
        insertBefore: HTMLElement;
    };
    getScrollbarContainerDomNode(): HTMLElement;
    delegateVerticalScrollbarMouseDown(browserEvent: MouseEvent): void;
    getScrollWidth(): number;
    getScrollLeft(): number;
    getScrollHeight(): number;
    getScrollTop(): number;
    setScrollPosition(position: editorCommon.INewScrollPosition): void;
    getScrolledTopFromAbsoluteTop(top: number): number;
    renderScrollbar(): void;
}
