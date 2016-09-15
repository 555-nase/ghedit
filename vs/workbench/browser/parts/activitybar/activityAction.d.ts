import 'vs/css!./media/activityaction';
import { Action } from 'vs/base/common/actions';
import { BaseActionItem } from 'vs/base/browser/ui/actionbar/actionbar';
import { IBadge } from 'vs/workbench/services/activity/common/activityService';
import Event from 'vs/base/common/event';
export declare class ActivityAction extends Action {
    private badge;
    private _onDidChangeBadge;
    constructor(id: string, name: string, clazz: string);
    onDidChangeBadge: Event<this>;
    activate(): void;
    deactivate(): void;
    getBadge(): IBadge;
    setBadge(badge: IBadge): void;
}
export declare class ActivityActionItem extends BaseActionItem {
    private $e;
    private name;
    private _keybinding;
    private cssClass;
    private $badge;
    private $badgeContent;
    constructor(action: ActivityAction, activityName?: string, keybinding?: string);
    render(container: HTMLElement): void;
    focus(): void;
    setBadge(badge: IBadge): void;
    keybinding: string;
    private updateBadge(badge);
    protected _updateClass(): void;
    protected _updateChecked(): void;
    private _handleBadgeChangeEvenet();
    protected _updateEnabled(): void;
    dispose(): void;
}
