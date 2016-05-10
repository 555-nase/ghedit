/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", 'events', 'electron', 'vs/base/common/winjs.base', 'vs/workbench/electron-main/window', 'vs/workbench/electron-main/env', 'vs/platform/instantiation/common/instantiation', './log'], function (require, exports, events, electron_1, winjs_base_1, window_1, env, instantiation_1, log_1) {
    'use strict';
    var EventTypes = {
        BEFORE_QUIT: 'before-quit'
    };
    exports.ILifecycleService = instantiation_1.createDecorator('lifecycleService');
    var LifecycleService = (function () {
        function LifecycleService(envService, logService) {
            this.envService = envService;
            this.logService = logService;
            this.serviceId = exports.ILifecycleService;
            this.eventEmitter = new events.EventEmitter();
            this.windowToCloseRequest = Object.create(null);
            this.quitRequested = false;
            this.oneTimeListenerTokenGenerator = 0;
        }
        /**
         * Due to the way we handle lifecycle with eventing, the general app.on('before-quit')
         * event cannot be used because it can be called twice on shutdown. Instead the onBeforeQuit
         * handler in this module can be used and it is only called once on a shutdown sequence.
         */
        LifecycleService.prototype.onBeforeQuit = function (clb) {
            var _this = this;
            this.eventEmitter.addListener(EventTypes.BEFORE_QUIT, clb);
            return function () { return _this.eventEmitter.removeListener(EventTypes.BEFORE_QUIT, clb); };
        };
        LifecycleService.prototype.ready = function () {
            this.registerListeners();
        };
        LifecycleService.prototype.registerListeners = function () {
            var _this = this;
            // before-quit
            electron_1.app.on('before-quit', function (e) {
                _this.logService.log('Lifecycle#before-quit');
                if (!_this.quitRequested) {
                    _this.eventEmitter.emit(EventTypes.BEFORE_QUIT); // only send this if this is the first quit request we have
                }
                _this.quitRequested = true;
            });
            // window-all-closed
            electron_1.app.on('window-all-closed', function () {
                _this.logService.log('Lifecycle#window-all-closed');
                // Windows/Linux: we quit when all windows have closed
                // Mac: we only quit when quit was requested
                // --wait: we quit when all windows are closed
                if (_this.quitRequested || process.platform !== 'darwin' || _this.envService.cliArgs.waitForWindowClose) {
                    electron_1.app.quit();
                }
            });
        };
        LifecycleService.prototype.registerWindow = function (vscodeWindow) {
            var _this = this;
            // Window Before Closing: Main -> Renderer
            vscodeWindow.win.on('close', function (e) {
                var windowId = vscodeWindow.id;
                _this.logService.log('Lifecycle#window-before-close', windowId);
                // The window already acknowledged to be closed
                if (_this.windowToCloseRequest[windowId]) {
                    _this.logService.log('Lifecycle#window-close', windowId);
                    delete _this.windowToCloseRequest[windowId];
                    return;
                }
                // Otherwise prevent unload and handle it from window
                e.preventDefault();
                _this.unload(vscodeWindow).done(function (veto) {
                    if (!veto) {
                        _this.windowToCloseRequest[windowId] = true;
                        vscodeWindow.win.close();
                    }
                    else {
                        _this.quitRequested = false;
                        delete _this.windowToCloseRequest[windowId];
                    }
                });
            });
        };
        LifecycleService.prototype.unload = function (vscodeWindow) {
            var _this = this;
            // Always allow to unload a window that is not yet ready
            if (vscodeWindow.readyState !== window_1.ReadyState.READY) {
                return winjs_base_1.TPromise.as(false);
            }
            this.logService.log('Lifecycle#unload()', vscodeWindow.id);
            return new winjs_base_1.TPromise(function (c) {
                var oneTimeEventToken = _this.oneTimeListenerTokenGenerator++;
                var oneTimeOkEvent = 'vscode:ok' + oneTimeEventToken;
                var oneTimeCancelEvent = 'vscode:cancel' + oneTimeEventToken;
                electron_1.ipcMain.once(oneTimeOkEvent, function () {
                    c(false); // no veto
                });
                electron_1.ipcMain.once(oneTimeCancelEvent, function () {
                    // Any cancellation also cancels a pending quit if present
                    if (_this.pendingQuitPromiseComplete) {
                        _this.pendingQuitPromiseComplete(true /* veto */);
                        _this.pendingQuitPromiseComplete = null;
                        _this.pendingQuitPromise = null;
                    }
                    c(true); // veto
                });
                vscodeWindow.send('vscode:beforeUnload', { okChannel: oneTimeOkEvent, cancelChannel: oneTimeCancelEvent });
            });
        };
        /**
         * A promise that completes to indicate if the quit request has been veto'd
         * by the user or not.
         */
        LifecycleService.prototype.quit = function () {
            var _this = this;
            this.logService.log('Lifecycle#quit()');
            if (!this.pendingQuitPromise) {
                this.pendingQuitPromise = new winjs_base_1.TPromise(function (c) {
                    // Store as field to access it from a window cancellation
                    _this.pendingQuitPromiseComplete = c;
                    electron_1.app.once('will-quit', function () {
                        if (_this.pendingQuitPromiseComplete) {
                            _this.pendingQuitPromiseComplete(false /* no veto */);
                            _this.pendingQuitPromiseComplete = null;
                            _this.pendingQuitPromise = null;
                        }
                    });
                    electron_1.app.quit();
                });
            }
            return this.pendingQuitPromise;
        };
        LifecycleService = __decorate([
            __param(0, env.IEnvironmentService),
            __param(1, log_1.ILogService)
        ], LifecycleService);
        return LifecycleService;
    }());
    exports.LifecycleService = LifecycleService;
});
//# sourceMappingURL=lifecycle.js.map