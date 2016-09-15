export interface IMouseEvent {
    browserEvent: MouseEvent;
    leftButton: boolean;
    middleButton: boolean;
    rightButton: boolean;
    target: HTMLElement;
    detail: number;
    posx: number;
    posy: number;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
    metaKey: boolean;
    timestamp: number;
    preventDefault(): void;
    stopPropagation(): void;
}
export declare class StandardMouseEvent implements IMouseEvent {
    browserEvent: MouseEvent;
    leftButton: boolean;
    middleButton: boolean;
    rightButton: boolean;
    target: HTMLElement;
    detail: number;
    posx: number;
    posy: number;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
    metaKey: boolean;
    timestamp: number;
    constructor(e: MouseEvent);
    preventDefault(): void;
    stopPropagation(): void;
}
export interface IDataTransfer {
    dropEffect: string;
    effectAllowed: string;
    types: any[];
    files: any[];
    setData(type: string, data: string): void;
    setDragImage(image: any, x: number, y: number): void;
    getData(type: string): string;
    clearData(types?: string[]): void;
}
export declare class DragMouseEvent extends StandardMouseEvent {
    dataTransfer: IDataTransfer;
    constructor(e: MouseEvent);
}
export declare class DropMouseEvent extends DragMouseEvent {
    constructor(e: MouseEvent);
}
export declare class StandardMouseWheelEvent {
    browserEvent: MouseWheelEvent;
    deltaY: number;
    deltaX: number;
    target: Node;
    constructor(e: MouseWheelEvent, deltaX?: number, deltaY?: number);
    preventDefault(): void;
    stopPropagation(): void;
}
