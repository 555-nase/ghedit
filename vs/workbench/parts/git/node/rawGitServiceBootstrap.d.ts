import { TPromise } from 'vs/base/common/winjs.base';
import { IRawGitService } from 'vs/workbench/parts/git/common/git';
export declare function createRawGitService(gitPath: string, workspaceRoot: string, defaultEncoding: string, exePath: string, version: string): TPromise<IRawGitService>;
