/**
 * An interface for a JavaScript object that
 * acts a dictionary. The keys are strings.
 */
export interface IStringDictionary<V> {
    [name: string]: V;
}
/**
 * An interface for a JavaScript object that
 * acts a dictionary. The keys are numbers.
 */
export interface INumberDictionary<V> {
    [idx: number]: V;
}
export declare function createStringDictionary<V>(): IStringDictionary<V>;
export declare function createNumberDictionary<V>(): INumberDictionary<V>;
/**
 * Looks up and returns a property that is owned
 * by the provided map object.
 * @param what The key.
 * @param from A native JavaScript object that stores items.
 * @param alternate A default value this is return in case an item with
 * 	the key isn't found.
 */
export declare function lookup<T>(from: IStringDictionary<T>, what: string, alternate?: T): T;
export declare function lookup<T>(from: INumberDictionary<T>, what: number, alternate?: T): T;
/**
 * Looks up a value from the set. If the set doesn't contain the
 * value it inserts and returns the given alternate value.
 */
export declare function lookupOrInsert<T>(from: IStringDictionary<T>, key: string, alternate: T): T;
export declare function lookupOrInsert<T>(from: IStringDictionary<T>, key: string, alternateFn: () => T): T;
export declare function lookupOrInsert<T>(from: INumberDictionary<T>, key: number, alternate: T): T;
export declare function lookupOrInsert<T>(from: INumberDictionary<T>, key: number, alternateFn: () => T): T;
/**
 * Inserts
 */
export declare function insert<T>(into: IStringDictionary<T>, data: T, hashFn: (data: T) => string): void;
export declare function insert<T>(into: INumberDictionary<T>, data: T, hashFn: (data: T) => string): void;
/**
 * Returns {{true}} iff the provided object contains a property
 * with the given name.
 */
export declare function contains<T>(from: IStringDictionary<T>, what: string): boolean;
export declare function contains<T>(from: INumberDictionary<T>, what: number): boolean;
/**
 * Returns an array which contains all values that reside
 * in the given set.
 */
export declare function values<T>(from: IStringDictionary<T>): T[];
export declare function values<T>(from: INumberDictionary<T>): T[];
/**
 * Iterates over each entry in the provided set. The iterator allows
 * to remove elements and will stop when the callback returns {{false}}.
 */
export declare function forEach<T>(from: IStringDictionary<T>, callback: (entry: {
    key: string;
    value: T;
}, remove: Function) => any): void;
export declare function forEach<T>(from: INumberDictionary<T>, callback: (entry: {
    key: number;
    value: T;
}, remove: Function) => any): void;
/**
 * Removes an element from the dictionary. Returns {{false}} if the property
 * does not exists.
 */
export declare function remove<T>(from: IStringDictionary<T>, key: string): boolean;
export declare function remove<T>(from: INumberDictionary<T>, key: string): boolean;
/**
 * Groups the collection into a dictionary based on the provided
 * group function.
 */
export declare function groupBy<T>(data: T[], groupFn: (element: T) => string): IStringDictionary<T[]>;
