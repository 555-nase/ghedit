import { IDecorationRenderOptions, IModelDecorationOptions } from 'vs/editor/common/editorCommon';
import { AbstractCodeEditorService } from 'vs/editor/common/services/abstractCodeEditorService';
export declare class CodeEditorServiceImpl extends AbstractCodeEditorService {
    private _styleSheet;
    private _decorationOptionProviders;
    constructor(styleSheet?: HTMLStyleElement);
    registerDecorationType(key: string, options: IDecorationRenderOptions, parentTypeKey?: string): void;
    removeDecorationType(key: string): void;
    resolveDecorationOptions(decorationTypeKey: string, writable: boolean): IModelDecorationOptions;
}
