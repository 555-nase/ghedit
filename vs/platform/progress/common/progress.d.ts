import { TPromise } from 'vs/base/common/winjs.base';
export declare const IProgressService: {
    (...args: any[]): void;
    type: IProgressService;
};
export interface IProgressService {
    _serviceBrand: any;
    /**
     * Show progress customized with the provided flags.
     */
    show(infinite: boolean, delay?: number): IProgressRunner;
    show(total: number, delay?: number): IProgressRunner;
    /**
     * Indicate progress for the duration of the provided promise. Progress will stop in
     * any case of promise completion, error or cancellation.
     */
    showWhile(promise: TPromise<any>, delay?: number): TPromise<void>;
}
export interface IProgressRunner {
    total(value: number): void;
    worked(value: number): void;
    done(): void;
}
