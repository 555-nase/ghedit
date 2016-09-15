import { IDisposable, Disposable } from 'vs/base/common/lifecycle';
import { StandardMouseEvent } from 'vs/base/browser/mouseEvent';
import * as dom from 'vs/base/browser/dom';
export declare class EditorMouseEvent extends StandardMouseEvent {
    _editorMouseEventBrand: void;
    editorPos: dom.IDomNodePagePosition;
    /**
     * The horizontal position of the cursor relative to the viewport (i.e. scrolled).
     */
    viewportx: number;
    /**
     * The vertical position of the cursor relative to the viewport (i.e. scrolled).
     */
    viewporty: number;
    constructor(e: MouseEvent, editorViewDomNode: HTMLElement);
}
export interface EditorMouseEventMerger {
    (lastEvent: EditorMouseEvent, currentEvent: EditorMouseEvent): EditorMouseEvent;
}
export declare class EditorMouseEventFactory {
    private _editorViewDomNode;
    constructor(editorViewDomNode: HTMLElement);
    private _create(e);
    onContextMenu(target: HTMLElement, callback: (e: EditorMouseEvent) => void): IDisposable;
    onMouseUp(target: HTMLElement, callback: (e: EditorMouseEvent) => void): IDisposable;
    onMouseDown(target: HTMLElement, callback: (e: EditorMouseEvent) => void): IDisposable;
    onMouseLeave(target: HTMLElement, callback: (e: EditorMouseEvent) => void): IDisposable;
    onMouseMoveThrottled(target: HTMLElement, callback: (e: EditorMouseEvent) => void, merger: EditorMouseEventMerger, minimumTimeMs: number): IDisposable;
}
export declare class GlobalEditorMouseMoveMonitor extends Disposable {
    private _editorViewDomNode;
    private _globalMouseMoveMonitor;
    constructor(editorViewDomNode: HTMLElement);
    startMonitoring(merger: EditorMouseEventMerger, mouseMoveCallback: (e: EditorMouseEvent) => void, onStopCallback: () => void): void;
}
