import { IGitService } from 'vs/workbench/parts/git/common/git';
import { CommandQuickOpenHandler } from 'vs/workbench/browser/quickopen';
import { IQuickOpenService } from 'vs/workbench/services/quickopen/common/quickOpenService';
import { IMessageService } from 'vs/platform/message/common/message';
export declare class GitCommandQuickOpenHandler extends CommandQuickOpenHandler {
    constructor(quickOpenService: IQuickOpenService, gitService: IGitService, messageService: IMessageService);
}
