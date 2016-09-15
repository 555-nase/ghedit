import winjs = require('vs/base/common/winjs.base');
import URI from 'vs/base/common/uri';
import glob = require('vs/base/common/glob');
import events = require('vs/base/common/events');
export declare const IFileService: {
    (...args: any[]): void;
    type: IFileService;
};
export interface IFileService {
    _serviceBrand: any;
    /**
     * Resolve the properties of a file identified by the resource.
     *
     * If the optional parameter "resolveTo" is specified in options, the stat service is asked
     * to provide a stat object that should contain the full graph of folders up to all of the
     * target resources.
     *
     * If the optional parameter "resolveSingleChildDescendants" is specified in options,
     * the stat service is asked to automatically resolve child folders that only
     * contain a single element.
     */
    resolveFile(resource: URI, options?: IResolveFileOptions): winjs.TPromise<IFileStat>;
    /**
     *Finds out if a file identified by the resource exists.
     */
    existsFile(resource: URI): winjs.TPromise<boolean>;
    /**
     * Resolve the contents of a file identified by the resource.
     *
     * The returned object contains properties of the file and the full value as string.
     */
    resolveContent(resource: URI, options?: IResolveContentOptions): winjs.TPromise<IContent>;
    /**
     * Resolve the contents of a file identified by the resource.
     *
     * The returned object contains properties of the file and the value as a readable stream.
     */
    resolveStreamContent(resource: URI, options?: IResolveContentOptions): winjs.TPromise<IStreamContent>;
    /**
     * Returns the contents of all files by the given array of file resources.
     */
    resolveContents(resources: URI[]): winjs.TPromise<IContent[]>;
    /**
     * Updates the content replacing its previous value.
     */
    updateContent(resource: URI, value: string, options?: IUpdateContentOptions): winjs.TPromise<IFileStat>;
    /**
     * Moves the file to a new path identified by the resource.
     *
     * The optional parameter overwrite can be set to replace an existing file at the location.
     */
    moveFile(source: URI, target: URI, overwrite?: boolean): winjs.TPromise<IFileStat>;
    /**
     * Copies the file to a path identified by the resource.
     *
     * The optional parameter overwrite can be set to replace an existing file at the location.
     */
    copyFile(source: URI, target: URI, overwrite?: boolean): winjs.TPromise<IFileStat>;
    /**
     * Creates a new file with the given path. The returned promise
     * will have the stat model object as a result.
     *
     * The optional parameter content can be used as value to fill into the new file.
     */
    createFile(resource: URI, content?: string): winjs.TPromise<IFileStat>;
    /**
     * Creates a new folder with the given path. The returned promise
     * will have the stat model object as a result.
     */
    createFolder(resource: URI): winjs.TPromise<IFileStat>;
    /**
     * Renames the provided file to use the new name. The returned promise
     * will have the stat model object as a result.
     */
    rename(resource: URI, newName: string): winjs.TPromise<IFileStat>;
    /**
     * Deletes the provided file.  The optional useTrash parameter allows to
     * move the file to trash.
     */
    del(resource: URI, useTrash?: boolean): winjs.TPromise<void>;
    /**
     * Imports the file to the parent identified by the resource.
     */
    importFile(source: URI, targetFolder: URI): winjs.TPromise<IImportResult>;
    /**
     * Allows to start a watcher that reports file change events on the provided resource.
     */
    watchFileChanges(resource: URI): void;
    /**
     * Allows to stop a watcher on the provided resource or absolute fs path.
     */
    unwatchFileChanges(resource: URI): void;
    unwatchFileChanges(fsPath: string): void;
    /**
     * Configures the file service with the provided options.
     */
    updateOptions(options: any): void;
    /**
     * Frees up any resources occupied by this service.
     */
    dispose(): void;
}
/**
 * Possible changes that can occur to a file.
 */
export declare enum FileChangeType {
    UPDATED = 0,
    ADDED = 1,
    DELETED = 2,
}
/**
 * Possible events to subscribe to
 */
export declare const EventType: {
    FILE_CHANGES: string;
};
/**
 * Identifies a single change in a file.
 */
export interface IFileChange {
    /**
     * The type of change that occured to the file.
     */
    type: FileChangeType;
    /**
     * The unified resource identifier of the file that changed.
     */
    resource: URI;
}
export declare class FileChangesEvent extends events.Event {
    private _changes;
    constructor(changes: IFileChange[]);
    changes: IFileChange[];
    /**
     * Returns true if this change event contains the provided file with the given change type. In case of
     * type DELETED, this method will also return true if a folder got deleted that is the parent of the
     * provided file path.
     */
    contains(resource: URI, type: FileChangeType): boolean;
    /**
     * Returns true if this change event contains any of the provided files with the given change type. In case of
     * type DELETED, this method will also return true if a folder got deleted that is the parent of any of the
     * provided file paths.
     */
    containsAny(resources: URI[], type: FileChangeType): boolean;
    /**
     * Returns the changes that describe added files.
     */
    getAdded(): IFileChange[];
    /**
     * Returns if this event contains added files.
     */
    gotAdded(): boolean;
    /**
     * Returns the changes that describe deleted files.
     */
    getDeleted(): IFileChange[];
    /**
     * Returns if this event contains deleted files.
     */
    gotDeleted(): boolean;
    /**
     * Returns the changes that describe updated files.
     */
    getUpdated(): IFileChange[];
    /**
     * Returns if this event contains updated files.
     */
    gotUpdated(): boolean;
    private getOfType(type);
    private hasType(type);
}
export interface IBaseStat {
    /**
     * The unified resource identifier of this file or folder.
     */
    resource: URI;
    /**
     * The name which is the last segement
     * of the {{path}}.
     */
    name: string;
    /**
     * The last modifictaion date represented
     * as millis from unix epoch.
     */
    mtime: number;
    /**
     * A unique identifier thet represents the
     * current state of the file or directory.
     */
    etag: string;
    /**
     * The mime type string. Applicate for files
     * only.
     */
    mime: string;
}
/**
 * A file resource with meta information.
 */
export interface IFileStat extends IBaseStat {
    /**
     * The resource is a directory. Iff {{true}}
     * {{mime}} and {{encoding}} have no meaning.
     */
    isDirectory: boolean;
    /**
     * Return {{true}} when this is a directory
     * that is not empty.
     */
    hasChildren: boolean;
    /**
     * The children of the file stat or undefined if none.
     */
    children?: IFileStat[];
    /**
     * The size of the file if known.
     */
    size?: number;
}
/**
 * Content and meta information of a file.
 */
export interface IContent extends IBaseStat {
    /**
     * The content of a text file.
     */
    value: string;
    /**
     * The encoding of the content if known.
     */
    encoding: string;
}
/**
 * A Stream emitting strings.
 */
export interface IStringStream {
    on(event: 'data', callback: (chunk: string) => void): void;
    on(event: 'error', callback: (err: any) => void): void;
    on(event: 'end', callback: () => void): void;
    on(event: string, callback: any): void;
}
/**
 * Streamable content and meta information of a file.
 */
export interface IStreamContent extends IBaseStat {
    /**
     * The streamable content of a text file.
     */
    value: IStringStream;
    /**
     * The encoding of the content if known.
     */
    encoding: string;
}
export interface IResolveContentOptions {
    /**
     * The optional acceptTextOnly parameter allows to fail this request early if the file
     * contents are not textual.
     */
    acceptTextOnly?: boolean;
    /**
     * The optional etag parameter allows to return a 304 (Not Modified) if the etag matches
     * with the remote resource. It is the task of the caller to makes sure to handle this
     * error case from the promise.
     */
    etag?: string;
    /**
     * The optional encoding parameter allows to specify the desired encoding when resolving
     * the contents of the file.
     */
    encoding?: string;
}
export interface IUpdateContentOptions {
    /**
     * The encoding to use when updating a file.
     */
    encoding?: string;
    /**
     * If set to true, will enforce the selected encoding and not perform any detection using BOMs.
     */
    overwriteEncoding?: boolean;
    /**
     * Whether to overwrite a file even if it is readonly.
     */
    overwriteReadonly?: boolean;
    /**
     * The last known modification time of the file. This can be used to prevent dirty writes.
     */
    mtime?: number;
    /**
     * The etag of the file. This can be used to prevent dirty writes.
     */
    etag?: string;
}
export interface IResolveFileOptions {
    resolveTo?: URI[];
    resolveSingleChildDescendants?: boolean;
}
export interface IImportResult {
    stat: IFileStat;
    isNew: boolean;
}
export interface IFileOperationResult {
    message: string;
    fileOperationResult: FileOperationResult;
}
export declare enum FileOperationResult {
    FILE_IS_BINARY = 0,
    FILE_IS_DIRECTORY = 1,
    FILE_NOT_FOUND = 2,
    FILE_NOT_MODIFIED_SINCE = 3,
    FILE_MODIFIED_SINCE = 4,
    FILE_MOVE_CONFLICT = 5,
    FILE_READ_ONLY = 6,
    FILE_TOO_LARGE = 7,
}
export declare const MAX_FILE_SIZE: number;
export declare const AutoSaveConfiguration: {
    OFF: string;
    AFTER_DELAY: string;
    ON_FOCUS_CHANGE: string;
};
export interface IFilesConfiguration {
    files: {
        associations: {
            [filepattern: string]: string;
        };
        exclude: glob.IExpression;
        watcherExclude: {
            [filepattern: string]: boolean;
        };
        encoding: string;
        trimTrailingWhitespace: boolean;
        autoSave: string;
        autoSaveDelay: number;
        eol: string;
    };
}
export declare const SUPPORTED_ENCODINGS: {
    [encoding: string]: {
        labelLong: string;
        labelShort: string;
        order: number;
        encodeOnly?: boolean;
        alias?: string;
    };
};
