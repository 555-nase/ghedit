import * as modes from 'vs/editor/common/modes';
import { LanguageConfigurationRegistryImpl } from 'vs/editor/common/modes/languageConfigurationRegistry';
/**
 * Definition of documentation comments (e.g. Javadoc/JSdoc)
 */
export interface IDocComment {
    scope: string;
    open: string;
    lineStart: string;
    close?: string;
}
export interface IBracketElectricCharacterContribution {
    docComment?: IDocComment;
    embeddedElectricCharacters?: string[];
}
export declare class BracketElectricCharacterSupport implements modes.IRichEditElectricCharacter {
    private _registry;
    private _modeId;
    private contribution;
    private brackets;
    constructor(registry: LanguageConfigurationRegistryImpl, modeId: string, brackets: modes.IRichEditBrackets, autoClosePairs: modes.IAutoClosingPairConditional[], contribution: IBracketElectricCharacterContribution);
    getElectricCharacters(): string[];
    onElectricCharacter(context: modes.ILineContext, offset: number): modes.IElectricAction;
}
export declare class Brackets {
    private _modeId;
    private _richEditBrackets;
    private _complexAutoClosePairs;
    constructor(modeId: string, richEditBrackets: modes.IRichEditBrackets, autoClosePairs: modes.IAutoClosingPairConditional[], docComment?: IDocComment);
    getElectricCharacters(): string[];
    onElectricCharacter(context: modes.ILineContext, offset: number): modes.IElectricAction;
    private containsTokenTypes(fullTokenSpec, tokensToLookFor);
    private _onElectricAutoIndent(context, offset);
    private _onElectricAutoClose(context, offset);
}
