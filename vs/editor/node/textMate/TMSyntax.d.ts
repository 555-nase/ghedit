import { IModeService } from 'vs/editor/common/services/modeService';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
export interface ITMSyntaxExtensionPoint {
    language: string;
    scopeName: string;
    path: string;
    injectTo: string[];
}
export declare class MainProcessTextMateSyntax {
    private _grammarRegistry;
    private _modeService;
    private _scopeNameToFilePath;
    private _injections;
    constructor(modeService: IModeService, configurationService: IConfigurationService);
    private _handleGrammarExtensionPointUser(extensionFolderPath, syntax, collector);
    registerDefinition(modeId: string, scopeName: string): void;
}
export declare class DecodeMap {
    _decodeMapBrand: void;
    lastAssignedId: number;
    scopeToTokenIds: {
        [scope: string]: number[];
    };
    tokenToTokenId: {
        [token: string]: number;
    };
    tokenIdToToken: string[];
    prevToken: TMTokenDecodeData;
    constructor();
    getTokenIds(scope: string): number[];
    getToken(tokenMap: boolean[]): string;
}
export declare class TMTokenDecodeData {
    _tmTokenDecodeDataBrand: void;
    scopes: string[];
    scopeTokensMaps: boolean[][];
    constructor(scopes: string[], scopeTokensMaps: boolean[][]);
}
export declare function decodeTextMateToken(decodeMap: DecodeMap, scopes: string[]): string;
