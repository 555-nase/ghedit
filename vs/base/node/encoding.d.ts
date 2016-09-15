export declare const UTF8: string;
export declare const UTF8_with_bom: string;
export declare const UTF16be: string;
export declare const UTF16le: string;
export declare function decode(buffer: NodeBuffer, encoding: string, options?: any): string;
export declare function encode(content: string, encoding: string, options?: any): NodeBuffer;
export declare function encodingExists(encoding: string): boolean;
export declare function decodeStream(encoding: string): NodeJS.ReadWriteStream;
export declare function encodeStream(encoding: string): NodeJS.ReadWriteStream;
export declare function detectEncodingByBOMFromBuffer(buffer: NodeBuffer, bytesRead: number): string;
/**
 * Detects the Byte Order Mark in a given file.
 * If no BOM is detected, `encoding` will be null.
 */
export declare function detectEncodingByBOM(file: string, callback: (error: Error, encoding: string) => void): void;
