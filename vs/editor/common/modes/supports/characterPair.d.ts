import { IAutoClosingPair, IAutoClosingPairConditional, ILineContext, IRichEditCharacterPair, CharacterPair } from 'vs/editor/common/modes';
import { LanguageConfigurationRegistryImpl } from 'vs/editor/common/modes/languageConfigurationRegistry';
export declare class CharacterPairSupport implements IRichEditCharacterPair {
    private _registry;
    private _modeId;
    private _autoClosingPairs;
    private _surroundingPairs;
    constructor(registry: LanguageConfigurationRegistryImpl, modeId: string, config: {
        brackets?: CharacterPair[];
        autoClosingPairs?: IAutoClosingPairConditional[];
        surroundingPairs?: IAutoClosingPair[];
    });
    getAutoClosingPairs(): IAutoClosingPair[];
    shouldAutoClosePair(character: string, context: ILineContext, offset: number): boolean;
    getSurroundingPairs(): IAutoClosingPair[];
}
