import { CommonEditorConfiguration } from 'vs/editor/common/config/commonEditorConfig';
import { IDimension, FontInfo, BareFontInfo } from 'vs/editor/common/editorCommon';
import { FastDomNode } from 'vs/base/browser/styleMutator';
export declare class Configuration extends CommonEditorConfiguration {
    static applyFontInfoSlow(domNode: HTMLElement, fontInfo: BareFontInfo): void;
    static applyFontInfo(domNode: FastDomNode, fontInfo: BareFontInfo): void;
    constructor(options: any, referenceDomElement?: HTMLElement);
    private _onReferenceDomElementSizeChanged();
    private _onCSSBasedConfigurationChanged();
    observeReferenceElement(dimension?: IDimension): void;
    dispose(): void;
    protected _getEditorClassName(theme: string, fontLigatures: boolean): string;
    protected getOuterWidth(): number;
    protected getOuterHeight(): number;
    protected _getCanUseTranslate3d(): boolean;
    protected readConfiguration(bareFontInfo: BareFontInfo): FontInfo;
}
