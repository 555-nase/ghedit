import { TPromise } from 'vs/base/common/winjs.base';
import actions = require('vs/base/common/actions');
import keyboard = require('vs/base/browser/keyboardEvent');
import actionbar = require('vs/base/browser/ui/actionbar/actionbar');
import tree = require('vs/base/parts/tree/browser/tree');
import renderer = require('vs/base/parts/tree/browser/actionsRenderer');
import treedefaults = require('vs/base/parts/tree/browser/treeDefaults');
import debug = require('vs/workbench/parts/debug/common/debug');
import debugviewer = require('vs/workbench/parts/debug/electron-browser/debugViewer');
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
export declare class ReplExpressionsDataSource implements tree.IDataSource {
    private debugService;
    constructor(debugService: debug.IDebugService);
    getId(tree: tree.ITree, element: any): string;
    hasChildren(tree: tree.ITree, element: any): boolean;
    getChildren(tree: tree.ITree, element: any): TPromise<any>;
    getParent(tree: tree.ITree, element: any): TPromise<any>;
}
export declare class ReplExpressionsRenderer implements tree.IRenderer {
    private editorService;
    private contextService;
    private static VARIABLE_TEMPLATE_ID;
    private static INPUT_OUTPUT_PAIR_TEMPLATE_ID;
    private static VALUE_OUTPUT_TEMPLATE_ID;
    private static KEY_VALUE_OUTPUT_TEMPLATE_ID;
    private static FILE_LOCATION_PATTERNS;
    private width;
    private characterWidth;
    constructor(editorService: IWorkbenchEditorService, contextService: IWorkspaceContextService);
    getHeight(tree: tree.ITree, element: any): number;
    private getHeightForString(s);
    setWidth(fullWidth: number, characterWidth: number): void;
    getTemplateId(tree: tree.ITree, element: any): string;
    renderTemplate(tree: tree.ITree, templateId: string, container: HTMLElement): any;
    renderElement(tree: tree.ITree, element: any, templateId: string, templateData: any): void;
    private renderInputOutputPair(tree, expression, templateData);
    private renderOutputValue(output, templateData);
    private handleANSIOutput(text);
    private insert(arg, target);
    private handleLinks(text);
    private onLinkClick(event, resource, line, column);
    private renderOutputKeyValue(tree, output, templateData);
    disposeTemplate(tree: tree.ITree, templateId: string, templateData: any): void;
}
export declare class ReplExpressionsAccessibilityProvider implements tree.IAccessibilityProvider {
    getAriaLabel(tree: tree.ITree, element: any): string;
}
export declare class ReplExpressionsActionProvider implements renderer.IActionProvider {
    private instantiationService;
    constructor(instantiationService: IInstantiationService);
    hasActions(tree: tree.ITree, element: any): boolean;
    getActions(tree: tree.ITree, element: any): TPromise<actions.IAction[]>;
    hasSecondaryActions(tree: tree.ITree, element: any): boolean;
    getSecondaryActions(tree: tree.ITree, element: any): TPromise<actions.IAction[]>;
    getActionItem(tree: tree.ITree, element: any, action: actions.IAction): actionbar.IActionItem;
}
export declare class ReplExpressionsController extends debugviewer.BaseDebugController {
    private replInput;
    private lastSelectedString;
    constructor(debugService: debug.IDebugService, contextMenuService: IContextMenuService, actionProvider: renderer.IActionProvider, replInput: HTMLInputElement, focusOnContextMenu?: boolean);
    protected onLeftClick(tree: tree.ITree, element: any, eventish: treedefaults.ICancelableEvent, origin?: string): boolean;
    protected onDown(tree: tree.ITree, event: keyboard.IKeyboardEvent): boolean;
}
