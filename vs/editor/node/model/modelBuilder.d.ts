import { IStringStream } from 'vs/platform/files/common/files';
import { ITextModelCreationOptions, IRawText } from 'vs/editor/common/editorCommon';
import { TPromise } from 'vs/base/common/winjs.base';
export declare class ModelBuilderResult {
    rawText: IRawText;
    hash: string;
}
export declare function computeHash(rawText: IRawText): string;
export declare class ModelBuilder {
    private leftoverPrevChunk;
    private leftoverEndsInCR;
    private totalCRCount;
    private lineBasedBuilder;
    private totalLength;
    static fromStringStream(stream: IStringStream, options: ITextModelCreationOptions): TPromise<ModelBuilderResult>;
    constructor();
    private _updateCRCount(chunk);
    acceptChunk(chunk: string): void;
    finish(opts: ITextModelCreationOptions): ModelBuilderResult;
}
