export interface IXHROptions {
    type?: string;
    url?: string;
    user?: string;
    password?: string;
    responseType?: string;
    headers?: any;
    timeout?: number;
    followRedirects?: number;
    data?: any;
}
export interface IXHRResponse {
    responseText: string;
    status: number;
    readyState: number;
    getResponseHeader: (header: string) => string;
}
export declare function getErrorStatusDescription(status: number): string;
