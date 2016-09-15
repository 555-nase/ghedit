import 'vs/css!./lineNumbers';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { DynamicViewOverlay } from 'vs/editor/browser/view/dynamicViewOverlay';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { IRenderingContext } from 'vs/editor/common/view/renderingContext';
export declare class LineNumbersOverlay extends DynamicViewOverlay {
    private _context;
    private _lineHeight;
    private _lineNumbers;
    private _lineNumbersLeft;
    private _lineNumbersWidth;
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
    render(startLineNumber: number, lineNumber: number): string;
}
