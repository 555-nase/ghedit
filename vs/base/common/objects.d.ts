export declare function clone<T>(obj: T): T;
export declare function deepClone<T>(obj: T): T;
export declare function cloneAndChange(obj: any, changer: (orig: any) => any): any;
/**
 * Copies all properties of source into destination. The optional parameter "overwrite" allows to control
 * if existing properties on the destination should be overwritten or not. Defaults to true (overwrite).
 */
export declare function mixin(destination: any, source: any, overwrite?: boolean): any;
export declare function assign(destination: any, ...sources: any[]): any;
export declare function toObject<T, R>(arr: T[], keyMap: (T) => string, valueMap?: (T) => R): {
    [key: string]: R;
};
export declare function equals(one: any, other: any): boolean;
export declare function ensureProperty(obj: any, property: string, defaultValue: any): void;
export declare function arrayToHash(array: any[]): any;
/**
 * Given an array of strings, returns a function which, given a string
 * returns true or false whether the string is in that array.
 */
export declare function createKeywordMatcher(arr: string[], caseInsensitive?: boolean): (str: string) => boolean;
/**
 * Started from TypeScript's __extends function to make a type a subclass of a specific class.
 * Modified to work with properties already defined on the derivedClass, since we can't get TS
 * to call this method before the constructor definition.
 */
export declare function derive(baseClass: any, derivedClass: any): void;
/**
 * Calls JSON.Stringify with a replacer to break apart any circular references.
 * This prevents JSON.stringify from throwing the exception
 *  "Uncaught TypeError: Converting circular structure to JSON"
 */
export declare function safeStringify(obj: any): string;
export declare function getOrDefault<T, R>(obj: T, fn: (obj: T) => R, defaultValue?: R): R;
