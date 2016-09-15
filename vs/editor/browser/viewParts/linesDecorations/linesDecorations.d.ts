import 'vs/css!./linesDecorations';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { DecorationToRender, DedupOverlay } from 'vs/editor/browser/viewParts/glyphMargin/glyphMargin';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { IRenderingContext } from 'vs/editor/common/view/renderingContext';
export declare class LinesDecorationsOverlay extends DedupOverlay {
    private _context;
    private _lineHeight;
    private _decorationsLeft;
    private _decorationsWidth;
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
