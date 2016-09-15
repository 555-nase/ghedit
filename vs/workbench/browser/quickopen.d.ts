import { TPromise } from 'vs/base/common/winjs.base';
import { Action } from 'vs/base/common/actions';
import { Mode, IEntryRunContext, IAutoFocus, IModel, IQuickNavigateConfiguration } from 'vs/base/parts/quickopen/common/quickOpen';
import { QuickOpenEntry, QuickOpenEntryGroup, QuickOpenModel } from 'vs/base/parts/quickopen/browser/quickOpenModel';
import { EditorOptions } from 'vs/workbench/common/editor';
import { IResourceInput, IEditorInput } from 'vs/platform/editor/common/editor';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IQuickOpenService } from 'vs/workbench/services/quickopen/common/quickOpenService';
import { AsyncDescriptor } from 'vs/platform/instantiation/common/descriptors';
export declare class QuickOpenHandler {
    /**
     * A quick open handler returns results for a given input string. The resolved promise
     * returns an instance of quick open model. It is up to the handler to keep and reuse an
     * instance of the same model across multiple calls. This helps in situations where the user is
     * narrowing down a search and the model is just filtering some items out.
     *
     * As such, returning the same model instance across multiple searches will yield best
     * results in terms of performance when many items are shown.
     */
    getResults(searchValue: string): TPromise<IModel<any>>;
    /**
     * The ARIA label to apply when this quick open handler is active in quick open.
     */
    getAriaLabel(): string;
    /**
     * Extra CSS class name to add to the quick open widget to do custom styling of entries.
     */
    getClass(): string;
    /**
     * Indicates if the handler can run in the current environment. Return a string if the handler cannot run but has
     * a good message to show in this case.
     */
    canRun(): boolean | string;
    /**
     * Indicates if the handler wishes the quick open widget to automatically select the first result entry or an entry
     * based on a specific prefix match.
     */
    getAutoFocus(searchValue: string, quickNavigateConfiguration?: IQuickNavigateConfiguration): IAutoFocus;
    /**
     * Indicates to the handler that the quick open widget has been closed. Allows to free up any resources as needed.
     * The parameter canceled indicates if the quick open widget was closed with an entry being run or not.
     */
    onClose(canceled: boolean): void;
    /**
     * Allows to return a label that will be placed to the side of the results from this handler or null if none.
     */
    getGroupLabel(): string;
    /**
     * Allows to return a label that will be used when there are no results found
     */
    getEmptyLabel(searchString: string): string;
}
export interface QuickOpenHandlerHelpEntry {
    prefix: string;
    description: string;
    needsEditor: boolean;
}
/**
 * A lightweight descriptor of a quick open handler.
 */
export declare class QuickOpenHandlerDescriptor extends AsyncDescriptor<QuickOpenHandler> {
    prefix: string;
    description: string;
    isDefault: boolean;
    helpEntries: QuickOpenHandlerHelpEntry[];
    instantProgress: boolean;
    private id;
    constructor(moduleId: string, ctorName: string, prefix: string, description: string, instantProgress?: boolean);
    constructor(moduleId: string, ctorName: string, prefix: string, helpEntries: QuickOpenHandlerHelpEntry[], instantProgress?: boolean);
    getId(): string;
}
export declare const Extensions: {
    Quickopen: string;
};
export interface IQuickOpenRegistry {
    /**
     * Registers a quick open handler to the platform.
     */
    registerQuickOpenHandler(descriptor: QuickOpenHandlerDescriptor): void;
    /**
     * Registers a default quick open handler to fallback to.
     */
    registerDefaultQuickOpenHandler(descriptor: QuickOpenHandlerDescriptor): void;
    /**
     * Get all registered quick open handlers
     */
    getQuickOpenHandlers(): QuickOpenHandlerDescriptor[];
    /**
     * Get a specific quick open handler for a given prefix.
     */
    getQuickOpenHandler(prefix: string): QuickOpenHandlerDescriptor;
    /**
     * Returns the default quick open handlers.
     */
    getDefaultQuickOpenHandlers(): QuickOpenHandlerDescriptor[];
}
export interface IEditorQuickOpenEntry {
    /**
     * The editor input used for this entry when opening.
     */
    getInput(): IResourceInput | IEditorInput;
    /**
     * The editor options used for this entry when opening.
     */
    getOptions(): EditorOptions;
}
/**
 * A subclass of quick open entry that will open an editor with input and options when running.
 */
export declare class EditorQuickOpenEntry extends QuickOpenEntry implements IEditorQuickOpenEntry {
    private _editorService;
    constructor(_editorService: IWorkbenchEditorService);
    editorService: IWorkbenchEditorService;
    getInput(): IResourceInput | IEditorInput;
    getOptions(): EditorOptions;
    run(mode: Mode, context: IEntryRunContext): boolean;
}
/**
 * A subclass of quick open entry group that provides access to editor input and options.
 */
export declare class EditorQuickOpenEntryGroup extends QuickOpenEntryGroup implements IEditorQuickOpenEntry {
    getInput(): IEditorInput;
    getOptions(): EditorOptions;
}
export interface ICommand {
    aliases: string[];
    getResults(input: string): TPromise<QuickOpenEntry[]>;
    getEmptyLabel(input: string): string;
    icon?: string;
}
export interface ICommandQuickOpenHandlerOptions {
    prefix: string;
    commands: ICommand[];
    defaultCommand?: ICommand;
}
export declare abstract class CommandQuickOpenHandler extends QuickOpenHandler {
    private quickOpenService;
    private prefix;
    private defaultCommand;
    private commands;
    constructor(quickOpenService: IQuickOpenService, options: ICommandQuickOpenHandlerOptions);
    getResults(input: string): TPromise<QuickOpenModel>;
    private getCommands(input);
    getClass(): string;
    canRun(): boolean;
    getAutoFocus(input: string): IAutoFocus;
    onClose(canceled: boolean): void;
    getGroupLabel(): string;
    getEmptyLabel(input: string): string;
}
export declare class QuickOpenAction extends Action {
    private quickOpenService;
    private prefix;
    constructor(actionId: string, actionLabel: string, prefix: string, quickOpenService: IQuickOpenService);
    run(context?: any): TPromise<any>;
}
