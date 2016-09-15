import { Promise, TPromise } from 'vs/base/common/winjs.base';
import fs = require('fs');
export declare function isRoot(path: string): boolean;
export declare function readdir(path: string): TPromise<string[]>;
export declare function exists(path: string): TPromise<boolean>;
export declare function chmod(path: string, mode: number): TPromise<boolean>;
export declare function mkdirp(path: string, mode?: number): TPromise<boolean>;
export declare function rimraf(path: string): TPromise<void>;
export declare function realpath(path: string): TPromise<string>;
export declare function stat(path: string): TPromise<fs.Stats>;
export declare function lstat(path: string): TPromise<fs.Stats>;
export declare function mstat(paths: string[]): TPromise<{
    path: string;
    stats: fs.Stats;
}>;
export declare function rename(oldPath: string, newPath: string): Promise;
export declare function rmdir(path: string): Promise;
export declare function unlink(path: string): Promise;
export declare function symlink(target: string, path: string, type?: string): TPromise<void>;
export declare function readlink(path: string): TPromise<string>;
export declare function readFile(path: string): TPromise<Buffer>;
export declare function readFile(path: string, encoding: string): TPromise<string>;
export declare function writeFile(path: string, data: string, encoding?: string): Promise;
export declare function writeFile(path: string, data: NodeBuffer, encoding?: string): Promise;
/**
* Read a dir and return only subfolders
*/
export declare function readDirsInDir(dirPath: string): TPromise<string[]>;
/**
* `path` exists and is a directory
*/
export declare function dirExists(path: string): TPromise<boolean>;
/**
* `path` exists and is a file.
*/
export declare function fileExists(path: string): TPromise<boolean>;
/**
* Read dir at `path` and return only files matching `pattern`
*/
export declare function readFiles(path: string, pattern: RegExp): TPromise<string[]>;
export declare function fileExistsWithResult<T>(path: string, successResult: T): TPromise<T>;
