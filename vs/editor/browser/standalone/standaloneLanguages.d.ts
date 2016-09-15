import { IJSONSchema } from 'vs/base/common/jsonSchema';
import { IDisposable } from 'vs/base/common/lifecycle';
import { IMonarchLanguage } from 'vs/editor/common/modes/monarch/monarchTypes';
import { ILanguageExtensionPoint } from 'vs/editor/common/services/modeService';
import * as modes from 'vs/editor/common/modes';
import { LanguageConfiguration } from 'vs/editor/common/modes/languageConfigurationRegistry';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { Position } from 'vs/editor/common/core/position';
import { Range } from 'vs/editor/common/core/range';
import { CancellationToken } from 'vs/base/common/cancellation';
import { IMarkerData } from 'vs/platform/markers/common/markers';
/**
 * Register information about a new language.
 */
export declare function register(language: ILanguageExtensionPoint): void;
/**
 * Get the information of all the registered languages.
 */
export declare function getLanguages(): ILanguageExtensionPoint[];
/**
 * An event emitted when a language is first time needed (e.g. a model has it set).
 */
export declare function onLanguage(languageId: string, callback: () => void): IDisposable;
/**
 * Set the editing configuration for a language.
 */
export declare function setLanguageConfiguration(languageId: string, configuration: LanguageConfiguration): IDisposable;
/**
 * Set the tokens provider for a language (manual implementation).
 */
export declare function setTokensProvider(languageId: string, provider: modes.TokensProvider): IDisposable;
/**
 * Set the tokens provider for a language (monarch implementation).
 */
export declare function setMonarchTokensProvider(languageId: string, languageDef: IMonarchLanguage): IDisposable;
/**
 * Register a reference provider (used by e.g. reference search).
 */
export declare function registerReferenceProvider(languageId: string, provider: modes.ReferenceProvider): IDisposable;
/**
 * Register a rename provider (used by e.g. rename symbol).
 */
export declare function registerRenameProvider(languageId: string, provider: modes.RenameProvider): IDisposable;
/**
 * Register a signature help provider (used by e.g. paremeter hints).
 */
export declare function registerSignatureHelpProvider(languageId: string, provider: modes.SignatureHelpProvider): IDisposable;
/**
 * Register a hover provider (used by e.g. editor hover).
 */
export declare function registerHoverProvider(languageId: string, provider: modes.HoverProvider): IDisposable;
/**
 * Register a document symbol provider (used by e.g. outline).
 */
export declare function registerDocumentSymbolProvider(languageId: string, provider: modes.DocumentSymbolProvider): IDisposable;
/**
 * Register a document highlight provider (used by e.g. highlight occurences).
 */
export declare function registerDocumentHighlightProvider(languageId: string, provider: modes.DocumentHighlightProvider): IDisposable;
/**
 * Register a definition provider (used by e.g. go to definition).
 */
export declare function registerDefinitionProvider(languageId: string, provider: modes.DefinitionProvider): IDisposable;
/**
 * Register a code lens provider (used by e.g. inline code lenses).
 */
export declare function registerCodeLensProvider(languageId: string, provider: modes.CodeLensProvider): IDisposable;
/**
 * Register a code action provider (used by e.g. quick fix).
 */
export declare function registerCodeActionProvider(languageId: string, provider: CodeActionProvider): IDisposable;
/**
 * Register a formatter that can handle only entire models.
 */
export declare function registerDocumentFormattingEditProvider(languageId: string, provider: modes.DocumentFormattingEditProvider): IDisposable;
/**
 * Register a formatter that can handle a range inside a model.
 */
export declare function registerDocumentRangeFormattingEditProvider(languageId: string, provider: modes.DocumentRangeFormattingEditProvider): IDisposable;
/**
 * Register a formatter than can do formatting as the user types.
 */
export declare function registerOnTypeFormattingEditProvider(languageId: string, provider: modes.OnTypeFormattingEditProvider): IDisposable;
/**
 * Register a link provider that can find links in text.
 */
export declare function registerLinkProvider(languageId: string, provider: modes.LinkProvider): IDisposable;
/**
 * Register a completion item provider (use by e.g. suggestions).
 */
export declare function registerCompletionItemProvider(languageId: string, provider: CompletionItemProvider): IDisposable;
/**
 * Contains additional diagnostic information about the context in which
 * a [code action](#CodeActionProvider.provideCodeActions) is run.
 */
export interface CodeActionContext {
    /**
     * An array of diagnostics.
     *
     * @readonly
     */
    markers: IMarkerData[];
}
/**
 * The code action interface defines the contract between extensions and
 * the [light bulb](https://code.visualstudio.com/docs/editor/editingevolved#_code-action) feature.
 */
export interface CodeActionProvider {
    /**
     * Provide commands for the given document and range.
     */
    provideCodeActions(model: editorCommon.IReadOnlyModel, range: Range, context: CodeActionContext, token: CancellationToken): modes.CodeAction[] | Thenable<modes.CodeAction[]>;
}
/**
 * Completion item kinds.
 */
export declare enum CompletionItemKind {
    Text = 0,
    Method = 1,
    Function = 2,
    Constructor = 3,
    Field = 4,
    Variable = 5,
    Class = 6,
    Interface = 7,
    Module = 8,
    Property = 9,
    Unit = 10,
    Value = 11,
    Enum = 12,
    Keyword = 13,
    Snippet = 14,
    Color = 15,
    File = 16,
    Reference = 17,
}
/**
 * A completion item represents a text snippet that is
 * proposed to complete text that is being typed.
 */
export interface CompletionItem {
    /**
     * The label of this completion item. By default
     * this is also the text that is inserted when selecting
     * this completion.
     */
    label: string;
    /**
     * The kind of this completion item. Based on the kind
     * an icon is chosen by the editor.
     */
    kind: CompletionItemKind;
    /**
     * A human-readable string with additional information
     * about this item, like type or symbol information.
     */
    detail?: string;
    /**
     * A human-readable string that represents a doc-comment.
     */
    documentation?: string;
    /**
     * A string that should be used when comparing this item
     * with other items. When `falsy` the [label](#CompletionItem.label)
     * is used.
     */
    sortText?: string;
    /**
     * A string that should be used when filtering a set of
     * completion items. When `falsy` the [label](#CompletionItem.label)
     * is used.
     */
    filterText?: string;
    /**
     * A string that should be inserted in a document when selecting
     * this completion. When `falsy` the [label](#CompletionItem.label)
     * is used.
     */
    insertText?: string;
    /**
     * An [edit](#TextEdit) which is applied to a document when selecting
     * this completion. When an edit is provided the value of
     * [insertText](#CompletionItem.insertText) is ignored.
     *
     * The [range](#Range) of the edit must be single-line and one the same
     * line completions where [requested](#CompletionItemProvider.provideCompletionItems) at.
     */
    textEdit?: editorCommon.ISingleEditOperation;
}
/**
 * Represents a collection of [completion items](#CompletionItem) to be presented
 * in the editor.
 */
export interface CompletionList {
    /**
     * This list it not complete. Further typing should result in recomputing
     * this list.
     */
    isIncomplete?: boolean;
    /**
     * The completion items.
     */
    items: CompletionItem[];
}
/**
 * The completion item provider interface defines the contract between extensions and
 * the [IntelliSense](https://code.visualstudio.com/docs/editor/editingevolved#_intellisense).
 *
 * When computing *complete* completion items is expensive, providers can optionally implement
 * the `resolveCompletionItem`-function. In that case it is enough to return completion
 * items with a [label](#CompletionItem.label) from the
 * [provideCompletionItems](#CompletionItemProvider.provideCompletionItems)-function. Subsequently,
 * when a completion item is shown in the UI and gains focus this provider is asked to resolve
 * the item, like adding [doc-comment](#CompletionItem.documentation) or [details](#CompletionItem.detail).
 */
export interface CompletionItemProvider {
    triggerCharacters?: string[];
    /**
     * Provide completion items for the given position and document.
     */
    provideCompletionItems(model: editorCommon.IReadOnlyModel, position: Position, token: CancellationToken): CompletionItem[] | Thenable<CompletionItem[]> | CompletionList | Thenable<CompletionList>;
    /**
     * Given a completion item fill in more data, like [doc-comment](#CompletionItem.documentation)
     * or [details](#CompletionItem.detail).
     *
     * The editor will only resolve a completion item once.
     */
    resolveCompletionItem?(item: CompletionItem, token: CancellationToken): CompletionItem | Thenable<CompletionItem>;
}
/**
 * @internal
 */
export declare function registerStandaloneSchema(uri: string, schema: IJSONSchema): void;
/**
 * @internal
 */
export declare function createMonacoLanguagesAPI(): typeof monaco.languages;
