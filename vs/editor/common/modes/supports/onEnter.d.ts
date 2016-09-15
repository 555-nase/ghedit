import { IPosition, ITokenizedModel } from 'vs/editor/common/editorCommon';
import { EnterAction, IRichEditOnEnter, CharacterPair } from 'vs/editor/common/modes';
import { LanguageConfigurationRegistryImpl } from 'vs/editor/common/modes/languageConfigurationRegistry';
/**
 * Describes indentation rules for a language.
 */
export interface IndentationRule {
    /**
     * If a line matches this pattern, then all the lines after it should be unindendented once (until another rule matches).
     */
    decreaseIndentPattern: RegExp;
    /**
     * If a line matches this pattern, then all the lines after it should be indented once (until another rule matches).
     */
    increaseIndentPattern: RegExp;
    /**
     * If a line matches this pattern, then **only the next line** after it should be indented once.
     */
    indentNextLinePattern?: RegExp;
    /**
     * If a line matches this pattern, then its indentation should not be changed and it should not be evaluated against the other rules.
     */
    unIndentedLinePattern?: RegExp;
}
/**
 * Describes a rule to be evaluated when pressing Enter.
 */
export interface OnEnterRule {
    /**
     * This rule will only execute if the text before the cursor matches this regular expression.
     */
    beforeText: RegExp;
    /**
     * This rule will only execute if the text after the cursor matches this regular expression.
     */
    afterText?: RegExp;
    /**
     * The action to execute.
     */
    action: EnterAction;
}
export interface IOnEnterSupportOptions {
    brackets?: CharacterPair[];
    indentationRules?: IndentationRule;
    regExpRules?: OnEnterRule[];
}
export declare class OnEnterSupport implements IRichEditOnEnter {
    private static _INDENT;
    private static _INDENT_OUTDENT;
    private static _OUTDENT;
    private _registry;
    private _modeId;
    private _brackets;
    private _indentationRules;
    private _regExpRules;
    constructor(registry: LanguageConfigurationRegistryImpl, modeId: string, opts?: IOnEnterSupportOptions);
    onEnter(model: ITokenizedModel, position: IPosition): EnterAction;
    private _onEnter(model, position);
    _actualOnEnter(oneLineAboveText: string, beforeEnterText: string, afterEnterText: string): EnterAction;
    private static _createOpenBracketRegExp(bracket);
    private static _createCloseBracketRegExp(bracket);
    private static _safeRegExp(def);
}
