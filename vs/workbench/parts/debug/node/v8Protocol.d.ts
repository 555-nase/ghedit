import stream = require('stream');
import { TPromise } from 'vs/base/common/winjs.base';
export declare abstract class V8Protocol {
    private static TWO_CRLF;
    private outputStream;
    private sequence;
    private pendingRequests;
    private rawData;
    private id;
    private contentLength;
    constructor();
    getId(): string;
    protected connect(readable: stream.Readable, writable: stream.Writable): void;
    protected send(command: string, args: any): TPromise<DebugProtocol.Response>;
    private doSend(command, args, clb);
    private handleData();
    protected abstract onServerError(err: Error): void;
    protected abstract onEvent(event: DebugProtocol.Event): void;
    private dispatch(body);
}
