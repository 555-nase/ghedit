import { TPromise } from 'vs/base/common/winjs.base';
import { IAction } from 'vs/base/common/actions';
import { IActionItem } from 'vs/base/browser/ui/actionbar/actionbar';
import { CollapsibleView } from 'vs/base/browser/ui/splitview/splitview';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
export declare class EmptyView extends CollapsibleView {
    private instantiationService;
    constructor(instantiationService: IInstantiationService);
    renderHeader(container: HTMLElement): void;
    protected renderBody(container: HTMLElement): void;
    protected layoutBody(size: number): void;
    private runWorkbenchAction(actionId);
    create(): TPromise<void>;
    setVisible(visible: boolean): TPromise<void>;
    focusBody(): void;
    protected reveal(element: any, relativeTop?: number): TPromise<void>;
    getActions(): IAction[];
    getSecondaryActions(): IAction[];
    getActionItem(action: IAction): IActionItem;
    shutdown(): void;
}
