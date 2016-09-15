import * as editorCommon from 'vs/editor/common/editorCommon';
import { ViewPart } from 'vs/editor/browser/view/viewPart';
import { FastDomNode } from 'vs/base/browser/styleMutator';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { ViewLinesViewportData } from 'vs/editor/common/viewLayout/viewLinesViewportData';
import { InlineDecoration } from 'vs/editor/common/viewModel/viewModel';
export interface IVisibleLineData {
    getDomNode(): HTMLElement;
    setDomNode(domNode: HTMLElement): void;
    onContentChanged(): void;
    onLinesInsertedAbove(): void;
    onLinesDeletedAbove(): void;
    onLineChangedAbove(): void;
    onTokensChanged(): void;
    onConfigurationChanged(e: editorCommon.IConfigurationChangedEvent): void;
    getLineOuterHTML(out: string[], lineNumber: number, deltaTop: number): void;
    getLineInnerHTML(lineNumber: number): string;
    shouldUpdateHTML(startLineNumber: number, lineNumber: number, inlineDecorations: InlineDecoration[]): boolean;
    layoutLine(lineNumber: number, deltaTop: number): void;
}
export interface ILine {
    onContentChanged(): void;
    onLinesInsertedAbove(): void;
    onLinesDeletedAbove(): void;
    onLineChangedAbove(): void;
    onTokensChanged(): void;
}
export declare class RenderedLinesCollection<T extends ILine> {
    private _lines;
    private _rendLineNumberStart;
    private _createLine;
    constructor(createLine: () => T);
    _set(rendLineNumberStart: number, lines: T[]): void;
    _get(): {
        rendLineNumberStart: number;
        lines: T[];
    };
    /**
     * @returns Inclusive line number that is inside this collection
     */
    getStartLineNumber(): number;
    /**
     * @returns Inclusive line number that is inside this collection
     */
    getEndLineNumber(): number;
    getCount(): number;
    getLine(lineNumber: number): T;
    /**
     * @returns Lines that were removed from this collection
     */
    onModelLinesDeleted(deleteFromLineNumber: number, deleteToLineNumber: number): T[];
    onModelLineChanged(changedLineNumber: number): boolean;
    onModelLinesInserted(insertFromLineNumber: number, insertToLineNumber: number): T[];
    onModelTokensChanged(changedFromLineNumber: number, changedToLineNumber: number): boolean;
}
export declare abstract class ViewLayer<T extends IVisibleLineData> extends ViewPart {
    protected domNode: FastDomNode;
    protected _linesCollection: RenderedLinesCollection<T>;
    private _renderer;
    private _scrollDomNode;
    private _scrollDomNodeIsAbove;
    constructor(context: ViewContext);
    dispose(): void;
    protected _extraDomNodeHTML(): string;
    onConfigurationChanged(e: editorCommon.IConfigurationChangedEvent): boolean;
    onLayoutChanged(layoutInfo: editorCommon.EditorLayoutInfo): boolean;
    onScrollChanged(e: editorCommon.IScrollEvent): boolean;
    onZonesChanged(): boolean;
    onModelFlushed(): boolean;
    onModelLinesDeleted(e: editorCommon.IViewLinesDeletedEvent): boolean;
    onModelLineChanged(e: editorCommon.IViewLineChangedEvent): boolean;
    onModelLinesInserted(e: editorCommon.IViewLinesInsertedEvent): boolean;
    onModelTokensChanged(e: editorCommon.IViewTokensChangedEvent): boolean;
    _renderLines(linesViewportData: ViewLinesViewportData): void;
    _createDomNode(): FastDomNode;
    protected abstract _createLine(): T;
}
