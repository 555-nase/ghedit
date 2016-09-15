import URI from 'vs/base/common/uri';
import winjs = require('vs/base/common/winjs.base');
import htmlTags = require('vs/languages/html/common/htmlTags');
import editorCommon = require('vs/editor/common/editorCommon');
import modes = require('vs/editor/common/modes');
import { IResourceService } from 'vs/editor/common/services/resourceService';
export declare class HTMLWorker {
    private resourceService;
    private _modeId;
    private _tagProviders;
    private formatSettings;
    constructor(modeId: string, resourceService: IResourceService);
    protected addCustomTagProviders(providers: htmlTags.IHTMLTagProvider[]): void;
    provideDocumentRangeFormattingEdits(resource: URI, range: editorCommon.IRange, options: modes.FormattingOptions): winjs.TPromise<editorCommon.ISingleEditOperation[]>;
    private formatHTML(resource, range, options);
    private getFormatOption(key, dflt);
    private getTagsFormatOption(key, dflt);
    _doConfigure(options: any): winjs.TPromise<void>;
    private findMatchingOpenTag(scanner);
    private collectTagSuggestions(scanner, position, suggestions);
    private collectContentSuggestions(suggestions);
    private collectAttributeSuggestions(scanner, suggestions);
    private collectAttributeValueSuggestions(scanner, suggestions);
    provideCompletionItems(resource: URI, position: editorCommon.IPosition): winjs.TPromise<modes.ISuggestResult[]>;
    private suggestHTML(resource, position);
    private doSuggest(resource, position);
    private findMatchingBracket(tagname, scanner);
    provideDocumentHighlights(resource: URI, position: editorCommon.IPosition, strict?: boolean): winjs.TPromise<modes.DocumentHighlight[]>;
    private static _stripQuotes(url);
    static _getWorkspaceUrl(modelAbsoluteUri: URI, rootAbsoluteUri: URI, tokenContent: string): string;
    private createLink(modelAbsoluteUrl, rootAbsoluteUrl, tokenContent, lineNumber, startColumn, endColumn);
    private _computeHTMLLinks(model, workspaceResource);
    provideLinks(resource: URI, workspaceResource: URI): winjs.TPromise<modes.ILink[]>;
}
