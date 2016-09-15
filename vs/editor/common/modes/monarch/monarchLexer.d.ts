/**
 * Create a syntax highighter with a fully declarative JSON style lexer description
 * using regular expressions.
 */
import * as modes from 'vs/editor/common/modes';
import { AbstractState } from 'vs/editor/common/modes/abstractState';
import * as monarchCommon from 'vs/editor/common/modes/monarch/monarchCommon';
import { IModeService } from 'vs/editor/common/services/modeService';
/**
 * The MonarchLexer class implements a monaco lexer that highlights source code.
 * It takes a compiled lexer to guide the tokenizer and maintains a stack of
 * lexer states.
 */
export declare class MonarchLexer extends AbstractState {
    static ID: number;
    private modeService;
    private id;
    private lexer;
    private stack;
    embeddedMode: string;
    embeddedEntered: boolean;
    private groupActions;
    private groupMatches;
    private groupMatched;
    private groupRule;
    constructor(mode: modes.IMode, modeService: IModeService, lexer: monarchCommon.ILexer, stack?: string[], embeddedMode?: string);
    makeClone(): MonarchLexer;
    equals(other: modes.IState): boolean;
    /**
     * The main tokenizer: this function gets called by monaco to tokenize lines
     * Note: we don't want to raise exceptions here and always keep going..
     *
     * TODO: there are many optimizations possible here for the common cases
     * but for now I concentrated on functionality and correctness.
     */
    tokenize(stream: modes.IStream, noConsumeIsOk?: boolean): modes.ITokenizationResult;
}
export declare function createTokenizationSupport(modeService: IModeService, mode: modes.IMode, lexer: monarchCommon.ILexer): modes.ITokenizationSupport;
