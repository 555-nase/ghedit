import { ISimplifiedPlatform, Keybinding } from 'vs/base/common/keyCodes';
import { IKeybindingItem, IUserFriendlyKeybinding, KbExpr } from 'vs/platform/keybinding/common/keybinding';
export interface IResolveResult {
    enterChord: number;
    commandId: string;
}
export interface IBoundCommands {
    [commandId: string]: boolean;
}
export declare class NormalizedKeybindingItem {
    keybinding: number;
    command: string;
    when: KbExpr;
    isDefault: boolean;
    actualCommand: string;
    static fromKeybindingItem(source: IKeybindingItem, isDefault: boolean): NormalizedKeybindingItem;
    constructor(keybinding: number, command: string, when: KbExpr, isDefault: boolean);
}
export declare class KeybindingResolver {
    private _defaultKeybindings;
    private _defaultBoundCommands;
    private _map;
    private _chords;
    private _lookupMap;
    private _lookupMapUnreachable;
    private _shouldWarnOnConflict;
    constructor(defaultKeybindings: IKeybindingItem[], overrides: IKeybindingItem[], shouldWarnOnConflict?: boolean);
    private static _isTargetedForRemoval(defaultKb, keybinding, command, when);
    static combine(rawDefaults: IKeybindingItem[], rawOverrides: IKeybindingItem[]): NormalizedKeybindingItem[];
    private _addKeyPress(keypress, entry, item);
    /**
     * Returns true if `a` is completely covered by `b`.
     * Returns true if `b` is a more relaxed `a`.
     * Return true if (`a` === true implies `b` === true).
     */
    static whenIsEntirelyIncluded(inNormalizedForm: boolean, a: KbExpr, b: KbExpr): boolean;
    private _addToLookupMap(item);
    getDefaultBoundCommands(): IBoundCommands;
    getDefaultKeybindings(): string;
    lookupKeybinding(commandId: string): Keybinding[];
    resolve(context: any, currentChord: number, keypress: number): IResolveResult;
    private _findCommand(context, matches);
    static contextMatchesRules(context: any, rules: KbExpr): boolean;
}
export declare class OutputBuilder {
    private _lines;
    private _currentLine;
    write(str: string): void;
    writeLine(str?: string): void;
    toString(): string;
}
export declare class IOSupport {
    static writeKeybindingItem(out: OutputBuilder, item: IKeybindingItem): void;
    static readKeybindingItem(input: IUserFriendlyKeybinding, index: number): IKeybindingItem;
    static writeKeybinding(input: number, Platform?: ISimplifiedPlatform): string;
    static readKeybinding(input: string, Platform?: ISimplifiedPlatform): number;
    static readKeybindingWhen(input: string): KbExpr;
}
