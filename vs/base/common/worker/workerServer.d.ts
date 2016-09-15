export declare class WorkerServer {
    private _postSerializedMessage;
    private _workerId;
    private _requestHandler;
    constructor(postSerializedMessage: (msg: string) => void);
    private _bindConsole();
    private _sendPrintMessage(level, ...objects);
    private _sendReply(msgId, action, payload);
    loadModule(moduleId: string, callback: Function, errorback: (err: any) => void): void;
    onmessage(msg: string): void;
    private _postMessage(msg);
    private _onmessage(msg);
    private _handleMessage(msg, c, e, p);
}
export declare function create(postMessage: (msg: string) => void): WorkerServer;
