import { TPromise } from 'vs/base/common/winjs.base';
import { EventEmitter } from 'vs/base/common/eventEmitter';
import Event, { Emitter } from 'vs/base/common/event';
import URI from 'vs/base/common/uri';
import { IEditor, IEditorViewState } from 'vs/editor/common/editorCommon';
import { IEditorInput, IEditorModel, IEditorOptions, ITextEditorOptions, IResourceInput, Position } from 'vs/platform/editor/common/editor';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { Event as BaseEvent } from 'vs/base/common/events';
import { IEditorGroupService } from 'vs/workbench/services/group/common/groupService';
import { SyncDescriptor, AsyncDescriptor } from 'vs/platform/instantiation/common/descriptors';
import { IInstantiationService, IConstructorSignature0 } from 'vs/platform/instantiation/common/instantiation';
export declare enum ConfirmResult {
    SAVE = 0,
    DONT_SAVE = 1,
    CANCEL = 2,
}
export interface IEditorDescriptor {
    getId(): string;
    getName(): string;
    describes(obj: any): boolean;
}
export declare const Extensions: {
    Editors: string;
};
export interface IEditorRegistry {
    /**
     * Registers an editor to the platform for the given input type. The second parameter also supports an
     * array of input classes to be passed in. If the more than one editor is registered for the same editor
     * input, the input itself will be asked which editor it prefers if this method is provided. Otherwise
     * the first editor in the list will be returned.
     *
     * @param editorInputDescriptor a constructor function that returns an instance of EditorInput for which the
     * registered editor should be used for.
     */
    registerEditor(descriptor: IEditorDescriptor, editorInputDescriptor: SyncDescriptor<EditorInput>): void;
    registerEditor(descriptor: IEditorDescriptor, editorInputDescriptor: SyncDescriptor<EditorInput>[]): void;
    /**
     * Returns the editor descriptor for the given input or null if none.
     */
    getEditor(input: EditorInput): IEditorDescriptor;
    /**
     * Returns the editor descriptor for the given identifier or null if none.
     */
    getEditorById(editorId: string): IEditorDescriptor;
    /**
     * Returns an array of registered editors known to the platform.
     */
    getEditors(): IEditorDescriptor[];
    /**
     * Registers the default input to be used for files in the workbench.
     *
     * @param editorInputDescriptor a descriptor that resolves to an instance of EditorInput that
     * should be used to handle file inputs.
     */
    registerDefaultFileInput(editorInputDescriptor: AsyncDescriptor<IFileEditorInput>): void;
    /**
     * Returns a descriptor of the default input to be used for files in the workbench.
     *
     * @return a descriptor that resolves to an instance of EditorInput that should be used to handle
     * file inputs.
     */
    getDefaultFileInput(): AsyncDescriptor<IFileEditorInput>;
    /**
     * Registers a editor input factory for the given editor input to the registry. An editor input factory
     * is capable of serializing and deserializing editor inputs from string data.
     *
     * @param editorInputId the identifier of the editor input
     * @param factory the editor input factory for serialization/deserialization
     */
    registerEditorInputFactory(editorInputId: string, ctor: IConstructorSignature0<IEditorInputFactory>): void;
    /**
     * Returns the editor input factory for the given editor input.
     *
     * @param editorInputId the identifier of the editor input
     */
    getEditorInputFactory(editorInputId: string): IEditorInputFactory;
    setInstantiationService(service: IInstantiationService): void;
}
export interface IEditorInputFactory {
    /**
     * Returns a string representation of the provided editor input that contains enough information
     * to deserialize back to the original editor input from the deserialize() method.
     */
    serialize(editorInput: EditorInput): string;
    /**
     * Returns an editor input from the provided serialized form of the editor input. This form matches
     * the value returned from the serialize() method.
     */
    deserialize(instantiationService: IInstantiationService, serializedEditorInput: string): EditorInput;
}
/**
 * Editor inputs are lightweight objects that can be passed to the workbench API to open inside the editor part.
 * Each editor input is mapped to an editor that is capable of opening it through the Platform facade.
 */
export declare abstract class EditorInput extends EventEmitter implements IEditorInput {
    protected _onDidChangeDirty: Emitter<void>;
    private disposed;
    constructor();
    /**
     * Fired when the dirty state of this input changes.
     */
    onDidChangeDirty: Event<void>;
    /**
     * Returns the name of this input that can be shown to the user. Examples include showing the name of the input
     * above the editor area when the input is shown.
     */
    getName(): string;
    /**
     * Returns the description of this input that can be shown to the user. Examples include showing the description of
     * the input above the editor area to the side of the name of the input.
     *
     * @param verbose controls if the description should be short or can contain additional details.
     */
    getDescription(verbose?: boolean): string;
    /**
     * Returns the unique type identifier of this input.
     */
    abstract getTypeId(): string;
    /**
     * Returns the preferred editor for this input. A list of candidate editors is passed in that whee registered
     * for the input. This allows subclasses to decide late which editor to use for the input on a case by case basis.
     */
    getPreferredEditorId(candidates: string[]): string;
    /**
     * Returns a type of EditorModel that represents the resolved input. Subclasses should
     * override to provide a meaningful model. The optional second argument allows to specify
     * if the EditorModel should be refreshed before returning it. Depending on the implementation
     * this could mean to refresh the editor model contents with the version from disk.
     */
    abstract resolve(refresh?: boolean): TPromise<EditorModel>;
    /**
     * An editor that is dirty will be asked to be saved once it closes.
     */
    isDirty(): boolean;
    /**
     * Subclasses should bring up a proper dialog for the user if the editor is dirty and return the result.
     */
    confirmSave(): ConfirmResult;
    /**
     * Saves the editor if it is dirty. Subclasses return a promise with a boolean indicating the success of the operation.
     */
    save(): TPromise<boolean>;
    /**
     * Reverts the editor if it is dirty. Subclasses return a promise with a boolean indicating the success of the operation.
     */
    revert(): TPromise<boolean>;
    /**
     * Called when this input is no longer opened in any editor. Subclasses can free resources as needed.
     */
    close(): void;
    /**
     * Subclasses can set this to false if it does not make sense to split the editor input.
     */
    supportsSplitEditor(): boolean;
    /**
     * Returns true if this input is identical to the otherInput.
     */
    matches(otherInput: any): boolean;
    /**
     * Called when an editor input is no longer needed. Allows to free up any resources taken by
     * resolving the editor input.
     */
    dispose(): void;
    /**
     * Returns whether this input was disposed or not.
     */
    isDisposed(): boolean;
}
export declare class EditorInputEvent extends BaseEvent {
    private _editorInput;
    private prevented;
    constructor(editorInput: IEditorInput);
    editorInput: IEditorInput;
    prevent(): void;
    isPrevented(): boolean;
}
export declare enum EncodingMode {
    /**
     * Instructs the encoding support to encode the current input with the provided encoding
     */
    Encode = 0,
    /**
     * Instructs the encoding support to decode the current input with the provided encoding
     */
    Decode = 1,
}
export interface IEncodingSupport {
    /**
     * Gets the encoding of the input if known.
     */
    getEncoding(): string;
    /**
     * Sets the encoding for the input for saving.
     */
    setEncoding(encoding: string, mode: EncodingMode): void;
}
/**
 * This is a tagging interface to declare an editor input being capable of dealing with files. It is only used in the editor registry
 * to register this kind of input to the platform.
 */
export interface IFileEditorInput extends IEditorInput, IEncodingSupport {
    /**
     * Gets the mime type of the file this input is about.
     */
    getMime(): string;
    /**
     * Sets the mime type of the file this input is about.
     */
    setMime(mime: string): void;
    /**
     * Gets the absolute file resource URI this input is about.
     */
    getResource(): URI;
    /**
     * Sets the absolute file resource URI this input is about.
     */
    setResource(resource: URI): void;
    /**
     * Sets the preferred encodingt to use for this input.
     */
    setPreferredEncoding(encoding: string): void;
}
/**
 * The base class of untitled editor inputs in the workbench.
 */
export declare abstract class UntitledEditorInput extends EditorInput implements IEncodingSupport {
    abstract getResource(): URI;
    abstract isDirty(): boolean;
    abstract suggestFileName(): string;
    abstract getMime(): string;
    abstract getEncoding(): string;
    abstract setEncoding(encoding: string, mode: EncodingMode): void;
}
/**
 * The base class of editor inputs that have an original and modified side.
 */
export declare abstract class BaseDiffEditorInput extends EditorInput {
    private _originalInput;
    private _modifiedInput;
    constructor(originalInput: EditorInput, modifiedInput: EditorInput);
    originalInput: EditorInput;
    modifiedInput: EditorInput;
    isDirty(): boolean;
    confirmSave(): ConfirmResult;
    save(): TPromise<boolean>;
    revert(): TPromise<boolean>;
}
/**
 * The editor model is the heavyweight counterpart of editor input. Depending on the editor input, it
 * connects to the disk to retrieve content and may allow for saving it back or reverting it. Editor models
 * are typically cached for some while because they are expensive to construct.
 */
export declare class EditorModel extends EventEmitter implements IEditorModel {
    /**
     * Causes this model to load returning a promise when loading is completed.
     */
    load(): TPromise<EditorModel>;
    /**
     * Returns whether this model was loaded or not.
     */
    isResolved(): boolean;
    /**
     * Subclasses should implement to free resources that have been claimed through loading.
     */
    dispose(): void;
}
/**
 * The editor options is the base class of options that can be passed in when opening an editor.
 */
export declare class EditorOptions implements IEditorOptions {
    /**
     * Helper to create EditorOptions inline.
     */
    static create(settings: IEditorOptions): EditorOptions;
    /**
     * Inherit all options from other EditorOptions instance.
     */
    mixin(other: EditorOptions): void;
    /**
     * Tells the editor to not receive keyboard focus when the editor is being opened. By default,
     * the editor will receive keyboard focus on open.
     */
    preserveFocus: boolean;
    /**
     * Tells the editor to replace the editor input in the editor even if it is identical to the one
     * already showing. By default, the editor will not replace the input if it is identical to the
     * one showing.
     */
    forceOpen: boolean;
    /**
     * Will reveal the editor if it is already opened and visible in any of the opened editor groups.
     */
    revealIfVisible: boolean;
    /**
     * An editor that is pinned remains in the editor stack even when another editor is being opened.
     * An editor that is not pinned will always get replaced by another editor that is not pinned.
     */
    pinned: boolean;
    /**
     * The index in the document stack where to insert the editor into when opening.
     */
    index: number;
    /**
     * An active editor that is opened will show its contents directly. Set to true to open an editor
     * in the background.
     */
    inactive: boolean;
}
/**
 * Base Text Editor Options.
 */
export declare class TextEditorOptions extends EditorOptions {
    protected startLineNumber: number;
    protected startColumn: number;
    protected endLineNumber: number;
    protected endColumn: number;
    private editorViewState;
    static from(input: IResourceInput): TextEditorOptions;
    /**
     * Helper to create TextEditorOptions inline.
     */
    static create(settings: ITextEditorOptions): TextEditorOptions;
    /**
     * Returns if this options object has objects defined for the editor.
     */
    hasOptionsDefined(): boolean;
    /**
     * Tells the editor to set show the given selection when the editor is being opened.
     */
    selection(startLineNumber: number, startColumn: number, endLineNumber?: number, endColumn?: number): EditorOptions;
    /**
     * Sets the view state to be used when the editor is opening.
     */
    viewState(viewState: IEditorViewState): void;
    /**
     * Apply the view state or selection to the given editor.
     *
     * @return if something was applied
     */
    apply(textEditor: IEditor): boolean;
}
export interface ITextDiffEditorOptions extends ITextEditorOptions {
    /**
     * Whether to auto reveal the first change when the text editor is opened or not. By default
     * the first change will not be revealed.
     */
    autoRevealFirstChange: boolean;
}
/**
 * Base Text Diff Editor Options.
 */
export declare class TextDiffEditorOptions extends TextEditorOptions {
    /**
     * Helper to create TextDiffEditorOptions inline.
     */
    static create(settings: ITextDiffEditorOptions): TextDiffEditorOptions;
    /**
     * Whether to auto reveal the first change when the text editor is opened or not. By default
     * the first change will not be revealed.
     */
    autoRevealFirstChange: boolean;
}
/**
 * Given an input, tries to get the associated URI for it (either file or untitled scheme).
 */
export declare function getUntitledOrFileResource(input: IEditorInput, supportDiff?: boolean): URI;
export declare function getResource(input: IEditorInput): URI;
/**
 * Helper to return all opened editors with resources not belonging to the currently opened workspace.
 */
export declare function getOutOfWorkspaceEditorResources(editorGroupService: IEditorGroupService, contextService: IWorkspaceContextService): URI[];
/**
 * Returns the object as IFileEditorInput only if it matches the signature.
 */
export declare function asFileEditorInput(obj: any, supportDiff?: boolean): IFileEditorInput;
export interface IStacksModelChangeEvent {
    group: IEditorGroup;
    editor?: IEditorInput;
    structural?: boolean;
}
export interface IEditorStacksModel {
    onModelChanged: Event<IStacksModelChangeEvent>;
    onEditorClosed: Event<IGroupEvent>;
    groups: IEditorGroup[];
    activeGroup: IEditorGroup;
    isActive(IEditorGroup: any): boolean;
    getGroup(id: GroupIdentifier): IEditorGroup;
    positionOfGroup(group: IEditorGroup): Position;
    groupAt(position: Position): IEditorGroup;
    next(): IEditorIdentifier;
    previous(): IEditorIdentifier;
    isOpen(editor: IEditorInput): boolean;
    isOpen(resource: URI): boolean;
    toString(): string;
}
export interface IEditorGroup {
    id: GroupIdentifier;
    label: string;
    count: number;
    activeEditor: IEditorInput;
    previewEditor: IEditorInput;
    getEditor(index: number): IEditorInput;
    indexOf(editor: IEditorInput): number;
    contains(editor: IEditorInput): boolean;
    contains(resource: URI): boolean;
    getEditors(mru?: boolean): IEditorInput[];
    isActive(editor: IEditorInput): boolean;
    isPreview(editor: IEditorInput): boolean;
    isPinned(editor: IEditorInput): boolean;
}
export interface IEditorIdentifier {
    group: IEditorGroup;
    editor: IEditorInput;
}
export interface IEditorContext extends IEditorIdentifier {
    event: any;
}
export interface IGroupEvent {
    editor: IEditorInput;
    pinned: boolean;
}
export declare type GroupIdentifier = number;
export declare const EditorOpenPositioning: {
    LEFT: string;
    RIGHT: string;
    FIRST: string;
    LAST: string;
};
export interface IWorkbenchEditorConfiguration {
    workbench: {
        editor: {
            showTabs: boolean;
            enablePreview: boolean;
            enablePreviewFromQuickOpen: boolean;
            openPositioning: string;
        };
    };
}
export declare const ActiveEditorMovePositioning: {
    FIRST: string;
    LAST: string;
    LEFT: string;
    RIGHT: string;
    CENTER: string;
    POSITION: string;
};
export declare const ActiveEditorMovePositioningBy: {
    TAB: string;
    GROUP: string;
};
export interface ActiveEditorMoveArguments {
    to?: string;
    by?: string;
    value?: number;
}
export declare var EditorCommands: {
    MoveActiveEditor: string;
};
