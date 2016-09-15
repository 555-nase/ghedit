import winjs = require('vs/base/common/winjs.base');
import WorkbenchEditorCommon = require('vs/workbench/common/editor');
import stringei = require('vs/workbench/common/editor/stringEditorInput');
import diffei = require('vs/workbench/common/editor/diffEditorInput');
import git = require('vs/workbench/parts/git/common/git');
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IEditorInput } from 'vs/platform/editor/common/editor';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import IGitService = git.IGitService;
export interface IEditorInputWithStatus {
    getFileStatus(): git.IFileStatus;
}
export declare function isGitEditorInput(input: IEditorInput): boolean;
export declare class GitDiffEditorInput extends diffei.DiffEditorInput implements IEditorInputWithStatus {
    private status;
    constructor(name: string, description: string, originalInput: WorkbenchEditorCommon.EditorInput, modifiedInput: WorkbenchEditorCommon.EditorInput, status: git.IFileStatus);
    getFileStatus(): git.IFileStatus;
    contains(otherInput: any): boolean;
}
export declare class GitWorkingTreeDiffEditorInput extends GitDiffEditorInput {
    static ID: string;
    constructor(name: string, description: string, originalInput: WorkbenchEditorCommon.EditorInput, modifiedInput: WorkbenchEditorCommon.EditorInput, status: git.IFileStatus);
    getTypeId(): string;
}
export declare class GitIndexDiffEditorInput extends GitDiffEditorInput {
    static ID: string;
    constructor(name: string, description: string, originalInput: WorkbenchEditorCommon.EditorInput, modifiedInput: WorkbenchEditorCommon.EditorInput, status: git.IFileStatus);
    getTypeId(): string;
}
export declare class NativeGitIndexStringEditorInput extends stringei.StringEditorInput implements IEditorInputWithStatus {
    static ID: string;
    private gitService;
    private editorService;
    private status;
    private path;
    private treeish;
    private delayer;
    private toDispose;
    constructor(name: any, description: string, mime: string, status: git.IFileStatus, path: string, treeish: string, gitService: IGitService, editorService: IWorkbenchEditorService, instantiationService: IInstantiationService);
    getTypeId(): string;
    getFileStatus(): git.IFileStatus;
    resolve(refresh?: boolean): winjs.TPromise<WorkbenchEditorCommon.EditorModel>;
    private onGitServiceStateChange();
    dispose(): void;
}
