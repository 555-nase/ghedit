import { TPromise } from 'vs/base/common/winjs.base';
import { IModel, IRawText } from 'vs/editor/common/editorCommon';
import { IMode } from 'vs/editor/common/modes';
import { EditorModel } from 'vs/workbench/common/editor';
import URI from 'vs/base/common/uri';
import { ITextEditorModel } from 'vs/platform/editor/common/editor';
import { IModeService } from 'vs/editor/common/services/modeService';
import { IModelService } from 'vs/editor/common/services/modelService';
/**
 * The base text editor model leverages the code editor model. This class is only intended to be subclassed and not instantiated.
 */
export declare abstract class BaseTextEditorModel extends EditorModel implements ITextEditorModel {
    private modelService;
    private modeService;
    private textEditorModelHandle;
    private createdEditorModel;
    constructor(modelService: IModelService, modeService: IModeService, textEditorModelHandle?: URI);
    textEditorModel: IModel;
    /**
     * Creates the text editor model with the provided value, mime (can be comma separated for multiple values) and optional resource URL.
     */
    protected createTextEditorModel(value: string | IRawText, resource?: URI, mime?: string): TPromise<EditorModel>;
    private doCreateTextEditorModel(value, mode, resource);
    private getFirstLineText(value);
    /**
     * Gets the mode for the given identifier. Subclasses can override to provide their own implementation of this lookup.
     *
     * @param firstLineText optional first line of the text buffer to set the mode on. This can be used to guess a mode from content.
     */
    protected getOrCreateMode(modeService: IModeService, mime: string, firstLineText?: string): TPromise<IMode>;
    /**
     * Updates the text editor model with the provided value. If the value is the same as the model has, this is a no-op.
     */
    protected updateTextEditorModel(newValue: string | IRawText): void;
    /**
     * Returns the textual value of this editor model or null if it has not yet been created.
     */
    getValue(): string;
    dispose(): void;
    isResolved(): boolean;
}
