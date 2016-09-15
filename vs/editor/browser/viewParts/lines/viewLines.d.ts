import 'vs/css!./viewLines';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { ViewLayer } from 'vs/editor/browser/view/viewLayer';
import { ViewLine } from 'vs/editor/browser/viewParts/lines/viewLine';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { ViewLinesViewportData } from 'vs/editor/common/viewLayout/viewLinesViewportData';
import { VisibleRange, LineVisibleRanges } from 'vs/editor/common/view/renderingContext';
import { ILayoutProvider } from 'vs/editor/browser/viewLayout/layoutProvider';
export declare class ViewLines extends ViewLayer<ViewLine> {
    /**
     * Width to extends a line to render the line feed at the end of the line
     */
    private static LINE_FEED_WIDTH;
    /**
     * Adds this ammount of pixels to the right of lines (no-one wants to type near the edge of the viewport)
     */
    private static HORIZONTAL_EXTRA_PX;
    private _layoutProvider;
    private _textRangeRestingSpot;
    private _lineHeight;
    private _isViewportWrapping;
    private _revealHorizontalRightPadding;
    private _canUseTranslate3d;
    private _maxLineWidth;
    private _asyncUpdateLineWidths;
    private _lastCursorRevealRangeHorizontallyEvent;
    private _lastRenderedData;
    constructor(context: ViewContext, layoutProvider: ILayoutProvider);
    dispose(): void;
    getDomNode(): HTMLElement;
    onConfigurationChanged(e: editorCommon.IConfigurationChangedEvent): boolean;
    onLayoutChanged(layoutInfo: editorCommon.EditorLayoutInfo): boolean;
    onModelFlushed(): boolean;
    onModelDecorationsChanged(e: editorCommon.IViewDecorationsChangedEvent): boolean;
    onCursorRevealRange(e: editorCommon.IViewRevealRangeEvent): boolean;
    onCursorScrollRequest(e: editorCommon.IViewScrollRequestEvent): boolean;
    onScrollChanged(e: editorCommon.IScrollEvent): boolean;
    getPositionFromDOMInfo(spanNode: HTMLElement, offset: number): editorCommon.IPosition;
    private _getLineNumberFromDOMInfo(spanNode);
    getLineWidth(lineNumber: number): number;
    linesVisibleRangesForRange(range: editorCommon.IRange, includeNewLines: boolean): LineVisibleRanges[];
    visibleRangesForRange2(range: editorCommon.IRange, deltaTop: number): VisibleRange[];
    _createLine(): ViewLine;
    private _updateLineWidths();
    prepareRender(): void;
    render(): void;
    renderText(linesViewportData: ViewLinesViewportData, onAfterLinesRendered: () => void): void;
    private _ensureMaxLineWidth(lineWidth);
    private _computeScrollTopToRevealRange(viewport, range, verticalType);
    private _computeScrollLeftToRevealRange(range);
    private _computeMinimumScrolling(viewportStart, viewportEnd, boxStart, boxEnd);
}
