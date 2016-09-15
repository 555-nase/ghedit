export declare const IThreadService: {
    (...args: any[]): void;
    type: IThreadService;
};
export interface IThreadService {
    _serviceBrand: any;
    /**
     * Always returns a proxy.
     */
    get<T>(identifier: ProxyIdentifier<T>): T;
    /**
     * Register instance.
     */
    set<T>(identifier: ProxyIdentifier<T>, value: T): void;
}
export declare class ProxyIdentifier<T> {
    _proxyIdentifierBrand: void;
    isMain: boolean;
    id: string;
    methodNames: string[];
    constructor(isMain: boolean, id: string, ctor: Function);
}
export declare function createMainContextProxyIdentifier<T>(identifier: string, ctor: Function): ProxyIdentifier<T>;
export declare function createExtHostContextProxyIdentifier<T>(identifier: string, ctor: Function): ProxyIdentifier<T>;
