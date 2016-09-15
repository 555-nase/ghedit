import { Range } from 'vs/editor/common/core/range';
import { IRichEditBracket } from 'vs/editor/common/editorCommon';
import { IRichEditBrackets, CharacterPair } from 'vs/editor/common/modes';
export declare class RichEditBrackets implements IRichEditBrackets {
    brackets: IRichEditBracket[];
    forwardRegex: RegExp;
    reversedRegex: RegExp;
    maxBracketLength: number;
    textIsBracket: {
        [text: string]: IRichEditBracket;
    };
    textIsOpenBracket: {
        [text: string]: boolean;
    };
    constructor(modeId: string, brackets: CharacterPair[]);
}
export declare class BracketsUtils {
    private static _findPrevBracketInText(reversedBracketRegex, lineNumber, reversedText, offset);
    static findPrevBracketInToken(reversedBracketRegex: RegExp, lineNumber: number, lineText: string, currentTokenStart: number, currentTokenEnd: number): Range;
    static findNextBracketInText(bracketRegex: RegExp, lineNumber: number, text: string, offset: number): Range;
    static findNextBracketInToken(bracketRegex: RegExp, lineNumber: number, lineText: string, currentTokenStart: number, currentTokenEnd: number): Range;
}
