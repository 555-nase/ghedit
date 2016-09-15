import { TPromise } from 'vs/base/common/winjs.base';
import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
import * as vscode from 'vscode';
import { MainThreadLanguageFeaturesShape } from './extHost.protocol';
export declare class MainThreadLanguageFeatures extends MainThreadLanguageFeaturesShape {
    private _proxy;
    private _registrations;
    constructor(threadService: IThreadService);
    $unregister(handle: number): TPromise<any>;
    $registerOutlineSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerCodeLensSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerDeclaractionSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerHoverProvider(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerDocumentHighlightProvider(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerReferenceSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerQuickFixSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerDocumentFormattingSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerRangeFormattingSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerOnTypeFormattingSupport(handle: number, selector: vscode.DocumentSelector, autoFormatTriggerCharacters: string[]): TPromise<any>;
    $registerNavigateTypeSupport(handle: number): TPromise<any>;
    $registerRenameSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerSuggestSupport(handle: number, selector: vscode.DocumentSelector, triggerCharacters: string[]): TPromise<any>;
    $registerSignatureHelpProvider(handle: number, selector: vscode.DocumentSelector, triggerCharacter: string[]): TPromise<any>;
    $registerDocumentLinkProvider(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $setLanguageConfiguration(handle: number, languageId: string, configuration: vscode.LanguageConfiguration): TPromise<any>;
}
