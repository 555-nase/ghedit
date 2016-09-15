import 'vs/css!./glyphMargin';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { DynamicViewOverlay } from 'vs/editor/browser/view/dynamicViewOverlay';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { IRenderingContext } from 'vs/editor/common/view/renderingContext';
export declare class DecorationToRender {
    _decorationToRenderBrand: void;
    startLineNumber: number;
    endLineNumber: number;
    className: string;
    constructor(startLineNumber: number, endLineNumber: number, className: string);
}
export declare abstract class DedupOverlay extends DynamicViewOverlay {
    protected _render(visibleStartLineNumber: number, visibleEndLineNumber: number, decorations: DecorationToRender[]): string[][];
}
export declare class GlyphMarginOverlay extends DedupOverlay {
    private _context;
    private _lineHeight;
    private _glyphMargin;
    private _glyphMarginLeft;
    private _glyphMarginWidth;
    private _renderResult;
    constructor(context: ViewContext);
    dispose(): void;
    onModelFlushed(): boolean;
    onModelDecorationsChanged(e: editorCommon.IViewDecorationsChangedEvent): boolean;
    onModelLinesDeleted(e: editorCommon.IViewLinesDeletedEvent): boolean;
    onModelLineChanged(e: editorCommon.IViewLineChangedEvent): boolean;
    onModelLinesInserted(e: editorCommon.IViewLinesInsertedEvent): boolean;
    onCursorPositionChanged(e: editorCommon.IViewCursorPositionChangedEvent): boolean;
    onCursorSelectionChanged(e: editorCommon.IViewCursorSelectionChangedEvent): boolean;
    onCursorRevealRange(e: editorCommon.IViewRevealRangeEvent): boolean;
    onConfigurationChanged(e: editorCommon.IConfigurationChangedEvent): boolean;
    onLayoutChanged(layoutInfo: editorCommon.EditorLayoutInfo): boolean;
    onScrollChanged(e: editorCommon.IScrollEvent): boolean;
    onZonesChanged(): boolean;
    protected _getDecorations(ctx: IRenderingContext): DecorationToRender[];
    prepareRender(ctx: IRenderingContext): void;
    render(startLineNumber: number, lineNumber: number): string;
}
