export declare let MIME_TEXT: string;
export declare let MIME_BINARY: string;
export declare let MIME_UNKNOWN: string;
export interface ITextMimeAssociation {
    mime: string;
    filename?: string;
    extension?: string;
    filepattern?: string;
    firstline?: RegExp;
    userConfigured?: boolean;
}
/**
 * Associate a text mime to the registry.
 */
export declare function registerTextMime(association: ITextMimeAssociation): void;
/**
 * Clear text mimes from the registry.
 */
export declare function clearTextMimes(onlyUserConfigured?: boolean): void;
/**
 * Given a file, return the best matching mime type for it
 */
export declare function guessMimeTypes(path: string, firstLine?: string): string[];
export declare function isBinaryMime(mimes: string): boolean;
export declare function isBinaryMime(mimes: string[]): boolean;
export declare function isUnspecific(mime: string[] | string): boolean;
export declare function suggestFilename(theMime: string, prefix: string): string;
