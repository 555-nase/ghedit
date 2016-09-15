import streams = require('stream');
export interface IMimeAndEncoding {
    encoding: string;
    mimes: string[];
}
export declare function detectMimeAndEncodingFromBuffer(buffer: NodeBuffer, bytesRead: number): IMimeAndEncoding;
/**
 * Opens the given stream to detect its mime type. Returns an array of mime types sorted from most specific to unspecific.
 * @param instream the readable stream to detect the mime types from.
 * @param nameHint an additional hint that can be used to detect a mime from a file extension.
 */
export declare function detectMimesFromStream(instream: streams.Readable, nameHint: string, callback: (error: Error, result: IMimeAndEncoding) => void): void;
/**
 * Opens the given file to detect its mime type. Returns an array of mime types sorted from most specific to unspecific.
 * @param absolutePath the absolute path of the file.
 */
export declare function detectMimesFromFile(absolutePath: string, callback: (error: Error, result: IMimeAndEncoding) => void): void;
