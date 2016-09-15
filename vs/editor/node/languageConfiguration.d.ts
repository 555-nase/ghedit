import { IModeService } from 'vs/editor/common/services/modeService';
export declare class LanguageConfigurationFileHandler {
    private _modeService;
    constructor(modeService: IModeService);
    private _handleModes(modes);
    private _handleMode(modeId);
    private _handleConfigFile(modeId, configFilePath);
    private _handleConfig(modeId, configuration);
    private _mapCharacterPairs(pairs);
}
