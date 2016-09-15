import winjs = require('vs/base/common/winjs.base');
import lifecycle = require('vs/base/common/lifecycle');
import actions = require('vs/base/common/actions');
import actionbar = require('vs/base/browser/ui/actionbar/actionbar');
import actionsrenderer = require('vs/base/parts/tree/browser/actionsRenderer');
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import tree = require('vs/base/parts/tree/browser/tree');
export declare class ActionContainer implements lifecycle.IDisposable {
    private cache;
    private instantiationService;
    constructor(instantiationService: IInstantiationService);
    protected getAction(ctor: any, ...args: any[]): any;
    dispose(): void;
}
export declare class ActionProvider extends ActionContainer implements actionsrenderer.IActionProvider {
    constructor(instantiationService: IInstantiationService);
    hasActions(tree: tree.ITree, element: any): boolean;
    getActions(tree: tree.ITree, element: any): winjs.TPromise<actions.IAction[]>;
    getActionsForResource(): actions.IAction[];
    hasSecondaryActions(tree: tree.ITree, element: any): boolean;
    getSecondaryActions(tree: tree.ITree, element: any): winjs.TPromise<actions.IAction[]>;
    getActionItem(tree: tree.ITree, element: any, action: actions.IAction): actionbar.IActionItem;
}
