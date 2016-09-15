import { TPromise } from 'vs/base/common/winjs.base';
import URI from 'vs/base/common/uri';
import { IWorkspaceProvider } from 'vs/base/common/labels';
import { EditorModel, EditorInput, BaseDiffEditorInput } from 'vs/workbench/common/editor';
import { IDisposable } from 'vs/base/common/lifecycle';
/**
 * The base editor input for the diff editor. It is made up of two editor inputs, the original version
 * and the modified version.
 */
export declare class DiffEditorInput extends BaseDiffEditorInput {
    static ID: string;
    private _toUnbind;
    private name;
    private description;
    private cachedModel;
    private forceOpenAsBinary;
    constructor(name: string, description: string, originalInput: EditorInput, modifiedInput: EditorInput, forceOpenAsBinary?: boolean);
    private registerListeners();
    toUnbind: IDisposable[];
    getTypeId(): string;
    getName(): string;
    getDescription(): string;
    setOriginalInput(input: EditorInput): void;
    setModifiedInput(input: EditorInput): void;
    resolve(refresh?: boolean): TPromise<EditorModel>;
    getPreferredEditorId(candidates: string[]): string;
    private isBinary(input);
    private createModel(refresh?);
    supportsSplitEditor(): boolean;
    matches(otherInput: any): boolean;
    dispose(): void;
}
export declare function toDiffLabel(res1: URI, res2: URI, context: IWorkspaceProvider): string;
