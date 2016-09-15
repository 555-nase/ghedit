import 'vs/css!./actionsRenderer';
import Lifecycle = require('vs/base/common/lifecycle');
import WinJS = require('vs/base/common/winjs.base');
import Actions = require('vs/base/common/actions');
import ActionBar = require('vs/base/browser/ui/actionbar/actionbar');
import TreeDefaults = require('./treeDefaults');
import Tree = require('vs/base/parts/tree/browser/tree');
export interface IActionProvider {
    hasActions(tree: Tree.ITree, element: any): boolean;
    getActions(tree: Tree.ITree, element: any): WinJS.TPromise<Actions.IAction[]>;
    hasSecondaryActions(tree: Tree.ITree, element: any): boolean;
    getSecondaryActions(tree: Tree.ITree, element: any): WinJS.TPromise<Actions.IAction[]>;
    getActionItem(tree: Tree.ITree, element: any, action: Actions.IAction): ActionBar.IActionItem;
}
export interface IActionsRendererOptions {
    actionProvider: IActionProvider;
    actionRunner?: Actions.IActionRunner;
}
export declare class ActionsRenderer extends TreeDefaults.LegacyRenderer implements Lifecycle.IDisposable {
    private static CONTENTS_CLEANUP_FN_KEY;
    private static NO_OP;
    protected actionProvider: IActionProvider;
    protected actionRunner: Actions.IActionRunner;
    constructor(opts: IActionsRendererOptions);
    getHeight(tree: Tree.ITree, element: any): number;
    protected render(tree: Tree.ITree, element: any, container: HTMLElement, previousCleanupFn?: Tree.IElementCallback): Tree.IElementCallback;
    getContentHeight(tree: Tree.ITree, element: any): number;
    renderContents(tree: Tree.ITree, element: any, container: HTMLElement, previousCleanupFn: Tree.IElementCallback): Tree.IElementCallback;
    getActionContext(tree: Tree.ITree, element: any): any;
    onError(error: any): void;
    dispose(): void;
}
