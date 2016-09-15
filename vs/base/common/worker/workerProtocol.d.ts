/**
 * A message sent from the UI thread to a worker
 */
export interface IClientMessage {
    id: number;
    type: string;
    timestamp: number;
    payload: any;
}
/**
 * A message sent from a worker to the UI thread
 */
export interface IServerMessage {
    monacoWorker: boolean;
    from: number;
    req: string;
    type: string;
    payload: any;
}
/**
 * A message sent from a worker to the UI thread in reply to a UI thread request
 */
export interface IServerReplyMessage extends IServerMessage {
    id: number;
    action: string;
}
/**
 * A message sent from a worker to the UI thread for debugging purposes (console.log, console.info, etc.)
 */
export interface IServerPrintMessage extends IServerMessage {
    level: string;
}
export declare var MessageType: {
    INITIALIZE: string;
    REPLY: string;
    PRINT: string;
};
export declare var ReplyType: {
    COMPLETE: string;
    ERROR: string;
    PROGRESS: string;
};
export declare var PrintType: {
    LOG: string;
    DEBUG: string;
    INFO: string;
    WARN: string;
    ERROR: string;
};
