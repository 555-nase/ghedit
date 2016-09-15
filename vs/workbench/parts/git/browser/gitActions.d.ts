import { Promise, TPromise } from 'vs/base/common/winjs.base';
import { IEventEmitter } from 'vs/base/common/eventEmitter';
import { IDisposable } from 'vs/base/common/lifecycle';
import { Action } from 'vs/base/common/actions';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IWorkspaceContextService } from 'vs/workbench/services/workspace/common/contextService';
import { IEventService } from 'vs/platform/event/common/event';
import { IFileService } from 'vs/platform/files/common/files';
import { IMessageService } from 'vs/platform/message/common/message';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IGitService, IBranch } from 'vs/workbench/parts/git/common/git';
import { IQuickOpenService } from 'vs/workbench/services/quickopen/common/quickOpenService';
export declare abstract class GitAction extends Action {
    protected gitService: IGitService;
    protected toDispose: IDisposable[];
    constructor(id: string, label: string, cssClass: string, gitService: IGitService);
    protected onGitServiceChange(): void;
    protected updateEnablement(): void;
    protected isEnabled(): boolean;
    abstract run(e?: any): Promise;
    dispose(): void;
}
export declare class OpenChangeAction extends GitAction {
    static ID: string;
    protected editorService: IWorkbenchEditorService;
    constructor(editorService: IWorkbenchEditorService, gitService: IGitService);
    protected isEnabled(): boolean;
    run(context?: any): Promise;
}
export declare class OpenFileAction extends GitAction {
    private static DELETED_STATES;
    static ID: string;
    protected fileService: IFileService;
    protected editorService: IWorkbenchEditorService;
    protected contextService: IWorkspaceContextService;
    constructor(editorService: IWorkbenchEditorService, fileService: IFileService, gitService: IGitService, contextService: IWorkspaceContextService);
    protected isEnabled(): boolean;
    private getPath(status);
    run(context?: any): Promise;
}
export declare class InitAction extends GitAction {
    static ID: string;
    constructor(gitService: IGitService);
    protected isEnabled(): boolean;
    run(): Promise;
}
export declare class RefreshAction extends GitAction {
    static ID: string;
    constructor(gitService: IGitService);
    run(): Promise;
}
export declare abstract class BaseStageAction extends GitAction {
    protected editorService: IWorkbenchEditorService;
    constructor(id: string, label: string, className: string, gitService: IGitService, editorService: IWorkbenchEditorService);
    run(context?: any): Promise;
    private findGitWorkingTreeEditor();
    dispose(): void;
}
export declare class StageAction extends BaseStageAction {
    static ID: string;
    static LABEL: string;
    constructor(gitService: IGitService, editorService: IWorkbenchEditorService);
}
export declare class GlobalStageAction extends BaseStageAction {
    static ID: string;
    constructor(gitService: IGitService, editorService: IWorkbenchEditorService);
    protected isEnabled(): boolean;
    run(context?: any): Promise;
}
export declare abstract class BaseUndoAction extends GitAction {
    private eventService;
    private editorService;
    private messageService;
    private fileService;
    private contextService;
    constructor(id: string, label: string, className: string, gitService: IGitService, eventService: IEventService, messageService: IMessageService, fileService: IFileService, editorService: IWorkbenchEditorService, contextService: IWorkspaceContextService);
    protected isEnabled(): boolean;
    run(context?: any): Promise;
    private findWorkingTreeDiffEditor();
    private getConfirm(context);
    dispose(): void;
}
export declare class UndoAction extends BaseUndoAction {
    static ID: string;
    constructor(gitService: IGitService, eventService: IEventService, messageService: IMessageService, fileService: IFileService, editorService: IWorkbenchEditorService, contextService: IWorkspaceContextService);
}
export declare class GlobalUndoAction extends BaseUndoAction {
    static ID: string;
    constructor(gitService: IGitService, eventService: IEventService, messageService: IMessageService, fileService: IFileService, editorService: IWorkbenchEditorService, contextService: IWorkspaceContextService);
    protected isEnabled(): boolean;
    run(context?: any): Promise;
}
export declare abstract class BaseUnstageAction extends GitAction {
    protected editorService: IWorkbenchEditorService;
    constructor(id: string, label: string, className: string, gitService: IGitService, editorService: IWorkbenchEditorService);
    protected isEnabled(): boolean;
    run(context?: any): Promise;
    private findGitIndexEditor();
    dispose(): void;
}
export declare class UnstageAction extends BaseUnstageAction {
    static ID: string;
    static LABEL: string;
    constructor(gitService: IGitService, editorService: IWorkbenchEditorService);
}
export declare class GlobalUnstageAction extends BaseUnstageAction {
    static ID: string;
    constructor(gitService: IGitService, editorService: IWorkbenchEditorService);
    protected isEnabled(): boolean;
    run(context?: any): Promise;
}
export declare class CheckoutAction extends GitAction {
    static ID: string;
    private editorService;
    private branch;
    private HEAD;
    private state;
    private runPromises;
    constructor(branch: IBranch, gitService: IGitService, editorService: IWorkbenchEditorService);
    protected onGitServiceChange(): void;
    protected isEnabled(): boolean;
    run(context?: any): Promise;
    dispose(): void;
    private actuallyDispose();
}
export declare class BranchAction extends GitAction {
    static ID: string;
    private checkout;
    constructor(checkout: boolean, gitService: IGitService);
    run(context?: any): Promise;
}
export interface ICommitState extends IEventEmitter {
    getCommitMessage(): string;
    onEmptyCommitMessage(): void;
}
export declare abstract class BaseCommitAction extends GitAction {
    protected commitState: ICommitState;
    constructor(commitState: ICommitState, id: string, label: string, cssClass: string, gitService: IGitService);
    protected isEnabled(): boolean;
    run(context?: any): Promise;
}
export declare class CommitAction extends BaseCommitAction {
    static ID: string;
    constructor(commitState: ICommitState, gitService: IGitService);
}
export declare class InputCommitAction extends GitAction {
    private quickOpenService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, gitService: IGitService, quickOpenService: IQuickOpenService);
    protected isEnabled(): boolean;
    run(): TPromise<any>;
}
export declare class StageAndCommitAction extends BaseCommitAction {
    static ID: string;
    constructor(commitState: ICommitState, gitService: IGitService);
    protected isEnabled(): boolean;
    run(context?: any): Promise;
}
export declare class SmartCommitAction extends BaseCommitAction {
    static ID: string;
    private static ALL;
    private static STAGED;
    private messageService;
    constructor(commitState: ICommitState, gitService: IGitService, messageService: IMessageService);
    protected onGitServiceChange(): void;
    protected isEnabled(): boolean;
    run(context?: any): Promise;
}
export declare class PullAction extends GitAction {
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, gitService: IGitService);
    protected isEnabled(): boolean;
    run(context?: any): Promise;
    protected pull(rebase?: boolean): Promise;
}
export declare class PullWithRebaseAction extends PullAction {
    static ID: string;
    static LABEL: string;
    constructor(gitService: IGitService);
    run(context?: any): Promise;
}
export declare class PushAction extends GitAction {
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, gitService: IGitService);
    protected isEnabled(): boolean;
    run(context?: any): Promise;
}
export declare class PublishAction extends GitAction {
    private quickOpenService;
    private messageService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, gitService: IGitService, quickOpenService: IQuickOpenService, messageService: IMessageService);
    protected isEnabled(): boolean;
    run(context?: any): Promise;
}
export declare class SyncAction extends GitAction {
    private configurationService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, gitService: IGitService, configurationService: IConfigurationService);
    protected isEnabled(): boolean;
    run(context?: any): Promise;
}
export declare class UndoLastCommitAction extends GitAction {
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, gitService: IGitService);
    run(): Promise;
}
export declare class StartGitCheckoutAction extends Action {
    static ID: string;
    static LABEL: string;
    private quickOpenService;
    constructor(id: string, label: string, quickOpenService: IQuickOpenService);
    run(event?: any): Promise;
}
export declare class StartGitBranchAction extends Action {
    static ID: string;
    static LABEL: string;
    private quickOpenService;
    constructor(id: string, label: string, quickOpenService: IQuickOpenService);
    run(event?: any): Promise;
}
