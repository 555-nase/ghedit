import { TPromise } from 'vs/base/common/winjs.base';
import { Dimension, Builder } from 'vs/base/browser/builder';
import { IAction, IActionRunner, Action } from 'vs/base/common/actions';
import { IActionItem } from 'vs/base/browser/ui/actionbar/actionbar';
import { ITree, IFocusEvent, ISelectionEvent } from 'vs/base/parts/tree/browser/tree';
import { ToolBar } from 'vs/base/browser/ui/toolbar/toolbar';
import { IDisposable } from 'vs/base/common/lifecycle';
import { CollapsibleView, CollapsibleState, FixedCollapsibleView, IView } from 'vs/base/browser/ui/splitview/splitview';
import { IViewletService } from 'vs/workbench/services/viewlet/common/viewletService';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IViewlet } from 'vs/workbench/common/viewlet';
import { Composite, CompositeDescriptor, CompositeRegistry } from 'vs/workbench/browser/composite';
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IMessageService } from 'vs/platform/message/common/message';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
export declare abstract class Viewlet extends Composite implements IViewlet {
    getOptimalWidth(): number;
}
/**
 * Helper subtype of viewlet for those that use a tree inside.
 */
export declare abstract class ViewerViewlet extends Viewlet {
    protected viewer: ITree;
    private viewerContainer;
    private wasLayouted;
    create(parent: Builder): TPromise<void>;
    /**
     * Called when an element in the viewer receives selection.
     */
    abstract onSelection(e: ISelectionEvent): void;
    /**
     * Called when an element in the viewer receives focus.
     */
    abstract onFocus(e: IFocusEvent): void;
    /**
     * Returns true if this viewlet is currently visible and false otherwise.
     */
    abstract createViewer(viewerContainer: Builder): ITree;
    /**
     * Returns the viewer that is contained in this viewlet.
     */
    getViewer(): ITree;
    setVisible(visible: boolean): TPromise<void>;
    focus(): void;
    reveal(element: any, relativeTop?: number): TPromise<void>;
    layout(dimension: Dimension): void;
    getControl(): ITree;
    dispose(): void;
}
/**
 * A viewlet descriptor is a leightweight descriptor of a viewlet in the workbench.
 */
export declare class ViewletDescriptor extends CompositeDescriptor<Viewlet> {
    isGlobal: boolean;
    constructor(moduleId: string, ctorName: string, id: string, name: string, cssClass?: string, order?: number, isGlobal?: boolean);
}
export declare const Extensions: {
    Viewlets: string;
};
export declare class ViewletRegistry extends CompositeRegistry<Viewlet> {
    private defaultViewletId;
    /**
     * Registers a viewlet to the platform.
     */
    registerViewlet(descriptor: ViewletDescriptor): void;
    /**
     * Returns the viewlet descriptor for the given id or null if none.
     */
    getViewlet(id: string): ViewletDescriptor;
    /**
     * Returns an array of registered viewlets known to the platform.
     */
    getViewlets(): ViewletDescriptor[];
    /**
     * Sets the id of the viewlet that should open on startup by default.
     */
    setDefaultViewletId(id: string): void;
    /**
     * Gets the id of the viewlet that should open on startup by default.
     */
    getDefaultViewletId(): string;
}
/**
 * A reusable action to toggle a viewlet with a specific id.
 */
export declare class ToggleViewletAction extends Action {
    private viewletService;
    private editorService;
    private viewletId;
    constructor(id: string, name: string, viewletId: string, viewletService: IViewletService, editorService: IWorkbenchEditorService);
    run(): TPromise<any>;
    private otherViewletShowing();
    private sidebarHasFocus();
}
export declare class CollapseAction extends Action {
    constructor(viewer: ITree, enabled: boolean, clazz: string);
}
export interface IViewletView extends IView {
    create(): TPromise<void>;
    setVisible(visible: boolean): TPromise<void>;
    getActions(): IAction[];
    getSecondaryActions(): IAction[];
    getActionItem(action: IAction): IActionItem;
    shutdown(): void;
    focusBody(): void;
    isExpanded(): boolean;
}
/**
 * The AdaptiveCollapsibleViewletView can grow with the content inside dynamically.
 */
export declare abstract class AdaptiveCollapsibleViewletView extends FixedCollapsibleView implements IViewletView {
    private viewName;
    private messageService;
    private keybindingService;
    protected contextMenuService: IContextMenuService;
    protected treeContainer: HTMLElement;
    protected tree: ITree;
    protected toDispose: IDisposable[];
    protected isVisible: boolean;
    protected toolBar: ToolBar;
    protected actionRunner: IActionRunner;
    protected isDisposed: boolean;
    private dragHandler;
    constructor(actionRunner: IActionRunner, initialBodySize: number, collapsed: boolean, viewName: string, messageService: IMessageService, keybindingService: IKeybindingService, contextMenuService: IContextMenuService);
    create(): TPromise<void>;
    renderHeader(container: HTMLElement): void;
    protected changeState(state: CollapsibleState): void;
    protected renderViewTree(container: HTMLElement): HTMLElement;
    getViewer(): ITree;
    setVisible(visible: boolean): TPromise<void>;
    focusBody(): void;
    protected reveal(element: any, relativeTop?: number): TPromise<void>;
    protected layoutBody(size: number): void;
    getActions(): IAction[];
    getSecondaryActions(): IAction[];
    getActionItem(action: IAction): IActionItem;
    shutdown(): void;
    dispose(): void;
}
export declare abstract class CollapsibleViewletView extends CollapsibleView implements IViewletView {
    private viewName;
    protected messageService: IMessageService;
    private keybindingService;
    protected contextMenuService: IContextMenuService;
    protected treeContainer: HTMLElement;
    protected tree: ITree;
    protected toDispose: IDisposable[];
    protected isVisible: boolean;
    protected toolBar: ToolBar;
    protected actionRunner: IActionRunner;
    protected isDisposed: boolean;
    private dragHandler;
    constructor(actionRunner: IActionRunner, collapsed: boolean, viewName: string, messageService: IMessageService, keybindingService: IKeybindingService, contextMenuService: IContextMenuService, headerSize?: number);
    protected changeState(state: CollapsibleState): void;
    create(): TPromise<void>;
    renderHeader(container: HTMLElement): void;
    protected renderViewTree(container: HTMLElement): HTMLElement;
    getViewer(): ITree;
    setVisible(visible: boolean): TPromise<void>;
    focusBody(): void;
    protected reveal(element: any, relativeTop?: number): TPromise<void>;
    layoutBody(size: number): void;
    getActions(): IAction[];
    getSecondaryActions(): IAction[];
    getActionItem(action: IAction): IActionItem;
    shutdown(): void;
    dispose(): void;
}
