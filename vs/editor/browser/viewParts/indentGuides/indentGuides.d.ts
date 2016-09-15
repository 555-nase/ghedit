import 'vs/css!./indentGuides';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { DynamicViewOverlay } from 'vs/editor/browser/view/dynamicViewOverlay';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { IRenderingContext } from 'vs/editor/common/view/renderingContext';
export declare class IndentGuidesOverlay extends DynamicViewOverlay {
    private _context;
    private _lineHeight;
    private _spaceWidth;
    private _renderResult;
    private _enabled;
    constructor(context: ViewContext);
    dispose(): void;
    onModelFlushed(): boolean;
    onModelLinesDeleted(e: editorCommon.IViewLinesDeletedEvent): boolean;
    onModelLineChanged(e: editorCommon.IViewLineChangedEvent): boolean;
    onModelLinesInserted(e: editorCommon.IViewLinesInsertedEvent): boolean;
    onConfigurationChanged(e: editorCommon.IConfigurationChangedEvent): boolean;
    onLayoutChanged(layoutInfo: editorCommon.EditorLayoutInfo): boolean;
    onScrollChanged(e: editorCommon.IScrollEvent): boolean;
    onZonesChanged(): boolean;
    prepareRender(ctx: IRenderingContext): void;
    render(startLineNumber: number, lineNumber: number): string;
}
