import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IMenu } from 'vs/platform/actions/common/actions';
import { IMessageService } from 'vs/platform/message/common/message';
import { IAction } from 'vs/base/common/actions';
import { ActionItem } from 'vs/base/browser/ui/actionbar/actionbar';
export declare function fillInActions(menu: IMenu, target: IAction[] | {
    primary: IAction[];
    secondary: IAction[];
}): void;
export declare function createActionItem(action: IAction, keybindingService: IKeybindingService, messageService: IMessageService): ActionItem;
