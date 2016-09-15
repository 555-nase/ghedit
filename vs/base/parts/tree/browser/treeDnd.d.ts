import _ = require('vs/base/parts/tree/browser/tree');
import Mouse = require('vs/base/browser/mouseEvent');
export declare class ElementsDragAndDropData implements _.IDragAndDropData {
    private elements;
    constructor(elements: any[]);
    update(event: Mouse.DragMouseEvent): void;
    getData(): any;
}
export declare class ExternalElementsDragAndDropData implements _.IDragAndDropData {
    private elements;
    constructor(elements: any[]);
    update(event: Mouse.DragMouseEvent): void;
    getData(): any;
}
export declare class DesktopDragAndDropData implements _.IDragAndDropData {
    private types;
    private files;
    constructor();
    update(event: Mouse.DragMouseEvent): void;
    getData(): any;
}
