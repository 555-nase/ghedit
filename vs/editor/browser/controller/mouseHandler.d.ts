import { IDisposable } from 'vs/base/common/lifecycle';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { ViewEventHandler } from 'vs/editor/common/viewModel/viewEventHandler';
import { MouseTargetFactory } from 'vs/editor/browser/controller/mouseTarget';
import * as editorBrowser from 'vs/editor/browser/editorBrowser';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { VisibleRange } from 'vs/editor/common/view/renderingContext';
import { EditorMouseEvent } from 'vs/editor/browser/editorDom';
export interface IPointerHandlerHelper {
    viewDomNode: HTMLElement;
    linesContentDomNode: HTMLElement;
    focusTextArea(): void;
    isDirty(): boolean;
    getScrollLeft(): number;
    getScrollTop(): number;
    setScrollPosition(position: editorCommon.INewScrollPosition): void;
    isAfterLines(verticalOffset: number): boolean;
    getLineNumberAtVerticalOffset(verticalOffset: number): number;
    getVerticalOffsetForLineNumber(lineNumber: number): number;
    getWhitespaceAtVerticalOffset(verticalOffset: number): editorCommon.IViewWhitespaceViewportData;
    shouldSuppressMouseDownOnViewZone(viewZoneId: number): boolean;
    /**
     * Decode an Editor.IPosition from a rendered dom node
     */
    getPositionFromDOMInfo(spanNode: HTMLElement, offset: number): editorCommon.IPosition;
    visibleRangeForPosition2(lineNumber: number, column: number): VisibleRange;
    getLineWidth(lineNumber: number): number;
}
export declare class MouseHandler extends ViewEventHandler implements IDisposable {
    static MOUSE_MOVE_MINIMUM_TIME: number;
    protected _context: ViewContext;
    protected viewController: editorBrowser.IViewController;
    protected viewHelper: IPointerHandlerHelper;
    protected mouseTargetFactory: MouseTargetFactory;
    protected listenersToRemove: IDisposable[];
    private toDispose;
    private _mouseDownOperation;
    private lastMouseLeaveTime;
    private _mouseMoveEventHandler;
    constructor(context: ViewContext, viewController: editorBrowser.IViewController, viewHelper: IPointerHandlerHelper);
    dispose(): void;
    _layoutInfo: editorCommon.EditorLayoutInfo;
    onLayoutChanged(layoutInfo: editorCommon.EditorLayoutInfo): boolean;
    onScrollChanged(e: editorCommon.IScrollEvent): boolean;
    onCursorSelectionChanged(e: editorCommon.IViewCursorSelectionChangedEvent): boolean;
    protected _createMouseTarget(e: EditorMouseEvent, testEventTarget: boolean): editorBrowser.IMouseTarget;
    private _getMouseColumn(e);
    protected _onContextMenu(e: EditorMouseEvent, testEventTarget: boolean): void;
    private _onMouseMove(e);
    private _onMouseLeave(e);
    _onMouseUp(e: EditorMouseEvent): void;
    _onMouseDown(e: EditorMouseEvent): void;
}
