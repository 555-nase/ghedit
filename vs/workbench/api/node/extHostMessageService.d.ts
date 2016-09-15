import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
import Severity from 'vs/base/common/severity';
import vscode = require('vscode');
export declare class ExtHostMessageService {
    private _proxy;
    constructor(threadService: IThreadService);
    showMessage(severity: Severity, message: string, commands: (string | vscode.MessageItem)[]): Thenable<string | vscode.MessageItem>;
}
