/**
 * The forward slash path separator.
 */
export declare var sep: string;
/**
 * The native path separator depending on the OS.
 */
export declare var nativeSep: string;
export declare function relative(from: string, to: string): string;
/**
 * @returns the directory name of a path.
 */
export declare function dirname(path: string): string;
/**
 * @returns the base name of a path.
 */
export declare function basename(path: string): string;
/**
 * @returns {{.far}} from boo.far or the empty string.
 */
export declare function extname(path: string): string;
export declare function normalize(path: string, toOSPath?: boolean): string;
/**
 * Computes the _root_ this path, like `getRoot('c:\files') === c:\`,
 * `getRoot('files:///files/path') === files:///`,
 * or `getRoot('\\server\shares\path') === \\server\shares\`
 */
export declare function getRoot(path: string, sep?: string): string;
export declare const join: (...parts: string[]) => string;
/**
 * Check if the path follows this pattern: `\\hostname\sharename`.
 *
 * @see https://msdn.microsoft.com/en-us/library/gg465305.aspx
 * @return A boolean indication if the path is a UNC path, on none-windows
 * always false.
 */
export declare function isUNC(path: string): boolean;
export declare function makePosixAbsolute(path: string): string;
export declare function isEqualOrParent(path: string, candidate: string): boolean;
export declare function isValidBasename(name: string): boolean;
export declare const isAbsoluteRegex: RegExp;
/**
 * If you have access to node, it is recommended to use node's path.isAbsolute().
 * This is a simple regex based approach.
 */
export declare function isAbsolute(path: string): boolean;
