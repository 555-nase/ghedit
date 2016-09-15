import { ICommentsConfiguration, IRichEditBrackets, IRichEditCharacterPair, IAutoClosingPair, IAutoClosingPairConditional, IRichEditOnEnter, CharacterPair, IRichEditElectricCharacter, EnterAction } from 'vs/editor/common/modes';
import { BracketElectricCharacterSupport, IBracketElectricCharacterContribution } from 'vs/editor/common/modes/supports/electricCharacter';
import { IndentationRule, OnEnterRule } from 'vs/editor/common/modes/supports/onEnter';
import Event from 'vs/base/common/event';
import { ITokenizedModel } from 'vs/editor/common/editorCommon';
import { IDisposable } from 'vs/base/common/lifecycle';
/**
 * Describes how comments for a language work.
 */
export interface CommentRule {
    /**
     * The line comment token, like `// this is a comment`
     */
    lineComment?: string;
    /**
     * The block comment character pair, like `/* block comment *&#47;`
     */
    blockComment?: CharacterPair;
}
/**
 * The language configuration interface defines the contract between extensions and
 * various editor features, like automatic bracket insertion, automatic indentation etc.
 */
export interface LanguageConfiguration {
    /**
     * The language's comment settings.
     */
    comments?: CommentRule;
    /**
     * The language's brackets.
     * This configuration implicitly affects pressing Enter around these brackets.
     */
    brackets?: CharacterPair[];
    /**
     * The language's word definition.
     * If the language supports Unicode identifiers (e.g. JavaScript), it is preferable
     * to provide a word definition that uses exclusion of known separators.
     * e.g.: A regex that matches anything except known separators (and dot is allowed to occur in a floating point number):
     *   /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g
     */
    wordPattern?: RegExp;
    /**
     * The language's indentation settings.
     */
    indentationRules?: IndentationRule;
    /**
         * The language's rules to be evaluated when pressing Enter.
         */
    onEnterRules?: OnEnterRule[];
    /**
     * The language's auto closing pairs. The 'close' character is automatically inserted with the
     * 'open' character is typed. If not set, the configured brackets will be used.
     */
    autoClosingPairs?: IAutoClosingPairConditional[];
    /**
     * The language's surrounding pairs. When the 'open' character is typed on a selection, the
     * selected string is surrounded by the open and close characters. If not set, the autoclosing pairs
     * settings will be used.
     */
    surroundingPairs?: IAutoClosingPair[];
    /**
     * **Deprecated** Do not use.
     *
     * @deprecated Will be replaced by a better API soon.
     */
    __electricCharacterSupport?: IBracketElectricCharacterContribution;
}
export declare class RichEditSupport {
    private _conf;
    electricCharacter: BracketElectricCharacterSupport;
    comments: ICommentsConfiguration;
    characterPair: IRichEditCharacterPair;
    wordDefinition: RegExp;
    onEnter: IRichEditOnEnter;
    brackets: IRichEditBrackets;
    constructor(modeId: string, previous: RichEditSupport, rawConf: LanguageConfiguration);
    private static _mergeConf(prev, current);
    private _handleOnEnter(modeId, conf);
    private _handleComments(modeId, conf);
}
export declare class LanguageConfigurationRegistryImpl {
    private _entries;
    private _onDidChange;
    onDidChange: Event<void>;
    constructor();
    register(languageId: string, configuration: LanguageConfiguration): IDisposable;
    private _getRichEditSupport(modeId);
    getElectricCharacterSupport(modeId: string): IRichEditElectricCharacter;
    getComments(modeId: string): ICommentsConfiguration;
    getCharacterPairSupport(modeId: string): IRichEditCharacterPair;
    getWordDefinition(modeId: string): RegExp;
    getOnEnterSupport(modeId: string): IRichEditOnEnter;
    getRawEnterActionAtPosition(model: ITokenizedModel, lineNumber: number, column: number): EnterAction;
    getEnterActionAtPosition(model: ITokenizedModel, lineNumber: number, column: number): {
        enterAction: EnterAction;
        indentation: string;
    };
    getBracketsSupport(modeId: string): IRichEditBrackets;
}
export declare const LanguageConfigurationRegistry: LanguageConfigurationRegistryImpl;
