import { IProgress } from 'vs/platform/search/common/search';
import { FileWalker } from 'vs/workbench/services/search/node/fileSearch';
import { ISerializedFileMatch, ISerializedSearchComplete, IRawSearch, ISearchEngine } from './search';
export declare class Engine implements ISearchEngine {
    private static PROGRESS_FLUSH_CHUNK_SIZE;
    private rootFolders;
    private extraFiles;
    private maxResults;
    private walker;
    private contentPattern;
    private isCanceled;
    private isDone;
    private total;
    private worked;
    private progressed;
    private walkerError;
    private walkerIsDone;
    private fileEncoding;
    private limitReached;
    constructor(config: IRawSearch, walker: FileWalker);
    cancel(): void;
    search(onResult: (match: ISerializedFileMatch) => void, onProgress: (progress: IProgress) => void, done: (error: Error, complete: ISerializedSearchComplete) => void): void;
    private readlinesAsync(filename, perLineCallback, options, callback);
}
