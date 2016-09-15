import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
import { TPromise } from 'vs/base/common/winjs.base';
import { Uri, CancellationToken } from 'vscode';
export declare class ExtHostWorkspace {
    private static _requestIdPool;
    private _proxy;
    private _workspacePath;
    constructor(threadService: IThreadService, workspacePath: string);
    getPath(): string;
    getRelativePath(pathOrUri: string | Uri): string;
    findFiles(include: string, exclude: string, maxResults?: number, token?: CancellationToken): Thenable<Uri[]>;
    saveAll(includeUntitled?: boolean): Thenable<boolean>;
    appyEdit(edit: vscode.WorkspaceEdit): TPromise<boolean>;
}
