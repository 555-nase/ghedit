import Modes = require('vs/editor/common/modes');
import VSXML = require('vs/languages/razor/common/vsxml');
import { AbstractState } from 'vs/editor/common/modes/abstractState';
export declare class CSState extends AbstractState {
    name: string;
    parent: AbstractState;
    constructor(mode: Modes.IMode, name: string, parent: AbstractState);
    equals(other: Modes.IState): boolean;
    tokenize(stream: Modes.IStream): Modes.ITokenizationResult;
    stateTokenize(stream: Modes.IStream): Modes.ITokenizationResult;
}
export declare class CSComment extends CSState {
    private commentChar;
    constructor(mode: Modes.IMode, parent: AbstractState, commentChar: string);
    makeClone(): CSComment;
    tokenize(stream: Modes.IStream): Modes.ITokenizationResult;
}
export declare class CSStatement extends CSState implements VSXML.IVSXMLWrapperState {
    private level;
    private plevel;
    private razorMode;
    private expression;
    private vsState;
    private firstToken;
    private firstTokenWasKeyword;
    constructor(mode: Modes.IMode, parent: AbstractState, level: number, plevel: number, razorMode: boolean, expression: boolean, firstToken: boolean, firstTokenWasKeyword: boolean);
    setVSXMLState(newVSState: VSXML.VSXMLState): void;
    makeClone(): CSStatement;
    equals(other: Modes.IState): boolean;
    stateTokenize(stream: Modes.IStream): Modes.ITokenizationResult;
}
