export interface Key {
    toString(): string;
}
export interface Entry<K, T> {
    next?: Entry<K, T>;
    prev?: Entry<K, T>;
    key: K;
    value: T;
}
/**
 * A simple map to store value by a key object. Key can be any object that has toString() function to get
 * string value of the key.
 */
export declare class SimpleMap<K extends Key, T> {
    protected map: {
        [key: string]: Entry<K, T>;
    };
    protected _size: number;
    constructor();
    size: number;
    get(k: K): T;
    keys(): K[];
    values(): T[];
    entries(): Entry<K, T>[];
    set(k: K, t: T): boolean;
    delete(k: K): T;
    has(k: K): boolean;
    clear(): void;
    protected push(key: K, value: T): void;
    protected pop(k: K): void;
    protected peek(k: K): T;
}
/**
 * A simple Map<T> that optionally allows to set a limit of entries to store. Once the limit is hit,
 * the cache will remove the entry that was last recently added. Or, if a ratio is provided below 1,
 * all elements will be removed until the ratio is full filled (e.g. 0.75 to remove 25% of old elements).
 */
export declare class LinkedMap<T> {
    private limit;
    protected map: {
        [key: string]: Entry<string, T>;
    };
    private head;
    private tail;
    private _size;
    private ratio;
    constructor(limit?: number, ratio?: number);
    size: number;
    set(key: string, value: T): boolean;
    get(key: string): T;
    delete(key: string): T;
    has(key: string): boolean;
    clear(): void;
    protected push(entry: Entry<string, T>): void;
    private trim();
}
/**
 * A subclass of Map<T> that makes an entry the MRU entry as soon
 * as it is being accessed. In combination with the limit for the
 * maximum number of elements in the cache, it helps to remove those
 * entries from the cache that are LRU.
 */
export declare class LRUCache<T> extends LinkedMap<T> {
    constructor(limit: number);
    get(key: string): T;
}
