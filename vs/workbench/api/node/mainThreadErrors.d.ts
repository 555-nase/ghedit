import { MainThreadErrorsShape } from './extHost.protocol';
export declare class MainThreadErrors extends MainThreadErrorsShape {
    onUnexpectedExtHostError(err: any): void;
}
