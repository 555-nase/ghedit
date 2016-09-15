import stream = require('stream');
/**
 * Reads up to total bytes from the provided stream.
 */
export declare function readExactlyByStream(stream: stream.Readable, totalBytes: number, callback: (err: Error, buffer: NodeBuffer, bytesRead: number) => void): void;
/**
 * Reads totalBytes from the provided file.
 */
export declare function readExactlyByFile(file: string, totalBytes: number, callback: (error: Error, buffer: NodeBuffer, bytesRead: number) => void): void;
