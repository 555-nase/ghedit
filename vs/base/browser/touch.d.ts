import { IDisposable } from 'vs/base/common/lifecycle';
export declare namespace EventType {
    const Tap: string;
    const Change: string;
    const Start: string;
    const End: string;
    const Contextmenu: string;
}
export interface GestureEvent extends MouseEvent {
    initialTarget: EventTarget;
    translationX: number;
    translationY: number;
    pageX: number;
    pageY: number;
}
export declare class Gesture implements IDisposable {
    private static HOLD_DELAY;
    private static SCROLL_FRICTION;
    private targetElement;
    private callOnTarget;
    private handle;
    private activeTouches;
    constructor(target: HTMLElement);
    dispose(): void;
    target: HTMLElement;
    private static newGestureEvent(type);
    private onTouchStart(e);
    private onTouchEnd(e);
    private inertia(t1, vX, dirX, x, vY, dirY, y);
    private onTouchMove(e);
}
