import { ServiceIdentifier } from 'vs/platform/instantiation/common/instantiation';
import { IEditorInput } from 'vs/platform/editor/common/editor';
export declare const IHistoryService: {
    (...args: any[]): void;
    type: IHistoryService;
};
export interface IHistoryService {
    _serviceBrand: ServiceIdentifier<any>;
    /**
     * Removes and returns the last closed editor if any.
     */
    popLastClosedEditor(): IEditorInput;
    /**
     * Navigate forwards in history.
     */
    forward(): void;
    /**
     * Navigate backwards in history.
     */
    back(): void;
    /**
     * Removes an entry from history.
     */
    remove(input: IEditorInput): void;
    /**
     * Clears all history.
     */
    clear(): void;
    /**
     * Get the entire history of opened editors.
     */
    getHistory(): IEditorInput[];
}
