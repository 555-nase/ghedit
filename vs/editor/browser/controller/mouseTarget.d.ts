import { EditorLayoutInfo } from 'vs/editor/common/editorCommon';
import { IMouseTarget } from 'vs/editor/browser/editorBrowser';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { IPointerHandlerHelper } from 'vs/editor/browser/controller/mouseHandler';
import { EditorMouseEvent } from 'vs/editor/browser/editorDom';
export declare class MouseTargetFactory {
    private _context;
    private _viewHelper;
    constructor(context: ViewContext, viewHelper: IPointerHandlerHelper);
    private getClassNamePathTo(child, stopAt);
    mouseTargetIsWidget(e: EditorMouseEvent): boolean;
    createMouseTarget(layoutInfo: EditorLayoutInfo, e: EditorMouseEvent, testEventTarget: boolean): IMouseTarget;
    private _unsafeCreateMouseTarget(layoutInfo, e, testEventTarget);
    private _isChild(testChild, testAncestor, stopAt);
    private _findAttribute(element, attr, stopAt);
    /**
     * Most probably WebKit browsers
     */
    private _doHitTestWithCaretRangeFromPoint(e, mouseVerticalOffset);
    private _actualDoHitTestWithCaretRangeFromPoint(hitx, hity);
    /**
     * Most probably Gecko
     */
    private _doHitTestWithCaretPositionFromPoint(e);
    /**
     * Most probably IE
     */
    private _doHitTestWithMoveToPoint(e);
    private _doHitTest(e, mouseVerticalOffset);
    private _getZoneAtCoord(mouseVerticalOffset);
    private _getFullLineRangeAtCoord(mouseVerticalOffset);
    getMouseColumn(layoutInfo: EditorLayoutInfo, e: EditorMouseEvent): number;
    private _getMouseColumn(mouseContentHorizontalOffset);
    private createMouseTargetFromViewCursor(target, lineNumber, column, mouseColumn);
    private createMouseTargetFromViewLines(target, mouseVerticalOffset, mouseColumn);
    private createMouseTargetFromHitTestPosition(target, lineNumber, column, mouseHorizontalOffset, mouseColumn);
    private createMouseTargetFromContentWidgetsChild(target, mouseColumn);
    private createMouseTargetFromOverlayWidgetsChild(target, mouseColumn);
    private createMouseTargetFromLinesDecorationsChild(target, mouseVerticalOffset, mouseColumn);
    private createMouseTargetFromLineNumbers(target, mouseVerticalOffset, mouseColumn);
    private createMouseTargetFromGlyphMargin(target, mouseVerticalOffset, mouseColumn);
    private createMouseTargetFromScrollbar(target, mouseVerticalOffset, mouseColumn);
    private createMouseTargetFromUnknownTarget(target);
}
