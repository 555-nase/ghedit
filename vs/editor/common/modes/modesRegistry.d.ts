import Event from 'vs/base/common/event';
import { ILanguageExtensionPoint } from 'vs/editor/common/services/modeService';
export interface ILegacyLanguageDefinition {
    id: string;
    extensions: string[];
    filenames?: string[];
    firstLine?: string;
    aliases: string[];
    mimetypes: string[];
    moduleId: string;
    ctorName: string;
    deps?: string[];
}
export declare var Extensions: {
    ModesRegistry: string;
};
export declare class EditorModesRegistry {
    private _compatModes;
    private _languages;
    private _onDidAddCompatModes;
    onDidAddCompatModes: Event<ILegacyLanguageDefinition[]>;
    private _onDidAddLanguages;
    onDidAddLanguages: Event<ILanguageExtensionPoint[]>;
    constructor();
    registerCompatModes(def: ILegacyLanguageDefinition[]): void;
    registerCompatMode(def: ILegacyLanguageDefinition): void;
    getCompatModes(): ILegacyLanguageDefinition[];
    registerLanguage(def: ILanguageExtensionPoint): void;
    registerLanguages(def: ILanguageExtensionPoint[]): void;
    getLanguages(): ILanguageExtensionPoint[];
}
export declare var ModesRegistry: EditorModesRegistry;
