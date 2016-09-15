import { IDisposable } from 'vs/base/common/lifecycle';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { ViewEventHandler } from 'vs/editor/common/viewModel/viewEventHandler';
import { IViewController } from 'vs/editor/browser/editorBrowser';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { VisibleRange } from 'vs/editor/common/view/renderingContext';
export interface IKeyboardHandlerHelper {
    viewDomNode: HTMLElement;
    textArea: HTMLTextAreaElement;
    visibleRangeForPositionRelativeToEditor(lineNumber: number, column: number): VisibleRange;
    flushAnyAccumulatedEvents(): void;
}
export declare class KeyboardHandler extends ViewEventHandler implements IDisposable {
    private _context;
    private viewController;
    private viewHelper;
    private textArea;
    private textAreaHandler;
    private _toDispose;
    private contentLeft;
    private contentWidth;
    private scrollLeft;
    private visibleRange;
    constructor(context: ViewContext, viewController: IViewController, viewHelper: IKeyboardHandlerHelper);
    dispose(): void;
    private _getStrategy();
    focusTextArea(): void;
    onConfigurationChanged(e: editorCommon.IConfigurationChangedEvent): boolean;
    onScrollChanged(e: editorCommon.IScrollEvent): boolean;
    onViewFocusChanged(isFocused: boolean): boolean;
    private _lastCursorSelectionChanged;
    onCursorSelectionChanged(e: editorCommon.IViewCursorSelectionChangedEvent): boolean;
    onCursorPositionChanged(e: editorCommon.IViewCursorPositionChangedEvent): boolean;
    onLayoutChanged(layoutInfo: editorCommon.EditorLayoutInfo): boolean;
    writeToTextArea(): void;
}
