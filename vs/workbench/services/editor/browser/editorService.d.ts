import { TPromise } from 'vs/base/common/winjs.base';
import { BaseEditor } from 'vs/workbench/browser/parts/editor/baseEditor';
import { EditorInput, EditorOptions } from 'vs/workbench/common/editor';
import { IUntitledEditorService } from 'vs/workbench/services/untitled/common/untitledEditorService';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IEditorInput, IEditorModel, IEditorOptions, Position, Direction, IEditor, IResourceInput, ITextEditorModel } from 'vs/platform/editor/common/editor';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
export interface IEditorPart {
    openEditor(input?: EditorInput, options?: EditorOptions, sideBySide?: boolean): TPromise<BaseEditor>;
    openEditor(input?: EditorInput, options?: EditorOptions, position?: Position): TPromise<BaseEditor>;
    openEditors(editors: {
        input: EditorInput;
        position: Position;
        options?: EditorOptions;
    }[]): TPromise<BaseEditor[]>;
    replaceEditors(editors: {
        toReplace: EditorInput;
        replaceWith: EditorInput;
        options?: EditorOptions;
    }[]): TPromise<BaseEditor[]>;
    closeEditor(position: Position, input: IEditorInput): TPromise<void>;
    closeEditors(position: Position, except?: IEditorInput, direction?: Direction): TPromise<void>;
    closeAllEditors(except?: Position): TPromise<void>;
    getActiveEditor(): BaseEditor;
    getVisibleEditors(): IEditor[];
    getActiveEditorInput(): EditorInput;
}
export declare class WorkbenchEditorService implements IWorkbenchEditorService {
    private untitledEditorService;
    private instantiationService;
    _serviceBrand: any;
    private editorPart;
    private fileInputDescriptor;
    constructor(editorPart: IEditorPart | IWorkbenchEditorService, untitledEditorService: IUntitledEditorService, instantiationService?: IInstantiationService);
    getActiveEditor(): IEditor;
    getActiveEditorInput(): IEditorInput;
    getVisibleEditors(): IEditor[];
    isVisible(input: IEditorInput, includeDiff: boolean): boolean;
    openEditor(input: IEditorInput, options?: IEditorOptions, sideBySide?: boolean): TPromise<IEditor>;
    openEditor(input: IEditorInput, options?: IEditorOptions, position?: Position): TPromise<IEditor>;
    openEditor(input: IResourceInput, position?: Position): TPromise<IEditor>;
    openEditor(input: IResourceInput, sideBySide?: boolean): TPromise<IEditor>;
    private toOptions(arg1?);
    /**
     * Allow subclasses to implement their own behavior for opening editor (see below).
     */
    protected doOpenEditor(input: EditorInput, options?: EditorOptions, sideBySide?: boolean): TPromise<IEditor>;
    protected doOpenEditor(input: EditorInput, options?: EditorOptions, position?: Position): TPromise<IEditor>;
    openEditors(editors: {
        input: IResourceInput;
        position: Position;
    }[]): TPromise<IEditor[]>;
    openEditors(editors: {
        input: IEditorInput;
        position: Position;
        options?: IEditorOptions;
    }[]): TPromise<IEditor[]>;
    replaceEditors(editors: {
        toReplace: IResourceInput;
        replaceWith: IResourceInput;
    }[]): TPromise<BaseEditor[]>;
    replaceEditors(editors: {
        toReplace: EditorInput;
        replaceWith: EditorInput;
        options?: IEditorOptions;
    }[]): TPromise<BaseEditor[]>;
    closeEditor(position: Position, input: IEditorInput): TPromise<void>;
    closeEditors(position: Position, except?: IEditorInput, direction?: Direction): TPromise<void>;
    closeAllEditors(except?: Position): TPromise<void>;
    resolveEditorModel(input: IEditorInput, refresh?: boolean): TPromise<IEditorModel>;
    resolveEditorModel(input: IResourceInput, refresh?: boolean): TPromise<ITextEditorModel>;
    createInput(input: EditorInput): TPromise<EditorInput>;
    createInput(input: IResourceInput): TPromise<EditorInput>;
    private createFileInput(resource, mime?, encoding?);
    private findModel(editor, input);
}
export interface IDelegatingWorkbenchEditorServiceHandler {
    (input: EditorInput, options?: EditorOptions, sideBySide?: boolean): TPromise<BaseEditor>;
    (input: EditorInput, options?: EditorOptions, position?: Position): TPromise<BaseEditor>;
}
/**
 * Subclass of workbench editor service that delegates all calls to the provided editor service. Subclasses can choose to override the behavior
 * of openEditor() by providing a handler. The handler returns a promise that resolves to an editor to indicate if an action has been taken.
 * If falsify is returned, the service will delegate to editor service for handling the call to openEditor().
 *
 * This gives clients a chance to override the behavior of openEditor() to match their context.
 */
export declare class DelegatingWorkbenchEditorService extends WorkbenchEditorService {
    private handler;
    constructor(handler: IDelegatingWorkbenchEditorServiceHandler, untitledEditorService: IUntitledEditorService, instantiationService: IInstantiationService, editorService: IWorkbenchEditorService);
    protected doOpenEditor(input: EditorInput, options?: EditorOptions, sideBySide?: boolean): TPromise<IEditor>;
    protected doOpenEditor(input: EditorInput, options?: EditorOptions, position?: Position): TPromise<IEditor>;
}
