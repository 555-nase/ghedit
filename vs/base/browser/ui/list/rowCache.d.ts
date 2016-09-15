import { IRenderer } from './list';
import { IDisposable } from 'vs/base/common/lifecycle';
export interface IRow {
    domNode: HTMLElement;
    templateId: string;
    templateData: any;
}
export declare class RowCache<T> implements IDisposable {
    private renderers;
    private cache;
    private scrollingRow;
    constructor(renderers: {
        [templateId: string]: IRenderer<T, any>;
    });
    /**
     * Returns a row either by creating a new one or reusing
     * a previously released row which shares the same templateId.
     */
    alloc(templateId: string): IRow;
    /**
     * Releases the row for eventual reuse. The row's domNode
     * will eventually be removed from its parent, given that
     * it is not the currently scrolling row (for OS X ballistic
     * scrolling).
     */
    release(row: IRow): void;
    private getTemplateCache(templateId);
    garbageCollect(): void;
    dispose(): void;
}
