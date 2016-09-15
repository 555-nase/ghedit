import { TPromise } from 'vs/base/common/winjs.base';
import Event from 'vs/base/common/event';
import severity from 'vs/base/common/severity';
import debug = require('vs/workbench/parts/debug/common/debug');
import { Source } from 'vs/workbench/parts/debug/common/debugSource';
export declare function evaluateExpression(session: debug.IRawDebugSession, stackFrame: debug.IStackFrame, expression: Expression, context: string): TPromise<Expression>;
export declare function getFullExpressionName(expression: debug.IExpression, sessionType: string): string;
export declare class Thread implements debug.IThread {
    name: string;
    threadId: number;
    private promisedCallStack;
    private cachedCallStack;
    stoppedDetails: debug.IRawStoppedDetails;
    stopped: boolean;
    constructor(name: string, threadId: number);
    getId(): string;
    clearCallStack(): void;
    getCachedCallStack(): debug.IStackFrame[];
    getCallStack(debugService: debug.IDebugService, getAdditionalStackFrames?: boolean): TPromise<debug.IStackFrame[]>;
    private getCallStackImpl(debugService, startFrame);
}
export declare class OutputElement implements debug.ITreeElement {
    private id;
    private static ID_COUNTER;
    constructor(id?: number);
    getId(): string;
}
export declare class ValueOutputElement extends OutputElement {
    value: string;
    severity: severity;
    category: string;
    counter: number;
    constructor(value: string, severity: severity, category?: string, counter?: number);
}
export declare class KeyValueOutputElement extends OutputElement {
    key: string;
    valueObj: any;
    annotation: string;
    private static MAX_CHILDREN;
    private children;
    private _valueName;
    constructor(key: string, valueObj: any, annotation?: string);
    value: string;
    getChildren(): debug.ITreeElement[];
}
export declare abstract class ExpressionContainer implements debug.IExpressionContainer {
    reference: number;
    private id;
    private cacheChildren;
    namedVariables: number;
    indexedVariables: number;
    private chunkIndex;
    static allValues: {
        [id: string]: string;
    };
    private static CHUNK_SIZE;
    valueChanged: boolean;
    private children;
    private _value;
    constructor(reference: number, id: string, cacheChildren: boolean, namedVariables: number, indexedVariables: number, chunkIndex?: number);
    getChildren(debugService: debug.IDebugService): TPromise<debug.IExpression[]>;
    getId(): string;
    value: string;
    private fetchVariables(session, start, count, filter);
    private getChildrenInChunks;
}
export declare class Expression extends ExpressionContainer implements debug.IExpression {
    name: string;
    static DEFAULT_VALUE: string;
    available: boolean;
    type: string;
    constructor(name: string, cacheChildren: boolean, id?: string);
}
export declare class Variable extends ExpressionContainer implements debug.IExpression {
    parent: debug.IExpressionContainer;
    name: string;
    type: string;
    available: boolean;
    errorMessage: string;
    constructor(parent: debug.IExpressionContainer, reference: number, name: string, value: string, namedVariables: number, indexedVariables: number, type?: string, available?: boolean, chunkIndex?: number);
}
export declare class Scope extends ExpressionContainer implements debug.IScope {
    private threadId;
    name: string;
    expensive: boolean;
    constructor(threadId: number, name: string, reference: number, expensive: boolean, namedVariables: number, indexedVariables: number);
}
export declare class StackFrame implements debug.IStackFrame {
    threadId: number;
    frameId: number;
    source: Source;
    name: string;
    lineNumber: number;
    column: number;
    private scopes;
    constructor(threadId: number, frameId: number, source: Source, name: string, lineNumber: number, column: number);
    getId(): string;
    getScopes(debugService: debug.IDebugService): TPromise<debug.IScope[]>;
}
export declare class Breakpoint implements debug.IBreakpoint {
    source: Source;
    desiredLineNumber: number;
    enabled: boolean;
    condition: string;
    lineNumber: number;
    verified: boolean;
    idFromAdapter: number;
    message: string;
    private id;
    constructor(source: Source, desiredLineNumber: number, enabled: boolean, condition: string);
    getId(): string;
}
export declare class FunctionBreakpoint implements debug.IFunctionBreakpoint {
    name: string;
    enabled: boolean;
    private id;
    verified: boolean;
    idFromAdapter: number;
    constructor(name: string, enabled: boolean);
    getId(): string;
}
export declare class ExceptionBreakpoint implements debug.IExceptionBreakpoint {
    filter: string;
    label: string;
    enabled: boolean;
    private id;
    constructor(filter: string, label: string, enabled: boolean);
    getId(): string;
}
export declare class Model implements debug.IModel {
    private breakpoints;
    private breakpointsActivated;
    private functionBreakpoints;
    private exceptionBreakpoints;
    private watchExpressions;
    private threads;
    private toDispose;
    private replElements;
    private _onDidChangeBreakpoints;
    private _onDidChangeCallStack;
    private _onDidChangeWatchExpressions;
    private _onDidChangeREPLElements;
    constructor(breakpoints: debug.IBreakpoint[], breakpointsActivated: boolean, functionBreakpoints: debug.IFunctionBreakpoint[], exceptionBreakpoints: debug.IExceptionBreakpoint[], watchExpressions: Expression[]);
    getId(): string;
    onDidChangeBreakpoints: Event<void>;
    onDidChangeCallStack: Event<void>;
    onDidChangeWatchExpressions: Event<debug.IExpression>;
    onDidChangeReplElements: Event<void>;
    getThreads(): {
        [reference: number]: debug.IThread;
    };
    clearThreads(removeThreads: boolean, reference?: number): void;
    getBreakpoints(): debug.IBreakpoint[];
    getFunctionBreakpoints(): debug.IFunctionBreakpoint[];
    getExceptionBreakpoints(): debug.IExceptionBreakpoint[];
    setExceptionBreakpoints(data: DebugProtocol.ExceptionBreakpointsFilter[]): void;
    areBreakpointsActivated(): boolean;
    setBreakpointsActivated(activated: boolean): void;
    addBreakpoints(rawData: debug.IRawBreakpoint[]): void;
    removeBreakpoints(toRemove: debug.IBreakpoint[]): void;
    updateBreakpoints(data: {
        [id: string]: DebugProtocol.Breakpoint;
    }): void;
    setEnablement(element: debug.IEnablement, enable: boolean): void;
    enableOrDisableAllBreakpoints(enable: boolean): void;
    addFunctionBreakpoint(functionName: string): void;
    updateFunctionBreakpoints(data: {
        [id: string]: {
            name?: string;
            verified?: boolean;
            id?: number;
        };
    }): void;
    removeFunctionBreakpoints(id?: string): void;
    getReplElements(): debug.ITreeElement[];
    addReplExpression(session: debug.IRawDebugSession, stackFrame: debug.IStackFrame, name: string): TPromise<void>;
    logToRepl(value: string | {
        [key: string]: any;
    }, severity?: severity): void;
    appendReplOutput(value: string, severity?: severity): void;
    private addReplElements(newElements);
    removeReplExpressions(): void;
    getWatchExpressions(): Expression[];
    addWatchExpression(session: debug.IRawDebugSession, stackFrame: debug.IStackFrame, name: string): TPromise<void>;
    renameWatchExpression(session: debug.IRawDebugSession, stackFrame: debug.IStackFrame, id: string, newName: string): TPromise<void>;
    evaluateWatchExpressions(session: debug.IRawDebugSession, stackFrame: debug.IStackFrame, id?: string): TPromise<void>;
    clearWatchExpressionValues(): void;
    removeWatchExpressions(id?: string): void;
    sourceIsUnavailable(source: Source): void;
    rawUpdate(data: debug.IRawModelUpdate): void;
    dispose(): void;
}
