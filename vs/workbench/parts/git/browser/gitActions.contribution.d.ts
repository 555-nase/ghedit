import { TPromise } from 'vs/base/common/winjs.base';
import editorbrowser = require('vs/editor/browser/editorBrowser');
import baseeditor = require('vs/workbench/browser/parts/editor/baseEditor');
import tdeditor = require('vs/workbench/browser/parts/editor/textDiffEditor');
import { IGitService } from 'vs/workbench/parts/git/common/git';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IWorkspaceContextService } from 'vs/workbench/services/workspace/common/contextService';
import { BaseStageAction, BaseUnstageAction } from './gitActions';
export declare class WorkbenchStageAction extends BaseStageAction {
    static ID: string;
    static LABEL: string;
    private contextService;
    constructor(id: string, label: string, gitService: IGitService, editorService: IWorkbenchEditorService, contextService: IWorkspaceContextService);
    protected updateEnablement(): void;
    isEnabled(): boolean;
    run(context?: any): TPromise<void>;
}
export declare class WorkbenchUnstageAction extends BaseUnstageAction {
    static ID: string;
    static LABEL: string;
    private contextService;
    constructor(id: string, label: string, gitService: IGitService, editorService: IWorkbenchEditorService, contextService: IWorkspaceContextService);
    protected updateEnablement(): void;
    isEnabled(): boolean;
    run(context?: any): TPromise<void>;
}
export declare abstract class BaseStageRangesAction extends baseeditor.EditorInputAction {
    private gitService;
    private editorService;
    private editor;
    constructor(id: string, label: string, editor: tdeditor.TextDiffEditor, gitService: IGitService, editorService: IWorkbenchEditorService);
    isEnabled(): boolean;
    protected getRangesAppliedResult(editor: editorbrowser.IDiffEditor): string;
    run(): TPromise<any>;
    private updateEnablement();
}
export declare class StageRangesAction extends BaseStageRangesAction {
    static ID: string;
    static LABEL: string;
    constructor(editor: tdeditor.TextDiffEditor, gitService: IGitService, editorService: IWorkbenchEditorService);
}
export declare class UnstageRangesAction extends BaseStageRangesAction {
    static ID: string;
    static LABEL: string;
    constructor(editor: tdeditor.TextDiffEditor, gitService: IGitService, editorService: IWorkbenchEditorService);
    protected getRangesAppliedResult(editor: editorbrowser.IDiffEditor): string;
}
