import { TPromise } from 'vs/base/common/winjs.base';
import { IActionRunner } from 'vs/base/common/actions';
import { ActionsRenderer } from 'vs/base/parts/tree/browser/actionsRenderer';
import { ITree, IElementCallback, IDataSource, ISorter, IAccessibilityProvider, IFilter } from 'vs/base/parts/tree/browser/tree';
import { DefaultController } from 'vs/base/parts/tree/browser/treeDefaults';
import { FileMatchOrMatch } from 'vs/workbench/parts/search/common/searchModel';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { IKeyboardEvent } from 'vs/base/browser/keyboardEvent';
import { SearchViewlet } from 'vs/workbench/parts/search/browser/searchViewlet';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
export declare class SearchDataSource implements IDataSource {
    getId(tree: ITree, element: any): string;
    getChildren(tree: ITree, element: any): TPromise<any[]>;
    hasChildren(tree: ITree, element: any): boolean;
    getParent(tree: ITree, element: any): TPromise<any>;
}
export declare class SearchSorter implements ISorter {
    compare(tree: ITree, elementA: FileMatchOrMatch, elementB: FileMatchOrMatch): number;
}
export declare class SearchRenderer extends ActionsRenderer {
    private contextService;
    private instantiationService;
    constructor(actionRunner: IActionRunner, viewlet: SearchViewlet, contextService: IWorkspaceContextService, instantiationService: IInstantiationService);
    getContentHeight(tree: ITree, element: any): number;
    renderContents(tree: ITree, element: FileMatchOrMatch, domElement: HTMLElement, previousCleanupFn: IElementCallback): IElementCallback;
}
export declare class SearchAccessibilityProvider implements IAccessibilityProvider {
    private contextService;
    constructor(contextService: IWorkspaceContextService);
    getAriaLabel(tree: ITree, element: FileMatchOrMatch): string;
}
export declare class SearchController extends DefaultController {
    private viewlet;
    private instantiationService;
    constructor(viewlet: SearchViewlet, instantiationService: IInstantiationService);
    protected onEscape(tree: ITree, event: IKeyboardEvent): boolean;
    private onDelete(tree, event);
    private onReplace(tree, event);
    private onReplaceAll(tree, event);
    protected onUp(tree: ITree, event: IKeyboardEvent): boolean;
    protected onSpace(tree: ITree, event: IKeyboardEvent): boolean;
}
export declare class SearchFilter implements IFilter {
    isVisible(tree: ITree, element: any): boolean;
}
