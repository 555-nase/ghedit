import { TPromise } from 'vs/base/common/winjs.base';
export declare function resolveCommonProperties(commit: string, version: string): TPromise<{
    [name: string]: string;
}>;
