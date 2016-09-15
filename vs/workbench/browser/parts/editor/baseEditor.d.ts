import { TPromise } from 'vs/base/common/winjs.base';
import { Action, IAction } from 'vs/base/common/actions';
import { ActionBarContributor } from 'vs/workbench/browser/actionBarRegistry';
import { Builder } from 'vs/base/browser/builder';
import { Panel } from 'vs/workbench/browser/panel';
import { EditorInput, EditorOptions, IEditorDescriptor } from 'vs/workbench/common/editor';
import { IEditor, Position } from 'vs/platform/editor/common/editor';
import { AsyncDescriptor } from 'vs/platform/instantiation/common/descriptors';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
/**
 * The base class of editors in the workbench. Editors register themselves for specific editor inputs.
 * Editors are layed out in the editor part of the workbench. Only one editor can be open at a time.
 * Each editor has a minimized representation that is good enough to provide some information about the
 * state of the editor data.
 * The workbench will keep an editor alive after it has been created and show/hide it based on
 * user interaction. The lifecycle of a editor goes in the order create(), setVisible(true|false),
 * layout(), setInput(), focus(), dispose(). During use of the workbench, a editor will often receive a
 * clearInput, setVisible, layout and focus call, but only one create and dispose call.
 *
 * This class is only intended to be subclassed and not instantiated.
 */
export declare abstract class BaseEditor extends Panel implements IEditor {
    private _input;
    private _options;
    private _position;
    constructor(id: string, telemetryService: ITelemetryService);
    input: EditorInput;
    /**
     * Returns the current input of this editor or null if none.
     */
    getInput(): EditorInput;
    options: EditorOptions;
    /**
     * Returns the current options of this editor or null if none.
     */
    getOptions(): EditorOptions;
    /**
     * Note: Clients should not call this method, the workbench calls this
     * method. Calling it otherwise may result in unexpected behavior.
     *
     * Sets the given input with the options to the part. An editor has to deal with the
     * situation that the same input is being set with different options.
     */
    setInput(input: EditorInput, options: EditorOptions): TPromise<void>;
    /**
     * Called to indicate to the editor that the input should be cleared and resources associated with the
     * input should be freed.
     */
    clearInput(): void;
    create(parent: Builder): void;
    create(parent: Builder): TPromise<void>;
    /**
     * Called to create the editor in the parent builder.
     */
    abstract createEditor(parent: Builder): void;
    /**
     * Overload this function to allow for passing in a position argument.
     */
    setVisible(visible: boolean, position?: Position): void;
    setVisible(visible: boolean, position?: Position): TPromise<void>;
    setEditorVisible(visible: any, position?: Position): void;
    /**
     * Called when the position of the editor changes while it is visible.
     */
    changePosition(position: Position): void;
    /**
     * The position this editor is showing in or null if none.
     */
    position: Position;
    dispose(): void;
}
/**
 * A lightweight descriptor of an editor. The descriptor is deferred so that heavy editors
 * can load lazily in the workbench.
 */
export declare class EditorDescriptor extends AsyncDescriptor<BaseEditor> implements IEditorDescriptor {
    private id;
    private name;
    constructor(id: string, name: string, moduleId: string, ctorName: string);
    getId(): string;
    getName(): string;
    describes(obj: any): boolean;
}
/**
 * The context that will be passed in to the EditorInputActionContributor.
 */
export interface IEditorInputActionContext {
    editor: BaseEditor;
    input: EditorInput;
    position: Position;
}
/**
 * A variant of the action bar contributor to register actions to specific editor inputs of the editor. This allows to have more
 * fine grained control over actions compared to contributing an action to a specific editor.
 */
export declare class EditorInputActionContributor extends ActionBarContributor {
    private mapEditorInputActionContextToPrimaryActions;
    private mapEditorInputActionContextToSecondaryActions;
    constructor();
    private createPositionArray();
    protected toId(context: IEditorInputActionContext): string;
    private clearInputsFromCache(position, isPrimary);
    private doClearInputsFromCache(cache);
    /**
     * Returns true if this contributor has actions for the given editor input. Subclasses must not
     * override this method but instead hasActionsForEditorInput();
     */
    hasActions(context: IEditorInputActionContext): boolean;
    /**
     * Returns an array of actions for the given editor input. Subclasses must not override this
     * method but instead getActionsForEditorInput();
     */
    getActions(context: IEditorInputActionContext): IAction[];
    /**
     * Returns true if this contributor has actions for the given editor input. Subclasses must not
     * override this method but instead hasSecondaryActionsForEditorInput();
     */
    hasSecondaryActions(context: IEditorInputActionContext): boolean;
    /**
     * Returns an array of actions for the given editor input. Subclasses must not override this
     * method but instead getSecondaryActionsForEditorInput();
     */
    getSecondaryActions(context: IEditorInputActionContext): IAction[];
    private checkEditorContext(context);
    /**
     * Returns true if this contributor has primary actions for the given editor input.
     */
    hasActionsForEditorInput(context: IEditorInputActionContext): boolean;
    /**
     * Returns an array of primary actions for the given editor input.
     */
    getActionsForEditorInput(context: IEditorInputActionContext): IEditorInputAction[];
    /**
     * Returns true if this contributor has secondary actions for the given editor input.
     */
    hasSecondaryActionsForEditorInput(context: IEditorInputActionContext): boolean;
    /**
     * Returns an array of secondary actions for the given editor input.
     */
    getSecondaryActionsForEditorInput(context: IEditorInputActionContext): IEditorInputAction[];
}
/**
 * An editorinput action is contributed to an editor based on the editor input of the editor that is currently
 * active. When the editor input changes, the action will be get the new editor input set so that the enablement
 * state can be updated. In addition the position of the editor for the given input is applied.
 */
export interface IEditorInputAction extends IAction {
    /**
     * The input of the editor for which this action is running.
     */
    input: EditorInput;
    /**
     * The position of the editor for which this action is running.
     */
    position: Position;
    /**
     * Implementors to define if the action is enabled or not.
     */
    isEnabled(): boolean;
}
export declare class EditorInputAction extends Action implements IEditorInputAction {
    private _input;
    private _position;
    input: EditorInput;
    position: Position;
    isEnabled(): boolean;
}
