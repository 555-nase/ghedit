import { ISearchService } from 'vs/platform/search/common/search';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { IResourceEdit } from 'vs/editor/common/services/bulkEdit';
import { TPromise } from 'vs/base/common/winjs.base';
import { Uri } from 'vscode';
import { MainThreadWorkspaceShape } from './extHost.protocol';
export declare class MainThreadWorkspace extends MainThreadWorkspaceShape {
    private _activeSearches;
    private _searchService;
    private _workspace;
    private _textFileService;
    private _editorService;
    private _eventService;
    constructor(searchService: ISearchService, contextService: IWorkspaceContextService, textFileService: any, editorService: any, eventService: any);
    $startSearch(include: string, exclude: string, maxResults: number, requestId: number): Thenable<Uri[]>;
    $cancelSearch(requestId: number): Thenable<boolean>;
    $saveAll(includeUntitled?: boolean): Thenable<boolean>;
    $applyWorkspaceEdit(edits: IResourceEdit[]): TPromise<boolean>;
}
