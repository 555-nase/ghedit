import winjs = require('vs/base/common/winjs.base');
import lifecycle = require('vs/base/common/lifecycle');
import keyboard = require('vs/base/browser/keyboardEvent');
import mouse = require('vs/base/browser/mouseEvent');
import actions = require('vs/base/common/actions');
import actionbar = require('vs/base/browser/ui/actionbar/actionbar');
import tree = require('vs/base/parts/tree/browser/tree');
import treedefaults = require('vs/base/parts/tree/browser/treeDefaults');
import actionsrenderer = require('vs/base/parts/tree/browser/actionsRenderer');
import * as git from 'vs/workbench/parts/git/common/git';
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IMessageService } from 'vs/platform/message/common/message';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import IGitService = git.IGitService;
export declare class ActionContainer implements lifecycle.IDisposable {
    private cache;
    private instantiationService;
    constructor(instantiationService: IInstantiationService);
    protected getAction(ctor: any, ...args: any[]): any;
    dispose(): void;
}
export declare class DataSource implements tree.IDataSource {
    getId(tree: tree.ITree, element: any): string;
    hasChildren(tree: tree.ITree, element: any): boolean;
    getChildren(tree: tree.ITree, element: any): winjs.Promise;
    getParent(tree: tree.ITree, element: any): winjs.Promise;
}
export declare class ActionProvider extends ActionContainer implements actionsrenderer.IActionProvider {
    private gitService;
    constructor(instantiationService: IInstantiationService, gitService: IGitService);
    hasActions(tree: tree.ITree, element: any): boolean;
    getActions(tree: tree.ITree, element: any): winjs.TPromise<actions.IAction[]>;
    getActionsForFileStatusType(statusType: git.StatusType): actions.IAction[];
    getActionsForGroupStatusType(statusType: git.StatusType): actions.IAction[];
    hasSecondaryActions(tree: tree.ITree, element: any): boolean;
    getSecondaryActions(tree: tree.ITree, element: any): winjs.TPromise<actions.IAction[]>;
    getActionItem(tree: tree.ITree, element: any, action: actions.IAction): actionbar.IActionItem;
}
export declare class Renderer implements tree.IRenderer {
    private actionProvider;
    private actionRunner;
    private messageService;
    private gitService;
    private contextService;
    constructor(actionProvider: ActionProvider, actionRunner: actions.IActionRunner, messageService: IMessageService, gitService: IGitService, contextService: IWorkspaceContextService);
    getHeight(tree: tree.ITree, element: any): number;
    getTemplateId(tree: tree.ITree, element: any): string;
    renderTemplate(tree: tree.ITree, templateId: string, container: HTMLElement): any;
    private renderStatusGroupTemplate(statusType, container);
    private renderFileStatusTemplate(statusType, container);
    renderElement(tree: tree.ITree, element: any, templateId: string, templateData: any): void;
    private static renderStatusGroup(statusGroup, data);
    private renderFileStatus(tree, fileStatus, data);
    disposeTemplate(tree: tree.ITree, templateId: string, templateData: any): void;
    private static disposeFileStatusTemplate(templateData);
    private static statusToChar(status);
    static statusToTitle(status: git.Status): string;
    private static statusToClass(status);
    private static templateIdToStatusType(templateId);
    private onError(error);
}
export declare class Filter implements tree.IFilter {
    isVisible(tree: tree.ITree, element: any): boolean;
}
export declare class Sorter implements tree.ISorter {
    compare(tree: tree.ITree, element: any, otherElement: any): number;
    private static compareStatus(element, otherElement);
}
export declare class DragAndDrop extends ActionContainer implements tree.IDragAndDrop {
    private gitService;
    private messageService;
    constructor(instantiationService: IInstantiationService, gitService: IGitService, messageService: IMessageService);
    getDragURI(tree: tree.ITree, element: any): string;
    onDragStart(tree: tree.ITree, data: tree.IDragAndDropData, originalEvent: mouse.DragMouseEvent): void;
    onDragOver(_tree: tree.ITree, data: tree.IDragAndDropData, targetElement: any, originalEvent: mouse.DragMouseEvent): tree.IDragOverReaction;
    private onDrag(targetElement, type);
    private onDragWorkingTree(targetElement);
    private onDragIndex(targetElement);
    private onDragMerge(targetElement);
    drop(tree: tree.ITree, data: tree.IDragAndDropData, targetElement: any, originalEvent: mouse.DragMouseEvent): void;
    private onError(error);
}
export declare class AccessibilityProvider implements tree.IAccessibilityProvider {
    getAriaLabel(tree: tree.ITree, element: any): string;
}
export declare class Controller extends treedefaults.DefaultController {
    private contextMenuService;
    private actionProvider;
    constructor(actionProvider: actionsrenderer.IActionProvider, contextMenuService: IContextMenuService);
    protected onLeftClick(tree: tree.ITree, element: any, event: mouse.IMouseEvent): boolean;
    protected onEnter(tree: tree.ITree, event: keyboard.IKeyboardEvent): boolean;
    protected onSpace(tree: tree.ITree, event: keyboard.IKeyboardEvent): boolean;
    onContextMenu(tree: tree.ITree, element: any, event: tree.ContextMenuEvent): boolean;
    protected onLeft(tree: tree.ITree, event: keyboard.IKeyboardEvent): boolean;
    protected onRight(tree: tree.ITree, event: keyboard.IKeyboardEvent): boolean;
    protected onUp(tree: tree.ITree, event: keyboard.IKeyboardEvent): boolean;
    protected onPageUp(tree: tree.ITree, event: keyboard.IKeyboardEvent): boolean;
    protected onDown(tree: tree.ITree, event: keyboard.IKeyboardEvent): boolean;
    protected onPageDown(tree: tree.ITree, event: keyboard.IKeyboardEvent): boolean;
    private canSelect(tree, ...elements);
    private shiftSelect(tree, oldFocus, event);
}
