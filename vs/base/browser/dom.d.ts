import { IDisposable } from 'vs/base/common/lifecycle';
import { IKeyboardEvent } from 'vs/base/browser/keyboardEvent';
import { IMouseEvent } from 'vs/base/browser/mouseEvent';
export declare function clearNode(node: HTMLElement): void;
/**
 * Calls JSON.Stringify with a replacer to break apart any circular references.
 * This prevents JSON.stringify from throwing the exception
 *  "Uncaught TypeError: Converting circular structure to JSON"
 */
export declare function safeStringifyDOMAware(obj: any): string;
export declare function isInDOM(node: Node): boolean;
/**
 * @param node a dom node
 * @param className a class name
 * @return true if the className attribute of the provided node contains the provided className
 */
export declare function hasClass(node: HTMLElement, className: string): boolean;
/**
 * Adds the provided className to the provided node. This is a no-op
 * if the class is already set.
 * @param node a dom node
 * @param className a class name
 */
export declare function addClass(node: HTMLElement, className: string): void;
/**
 * Removes the className for the provided node. This is a no-op
 * if the class isn't present.
 * @param node a dom node
 * @param className a class name
 */
export declare function removeClass(node: HTMLElement, className: string): void;
/**
 * @param node a dom node
 * @param className a class name
 * @param shouldHaveIt
 */
export declare function toggleClass(node: HTMLElement, className: string, shouldHaveIt?: boolean): void;
export declare function addDisposableListener(node: Element, type: string, handler: (event: any) => void, useCapture?: boolean): IDisposable;
export declare function addDisposableListener(node: Element | Window, type: string, handler: (event: any) => void, useCapture?: boolean): IDisposable;
export declare function addDisposableListener(node: Window, type: string, handler: (event: any) => void, useCapture?: boolean): IDisposable;
export declare function addDisposableListener(node: Document, type: string, handler: (event: any) => void, useCapture?: boolean): IDisposable;
export interface IAddStandardDisposableListenerSignature {
    (node: HTMLElement, type: 'click', handler: (event: IMouseEvent) => void, useCapture?: boolean): IDisposable;
    (node: HTMLElement, type: 'keydown', handler: (event: IKeyboardEvent) => void, useCapture?: boolean): IDisposable;
    (node: HTMLElement, type: 'keypress', handler: (event: IKeyboardEvent) => void, useCapture?: boolean): IDisposable;
    (node: HTMLElement, type: 'keyup', handler: (event: IKeyboardEvent) => void, useCapture?: boolean): IDisposable;
    (node: HTMLElement, type: string, handler: (event: any) => void, useCapture?: boolean): IDisposable;
}
export declare let addStandardDisposableListener: IAddStandardDisposableListenerSignature;
export declare function addDisposableNonBubblingMouseOutListener(node: Element, handler: (event: MouseEvent) => void): IDisposable;
/**
 * Schedule a callback to be run at the next animation frame.
 * This allows multiple parties to register callbacks that should run at the next animation frame.
 * If currently in an animation frame, `runner` will be executed immediately.
 * @return token that can be used to cancel the scheduled runner (only if `runner` was not executed immediately).
 */
export declare let runAtThisOrScheduleAtNextAnimationFrame: (runner: () => void, priority?: number) => IDisposable;
/**
 * Schedule a callback to be run at the next animation frame.
 * This allows multiple parties to register callbacks that should run at the next animation frame.
 * If currently in an animation frame, `runner` will be executed at the next animation frame.
 * @return token that can be used to cancel the scheduled runner.
 */
export declare let scheduleAtNextAnimationFrame: (runner: () => void, priority?: number) => IDisposable;
export interface IEventMerger<R> {
    (lastEvent: R, currentEvent: Event): R;
}
export declare function addDisposableThrottledListener<R>(node: any, type: string, handler: (event: R) => void, eventMerger?: IEventMerger<R>, minimumTimeMs?: number): IDisposable;
export declare function getComputedStyle(el: HTMLElement): CSSStyleDeclaration;
export declare function getTopLeftOffset(element: HTMLElement): {
    left: number;
    top: number;
};
export interface IDomNodePagePosition {
    left: number;
    top: number;
    width: number;
    height: number;
}
/**
 * Returns the position of a dom node relative to the entire page.
 */
export declare function getDomNodePagePosition(domNode: HTMLElement): IDomNodePagePosition;
export interface IStandardWindow {
    scrollX: number;
    scrollY: number;
}
export declare const StandardWindow: IStandardWindow;
export declare function getContentWidth(element: HTMLElement): number;
export declare function getTotalWidth(element: HTMLElement): number;
export declare function getContentHeight(element: HTMLElement): number;
export declare function getTotalHeight(element: HTMLElement): number;
export declare function getLargestChildWidth(parent: HTMLElement, children: HTMLElement[]): number;
export declare function isAncestor(testChild: Node, testAncestor: Node): boolean;
export declare function findParentWithClass(node: HTMLElement, clazz: string, stopAtClazz?: string): HTMLElement;
export declare function createStyleSheet(): HTMLStyleElement;
export declare function createCSSRule(selector: string, cssText: string, style?: HTMLStyleElement): void;
export declare function getCSSRule(selector: string, style?: HTMLStyleElement): any;
export declare function removeCSSRulesContainingSelector(ruleName: string, style?: any): void;
export declare function isHTMLElement(o: any): o is HTMLElement;
export declare const EventType: {
    CLICK: string;
    DBLCLICK: string;
    MOUSE_UP: string;
    MOUSE_DOWN: string;
    MOUSE_OVER: string;
    MOUSE_MOVE: string;
    MOUSE_OUT: string;
    CONTEXT_MENU: string;
    WHEEL: string;
    KEY_DOWN: string;
    KEY_PRESS: string;
    KEY_UP: string;
    LOAD: string;
    UNLOAD: string;
    ABORT: string;
    ERROR: string;
    RESIZE: string;
    SCROLL: string;
    SELECT: string;
    CHANGE: string;
    SUBMIT: string;
    RESET: string;
    FOCUS: string;
    BLUR: string;
    INPUT: string;
    STORAGE: string;
    DRAG_START: string;
    DRAG: string;
    DRAG_ENTER: string;
    DRAG_LEAVE: string;
    DRAG_OVER: string;
    DROP: string;
    DRAG_END: string;
    ANIMATION_START: string;
    ANIMATION_END: string;
    ANIMATION_ITERATION: string;
};
export interface EventLike {
    preventDefault(): void;
    stopPropagation(): void;
}
export declare const EventHelper: {
    stop: (e: EventLike, cancelBubble?: boolean) => void;
};
export interface IFocusTracker {
    addBlurListener(fn: () => void): IDisposable;
    addFocusListener(fn: () => void): IDisposable;
    dispose(): void;
}
export declare function saveParentsScrollTop(node: Element): number[];
export declare function restoreParentsScrollTop(node: Element, state: number[]): void;
export declare function trackFocus(element: HTMLElement | Window): IFocusTracker;
export declare function append<T extends Node>(parent: HTMLElement, child: T): T;
export declare function emmet<T extends HTMLElement>(description: string): T;
export declare function show(...elements: HTMLElement[]): void;
export declare function hide(...elements: HTMLElement[]): void;
export declare function removeTabIndexAndUpdateFocus(node: HTMLElement): void;
export declare function getElementsByTagName(tag: string): HTMLElement[];
export declare function finalHandler<T extends Event>(fn: (event: T) => any): (event: T) => any;
