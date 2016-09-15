import { TPromise } from 'vs/base/common/winjs.base';
import { IMouseEvent } from 'vs/base/browser/mouseEvent';
import actions = require('vs/base/common/actions');
import actionbar = require('vs/base/browser/ui/actionbar/actionbar');
import tree = require('vs/base/parts/tree/browser/tree');
import treedefaults = require('vs/base/parts/tree/browser/treeDefaults');
import renderer = require('vs/base/parts/tree/browser/actionsRenderer');
import debug = require('vs/workbench/parts/debug/common/debug');
import model = require('vs/workbench/parts/debug/common/debugModel');
import { IContextViewService, IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { IMessageService } from 'vs/platform/message/common/message';
import { IKeyboardEvent } from 'vs/base/browser/keyboardEvent';
export declare function renderExpressionValue(expressionOrValue: debug.IExpression | string, container: HTMLElement, showChanged: boolean, maxValueRenderLength?: number): void;
export declare function renderVariable(tree: tree.ITree, variable: model.Variable, data: IVariableTemplateData, showChanged: boolean): void;
export declare class BaseDebugController extends treedefaults.DefaultController {
    protected debugService: debug.IDebugService;
    private contextMenuService;
    private actionProvider;
    private focusOnContextMenu;
    constructor(debugService: debug.IDebugService, contextMenuService: IContextMenuService, actionProvider: renderer.IActionProvider, focusOnContextMenu?: boolean);
    onContextMenu(tree: tree.ITree, element: debug.IEnablement, event: tree.ContextMenuEvent): boolean;
    protected onDelete(tree: tree.ITree, event: IKeyboardEvent): boolean;
}
export declare class CallStackController extends BaseDebugController {
    protected onLeftClick(tree: tree.ITree, element: any, event: IMouseEvent): boolean;
    protected onEnter(tree: tree.ITree, event: IKeyboardEvent): boolean;
    protected onUp(tree: tree.ITree, event: IKeyboardEvent): boolean;
    protected onPageUp(tree: tree.ITree, event: IKeyboardEvent): boolean;
    protected onDown(tree: tree.ITree, event: IKeyboardEvent): boolean;
    protected onPageDown(tree: tree.ITree, event: IKeyboardEvent): boolean;
    private showMoreStackFrames(tree, threadId);
    private focusStackFrame(stackFrame, event, preserveFocus);
}
export declare class CallStackActionProvider implements renderer.IActionProvider {
    private instantiationService;
    private debugService;
    constructor(instantiationService: IInstantiationService, debugService: debug.IDebugService);
    hasActions(tree: tree.ITree, element: any): boolean;
    getActions(tree: tree.ITree, element: any): TPromise<actions.IAction[]>;
    hasSecondaryActions(tree: tree.ITree, element: any): boolean;
    getSecondaryActions(tree: tree.ITree, element: any): TPromise<actions.IAction[]>;
    getActionItem(tree: tree.ITree, element: any, action: actions.IAction): actionbar.IActionItem;
}
export declare class CallStackDataSource implements tree.IDataSource {
    private debugService;
    constructor(debugService: debug.IDebugService);
    getId(tree: tree.ITree, element: any): string;
    hasChildren(tree: tree.ITree, element: any): boolean;
    getChildren(tree: tree.ITree, element: any): TPromise<any>;
    private getThreadChildren(thread);
    getParent(tree: tree.ITree, element: any): TPromise<any>;
}
export declare class CallStackRenderer implements tree.IRenderer {
    private contextService;
    private static THREAD_TEMPLATE_ID;
    private static STACK_FRAME_TEMPLATE_ID;
    private static ERROR_TEMPLATE_ID;
    private static LOAD_MORE_TEMPLATE_ID;
    constructor(contextService: IWorkspaceContextService);
    getHeight(tree: tree.ITree, element: any): number;
    getTemplateId(tree: tree.ITree, element: any): string;
    renderTemplate(tree: tree.ITree, templateId: string, container: HTMLElement): any;
    renderElement(tree: tree.ITree, element: any, templateId: string, templateData: any): void;
    private renderThread(thread, data);
    private renderError(element, data);
    private renderLoadMore(element, data);
    private renderStackFrame(stackFrame, data);
    disposeTemplate(tree: tree.ITree, templateId: string, templateData: any): void;
}
export declare class CallstackAccessibilityProvider implements tree.IAccessibilityProvider {
    private contextService;
    constructor(contextService: IWorkspaceContextService);
    getAriaLabel(tree: tree.ITree, element: any): string;
}
export declare class VariablesActionProvider implements renderer.IActionProvider {
    private instantiationService;
    constructor(instantiationService: IInstantiationService);
    hasActions(tree: tree.ITree, element: any): boolean;
    getActions(tree: tree.ITree, element: any): TPromise<actions.IAction[]>;
    hasSecondaryActions(tree: tree.ITree, element: any): boolean;
    getSecondaryActions(tree: tree.ITree, element: any): TPromise<actions.IAction[]>;
    getActionItem(tree: tree.ITree, element: any, action: actions.IAction): actionbar.IActionItem;
}
export declare class VariablesDataSource implements tree.IDataSource {
    private debugService;
    constructor(debugService: debug.IDebugService);
    getId(tree: tree.ITree, element: any): string;
    hasChildren(tree: tree.ITree, element: any): boolean;
    getChildren(tree: tree.ITree, element: any): TPromise<any>;
    getParent(tree: tree.ITree, element: any): TPromise<any>;
}
export interface IVariableTemplateData {
    expression: HTMLElement;
    name: HTMLElement;
    value: HTMLElement;
}
export declare class VariablesRenderer implements tree.IRenderer {
    private debugService;
    private contextViewService;
    private static SCOPE_TEMPLATE_ID;
    private static VARIABLE_TEMPLATE_ID;
    constructor(debugService: debug.IDebugService, contextViewService: IContextViewService);
    getHeight(tree: tree.ITree, element: any): number;
    getTemplateId(tree: tree.ITree, element: any): string;
    renderTemplate(tree: tree.ITree, templateId: string, container: HTMLElement): any;
    renderElement(tree: tree.ITree, element: any, templateId: string, templateData: any): void;
    private renderScope(scope, data);
    disposeTemplate(tree: tree.ITree, templateId: string, templateData: any): void;
}
export declare class VariablesAccessibilityProvider implements tree.IAccessibilityProvider {
    getAriaLabel(tree: tree.ITree, element: any): string;
}
export declare class VariablesController extends BaseDebugController {
    constructor(debugService: debug.IDebugService, contextMenuService: IContextMenuService, actionProvider: renderer.IActionProvider);
    protected onLeftClick(tree: tree.ITree, element: any, event: IMouseEvent): boolean;
    protected setSelectedExpression(tree: tree.ITree, event: KeyboardEvent): boolean;
}
export declare class WatchExpressionsActionProvider implements renderer.IActionProvider {
    private instantiationService;
    constructor(instantiationService: IInstantiationService);
    hasActions(tree: tree.ITree, element: any): boolean;
    hasSecondaryActions(tree: tree.ITree, element: any): boolean;
    getActions(tree: tree.ITree, element: any): TPromise<actions.IAction[]>;
    getExpressionActions(): actions.IAction[];
    getSecondaryActions(tree: tree.ITree, element: any): TPromise<actions.IAction[]>;
    getActionItem(tree: tree.ITree, element: any, action: actions.IAction): actionbar.IActionItem;
}
export declare class WatchExpressionsDataSource implements tree.IDataSource {
    private debugService;
    constructor(debugService: debug.IDebugService);
    getId(tree: tree.ITree, element: any): string;
    hasChildren(tree: tree.ITree, element: any): boolean;
    getChildren(tree: tree.ITree, element: any): TPromise<any>;
    getParent(tree: tree.ITree, element: any): TPromise<any>;
}
export declare class WatchExpressionsRenderer implements tree.IRenderer {
    private actionRunner;
    private messageService;
    private debugService;
    private contextViewService;
    private static WATCH_EXPRESSION_TEMPLATE_ID;
    private static VARIABLE_TEMPLATE_ID;
    private toDispose;
    private actionProvider;
    constructor(actionProvider: renderer.IActionProvider, actionRunner: actions.IActionRunner, messageService: IMessageService, debugService: debug.IDebugService, contextViewService: IContextViewService);
    getHeight(tree: tree.ITree, element: any): number;
    getTemplateId(tree: tree.ITree, element: any): string;
    renderTemplate(tree: tree.ITree, templateId: string, container: HTMLElement): any;
    renderElement(tree: tree.ITree, element: any, templateId: string, templateData: any): void;
    private renderWatchExpression(tree, watchExpression, data);
    disposeTemplate(tree: tree.ITree, templateId: string, templateData: any): void;
    dispose(): void;
}
export declare class WatchExpressionsAccessibilityProvider implements tree.IAccessibilityProvider {
    getAriaLabel(tree: tree.ITree, element: any): string;
}
export declare class WatchExpressionsController extends BaseDebugController {
    constructor(debugService: debug.IDebugService, contextMenuService: IContextMenuService, actionProvider: renderer.IActionProvider);
    protected onLeftClick(tree: tree.ITree, element: any, event: IMouseEvent): boolean;
    protected onRename(tree: tree.ITree, event: KeyboardEvent): boolean;
    protected onDelete(tree: tree.ITree, event: IKeyboardEvent): boolean;
}
export declare class BreakpointsActionProvider implements renderer.IActionProvider {
    private instantiationService;
    constructor(instantiationService: IInstantiationService);
    hasActions(tree: tree.ITree, element: any): boolean;
    hasSecondaryActions(tree: tree.ITree, element: any): boolean;
    getActions(tree: tree.ITree, element: any): TPromise<actions.IAction[]>;
    getBreakpointActions(): actions.IAction[];
    getSecondaryActions(tree: tree.ITree, element: any): TPromise<actions.IAction[]>;
    getActionItem(tree: tree.ITree, element: any, action: actions.IAction): actionbar.IActionItem;
}
export declare class BreakpointsDataSource implements tree.IDataSource {
    getId(tree: tree.ITree, element: any): string;
    hasChildren(tree: tree.ITree, element: any): boolean;
    getChildren(tree: tree.ITree, element: any): TPromise<any>;
    getParent(tree: tree.ITree, element: any): TPromise<any>;
}
export declare class BreakpointsRenderer implements tree.IRenderer {
    private actionProvider;
    private actionRunner;
    private messageService;
    private contextService;
    private debugService;
    private contextViewService;
    private static EXCEPTION_BREAKPOINT_TEMPLATE_ID;
    private static FUNCTION_BREAKPOINT_TEMPLATE_ID;
    private static BREAKPOINT_TEMPLATE_ID;
    constructor(actionProvider: BreakpointsActionProvider, actionRunner: actions.IActionRunner, messageService: IMessageService, contextService: IWorkspaceContextService, debugService: debug.IDebugService, contextViewService: IContextViewService);
    getHeight(tree: tree.ITree, element: any): number;
    getTemplateId(tree: tree.ITree, element: any): string;
    renderTemplate(tree: tree.ITree, templateId: string, container: HTMLElement): any;
    renderElement(tree: tree.ITree, element: any, templateId: string, templateData: any): void;
    private renderExceptionBreakpoint(exceptionBreakpoint, data);
    private renderFunctionBreakpoint(tree, functionBreakpoint, data);
    private renderBreakpoint(tree, breakpoint, data);
    disposeTemplate(tree: tree.ITree, templateId: string, templateData: any): void;
}
export declare class BreakpointsAccessibilityProvider implements tree.IAccessibilityProvider {
    private contextService;
    constructor(contextService: IWorkspaceContextService);
    getAriaLabel(tree: tree.ITree, element: any): string;
}
export declare class BreakpointsController extends BaseDebugController {
    constructor(debugService: debug.IDebugService, contextMenuService: IContextMenuService, actionProvider: renderer.IActionProvider);
    protected onLeftClick(tree: tree.ITree, element: any, event: IMouseEvent): boolean;
    protected onRename(tree: tree.ITree, event: IKeyboardEvent): boolean;
    protected onSpace(tree: tree.ITree, event: IKeyboardEvent): boolean;
    protected onDelete(tree: tree.ITree, event: IKeyboardEvent): boolean;
    private openBreakpointSource(breakpoint, event, preserveFocus);
}
