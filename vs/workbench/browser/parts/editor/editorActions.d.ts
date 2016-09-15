import { TPromise } from 'vs/base/common/winjs.base';
import { Action } from 'vs/base/common/actions';
import { IEditorIdentifier, IEditorContext } from 'vs/workbench/common/editor';
import { IEditorQuickOpenEntry, QuickOpenAction } from 'vs/workbench/browser/quickopen';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IQuickOpenService } from 'vs/workbench/services/quickopen/common/quickOpenService';
import { IPartService } from 'vs/workbench/services/part/common/partService';
import { Position } from 'vs/platform/editor/common/editor';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IHistoryService } from 'vs/workbench/services/history/common/history';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IEditorGroupService } from 'vs/workbench/services/group/common/groupService';
export declare class SplitEditorAction extends Action {
    private editorService;
    private editorGroupService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService);
    run(context?: IEditorContext): TPromise<any>;
}
export declare class NavigateBetweenGroupsAction extends Action {
    private editorService;
    private editorGroupService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService);
    run(): TPromise<any>;
}
export declare class FocusFirstGroupAction extends Action {
    private editorService;
    private editorGroupService;
    private historyService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, historyService: IHistoryService);
    run(): TPromise<any>;
}
export declare abstract class BaseFocusSideGroupAction extends Action {
    private editorService;
    private editorGroupService;
    private historyService;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, historyService: IHistoryService);
    protected abstract getReferenceEditorSide(): Position;
    protected abstract getTargetEditorSide(): Position;
    run(): TPromise<any>;
}
export declare class FocusSecondGroupAction extends BaseFocusSideGroupAction {
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, historyService: IHistoryService);
    protected getReferenceEditorSide(): Position;
    protected getTargetEditorSide(): Position;
}
export declare class FocusThirdGroupAction extends BaseFocusSideGroupAction {
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, historyService: IHistoryService);
    protected getReferenceEditorSide(): Position;
    protected getTargetEditorSide(): Position;
}
export declare class FocusPreviousGroup extends Action {
    private editorGroupService;
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(): TPromise<any>;
}
export declare class FocusNextGroup extends Action {
    private editorService;
    static ID: string;
    static LABEL: string;
    private navigateActions;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, instantiationService: IInstantiationService);
    run(event?: any): TPromise<any>;
}
export declare class OpenToSideAction extends Action {
    private editorService;
    static OPEN_TO_SIDE_ID: string;
    static OPEN_TO_SIDE_LABEL: string;
    constructor(editorService: IWorkbenchEditorService);
    private updateEnablement();
    run(context: any): TPromise<any>;
}
export declare function toEditorQuickOpenEntry(element: any): IEditorQuickOpenEntry;
export declare class CloseEditorAction extends Action {
    private editorGroupService;
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(context?: IEditorContext): TPromise<any>;
}
export declare class CloseLeftEditorsInGroupAction extends Action {
    private editorService;
    private groupService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, groupService: IEditorGroupService);
    run(context?: IEditorContext): TPromise<any>;
}
export declare class CloseRightEditorsInGroupAction extends Action {
    private editorService;
    private groupService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, groupService: IEditorGroupService);
    run(context?: IEditorContext): TPromise<any>;
}
export declare class CloseAllEditorsAction extends Action {
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService);
    run(): TPromise<any>;
}
export declare class CloseEditorsInOtherGroupsAction extends Action {
    private editorGroupService;
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(context?: IEditorContext): TPromise<any>;
}
export declare class CloseOtherEditorsInGroupAction extends Action {
    private editorGroupService;
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(context?: IEditorContext): TPromise<any>;
}
export declare class CloseEditorsInGroupAction extends Action {
    private editorGroupService;
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(context?: IEditorContext): TPromise<any>;
}
export declare class MoveGroupLeftAction extends Action {
    private editorGroupService;
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(context?: IEditorContext): TPromise<any>;
}
export declare class MoveGroupRightAction extends Action {
    private editorGroupService;
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(context?: IEditorContext): TPromise<any>;
}
export declare class MinimizeOtherGroupsAction extends Action {
    private editorGroupService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService);
    run(): TPromise<any>;
}
export declare class EvenGroupWidthsAction extends Action {
    private editorGroupService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService);
    run(): TPromise<any>;
}
export declare class MaximizeGroupAction extends Action {
    private editorService;
    private editorGroupService;
    private partService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, partService: IPartService);
    run(): TPromise<any>;
}
export declare class KeepEditorAction extends Action {
    private editorGroupService;
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(context?: IEditorContext): TPromise<any>;
}
export declare abstract class BaseNavigateEditorAction extends Action {
    protected editorGroupService: IEditorGroupService;
    protected editorService: IWorkbenchEditorService;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(): TPromise<any>;
    protected abstract navigate(): IEditorIdentifier;
}
export declare class OpenNextEditor extends BaseNavigateEditorAction {
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    protected navigate(): IEditorIdentifier;
}
export declare class OpenPreviousEditor extends BaseNavigateEditorAction {
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    protected navigate(): IEditorIdentifier;
}
export declare class NavigateForwardAction extends Action {
    private historyService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, historyService: IHistoryService);
    run(): TPromise<any>;
}
export declare class NavigateBackwardsAction extends Action {
    private historyService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, historyService: IHistoryService);
    run(): TPromise<any>;
}
export declare class ReopenClosedEditorAction extends Action {
    private historyService;
    private editorGroupService;
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, historyService: IHistoryService, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(): TPromise<any>;
}
export declare const NAVIGATE_IN_LEFT_GROUP_PREFIX: string;
export declare class ShowEditorsInLeftGroupAction extends QuickOpenAction {
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(actionId: string, actionLabel: string, quickOpenService: IQuickOpenService, editorService: IWorkbenchEditorService);
}
export declare const NAVIGATE_IN_CENTER_GROUP_PREFIX: string;
export declare class ShowEditorsInCenterGroupAction extends QuickOpenAction {
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(actionId: string, actionLabel: string, quickOpenService: IQuickOpenService, editorService: IWorkbenchEditorService);
}
export declare const NAVIGATE_IN_RIGHT_GROUP_PREFIX: string;
export declare class ShowEditorsInRightGroupAction extends QuickOpenAction {
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(actionId: string, actionLabel: string, quickOpenService: IQuickOpenService, editorService: IWorkbenchEditorService);
}
export declare class ShowEditorsInGroupAction extends Action {
    private quickOpenService;
    private editorGroupService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, quickOpenService: IQuickOpenService, editorGroupService: IEditorGroupService);
    run(context?: IEditorContext): TPromise<any>;
}
export declare const NAVIGATE_ALL_EDITORS_GROUP_PREFIX: string;
export declare class ShowAllEditorsAction extends QuickOpenAction {
    static ID: string;
    static LABEL: string;
    constructor(actionId: string, actionLabel: string, quickOpenService: IQuickOpenService);
}
export declare class BaseQuickOpenEditorInGroupAction extends Action {
    private quickOpenService;
    private keybindingService;
    private editorGroupService;
    private editorService;
    constructor(id: string, label: string, quickOpenService: IQuickOpenService, keybindingService: IKeybindingService, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(): TPromise<any>;
}
export declare class OpenPreviousRecentlyUsedEditorInGroupAction extends BaseQuickOpenEditorInGroupAction {
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, quickOpenService: IQuickOpenService, keybindingService: IKeybindingService, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
}
export declare class OpenNextRecentlyUsedEditorInGroupAction extends BaseQuickOpenEditorInGroupAction {
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, quickOpenService: IQuickOpenService, keybindingService: IKeybindingService, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
}
export declare class GlobalQuickOpenAction extends Action {
    private quickOpenService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, quickOpenService: IQuickOpenService);
    run(): TPromise<any>;
}
export declare class OpenPreviousEditorFromHistoryAction extends Action {
    private quickOpenService;
    private keybindingService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, quickOpenService: IQuickOpenService, keybindingService: IKeybindingService);
    run(): TPromise<any>;
}
export declare class ClearEditorHistoryAction extends Action {
    private editorService;
    private editorGroupService;
    private historyService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, historyService: IHistoryService);
    run(): TPromise<any>;
}
export declare class RemoveFromEditorHistoryAction extends Action {
    private editorGroupService;
    private quickOpenService;
    private historyService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, quickOpenService: IQuickOpenService, historyService: IHistoryService);
    run(): TPromise<any>;
}
export declare class BaseQuickOpenNavigateAction extends Action {
    private quickOpenService;
    private keybindingService;
    private navigateNext;
    constructor(id: string, label: string, navigateNext: boolean, quickOpenService: IQuickOpenService, keybindingService: IKeybindingService);
    run(event?: any): TPromise<any>;
}
export declare class QuickOpenNavigateNextAction extends BaseQuickOpenNavigateAction {
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, quickOpenService: IQuickOpenService, keybindingService: IKeybindingService);
}
export declare class QuickOpenNavigatePreviousAction extends BaseQuickOpenNavigateAction {
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, quickOpenService: IQuickOpenService, keybindingService: IKeybindingService);
}
export declare class FocusLastEditorInStackAction extends Action {
    private editorGroupService;
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(): TPromise<any>;
}
export declare class MoveEditorToLeftGroupAction extends Action {
    private editorGroupService;
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(): TPromise<any>;
}
export declare class MoveEditorToRightGroupAction extends Action {
    private editorGroupService;
    private editorService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService);
    run(): TPromise<any>;
}
