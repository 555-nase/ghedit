export interface IOptions {
    proxyUrl?: string;
    strictSSL?: boolean;
}
export declare function getProxyAgent(rawRequestURL: string, options?: IOptions): any;
