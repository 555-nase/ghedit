import { IConfigurationChangedEvent, IPosition } from 'vs/editor/common/editorCommon';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { IRenderingContext, IRestrictedRenderingContext } from 'vs/editor/common/view/renderingContext';
export declare class ViewCursor {
    private _context;
    private _position;
    private _domNode;
    private _positionTop;
    private _positionLeft;
    private _isInEditableRange;
    private _isVisible;
    private _isInViewport;
    private _cursorStyle;
    private _lastRenderedContent;
    private _lineHeight;
    constructor(context: ViewContext, isSecondary: boolean);
    private _createCursorDomNode(isSecondary);
    getDomNode(): HTMLElement;
    getIsInEditableRange(): boolean;
    getPositionTop(): number;
    getPosition(): IPosition;
    show(): void;
    hide(): void;
    onModelFlushed(): boolean;
    onCursorPositionChanged(position: IPosition, isInEditableRange: boolean): boolean;
    onConfigurationChanged(e: IConfigurationChangedEvent): boolean;
    prepareRender(ctx: IRenderingContext): void;
    private _getRenderedContent();
    render(ctx: IRestrictedRenderingContext): void;
    private updatePosition(newPosition);
}
