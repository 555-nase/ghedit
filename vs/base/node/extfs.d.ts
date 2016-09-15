export declare function readdir(path: string, callback: (error: Error, files: string[]) => void): void;
export declare function mkdirp(path: string, mode: number, callback: (error: Error) => void): void;
export declare function copy(source: string, target: string, callback: (error: Error) => void, copiedSources?: {
    [path: string]: boolean;
}): void;
export declare function del(path: string, tmpFolder: string, callback: (error: Error) => void, done?: (error: Error) => void): void;
export declare function mv(source: string, target: string, callback: (error: Error) => void): void;
