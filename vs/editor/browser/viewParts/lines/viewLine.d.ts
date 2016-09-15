import { IConfigurationChangedEvent } from 'vs/editor/common/editorCommon';
import { IVisibleLineData } from 'vs/editor/browser/view/viewLayer';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { HorizontalRange } from 'vs/editor/common/view/renderingContext';
import { InlineDecoration } from 'vs/editor/common/viewModel/viewModel';
export declare class ViewLine implements IVisibleLineData {
    protected _context: ViewContext;
    private _renderWhitespace;
    private _renderControlCharacters;
    private _spaceWidth;
    private _lineHeight;
    private _stopRenderingLineAfter;
    private _domNode;
    private _lineParts;
    private _isInvalid;
    private _isMaybeInvalid;
    protected _charOffsetInPart: number[];
    private _lastRenderedPartIndex;
    private _cachedWidth;
    constructor(context: ViewContext);
    getDomNode(): HTMLElement;
    setDomNode(domNode: HTMLElement): void;
    onContentChanged(): void;
    onLinesInsertedAbove(): void;
    onLinesDeletedAbove(): void;
    onLineChangedAbove(): void;
    onTokensChanged(): void;
    onModelDecorationsChanged(): void;
    onConfigurationChanged(e: IConfigurationChangedEvent): void;
    shouldUpdateHTML(startLineNumber: number, lineNumber: number, inlineDecorations: InlineDecoration[]): boolean;
    getLineOuterHTML(out: string[], lineNumber: number, deltaTop: number): void;
    getLineInnerHTML(lineNumber: number): string;
    layoutLine(lineNumber: number, deltaTop: number): void;
    private _render(lineNumber, lineParts);
    protected _getReadingTarget(): HTMLElement;
    /**
     * Width of the line in pixels
     */
    getWidth(): number;
    /**
     * Visible ranges for a model range
     */
    getVisibleRangesForRange(startColumn: number, endColumn: number, clientRectDeltaLeft: number, endNode: HTMLElement): HorizontalRange[];
    protected _readVisibleRangesForRange(startColumn: number, endColumn: number, clientRectDeltaLeft: number, endNode: HTMLElement): HorizontalRange[];
    protected _readRawVisibleRangesForPosition(column: number, clientRectDeltaLeft: number, endNode: HTMLElement): HorizontalRange[];
    private _readRawVisibleRangesForRange(startColumn, endColumn, clientRectDeltaLeft, endNode);
    protected _getScaleRatio(): number;
    /**
     * Returns the column for the text found at a specific offset inside a rendered dom node
     */
    getColumnOfNodeOffset(lineNumber: number, spanNode: HTMLElement, offset: number): number;
}
export declare let createLine: (context: ViewContext) => ViewLine;
