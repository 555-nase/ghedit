import { IDisposable } from 'vs/base/common/lifecycle';
import { Range } from 'vs/editor/common/core/range';
export interface FindReplaceStateChangedEvent {
    moveCursor: boolean;
    searchString: boolean;
    replaceString: boolean;
    isRevealed: boolean;
    isReplaceRevealed: boolean;
    isRegex: boolean;
    wholeWord: boolean;
    matchCase: boolean;
    searchScope: boolean;
    matchesPosition: boolean;
    matchesCount: boolean;
    currentMatch: boolean;
}
export interface INewFindReplaceState {
    searchString?: string;
    replaceString?: string;
    isRevealed?: boolean;
    isReplaceRevealed?: boolean;
    isRegex?: boolean;
    wholeWord?: boolean;
    matchCase?: boolean;
    searchScope?: Range;
}
export declare class FindReplaceState implements IDisposable {
    private static _CHANGED_EVENT;
    private _searchString;
    private _replaceString;
    private _isRevealed;
    private _isReplaceRevealed;
    private _isRegex;
    private _wholeWord;
    private _matchCase;
    private _searchScope;
    private _matchesPosition;
    private _matchesCount;
    private _currentMatch;
    private _eventEmitter;
    searchString: string;
    replaceString: string;
    isRevealed: boolean;
    isReplaceRevealed: boolean;
    isRegex: boolean;
    wholeWord: boolean;
    matchCase: boolean;
    searchScope: Range;
    matchesPosition: number;
    matchesCount: number;
    currentMatch: Range;
    constructor();
    dispose(): void;
    addChangeListener(listener: (e: FindReplaceStateChangedEvent) => void): IDisposable;
    changeMatchInfo(matchesPosition: number, matchesCount: number, currentMatch: Range): void;
    change(newState: INewFindReplaceState, moveCursor: boolean): void;
}
