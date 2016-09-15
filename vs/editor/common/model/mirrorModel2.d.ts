import URI from 'vs/base/common/uri';
import { IModelContentChangedEvent2 } from 'vs/editor/common/editorCommon';
import { PrefixSumComputer } from 'vs/editor/common/viewModel/prefixSumComputer';
export declare class MirrorModel2 {
    protected _uri: URI;
    protected _lines: string[];
    protected _eol: string;
    protected _versionId: number;
    protected _lineStarts: PrefixSumComputer;
    constructor(uri: URI, lines: string[], eol: string, versionId: number);
    dispose(): void;
    version: number;
    getText(): string;
    onEvents(events: IModelContentChangedEvent2[]): void;
    protected _ensureLineStarts(): void;
    /**
     * All changes to a line's text go through this method
     */
    private _setLineText(lineIndex, newValue);
    private _acceptDeleteRange(range);
    private _acceptInsertText(position, insertText);
}
