/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", 'vs/base/common/errors', 'vs/base/common/winjs.base', 'vs/workbench/node/extensionHostMain', 'vs/base/node/service.net', 'vs/platform/extensions/common/ipcRemoteCom', 'vs/base/common/marshalling'], function (require, exports, errors_1, winjs_base_1, extensionHostMain_1, service_net_1, ipcRemoteCom_1, marshalling) {
    'use strict';
    // This calls exit directly in case the initialization is not finished and we need to exit
    // Otherwise, if initialization completed we go to extensionHostMain.terminate()
    var onTerminate = function () {
        extensionHostMain_1.exit();
    };
    function connectToRenderer() {
        return new winjs_base_1.TPromise(function (c, e) {
            var stats = [];
            // Listen init data message
            process.once('message', function (raw) {
                var msg = marshalling.parse(raw);
                var remoteCom = ipcRemoteCom_1.create(function (data) {
                    process.send(data);
                    stats.push(data.length);
                });
                // Listen to all other messages
                process.on('message', function (msg) {
                    if (msg.type === '__$terminate') {
                        onTerminate();
                        return;
                    }
                    remoteCom.handle(msg);
                });
                // Print a console message when rejection isn't handled within N seconds. For details:
                // see https://nodejs.org/api/process.html#process_event_unhandledrejection
                // and https://nodejs.org/api/process.html#process_event_rejectionhandled
                var unhandledPromises = [];
                process.on('unhandledRejection', function (reason, promise) {
                    unhandledPromises.push(promise);
                    setTimeout(function () {
                        var idx = unhandledPromises.indexOf(promise);
                        if (idx >= 0) {
                            unhandledPromises.splice(idx, 1);
                            console.warn('rejected promise not handled with 1 second');
                            errors_1.onUnexpectedError(reason);
                        }
                    }, 1000);
                });
                process.on('rejectionHandled', function (promise) {
                    var idx = unhandledPromises.indexOf(promise);
                    if (idx >= 0) {
                        unhandledPromises.splice(idx, 1);
                    }
                });
                // Print a console message when an exception isn't handled.
                process.on('uncaughtException', function (err) {
                    errors_1.onUnexpectedError(err);
                });
                // Kill oneself if one's parent dies. Much drama.
                setInterval(function () {
                    try {
                        process.kill(msg.parentPid, 0); // throws an exception if the main process doesn't exist anymore.
                    }
                    catch (e) {
                        onTerminate();
                    }
                }, 5000);
                // Check stats
                setInterval(function () {
                    if (stats.length >= 250) {
                        var total = stats.reduce(function (prev, current) { return prev + current; }, 0);
                        console.warn("MANY messages are being SEND FROM the extension host!");
                        console.warn("SEND during 1sec: message_count=" + stats.length + ", total_len=" + total);
                    }
                    stats.length = 0;
                }, 1000);
                // Tell the outside that we are initialized
                process.send('initialized');
                c({ remoteCom: remoteCom, initData: msg });
            });
            // Tell the outside that we are ready to receive messages
            process.send('ready');
        });
    }
    function connectToSharedProcess() {
        return service_net_1.connect(process.env['VSCODE_SHARED_IPC_HOOK']);
    }
    winjs_base_1.TPromise.join([connectToRenderer(), connectToSharedProcess()])
        .done(function (result) {
        var renderer = result[0];
        var sharedProcessClient = result[1];
        var instantiationService = extensionHostMain_1.createServices(renderer.remoteCom, renderer.initData, sharedProcessClient);
        var extensionHostMain = instantiationService.createInstance(extensionHostMain_1.ExtensionHostMain);
        onTerminate = function () {
            extensionHostMain.terminate();
        };
        extensionHostMain.start()
            .done(null, function (err) { return console.error(err); });
    });
});
//# sourceMappingURL=extensionHostProcess.js.map