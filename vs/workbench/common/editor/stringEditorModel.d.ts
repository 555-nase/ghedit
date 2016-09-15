import { TPromise } from 'vs/base/common/winjs.base';
import { BaseTextEditorModel } from 'vs/workbench/common/editor/textEditorModel';
import { EditorModel } from 'vs/workbench/common/editor';
import URI from 'vs/base/common/uri';
import { IModeService } from 'vs/editor/common/services/modeService';
import { IModelService } from 'vs/editor/common/services/modelService';
/**
 * An editor model whith an in-memory, readonly content that is not backed by any particular resource.
 */
export declare class StringEditorModel extends BaseTextEditorModel {
    protected value: string;
    protected mime: string;
    protected resource: URI;
    constructor(value: string, mime: string, resource: URI, modeService: IModeService, modelService: IModelService);
    /**
     * The value of this string editor model.
     */
    getValue(): string;
    /**
     * Sets the value of this string editor model.
     */
    setValue(value: string): void;
    /**
     * Appends value to this string editor model.
     */
    append(value: string): void;
    /**
     * Clears the value of this string editor model
     */
    clearValue(): void;
    /**
     * Removes all lines from the top if the line number exceeds the given line count. Returns the new value if lines got trimmed.
     */
    trim(linecount: number): string;
    getMime(): string;
    load(): TPromise<EditorModel>;
}
