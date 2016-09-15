import Event from 'vs/base/common/event';
import { ILegacyLanguageDefinition } from 'vs/editor/common/modes/modesRegistry';
import { ILanguageExtensionPoint } from 'vs/editor/common/services/modeService';
export interface ICompatModeDescriptor {
    moduleId: string;
    ctorName: string;
    deps: string[];
}
export declare class LanguagesRegistry {
    private knownModeIds;
    private mime2LanguageId;
    private name2LanguageId;
    private id2Name;
    private id2Extensions;
    private compatModes;
    private lowerName2Id;
    private id2ConfigurationFiles;
    private _onDidAddModes;
    onDidAddModes: Event<string[]>;
    constructor(useModesRegistry?: boolean);
    _registerCompatModes(defs: ILegacyLanguageDefinition[]): void;
    _registerLanguages(desc: ILanguageExtensionPoint[]): void;
    private _setLanguageName(languageId, languageName, force);
    private _registerLanguage(lang);
    isRegisteredMode(mimetypeOrModeId: string): boolean;
    getRegisteredModes(): string[];
    getRegisteredLanguageNames(): string[];
    getLanguageName(modeId: string): string;
    getModeIdForLanguageNameLowercase(languageNameLower: string): string;
    getConfigurationFiles(modeId: string): string[];
    getMimeForMode(theModeId: string): string;
    extractModeIds(commaSeparatedMimetypesOrCommaSeparatedIdsOrName: string): string[];
    getModeIdsFromLanguageName(languageName: string): string[];
    getModeIdsFromFilenameOrFirstLine(filename: string, firstLine?: string): string[];
    getCompatMode(modeId: string): ICompatModeDescriptor;
    getExtensions(languageName: string): string[];
}
