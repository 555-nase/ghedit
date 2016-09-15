import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
import { IQuickOpenService, IPickOptions } from 'vs/workbench/services/quickopen/common/quickOpenService';
import { InputBoxOptions } from 'vscode';
import { MainThreadQuickOpenShape, MyQuickPickItems } from './extHost.protocol';
export declare class MainThreadQuickOpen extends MainThreadQuickOpenShape {
    private _proxy;
    private _quickOpenService;
    private _doSetItems;
    private _doSetError;
    private _contents;
    private _token;
    constructor(threadService: IThreadService, quickOpenService: IQuickOpenService);
    $show(options: IPickOptions): Thenable<number>;
    $setItems(items: MyQuickPickItems[]): Thenable<any>;
    $setError(error: Error): Thenable<any>;
    $input(options: InputBoxOptions, validateInput: boolean): Thenable<string>;
}
