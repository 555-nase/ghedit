import { IMessageService } from 'vs/platform/message/common/message';
import Severity from 'vs/base/common/severity';
import { MainThreadMessageServiceShape } from './extHost.protocol';
export declare class MainThreadMessageService extends MainThreadMessageServiceShape {
    private _messageService;
    constructor(messageService: IMessageService);
    $showMessage(severity: Severity, message: string, commands: {
        title: string;
        isCloseAffordance: boolean;
        handle: number;
    }[]): Thenable<number>;
}
