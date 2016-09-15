import stream = require('stream');
export declare enum ReaderType {
    Length = 0,
    Line = 1,
}
export interface ICallback<T> {
    (data: T): void;
}
export declare class Reader<T> {
    private readable;
    private callback;
    private buffer;
    private nextMessageLength;
    constructor(readable: stream.Readable, callback: ICallback<T>, type?: ReaderType);
    private onLengthData(data);
    private onLineData(data);
}
export declare class Writer<T> {
    private writable;
    constructor(writable: stream.Writable);
    write(msg: T): void;
}
