import { TPromise } from 'vs/base/common/winjs.base';
export interface IWorker {
    getId(): number;
    postMessage(message: string): void;
    dispose(): void;
}
export declare function logOnceWebWorkerWarning(err: any): void;
export interface IWorkerCallback {
    (message: string): void;
}
export interface IWorkerFactory {
    create(moduleId: string, callback: IWorkerCallback, onErrorCallback: (err: any) => void): IWorker;
}
export declare class WorkerClient {
    private _lastMessageId;
    private _promises;
    private _worker;
    private _messagesQueue;
    private _processQueueTimeout;
    private _waitingForWorkerReply;
    onModuleLoaded: TPromise<void>;
    constructor(workerFactory: IWorkerFactory, moduleId: string);
    request(requestName: string, payload: any): TPromise<any>;
    dispose(): void;
    private _sendMessage(type, payload);
    private _enqueueMessage(msg);
    private _removeMessage(msgId);
    private _processMessagesQueue();
    private _postMessage(msg);
    private _onSerializedMessage(msg);
    private _onmessage(msg);
    _consoleLog(level: string, payload: any): void;
    _onError(message: string, error?: any): void;
}
