import 'vs/css!./list';
import { IDisposable } from 'vs/base/common/lifecycle';
import Event from 'vs/base/common/event';
import { IDelegate, IRenderer, IFocusChangeEvent, ISelectionChangeEvent } from './list';
import { IListViewOptions } from './listView';
export interface IListOptions extends IListViewOptions {
}
export declare class List<T> implements IDisposable {
    private static InstanceCount;
    private idPrefix;
    private focus;
    private selection;
    private eventBufferer;
    private view;
    private controller;
    private disposables;
    onFocusChange: Event<IFocusChangeEvent<T>>;
    onSelectionChange: Event<ISelectionChangeEvent<T>>;
    private _onDOMFocus;
    onDOMFocus: Event<FocusEvent>;
    constructor(container: HTMLElement, delegate: IDelegate<T>, renderers: IRenderer<T, any>[], options?: IListOptions);
    splice(start: number, deleteCount: number, ...elements: T[]): void;
    length: number;
    contentHeight: number;
    scrollTop: number;
    layout(height?: number): void;
    setSelection(...indexes: number[]): void;
    selectNext(n?: number, loop?: boolean): void;
    selectPrevious(n?: number, loop?: boolean): void;
    getSelection(): number[];
    setFocus(...indexes: number[]): void;
    focusNext(n?: number, loop?: boolean): void;
    focusPrevious(n?: number, loop?: boolean): void;
    focusNextPage(): void;
    focusPreviousPage(): void;
    getFocus(): number[];
    getFocusedElements(): T[];
    reveal(index: number, relativeTop?: number): void;
    getElementId(index: number): string;
    private toListEvent<T>({indexes});
    private _onFocusChange();
    dispose(): void;
}
