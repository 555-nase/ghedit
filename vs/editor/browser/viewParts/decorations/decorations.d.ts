import 'vs/css!./decorations';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { DynamicViewOverlay } from 'vs/editor/browser/view/dynamicViewOverlay';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { IRenderingContext } from 'vs/editor/common/view/renderingContext';
export declare class DecorationsOverlay extends DynamicViewOverlay {
    private _context;
    private _lineHeight;
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
    prepareRender(ctx: IRenderingContext): void;
    private _renderWholeLineDecorations(ctx, decorations, output);
    private _renderNormalDecorations(ctx, decorations, output);
    render(startLineNumber: number, lineNumber: number): string;
}
