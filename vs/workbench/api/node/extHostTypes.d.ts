import URI from 'vs/base/common/uri';
export declare class Disposable {
    static from(...disposables: {
        dispose(): any;
    }[]): Disposable;
    private _callOnDispose;
    constructor(callOnDispose: Function);
    dispose(): any;
}
export interface EditorOptions {
    tabSize: number | string;
    insertSpaces: boolean | string;
}
export declare class Position {
    static Min(...positions: Position[]): Position;
    static Max(...positions: Position[]): Position;
    static is(other: any): other is Position;
    private _line;
    private _character;
    line: number;
    character: number;
    constructor(line: number, character: number);
    isBefore(other: Position): boolean;
    isBeforeOrEqual(other: Position): boolean;
    isAfter(other: Position): boolean;
    isAfterOrEqual(other: Position): boolean;
    isEqual(other: Position): boolean;
    compareTo(other: Position): number;
    translate(change: {
        lineDelta?: number;
        characterDelta?: number;
    }): Position;
    translate(lineDelta?: number, characterDelta?: number): Position;
    with(change: {
        line?: number;
        character?: number;
    }): Position;
    with(line?: number, character?: number): Position;
    toJSON(): any;
}
export declare class Range {
    static is(thing: any): thing is Range;
    protected _start: Position;
    protected _end: Position;
    start: Position;
    end: Position;
    constructor(start: Position, end: Position);
    constructor(startLine: number, startColumn: number, endLine: number, endColumn: number);
    contains(positionOrRange: Position | Range): boolean;
    isEqual(other: Range): boolean;
    intersection(other: Range): Range;
    union(other: Range): Range;
    isEmpty: boolean;
    isSingleLine: boolean;
    with(change: {
        start?: Position;
        end?: Position;
    }): Range;
    with(start?: Position, end?: Position): Range;
    toJSON(): any;
}
export declare class Selection extends Range {
    private _anchor;
    anchor: Position;
    private _active;
    active: Position;
    constructor(anchor: Position, active: Position);
    constructor(anchorLine: number, anchorColumn: number, activeLine: number, activeColumn: number);
    isReversed: boolean;
    toJSON(): {
        start: Position;
        end: Position;
        active: Position;
        anchor: Position;
    };
}
export declare class TextEdit {
    static replace(range: Range, newText: string): TextEdit;
    static insert(position: Position, newText: string): TextEdit;
    static delete(range: Range): TextEdit;
    protected _range: Range;
    protected _newText: string;
    range: Range;
    newText: string;
    constructor(range: Range, newText: string);
    toJSON(): any;
}
export declare class Uri extends URI {
}
export declare class WorkspaceEdit {
    private _values;
    private _index;
    replace(uri: Uri, range: Range, newText: string): void;
    insert(resource: Uri, position: Position, newText: string): void;
    delete(resource: Uri, range: Range): void;
    has(uri: Uri): boolean;
    set(uri: Uri, edits: TextEdit[]): void;
    get(uri: Uri): TextEdit[];
    entries(): [Uri, TextEdit[]][];
    size: number;
    toJSON(): any;
}
export declare enum DiagnosticSeverity {
    Hint = 3,
    Information = 2,
    Warning = 1,
    Error = 0,
}
export declare class Location {
    uri: URI;
    range: Range;
    constructor(uri: URI, range: Range | Position);
    toJSON(): any;
}
export declare class Diagnostic {
    range: Range;
    message: string;
    source: string;
    code: string | number;
    severity: DiagnosticSeverity;
    constructor(range: Range, message: string, severity?: DiagnosticSeverity);
    toJSON(): any;
}
export declare class Hover {
    contents: vscode.MarkedString[];
    range: Range;
    constructor(contents: vscode.MarkedString | vscode.MarkedString[], range?: Range);
}
export declare enum DocumentHighlightKind {
    Text = 0,
    Read = 1,
    Write = 2,
}
export declare class DocumentHighlight {
    range: Range;
    kind: DocumentHighlightKind;
    constructor(range: Range, kind?: DocumentHighlightKind);
    toJSON(): any;
}
export declare enum SymbolKind {
    File = 0,
    Module = 1,
    Namespace = 2,
    Package = 3,
    Class = 4,
    Method = 5,
    Property = 6,
    Field = 7,
    Constructor = 8,
    Enum = 9,
    Interface = 10,
    Function = 11,
    Variable = 12,
    Constant = 13,
    String = 14,
    Number = 15,
    Boolean = 16,
    Array = 17,
    Object = 18,
    Key = 19,
    Null = 20,
}
export declare class SymbolInformation {
    name: string;
    location: Location;
    kind: SymbolKind;
    containerName: string;
    constructor(name: string, kind: SymbolKind, range: Range, uri?: URI, containerName?: string);
    toJSON(): any;
}
export declare class CodeLens {
    range: Range;
    command: vscode.Command;
    constructor(range: Range, command?: vscode.Command);
    isResolved: boolean;
}
export declare class ParameterInformation {
    label: string;
    documentation: string;
    constructor(label: string, documentation?: string);
}
export declare class SignatureInformation {
    label: string;
    documentation: string;
    parameters: ParameterInformation[];
    constructor(label: string, documentation?: string);
}
export declare class SignatureHelp {
    signatures: SignatureInformation[];
    activeSignature: number;
    activeParameter: number;
    constructor();
}
export declare enum CompletionItemKind {
    Text = 0,
    Method = 1,
    Function = 2,
    Constructor = 3,
    Field = 4,
    Variable = 5,
    Class = 6,
    Interface = 7,
    Module = 8,
    Property = 9,
    Unit = 10,
    Value = 11,
    Enum = 12,
    Keyword = 13,
    Snippet = 14,
    Color = 15,
    File = 16,
    Reference = 17,
}
export declare class CompletionItem {
    label: string;
    kind: CompletionItemKind;
    detail: string;
    documentation: string;
    sortText: string;
    filterText: string;
    insertText: string;
    textEdit: TextEdit;
    constructor(label: string, kind?: CompletionItemKind);
    toJSON(): any;
}
export declare class CompletionList {
    isIncomplete: boolean;
    items: vscode.CompletionItem[];
    constructor(items?: vscode.CompletionItem[], isIncomplete?: boolean);
}
export declare enum ViewColumn {
    One = 1,
    Two = 2,
    Three = 3,
}
export declare enum StatusBarAlignment {
    Left = 1,
    Right = 2,
}
export declare enum EndOfLine {
    LF = 1,
    CRLF = 2,
}
export declare enum TextEditorRevealType {
    Default = 0,
    InCenter = 1,
    InCenterIfOutsideViewport = 2,
}
export declare class DocumentLink {
    range: Range;
    target: URI;
    constructor(range: Range, target: URI);
}
