import Event from 'vs/base/common/event';
import { Uri, FileSystemWatcher as _FileSystemWatcher } from 'vscode';
import { FileSystemEvents, ExtHostFileSystemEventServiceShape } from './extHost.protocol';
export declare class FileSystemWatcher implements _FileSystemWatcher {
    private _onDidCreate;
    private _onDidChange;
    private _onDidDelete;
    private _disposable;
    private _config;
    ignoreCreateEvents: boolean;
    ignoreChangeEvents: boolean;
    ignoreDeleteEvents: boolean;
    constructor(dispatcher: Event<FileSystemEvents>, globPattern: string, ignoreCreateEvents?: boolean, ignoreChangeEvents?: boolean, ignoreDeleteEvents?: boolean);
    dispose(): void;
    onDidCreate: Event<Uri>;
    onDidChange: Event<Uri>;
    onDidDelete: Event<Uri>;
}
export declare class ExtHostFileSystemEventService extends ExtHostFileSystemEventServiceShape {
    private _emitter;
    constructor();
    createFileSystemWatcher(globPattern: string, ignoreCreateEvents?: boolean, ignoreChangeEvents?: boolean, ignoreDeleteEvents?: boolean): _FileSystemWatcher;
    $onFileEvent(events: FileSystemEvents): void;
}
