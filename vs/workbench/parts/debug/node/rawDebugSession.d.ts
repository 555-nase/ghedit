import Event from 'vs/base/common/event';
import { TPromise } from 'vs/base/common/winjs.base';
import { IMessageService } from 'vs/platform/message/common/message';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import debug = require('vs/workbench/parts/debug/common/debug');
import { Adapter } from 'vs/workbench/parts/debug/node/debugAdapter';
import v8 = require('vs/workbench/parts/debug/node/v8Protocol');
import { IOutputService } from 'vs/workbench/parts/output/common/output';
export interface SessionExitedEvent extends DebugProtocol.ExitedEvent {
    body: {
        exitCode: number;
        sessionId: string;
    };
}
export interface SessionTerminatedEvent extends DebugProtocol.TerminatedEvent {
    body: {
        restart?: boolean;
        sessionId: string;
    };
}
export declare class RawDebugSession extends v8.V8Protocol implements debug.IRawDebugSession {
    private debugServerPort;
    private adapter;
    private customTelemetryService;
    private messageService;
    private telemetryService;
    private outputService;
    restarted: boolean;
    emittedStopped: boolean;
    readyForBreakpoints: boolean;
    private serverProcess;
    private socket;
    private cachedInitServer;
    private startTime;
    private stopServerPending;
    private sentPromises;
    private isAttach;
    private capabilities;
    private _onDidInitialize;
    private _onDidStop;
    private _onDidContinued;
    private _onDidTerminateDebugee;
    private _onDidExitAdapter;
    private _onDidThread;
    private _onDidOutput;
    private _onDidBreakpoint;
    private _onDidEvent;
    constructor(debugServerPort: number, adapter: Adapter, customTelemetryService: ITelemetryService, messageService: IMessageService, telemetryService: ITelemetryService, outputService: IOutputService);
    onDidInitialize: Event<DebugProtocol.InitializedEvent>;
    onDidStop: Event<DebugProtocol.StoppedEvent>;
    onDidContinued: Event<DebugProtocol.ContinuedEvent>;
    onDidTerminateDebugee: Event<SessionTerminatedEvent>;
    onDidExitAdapter: Event<SessionExitedEvent>;
    onDidThread: Event<DebugProtocol.ThreadEvent>;
    onDidOutput: Event<DebugProtocol.OutputEvent>;
    onDidBreakpoint: Event<DebugProtocol.BreakpointEvent>;
    onDidEvent: Event<DebugProtocol.Event>;
    private initServer();
    custom(request: string, args: any): TPromise<DebugProtocol.Response>;
    protected send(command: string, args: any, cancelOnDisconnect?: boolean): TPromise<DebugProtocol.Response>;
    protected onEvent(event: DebugProtocol.Event): void;
    configuration: {
        type: string;
        isAttach: boolean;
        capabilities: DebugProtocol.Capabilites;
    };
    initialize(args: DebugProtocol.InitializeRequestArguments): TPromise<DebugProtocol.InitializeResponse>;
    private readCapabilities(response);
    launch(args: DebugProtocol.LaunchRequestArguments): TPromise<DebugProtocol.LaunchResponse>;
    attach(args: DebugProtocol.AttachRequestArguments): TPromise<DebugProtocol.AttachResponse>;
    next(args: DebugProtocol.NextArguments): TPromise<DebugProtocol.NextResponse>;
    stepIn(args: DebugProtocol.StepInArguments): TPromise<DebugProtocol.StepInResponse>;
    stepOut(args: DebugProtocol.StepOutArguments): TPromise<DebugProtocol.StepOutResponse>;
    stepBack(args: DebugProtocol.StepBackArguments): TPromise<DebugProtocol.StepBackResponse>;
    continue(args: DebugProtocol.ContinueArguments): TPromise<DebugProtocol.ContinueResponse>;
    pause(args: DebugProtocol.PauseArguments): TPromise<DebugProtocol.PauseResponse>;
    setVariable(args: DebugProtocol.SetVariableArguments): TPromise<DebugProtocol.SetVariableResponse>;
    restartFrame(args: DebugProtocol.RestartFrameArguments): TPromise<DebugProtocol.RestartFrameResponse>;
    disconnect(restart?: boolean, force?: boolean): TPromise<DebugProtocol.DisconnectResponse>;
    setBreakpoints(args: DebugProtocol.SetBreakpointsArguments): TPromise<DebugProtocol.SetBreakpointsResponse>;
    setFunctionBreakpoints(args: DebugProtocol.SetFunctionBreakpointsArguments): TPromise<DebugProtocol.SetFunctionBreakpointsResponse>;
    setExceptionBreakpoints(args: DebugProtocol.SetExceptionBreakpointsArguments): TPromise<DebugProtocol.SetExceptionBreakpointsResponse>;
    configurationDone(): TPromise<DebugProtocol.ConfigurationDoneResponse>;
    stackTrace(args: DebugProtocol.StackTraceArguments): TPromise<DebugProtocol.StackTraceResponse>;
    scopes(args: DebugProtocol.ScopesArguments): TPromise<DebugProtocol.ScopesResponse>;
    variables(args: DebugProtocol.VariablesArguments): TPromise<DebugProtocol.VariablesResponse>;
    source(args: DebugProtocol.SourceArguments): TPromise<DebugProtocol.SourceResponse>;
    threads(): TPromise<DebugProtocol.ThreadsResponse>;
    evaluate(args: DebugProtocol.EvaluateArguments): TPromise<DebugProtocol.EvaluateResponse>;
    getLengthInSeconds(): number;
    private connectServer(port);
    private startServer();
    private launchServer(launch);
    private stopServer();
    private getLaunchDetails();
    protected onServerError(err: Error): void;
    private onServerExit();
    dispose(): void;
}
