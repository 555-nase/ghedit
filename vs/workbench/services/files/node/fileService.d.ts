import { IContent, IFileService, IResolveFileOptions, IResolveContentOptions, IFileStat, IStreamContent, IUpdateContentOptions, IImportResult } from 'vs/platform/files/common/files';
import { TPromise } from 'vs/base/common/winjs.base';
import uri from 'vs/base/common/uri';
import { IEventService } from 'vs/platform/event/common/event';
export interface IEncodingOverride {
    resource: uri;
    encoding: string;
}
export interface IFileServiceOptions {
    tmpDir?: string;
    errorLogger?: (msg: string) => void;
    encoding?: string;
    bom?: string;
    encodingOverride?: IEncodingOverride[];
    watcherIgnoredPatterns?: string[];
    disableWatcher?: boolean;
    verboseLogging?: boolean;
    debugBrkFileWatcherPort?: number;
}
export declare class FileService implements IFileService {
    private eventEmitter;
    _serviceBrand: any;
    private static FS_EVENT_DELAY;
    private static MAX_DEGREE_OF_PARALLEL_FS_OPS;
    private basePath;
    private tmpPath;
    private options;
    private workspaceWatcherToDispose;
    private activeFileChangesWatchers;
    private fileChangesWatchDelayer;
    private undeliveredRawFileChangesEvents;
    constructor(basePath: string, options: IFileServiceOptions, eventEmitter: IEventService);
    updateOptions(options: IFileServiceOptions): void;
    private setupWin32WorkspaceWatching();
    private setupUnixWorkspaceWatching();
    resolveFile(resource: uri, options?: IResolveFileOptions): TPromise<IFileStat>;
    existsFile(resource: uri): TPromise<boolean>;
    resolveContent(resource: uri, options?: IResolveContentOptions): TPromise<IContent>;
    resolveStreamContent(resource: uri, options?: IResolveContentOptions): TPromise<IStreamContent>;
    private doResolveContent<T>(resource, options, contentResolver);
    resolveContents(resources: uri[]): TPromise<IContent[]>;
    updateContent(resource: uri, value: string, options?: IUpdateContentOptions): TPromise<IFileStat>;
    createFile(resource: uri, content?: string): TPromise<IFileStat>;
    createFolder(resource: uri): TPromise<IFileStat>;
    rename(resource: uri, newName: string): TPromise<IFileStat>;
    moveFile(source: uri, target: uri, overwrite?: boolean): TPromise<IFileStat>;
    copyFile(source: uri, target: uri, overwrite?: boolean): TPromise<IFileStat>;
    private moveOrCopyFile(source, target, keepCopy, overwrite);
    private doMoveOrCopyFile(sourcePath, targetPath, keepCopy, overwrite);
    importFile(source: uri, targetFolder: uri): TPromise<IImportResult>;
    del(resource: uri): TPromise<void>;
    private toAbsolutePath(arg1);
    private resolve(resource, options?);
    private toStatResolver(resource);
    private resolveFileStreamContent(resource, etag?, enc?);
    private resolveFileContent(resource, etag?, enc?);
    private getEncoding(resource, preferredEncoding?);
    private getEncodingOverride(resource);
    private checkFile(absolutePath, options);
    watchFileChanges(resource: uri): void;
    unwatchFileChanges(resource: uri): void;
    unwatchFileChanges(path: string): void;
    dispose(): void;
}
export declare class StatResolver {
    private resource;
    private isDirectory;
    private mtime;
    private name;
    private mime;
    private etag;
    private size;
    private verboseLogging;
    constructor(resource: uri, isDirectory: boolean, mtime: number, size: number, verboseLogging: boolean);
    resolve(options: IResolveFileOptions): TPromise<IFileStat>;
    private resolveChildren(absolutePath, absoluteTargetPaths, resolveSingleChildDescendants, callback);
}
