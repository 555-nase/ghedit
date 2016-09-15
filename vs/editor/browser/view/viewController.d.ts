import { EventEmitter } from 'vs/base/common/eventEmitter';
import { IKeyboardEvent } from 'vs/base/browser/keyboardEvent';
import { Position } from 'vs/editor/common/core/position';
import { IEditorMouseEvent, IViewController, IMouseDispatchData } from 'vs/editor/browser/editorBrowser';
import { ICommandService } from 'vs/platform/commands/common/commands';
import { IViewModel } from 'vs/editor/common/viewModel/viewModel';
export interface TriggerCursorHandler {
    (source: string, handlerId: string, payload: any): void;
}
export declare class ViewController implements IViewController {
    private viewModel;
    private triggerCursorHandler;
    private outgoingEventBus;
    private commandService;
    constructor(viewModel: IViewModel, triggerCursorHandler: TriggerCursorHandler, outgoingEventBus: EventEmitter, commandService: ICommandService);
    paste(source: string, text: string, pasteOnNewLine: boolean): void;
    type(source: string, text: string): void;
    replacePreviousChar(source: string, text: string, replaceCharCnt: number): void;
    compositionStart(source: string): void;
    compositionEnd(source: string): void;
    cut(source: string): void;
    private _validateViewColumn(viewPosition);
    dispatchMouse(data: IMouseDispatchData): void;
    moveTo(source: string, viewPosition: Position): void;
    private moveToSelect(source, viewPosition);
    private columnSelect(source, viewPosition, mouseColumn);
    private createCursor(source, viewPosition, wholeLine);
    private lastCursorMoveToSelect(source, viewPosition);
    private wordSelect(source, viewPosition);
    private wordSelectDrag(source, viewPosition);
    private lastCursorWordSelect(source, viewPosition);
    private lineSelect(source, viewPosition);
    private lineSelectDrag(source, viewPosition);
    private lastCursorLineSelect(source, viewPosition);
    private lastCursorLineSelectDrag(source, viewPosition);
    private selectAll(source);
    private convertViewToModelPosition(viewPosition);
    private convertViewToModelRange(viewRange);
    private convertViewToModelMouseEvent(e);
    emitKeyDown(e: IKeyboardEvent): void;
    emitKeyUp(e: IKeyboardEvent): void;
    emitContextMenu(e: IEditorMouseEvent): void;
    emitMouseMove(e: IEditorMouseEvent): void;
    emitMouseLeave(e: IEditorMouseEvent): void;
    emitMouseUp(e: IEditorMouseEvent): void;
    emitMouseDown(e: IEditorMouseEvent): void;
}
