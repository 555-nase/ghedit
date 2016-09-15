import 'vs/css!./media/git.contribution';
import ext = require('vs/workbench/common/contributions');
import git = require('vs/workbench/parts/git/common/git');
import { IActivityService } from 'vs/workbench/services/activity/common/activityService';
import { IEventService } from 'vs/platform/event/common/event';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IMessageService } from 'vs/platform/message/common/message';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IEditorGroupService } from 'vs/workbench/services/group/common/groupService';
import IGitService = git.IGitService;
export declare class StatusUpdater implements ext.IWorkbenchContribution {
    static ID: string;
    private gitService;
    private eventService;
    private activityService;
    private messageService;
    private progressBadgeDelayer;
    private toDispose;
    constructor(gitService: IGitService, eventService: IEventService, activityService: IActivityService, messageService: IMessageService);
    private onGitServiceChange();
    private showChangesBadge();
    getId(): string;
    dispose(): void;
}
export declare class DirtyDiffDecorator implements ext.IWorkbenchContribution {
    private gitService;
    private messageService;
    private editorService;
    private eventService;
    private contextService;
    private instantiationService;
    private models;
    private decorators;
    private toDispose;
    constructor(gitService: IGitService, messageService: IMessageService, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, eventService: IEventService, contextService: IWorkspaceContextService, instantiationService: IInstantiationService);
    getId(): string;
    private onEditorsChanged();
    private onModelVisible(model, path);
    private onModelInvisible(model);
    dispose(): void;
}
export declare const VIEWLET_ID: string;
export declare function registerContributions(): void;
