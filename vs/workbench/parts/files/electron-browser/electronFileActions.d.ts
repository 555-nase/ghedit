import { TPromise } from 'vs/base/common/winjs.base';
import { Action } from 'vs/base/common/actions';
import uri from 'vs/base/common/uri';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IMessageService } from 'vs/platform/message/common/message';
import { IEditorGroupService } from 'vs/workbench/services/group/common/groupService';
export declare class RevealInOSAction extends Action {
    private resource;
    constructor(resource: uri);
    run(): TPromise<any>;
}
export declare class GlobalRevealInOSAction extends Action {
    private editorService;
    private messageService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, messageService: IMessageService);
    run(): TPromise<any>;
}
export declare class CopyPathAction extends Action {
    private resource;
    constructor(resource: uri);
    run(): TPromise<any>;
}
export declare class GlobalCopyPathAction extends Action {
    private editorService;
    private editorGroupService;
    private messageService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, messageService: IMessageService);
    run(): TPromise<any>;
}
export declare class BaseOpenAction extends Action {
    private ipcMsg;
    constructor(id: string, label: string, ipcMsg: string);
    run(): TPromise<any>;
}
export declare const OPEN_FILE_ID: string;
export declare const OPEN_FILE_LABEL: string;
export declare class OpenFileAction extends Action {
    private editorService;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService);
    run(): TPromise<any>;
}
export declare const OPEN_FOLDER_ID: string;
export declare const OPEN_FOLDER_LABEL: string;
export declare class OpenFolderAction extends BaseOpenAction {
    constructor(id: string, label: string);
}
export declare const OPEN_FILE_FOLDER_ID: string;
export declare const OPEN_FILE_FOLDER_LABEL: string;
export declare class OpenFileFolderAction extends BaseOpenAction {
    constructor(id: string, label: string);
}
export declare class ShowOpenedFileInNewWindow extends Action {
    private editorService;
    private messageService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, editorService: IWorkbenchEditorService, messageService: IMessageService);
    run(): TPromise<any>;
}
