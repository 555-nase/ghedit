import { IScrollEvent, IConfigurationChangedEvent, EditorLayoutInfo } from 'vs/editor/common/editorCommon';
import { IVisibleLineData, ViewLayer } from 'vs/editor/browser/view/viewLayer';
import { DynamicViewOverlay } from 'vs/editor/browser/view/dynamicViewOverlay';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { IRenderingContext, IRestrictedRenderingContext } from 'vs/editor/common/view/renderingContext';
import { ILayoutProvider } from 'vs/editor/browser/viewLayout/layoutProvider';
import { InlineDecoration } from 'vs/editor/common/viewModel/viewModel';
export declare class ViewOverlays extends ViewLayer<ViewOverlayLine> {
    private _dynamicOverlays;
    private _isFocused;
    _layoutProvider: ILayoutProvider;
    constructor(context: ViewContext, layoutProvider: ILayoutProvider);
    shouldRender(): boolean;
    dispose(): void;
    getDomNode(): HTMLElement;
    addDynamicOverlay(overlay: DynamicViewOverlay): void;
    onViewFocusChanged(isFocused: boolean): boolean;
    _createLine(): ViewOverlayLine;
    prepareRender(ctx: IRenderingContext): void;
    render(ctx: IRestrictedRenderingContext): void;
    _viewOverlaysRender(ctx: IRestrictedRenderingContext): void;
}
export declare class ViewOverlayLine implements IVisibleLineData {
    private _context;
    private _dynamicOverlays;
    private _domNode;
    private _renderPieces;
    private _lineHeight;
    constructor(context: ViewContext, dynamicOverlays: DynamicViewOverlay[]);
    getDomNode(): HTMLElement;
    setDomNode(domNode: HTMLElement): void;
    onContentChanged(): void;
    onLinesInsertedAbove(): void;
    onLinesDeletedAbove(): void;
    onLineChangedAbove(): void;
    onTokensChanged(): void;
    onConfigurationChanged(e: IConfigurationChangedEvent): void;
    shouldUpdateHTML(startLineNumber: number, lineNumber: number, inlineDecorations: InlineDecoration[]): boolean;
    getLineOuterHTML(out: string[], lineNumber: number, deltaTop: number): void;
    getLineInnerHTML(lineNumber: number): string;
    layoutLine(lineNumber: number, deltaTop: number): void;
}
export declare class ContentViewOverlays extends ViewOverlays {
    private _scrollWidth;
    private _contentWidth;
    constructor(context: ViewContext, layoutProvider: ILayoutProvider);
    onConfigurationChanged(e: IConfigurationChangedEvent): boolean;
    onScrollChanged(e: IScrollEvent): boolean;
    _viewOverlaysRender(ctx: IRestrictedRenderingContext): void;
}
export declare class MarginViewOverlays extends ViewOverlays {
    private _glyphMarginLeft;
    private _glyphMarginWidth;
    private _scrollHeight;
    private _contentLeft;
    private _canUseTranslate3d;
    constructor(context: ViewContext, layoutProvider: ILayoutProvider);
    protected _extraDomNodeHTML(): string;
    private _getGlyphMarginDomNode();
    onScrollChanged(e: IScrollEvent): boolean;
    onLayoutChanged(layoutInfo: EditorLayoutInfo): boolean;
    onConfigurationChanged(e: IConfigurationChangedEvent): boolean;
    _viewOverlaysRender(ctx: IRestrictedRenderingContext): void;
}
