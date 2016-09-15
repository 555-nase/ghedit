/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(r<3?i(s):r>3?i(t,n,s):i(t,n))||s);return r>3&&s&&Object.defineProperty(t,n,s),s},__param=this&&this.__param||function(e,t){return function(n,o){t(n,o,e)}};define(["require","exports","vs/nls","vs/base/common/lifecycle","vs/base/common/mime","vs/base/common/event","vs/base/common/uri","vs/base/common/async","vs/base/common/actions","vs/base/common/arrays","vs/base/common/types","vs/base/common/errors","vs/base/common/severity","vs/base/common/winjs.base","vs/base/browser/ui/aria/aria","vs/platform/keybinding/common/keybinding","vs/platform/markers/common/markers","vs/platform/lifecycle/common/lifecycle","vs/platform/extensions/common/extensions","vs/platform/instantiation/common/instantiation","vs/platform/files/common/files","vs/platform/event/common/event","vs/platform/message/common/message","vs/platform/telemetry/common/telemetry","vs/platform/telemetry/common/telemetryService","vs/platform/telemetry/common/telemetryIpc","vs/platform/storage/common/storage","vs/workbench/services/group/common/groupService","vs/workbench/common/editor","vs/workbench/parts/debug/common/debug","vs/workbench/parts/debug/node/rawDebugSession","vs/workbench/parts/debug/common/debugModel","vs/workbench/parts/debug/browser/debugEditorInputs","vs/workbench/parts/debug/common/debugViewModel","vs/workbench/parts/debug/browser/debugActions","vs/workbench/parts/debug/node/debugConfigurationManager","vs/workbench/parts/debug/common/debugSource","vs/workbench/parts/tasks/common/taskService","vs/workbench/parts/tasks/common/taskSystem","vs/workbench/services/viewlet/common/viewletService","vs/workbench/services/panel/common/panelService","vs/workbench/services/part/common/partService","vs/workbench/parts/files/common/files","vs/platform/configuration/common/configuration","vs/workbench/services/workspace/common/contextService","vs/workbench/services/editor/common/editorService","vs/workbench/services/window/electron-browser/windowService","vs/workbench/services/thread/electron-browser/threadService","electron","vs/base/parts/ipc/node/ipc.cp"],function(e,t,n,o,i,r,s,a,c,u,p,d,l,h,g,m,v,f,S,b,y,k,E,T,w,I,A,B,D,C,x,O,_,F,R,P,N,L,M,W,z,U,V,j,K,G,H,J,X,q){"use strict";var Y="debug.breakpoint",Q="debug.breakpointactivated",Z="debug.functionbreakpoint",$="debug.exceptionbreakpoint",ee="debug.watchexpressions",te="debug.selectedconfigname",ne=function(){function t(e,t,n,o,i,s,a,c,u,p,d,l,h,g,m,v,f,S,b,y){this.storageService=e,this.editorService=t,this.textFileService=n,this.viewletService=o,this.panelService=i,this.fileService=s,this.messageService=a,this.partService=c,this.windowService=u,this.telemetryService=p,this.contextService=d,this.editorGroupService=h,this.lifecycleService=m,this.instantiationService=v,this.extensionService=f,this.markerService=S,this.taskService=b,this.configurationService=y,this.toDispose=[],this.toDisposeOnSessionEnd=[],this.session=null,this.breakpointsToSendOnResourceSaved={},this._state=C.State.Inactive,this._onDidChangeState=new r.Emitter,this.contextService.getWorkspace()||(this._state=C.State.Disabled),this.configurationManager=this.instantiationService.createInstance(P.ConfigurationManager,this.storageService.get(te,A.StorageScope.WORKSPACE,"null")),this.inDebugMode=l.createKey(C.CONTEXT_IN_DEBUG_MODE,!1),this.model=new O.Model(this.loadBreakpoints(),this.storageService.getBoolean(Q,A.StorageScope.WORKSPACE,!0),this.loadFunctionBreakpoints(),this.loadExceptionBreakpoints(),this.loadWatchExpressions()),this.toDispose.push(this.model),this.viewModel=new F.ViewModel,this.registerListeners(g,m)}return t.prototype.registerListeners=function(e,t){var n=this;this.toDispose.push(e.addListener2(y.EventType.FILE_CHANGES,function(e){return n.onFileChanges(e)})),this.taskService&&(this.toDispose.push(this.taskService.addListener2(L.TaskServiceEvents.Active,function(e){n.lastTaskEvent=e})),this.toDispose.push(this.taskService.addListener2(L.TaskServiceEvents.Inactive,function(e){e.type===L.TaskType.SingleRun&&(n.lastTaskEvent=null)})),this.toDispose.push(this.taskService.addListener2(L.TaskServiceEvents.Terminated,function(e){n.lastTaskEvent=null}))),t.onShutdown(this.store,this),t.onShutdown(this.dispose,this),this.toDispose.push(this.windowService.onBroadcast(this.onBroadcast,this))},t.prototype.onBroadcast=function(e){if(e.channel===J.EXTENSION_ATTACH_BROADCAST_CHANNEL)return void this.rawAttach(e.payload.port);if(e.channel===J.EXTENSION_TERMINATE_BROADCAST_CHANNEL)return void this.onSessionEnd();var t=this.getActiveSession();if(t&&"extensionHost"===t.configuration.type&&e.channel===J.EXTENSION_LOG_BROADCAST_CHANNEL){var n=e.payload,o="warn"===n.severity?l["default"].Warning:"error"===n.severity?l["default"].Error:l["default"].Info,i=[];try{var r=JSON.parse(n.arguments);i.push.apply(i,Object.getOwnPropertyNames(r).map(function(e){return r[e]}))}catch(s){i.push(n.arguments)}for(var a=[],c=0;c<i.length;c++){var u=i[c];if("undefined"==typeof u)a.push("undefined");else if(null===u)a.push("null");else if(p.isObject(u)||Array.isArray(u))a.length&&(this.logToRepl(a.join(" "),o),a=[]),this.logToRepl(u,o);else if("string"==typeof u){for(var d="",h=0,g=u.length;h<g;h++)"%"!==u[h]||"s"!==u[h+1]&&"i"!==u[h+1]&&"d"!==u[h+1]?d+=u[h]:(c++,d+=p.isUndefinedOrNull(i[c])?"":i[c],h++);a.push(d)}else a.push(u)}a.length&&this.logToRepl(a.join(" "),o)}},t.prototype.registerSessionListeners=function(){var e=this;this.toDisposeOnSessionEnd.push(this.session),this.toDisposeOnSessionEnd.push(this.session.onDidInitialize(function(t){g.status(n.localize("debuggingStarted","Debugging started.")),e.sendAllBreakpoints().then(function(){e.session.configuration.capabilities.supportsConfigurationDoneRequest&&e.session.configurationDone().done(null,d.onUnexpectedError)})})),this.toDisposeOnSessionEnd.push(this.session.onDidStop(function(t){e.setStateAndEmit(C.State.Stopped);var o=t.body.threadId;e.getThreadData().done(function(){e.model.rawUpdate({threadId:o,stoppedDetails:t.body,allThreadsStopped:t.body.allThreadsStopped});var i=e.model.getThreads()[o];i.getCallStack(e).then(function(o){if(o.length>0){var r=u.first(o,function(e){return e.source&&e.source.available},o[0]);return e.setFocusedStackFrameAndEvaluate(r,i).done(null,d.onUnexpectedError),e.windowService.getWindow().focus(),g.alert(n.localize("debuggingPaused","Debugging paused, reason {0}, {1} {2}",t.body.reason,r.source?r.source.name:"",r.lineNumber)),e.openOrRevealSource(r.source,r.lineNumber,!1,!1)}e.setFocusedStackFrameAndEvaluate(null,i).done(null,d.onUnexpectedError)})},d.onUnexpectedError)})),this.toDisposeOnSessionEnd.push(this.session.onDidThread(function(t){"started"===t.body.reason?e.getThreadData().done(null,d.onUnexpectedError):"exited"===t.body.reason&&e.model.clearThreads(!0,t.body.threadId)})),this.toDisposeOnSessionEnd.push(this.session.onDidTerminateDebugee(function(t){g.status(n.localize("debuggingStopped","Debugging stopped.")),e.session&&e.session.getId()===t.body.sessionId&&(t.body&&"boolean"==typeof t.body.restart&&t.body.restart?e.restartSession().done(null,function(t){return e.messageService.show(l["default"].Error,t.message)}):e.session.disconnect().done(null,d.onUnexpectedError))})),this.toDisposeOnSessionEnd.push(this.session.onDidContinued(function(t){e.lazyTransitionToRunningState(t.body.allThreadsContinued?void 0:t.body.threadId)})),this.toDisposeOnSessionEnd.push(this.session.onDidOutput(function(t){t.body&&"telemetry"===t.body.category?e.customTelemetryService&&e.telemetryService.isOptedIn&&e.customTelemetryService.publicLog(t.body.output,t.body.data):t.body&&"string"==typeof t.body.output&&t.body.output.length>0&&e.onOutput(t)})),this.toDisposeOnSessionEnd.push(this.session.onDidBreakpoint(function(t){var n=t.body&&t.body.breakpoint?t.body.breakpoint.id:void 0,o=e.model.getBreakpoints().filter(function(e){return e.idFromAdapter===n}).pop();if(o)e.model.updateBreakpoints((r={},r[o.getId()]=t.body.breakpoint,r));else{var i=e.model.getFunctionBreakpoints().filter(function(e){return e.idFromAdapter===n}).pop();i&&e.model.updateFunctionBreakpoints((s={},s[i.getId()]=t.body.breakpoint,s))}var r,s})),this.toDisposeOnSessionEnd.push(this.session.onDidExitAdapter(function(t){"extensionHost"===e.session.configuration.type&&e._state===C.State.RunningNoDebug&&X.ipcRenderer.send("vscode:closeExtensionHostWindow",e.contextService.getWorkspace().resource.fsPath),e.session&&e.session.getId()===t.body.sessionId&&e.onSessionEnd()}))},t.prototype.onOutput=function(e){var t="stderr"===e.body.category?l["default"].Error:"console"===e.body.category?l["default"].Warning:l["default"].Info;this.appendReplOutput(e.body.output,t)},t.prototype.getThreadData=function(){var e=this;return this.session.threads().then(function(t){t.body.threads.forEach(function(t){return e.model.rawUpdate({threadId:t.id,thread:t})})})},t.prototype.loadBreakpoints=function(){var e;try{e=JSON.parse(this.storageService.get(Y,A.StorageScope.WORKSPACE,"[]")).map(function(e){return new O.Breakpoint(new N.Source(e.source.raw?e.source.raw:{path:s["default"].parse(e.source.uri).fsPath,name:e.source.name}),e.desiredLineNumber||e.lineNumber,e.enabled,e.condition)})}catch(t){}return e||[]},t.prototype.loadFunctionBreakpoints=function(){var e;try{e=JSON.parse(this.storageService.get(Z,A.StorageScope.WORKSPACE,"[]")).map(function(e){return new O.FunctionBreakpoint(e.name,e.enabled)})}catch(t){}return e||[]},t.prototype.loadExceptionBreakpoints=function(){var e;try{e=JSON.parse(this.storageService.get($,A.StorageScope.WORKSPACE,"[]")).map(function(e){return new O.ExceptionBreakpoint(e.filter||e.name,e.label,e.enabled)})}catch(t){}return e||[]},t.prototype.loadWatchExpressions=function(){var e;try{e=JSON.parse(this.storageService.get(ee,A.StorageScope.WORKSPACE,"[]")).map(function(e){return new O.Expression(e.name,(!1),e.id)})}catch(t){}return e||[]},Object.defineProperty(t.prototype,"state",{get:function(){return this._state},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onDidChangeState",{get:function(){return this._onDidChangeState.event},enumerable:!0,configurable:!0}),t.prototype.setStateAndEmit=function(e){this._state=e,this._onDidChangeState.fire(e)},Object.defineProperty(t.prototype,"enabled",{get:function(){return!!this.contextService.getWorkspace()},enumerable:!0,configurable:!0}),t.prototype.setFocusedStackFrameAndEvaluate=function(e,t){return!t&&e&&(t=this.model.getThreads()[e.threadId]),this.viewModel.setFocusedStackFrame(e,t),e?this.model.evaluateWatchExpressions(this.session,e):(this.model.clearWatchExpressionValues(),h.TPromise.as(null))},t.prototype.enableOrDisableBreakpoints=function(e,t){return t?(this.model.setEnablement(t,e),t instanceof O.Breakpoint?this.sendBreakpoints(t.source.uri):t instanceof O.FunctionBreakpoint?this.sendFunctionBreakpoints():this.sendExceptionBreakpoints()):(this.model.enableOrDisableAllBreakpoints(e),this.sendAllBreakpoints())},t.prototype.addBreakpoints=function(e){var t=this;this.model.addBreakpoints(e);var o=u.distinct(e,function(e){return e.uri.toString()}).map(function(e){return e.uri});return e.forEach(function(e){return g.status(n.localize("breakpointAdded","Added breakpoint, line {0}, file {1}",e.lineNumber,e.uri.fsPath))}),h.TPromise.join(o.map(function(e){return t.sendBreakpoints(e)}))},t.prototype.removeBreakpoints=function(e){var t=this,o=this.model.getBreakpoints().filter(function(t){return!e||t.getId()===e});o.forEach(function(e){return g.status(n.localize("breakpointRemoved","Removed breakpoint, line {0}, file {1}",e.lineNumber,e.source.uri.fsPath))});var i=u.distinct(o,function(e){return e.source.uri.toString()}).map(function(e){return e.source.uri});return this.model.removeBreakpoints(o),h.TPromise.join(i.map(function(e){return t.sendBreakpoints(e)}))},t.prototype.setBreakpointsActivated=function(e){return this.model.setBreakpointsActivated(e),this.sendAllBreakpoints()},t.prototype.addFunctionBreakpoint=function(){this.model.addFunctionBreakpoint("")},t.prototype.renameFunctionBreakpoint=function(e,t){return this.model.updateFunctionBreakpoints((n={},n[e]={name:t},n)),this.sendFunctionBreakpoints();var n},t.prototype.removeFunctionBreakpoints=function(e){return this.model.removeFunctionBreakpoints(e),this.sendFunctionBreakpoints()},t.prototype.addReplExpression=function(e){var t=this;this.telemetryService.publicLog("debugService/addReplExpression");var n=this.viewModel.getFocusedStackFrame();return this.model.addReplExpression(this.session,n,e).then(function(){return t.setFocusedStackFrameAndEvaluate(n)})},t.prototype.logToRepl=function(e,t){this.model.logToRepl(e,t)},t.prototype.appendReplOutput=function(e,t){this.model.appendReplOutput(e,t)},t.prototype.removeReplExpressions=function(){this.model.removeReplExpressions()},t.prototype.setVariable=function(e,t){var n=this;return this.session&&e instanceof O.Variable?this.session.setVariable({name:e.name,value:t,variablesReference:e.parent.reference}).then(function(t){return e.value=t.body.value,n.setFocusedStackFrameAndEvaluate(n.viewModel.getFocusedStackFrame())},function(n){e.errorMessage=n.message,e.value=t}):h.TPromise.as(null)},t.prototype.addWatchExpression=function(e){return this.model.addWatchExpression(this.session,this.viewModel.getFocusedStackFrame(),e)},t.prototype.renameWatchExpression=function(e,t){return this.model.renameWatchExpression(this.session,this.viewModel.getFocusedStackFrame(),e,t)},t.prototype.removeWatchExpressions=function(e){this.model.removeWatchExpressions(e)},t.prototype.createSession=function(e,t){var o=this;return this.removeReplExpressions(),this.textFileService.saveAll().then(function(){return o.configurationService.loadConfiguration().then(function(){return o.extensionService.onReady().then(function(){return o.configurationManager.setConfiguration(t||o.configurationManager.configurationName).then(function(){return o.configurationManager.resolveInteractiveVariables()}).then(function(i){return(t=i)?t.silentlyAbort?void 0:(t.noDebug=e,o.configurationManager.adapter?o.runPreLaunchTask(t.preLaunchTask).then(function(e){var i=t.preLaunchTask?o.markerService.getStatistics().errors:0,r=e&&0===e.exitCode,s=e&&void 0!==e.exitCode&&0!==e.exitCode;return r||0===i&&!s?o.doCreateSession(t):void o.messageService.show(l["default"].Error,{message:i>1?n.localize("preLaunchTaskErrors","Build errors have been detected during preLaunchTask '{0}'.",t.preLaunchTask):1===i?n.localize("preLaunchTaskError","Build error has been detected during preLaunchTask '{0}'.",t.preLaunchTask):n.localize("preLaunchTaskExitCode","The preLaunchTask '{0}' terminated with exit code {1}.",t.preLaunchTask,e.exitCode),actions:[E.CloseAction,new c.Action("debug.continue",n.localize("debugAnyway","Debug Anyway"),null,(!0),function(){return o.messageService.hideAll(),o.doCreateSession(t)})]})},function(e){if(e.code!==M.TaskErrors.NotConfigured)throw e;o.messageService.show(e.severity,{message:e.message,actions:[E.CloseAction,o.taskService.configureAction()]})}):t.type?h.TPromise.wrapError(new Error(n.localize("debugTypeNotSupported","Configured debug type '{0}' is not supported.",t.type))):h.TPromise.wrapError(d.create(n.localize("debugTypeMissing","Missing property 'type' for the chosen launch configuration."),{actions:[E.CloseAction,o.instantiationService.createInstance(R.ConfigureAction,R.ConfigureAction.ID,R.ConfigureAction.LABEL)]}))):o.configurationManager.openConfigFile(!1).then(function(e){e&&o.messageService.show(l["default"].Info,n.localize("NewLaunchConfig","Please set up the launch configuration file for your application."))})})})})})},t.prototype.doCreateSession=function(t){var o=this;return this.setStateAndEmit(C.State.Initializing),this.telemetryService.getTelemetryInfo().then(function(e){var t=Object.create(null);return t["common.vscodemachineid"]=e.machineId,t["common.vscodesessionid"]=e.sessionId,t}).then(function(i){var r=o.configurationManager.adapter,a=r.aiKey,c=r.type,u=o.configurationManager.adapter.extensionDescription.publisher;if(o.customTelemetryService=null,a){var p=new q.Client(s["default"].parse(e.toUrl("bootstrap")).fsPath,{serverName:"Debug Telemetry",timeout:3e5,args:[u+"."+c,JSON.stringify(i),a],env:{ATOM_SHELL_INTERNAL_RUN_AS_NODE:1,PIPE_LOGGING:"true",AMD_ENTRYPOINT:"vs/workbench/parts/debug/node/telemetryApp"}}),l=p.getChannel("telemetryAppender"),g=new I.TelemetryAppenderClient(l);o.toDisposeOnSessionEnd.push(p),o.customTelemetryService=new w.TelemetryService({appender:g},o.configurationService)}return o.session=o.instantiationService.createInstance(x.RawDebugSession,t.debugServer,o.configurationManager.adapter,o.customTelemetryService),o.registerSessionListeners(),o.session.initialize({adapterID:t.type,pathFormat:"path",linesStartAt1:!0,columnsStartAt1:!0,supportsVariableType:!0,supportsVariablePaging:!0}).then(function(e){return o.session?(o.model.setExceptionBreakpoints(o.session.configuration.capabilities.exceptionBreakpointFilters),"attach"===t.request?o.session.attach(t):o.session.launch(t)):h.TPromise.wrapError(new Error(n.localize("debugAdapterCrash","Debug adapter process has terminated unexpectedly")))}).then(function(e){return o.session?(("openOnSessionStart"===t.internalConsoleOptions||!o.viewModel.changedWorkbenchViewState&&"neverOpen"!==t.internalConsoleOptions)&&o.panelService.openPanel(C.REPL_ID,!1).done(void 0,d.onUnexpectedError),o.viewModel.changedWorkbenchViewState||o.partService.isSideBarHidden()||(o.viewModel.changedWorkbenchViewState=!0,o.viewletService.openViewlet(C.VIEWLET_ID)),t.noDebug||o.partService.addClass("debugging"),o.extensionService.activateByEvent("onDebug:"+t.type).done(null,d.onUnexpectedError),o.contextService.updateOptions("editor",{glyphMargin:!0}),o.inDebugMode.set(!0),o.lazyTransitionToRunningState(),void o.telemetryService.publicLog("debugSessionStart",{type:t.type,breakpointCount:o.model.getBreakpoints().length,exceptionBreakpoints:o.model.getExceptionBreakpoints(),watchExpressionsCount:o.model.getWatchExpressions().length,extensionName:o.configurationManager.adapter.extensionDescription.publisher+"."+o.configurationManager.adapter.extensionDescription.name,isBuiltin:o.configurationManager.adapter.extensionDescription.isBuiltin})):h.TPromise.as(null)}).then(void 0,function(e){if(e instanceof Error&&"Canceled"===e.message)return h.TPromise.as(null);o.telemetryService.publicLog("debugMisconfiguration",{type:t?t.type:void 0}),o.setStateAndEmit(C.State.Inactive),o.session&&o.session.disconnect(),o.model.getReplElements().length>0&&o.panelService.openPanel(C.REPL_ID,!1).done(void 0,d.onUnexpectedError);var n=o.instantiationService.createInstance(R.ConfigureAction,R.ConfigureAction.ID,R.ConfigureAction.LABEL),i=e.actions&&e.actions.length?e.actions.concat([n]):[E.CloseAction,n];return h.TPromise.wrapError(d.create(e.message,{actions:i}))})})},t.prototype.runPreLaunchTask=function(e){var t=this;return e?this.taskService.tasks().then(function(o){var i=o.filter(function(t){return t.name===e});if(1!==i.length)return h.TPromise.wrapError(d.create(n.localize("DebugTaskNotFound","Could not find the preLaunchTask '{0}'.",e),{actions:[E.CloseAction,t.taskService.configureAction(),t.instantiationService.createInstance(R.ConfigureAction,R.ConfigureAction.ID,R.ConfigureAction.LABEL)]}));if(t.lastTaskEvent&&t.lastTaskEvent.taskName===e)return h.TPromise.as(null);if(t.lastTaskEvent)return h.TPromise.wrapError(d.create(n.localize("differentTaskRunning","There is a task {0} running. Can not run pre launch task {1}.",t.lastTaskEvent.taskName,e)));var r=t.taskService.run(i[0].id).then(function(e){return t.lastTaskEvent=null,e},function(e){t.lastTaskEvent=null});return i[0].isWatching?new h.TPromise(function(e,n){return t.taskService.addOneTimeDisposableListener(L.TaskServiceEvents.Inactive,function(){return e(null)})}):r}):h.TPromise.as(null)},t.prototype.rawAttach=function(e){if(this.session){if(!this.session.configuration.isAttach)return this.session.attach({port:e});this.session.disconnect().done(null,d.onUnexpectedError)}this.setStateAndEmit(C.State.Initializing);var t=this.configurationManager.configuration;return this.doCreateSession({type:t.type,request:"attach",port:e,sourceMaps:t.sourceMaps,outDir:t.outDir,debugServer:t.debugServer})},t.prototype.restartSession=function(){var e=this;return this.session?this.session.disconnect(!0).then(function(){return new h.TPromise(function(t,n){setTimeout(function(){e.createSession(!1,null).then(function(){return t(null)},function(e){return n(e)})},300)})}):this.createSession(!1,null)},t.prototype.getActiveSession=function(){return this.session},t.prototype.onSessionEnd=function(){if(this.session){var e=this.model.getBreakpoints().length>0;this.telemetryService.publicLog("debugSessionStop",{type:this.session.configuration.type,success:this.session.emittedStopped||!e,sessionLengthInSeconds:this.session.getLengthInSeconds(),breakpointCount:this.model.getBreakpoints().length,watchExpressionsCount:this.model.getWatchExpressions().length})}this.session=null;try{this.toDisposeOnSessionEnd=o.dispose(this.toDisposeOnSessionEnd)}catch(t){}this.partService.removeClass("debugging"),this.model.clearThreads(!0),this.setFocusedStackFrameAndEvaluate(null).done(null,d.onUnexpectedError),this.setStateAndEmit(C.State.Inactive);var n={};this.model.getBreakpoints().forEach(function(e){delete e.source.raw.sourceReference,n[e.getId()]={line:e.lineNumber,verified:!1}}),this.model.updateBreakpoints(n),this.inDebugMode.reset()},t.prototype.getModel=function(){return this.model},t.prototype.getViewModel=function(){return this.viewModel},t.prototype.openOrRevealSource=function(e,t,n,o){for(var r=this,s=this.editorService.getVisibleEditors(),a=0;a<s.length;a++){var c=D.asFileEditorInput(s[a].input);if(c&&c.getResource().toString()===e.uri.toString()||s[a].input instanceof _.DebugStringEditorInput&&s[a].input.getResource().toString()===e.uri.toString()){var u=s[a].getControl();return u&&(u.revealLineInCenterIfOutsideViewport(t),u.setSelection({startLineNumber:t,startColumn:1,endLineNumber:t,endColumn:1}),this.editorGroupService.activateGroup(a),n||this.editorGroupService.focusGroup(a)),h.TPromise.as(null)}}return e.inMemory?0!==e.reference&&this.session&&e.available?this.session.source({sourceReference:e.reference}).then(function(t){var n=t.body.mimeType?t.body.mimeType:i.guessMimeTypes(e.name)[0];return r.getDebugStringEditorInput(e,t.body.content,n)},function(t){return r.getDebugStringEditorInput(e,t.message,i.MIME_TEXT)}).then(function(e){return r.editorService.openEditor(e,{preserveFocus:n,selection:{startLineNumber:t,startColumn:1,endLineNumber:t,endColumn:1}},o)}):this.sourceIsUnavailable(e,o):this.fileService.resolveFile(e.uri).then(function(){return r.editorService.openEditor({resource:e.uri,options:{selection:{startLineNumber:t,startColumn:1,endLineNumber:t,endColumn:1},preserveFocus:n}},o)},function(t){return r.sourceIsUnavailable(e,o)})},t.prototype.sourceIsUnavailable=function(e,t){this.model.sourceIsUnavailable(e);var o=this.getDebugStringEditorInput(e,n.localize("debugSourceNotAvailable","Source {0} is not available.",e.uri.fsPath),"text/plain");return this.editorService.openEditor(o,{preserveFocus:!0},t)},t.prototype.getConfigurationManager=function(){return this.configurationManager},t.prototype.next=function(e){var t=this;return this.session?this.session.next({threadId:e}).then(function(){t.lazyTransitionToRunningState(e)}):h.TPromise.as(null)},t.prototype.stepIn=function(e){var t=this;return this.session?this.session.stepIn({threadId:e}).then(function(){t.lazyTransitionToRunningState(e)}):h.TPromise.as(null)},t.prototype.stepOut=function(e){var t=this;return this.session?this.session.stepOut({threadId:e}).then(function(){t.lazyTransitionToRunningState(e)}):h.TPromise.as(null)},t.prototype.stepBack=function(e){var t=this;return this.session?this.session.stepBack({threadId:e}).then(function(){t.lazyTransitionToRunningState(e)}):h.TPromise.as(null)},t.prototype["continue"]=function(e){var t=this;return this.session?this.session["continue"]({threadId:e}).then(function(n){var o=!n.body||n.body.allThreadsContinued!==!1;t.lazyTransitionToRunningState(o?void 0:e)}):h.TPromise.as(null)},t.prototype.pause=function(e){return this.session?this.session.pause({threadId:e}):h.TPromise.as(null)},t.prototype.restartFrame=function(e){return this.session?this.session.restartFrame({frameId:e}):h.TPromise.as(null)},t.prototype.lazyTransitionToRunningState=function(e){var t,o=this,i=this.session.onDidStop(function(n){n.body.threadId!==e&&!n.body.allThreadsStopped&&e||t.cancel()});this.model.clearThreads(!1,e);var r=this.model.getThreads(),s=Object.keys(r).filter(function(e){return r[e].stopped}).pop(),c=s?r[parseInt(s)]:null,u=c?c.getCachedCallStack():null,p=u&&u.length>0?u[0]:null;c||this.setStateAndEmit(this.configurationManager.configuration.noDebug?C.State.RunningNoDebug:C.State.Running),t=new a.RunOnceScheduler(function(){i.dispose(),g.status(n.localize("debuggingContinued","Debugging continued.")),o.setFocusedStackFrameAndEvaluate(p).done(null,d.onUnexpectedError)},500),t.schedule()},t.prototype.getDebugStringEditorInput=function(e,t,n){var o=this.instantiationService.createInstance(_.DebugStringEditorInput,e.name,e.uri,e.origin,t,n,void 0);return this.toDisposeOnSessionEnd.push(o),o},t.prototype.sendAllBreakpoints=function(){var e=this;return h.TPromise.join(u.distinct(this.model.getBreakpoints(),function(e){return e.source.uri.toString()}).map(function(t){return e.sendBreakpoints(t.source.uri)})).then(function(){return e.sendFunctionBreakpoints()}).then(function(){return e.sendExceptionBreakpoints()})},t.prototype.sendBreakpoints=function(e,t){var n=this;if(void 0===t&&(t=!1),!this.session||!this.session.readyForBreakpoints)return h.TPromise.as(null);if(this.textFileService.isDirty(e))return this.breakpointsToSendOnResourceSaved[e.toString()]=!0,h.TPromise.as(null);var o=u.distinct(this.model.getBreakpoints().filter(function(t){return n.model.areBreakpointsActivated()&&t.enabled&&t.source.uri.toString()===e.toString()}),function(e){return""+e.desiredLineNumber}),i=o.length>0?o[0].source.raw:N.Source.toRawSource(e,this.model);return this.session.setBreakpoints({source:i,lines:o.map(function(e){return e.desiredLineNumber}),breakpoints:o.map(function(e){return{line:e.desiredLineNumber,condition:e.condition}}),sourceModified:t}).then(function(e){for(var t={},i=0;i<o.length;i++)t[o[i].getId()]=e.body.breakpoints[i];n.model.updateBreakpoints(t)})},t.prototype.sendFunctionBreakpoints=function(){var e=this;if(!this.session||!this.session.readyForBreakpoints||!this.session.configuration.capabilities.supportsFunctionBreakpoints)return h.TPromise.as(null);var t=this.model.getFunctionBreakpoints().filter(function(t){return t.enabled&&e.model.areBreakpointsActivated()});return this.session.setFunctionBreakpoints({breakpoints:t}).then(function(n){for(var o={},i=0;i<t.length;i++)o[t[i].getId()]=n.body.breakpoints[i];e.model.updateFunctionBreakpoints(o)})},t.prototype.sendExceptionBreakpoints=function(){if(!this.session||!this.session.readyForBreakpoints||0===this.model.getExceptionBreakpoints().length)return h.TPromise.as(null);var e=this.model.getExceptionBreakpoints().filter(function(e){return e.enabled});return this.session.setExceptionBreakpoints({filters:e.map(function(e){return e.filter})})},t.prototype.onFileChanges=function(e){var t=this;this.model.removeBreakpoints(this.model.getBreakpoints().filter(function(t){return e.contains(t.source.uri,y.FileChangeType.DELETED)})),e.getUpdated().forEach(function(e){t.breakpointsToSendOnResourceSaved[e.resource.toString()]&&(t.breakpointsToSendOnResourceSaved[e.resource.toString()]=!1,t.sendBreakpoints(e.resource,!0).done(null,d.onUnexpectedError))})},t.prototype.store=function(){this.storageService.store(Y,JSON.stringify(this.model.getBreakpoints()),A.StorageScope.WORKSPACE),this.storageService.store(Q,this.model.areBreakpointsActivated()?"true":"false",A.StorageScope.WORKSPACE),this.storageService.store(Z,JSON.stringify(this.model.getFunctionBreakpoints()),A.StorageScope.WORKSPACE),this.storageService.store($,JSON.stringify(this.model.getExceptionBreakpoints()),A.StorageScope.WORKSPACE),this.storageService.store(te,this.configurationManager.configurationName,A.StorageScope.WORKSPACE),this.storageService.store(ee,JSON.stringify(this.model.getWatchExpressions()),A.StorageScope.WORKSPACE)},t.prototype.dispose=function(){this.toDisposeOnSessionEnd=o.dispose(this.toDisposeOnSessionEnd),this.toDispose=o.dispose(this.toDispose)},t=__decorate([__param(0,A.IStorageService),__param(1,G.IWorkbenchEditorService),__param(2,V.ITextFileService),__param(3,W.IViewletService),__param(4,z.IPanelService),__param(5,y.IFileService),__param(6,E.IMessageService),__param(7,U.IPartService),__param(8,H.IWindowService),__param(9,T.ITelemetryService),__param(10,K.IWorkspaceContextService),__param(11,m.IKeybindingService),__param(12,B.IEditorGroupService),__param(13,k.IEventService),__param(14,f.ILifecycleService),__param(15,b.IInstantiationService),__param(16,S.IExtensionService),__param(17,v.IMarkerService),__param(18,L.ITaskService),__param(19,j.IConfigurationService)],t)}();t.DebugService=ne});