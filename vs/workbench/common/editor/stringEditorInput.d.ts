import { TPromise } from 'vs/base/common/winjs.base';
import { EditorModel, EditorInput } from 'vs/workbench/common/editor';
import { StringEditorModel } from 'vs/workbench/common/editor/stringEditorModel';
import URI from 'vs/base/common/uri';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
/**
 * A read-only text editor input whos contents are made of the provided value and mime type.
 */
export declare class StringEditorInput extends EditorInput {
    private instantiationService;
    static ID: string;
    protected cachedModel: StringEditorModel;
    private name;
    private description;
    protected value: string;
    protected mime: string;
    private singleton;
    constructor(name: string, description: string, value: string, mime: string, singleton: boolean, instantiationService: IInstantiationService);
    protected getResource(): URI;
    getTypeId(): string;
    getName(): string;
    getDescription(): string;
    getValue(): string;
    getMime(): string;
    /**
     * Sets the textual value of this input and will also update the underlying model if this input is resolved.
     */
    setValue(value: string): void;
    /**
     * Clears the textual value of this input and will also update the underlying model if this input is resolved.
     */
    clearValue(): void;
    /**
     * Appends to the textual value of this input and will also update the underlying model if this input is resolved.
     */
    append(value: string): void;
    /**
     * Removes all lines from the top if the line number exceeds the given line count. Returns the new value if lines got trimmed.
     *
     * Note: This method is a no-op if the input has not yet been resolved.
     */
    trim(linecount: number): string;
    resolve(refresh?: boolean): TPromise<EditorModel>;
    matches(otherInput: any): boolean;
    dispose(): void;
}
