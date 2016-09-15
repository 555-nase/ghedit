import 'vs/css!./quickopen';
import { IQuickNavigateConfiguration, IAutoFocus, IModel } from 'vs/base/parts/quickopen/common/quickOpen';
import { IModelProvider } from 'vs/base/parts/quickopen/browser/quickOpenViewer';
import { Dimension } from 'vs/base/browser/builder';
import { ITree, ContextMenuEvent } from 'vs/base/parts/tree/browser/tree';
import Severity from 'vs/base/common/severity';
import { ProgressBar } from 'vs/base/browser/ui/progressbar/progressbar';
import { DefaultController } from 'vs/base/parts/tree/browser/treeDefaults';
import { IActionProvider } from 'vs/base/parts/tree/browser/actionsRenderer';
export interface IQuickOpenCallbacks {
    onOk: () => void;
    onCancel: () => void;
    onType: (value: string) => void;
    onShow?: () => void;
    onHide?: (focusLost?: boolean) => void;
    onFocusLost?: () => boolean;
}
export interface IQuickOpenOptions {
    minItemsToShow?: number;
    maxItemsToShow?: number;
    inputPlaceHolder: string;
    inputAriaLabel?: string;
    actionProvider?: IActionProvider;
    enableAnimations?: boolean;
}
export interface IShowOptions {
    quickNavigateConfiguration?: IQuickNavigateConfiguration;
    autoFocus?: IAutoFocus;
}
export interface IQuickOpenUsageLogger {
    publicLog(eventName: string, data?: any): void;
}
export declare class QuickOpenController extends DefaultController {
    onContextMenu(tree: ITree, element: any, event: ContextMenuEvent): boolean;
}
export declare enum HideReason {
    ELEMENT_SELECTED = 0,
    FOCUS_LOST = 1,
    CANCELED = 2,
}
export declare class QuickOpenWidget implements IModelProvider {
    private static MAX_WIDTH;
    private static MAX_ITEMS_HEIGHT;
    private options;
    private builder;
    private tree;
    private inputBox;
    private inputContainer;
    private helpText;
    private treeContainer;
    private progressBar;
    private visible;
    private isLoosingFocus;
    private callbacks;
    private toUnbind;
    private currentInputToken;
    private quickNavigateConfiguration;
    private container;
    private treeElement;
    private inputElement;
    private usageLogger;
    private layoutDimensions;
    private model;
    constructor(container: HTMLElement, callbacks: IQuickOpenCallbacks, options: IQuickOpenOptions, usageLogger?: IQuickOpenUsageLogger);
    getModel(): IModel<any>;
    setCallbacks(callbacks: IQuickOpenCallbacks): void;
    create(): void;
    private onType();
    quickNavigate(configuration: IQuickNavigateConfiguration, next: boolean): void;
    private navigateInTree(keyCode, isShift?);
    private elementFocused(value, event?);
    private elementSelected(value, event?);
    private extractKeyMods(event);
    show(prefix: string, options?: IShowOptions): void;
    show(input: IModel<any>, options?: IShowOptions): void;
    private doShowWithPrefix(prefix);
    private doShowWithInput(input, autoFocus);
    private setInputAndLayout(input, autoFocus);
    private isElementVisible<T>(input, e);
    private autoFocus(input, autoFocus?);
    refresh(input: IModel<any>, autoFocus: IAutoFocus): void;
    private setTreeHeightForInput(input);
    private getHeight(input);
    hide(reason?: HideReason): void;
    getQuickNavigateConfiguration(): IQuickNavigateConfiguration;
    setPlaceHolder(placeHolder: string): void;
    setValue(value: string, select: boolean): void;
    setPassword(isPassword: boolean): void;
    setInput(input: IModel<any>, autoFocus: IAutoFocus, ariaLabel?: string): void;
    getInput(): IModel<any>;
    showInputDecoration(decoration: Severity): void;
    clearInputDecoration(): void;
    runFocus(): boolean;
    getProgressBar(): ProgressBar;
    setExtraClass(clazz: string): void;
    isVisible(): boolean;
    layout(dimension: Dimension): void;
    private gainingFocus();
    private loosingFocus(e);
    dispose(): void;
}
