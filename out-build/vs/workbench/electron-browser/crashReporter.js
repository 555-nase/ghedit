var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", 'vs/nls!vs/workbench/electron-browser/crashReporter', 'vs/base/common/winjs.base', 'vs/base/common/errors', 'vs/platform/configuration/common/configurationRegistry', 'vs/platform/configuration/common/configuration', 'vs/platform/telemetry/common/telemetry', 'vs/platform/platform', 'electron'], function (require, exports, nls, winjs_base_1, errors_1, configurationRegistry_1, configuration_1, telemetry_1, platform_1, electron_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var TELEMETRY_SECTION_ID = 'telemetry';
    var configurationRegistry = platform_1.Registry.as(configurationRegistry_1.Extensions.Configuration);
    configurationRegistry.registerConfiguration({
        'id': TELEMETRY_SECTION_ID,
        'order': 20,
        'type': 'object',
        'title': nls.localize(0, null),
        'properties': {
            'telemetry.enableCrashReporter': {
                'type': 'boolean',
                'description': nls.localize(1, null),
                'default': true
            }
        }
    });
    var CrashReporter = (function () {
        function CrashReporter(version, commit, telemetryService, configurationService) {
            if (telemetryService === void 0) { telemetryService = telemetry_1.NullTelemetryService; }
            this.telemetryService = telemetryService;
            this.configurationService = configurationService;
            this.configurationService = configurationService;
            this.telemetryService = telemetryService;
            this.version = version;
            this.commit = commit;
            this.isStarted = false;
            this.config = null;
        }
        CrashReporter.prototype.start = function (rawConfiguration) {
            var _this = this;
            if (!this.isStarted) {
                var sessionId = !this.sessionId
                    ? this.telemetryService.getTelemetryInfo().then(function (info) { return _this.sessionId = info.sessionId; })
                    : winjs_base_1.TPromise.as(undefined);
                sessionId.then(function () {
                    if (!_this.config) {
                        _this.config = _this.configurationService.getConfiguration(TELEMETRY_SECTION_ID);
                        if (_this.config && _this.config.enableCrashReporter) {
                            _this.doStart(rawConfiguration);
                        }
                    }
                    else {
                        if (_this.config.enableCrashReporter) {
                            _this.doStart(rawConfiguration);
                        }
                    }
                }, errors_1.onUnexpectedError);
            }
        };
        CrashReporter.prototype.doStart = function (rawConfiguration) {
            var config = this.toConfiguration(rawConfiguration);
            electron_1.crashReporter.start(config);
            //notify the main process to start the crash reporter
            electron_1.ipcRenderer.send('vscode:startCrashReporter', config);
        };
        CrashReporter.prototype.toConfiguration = function (rawConfiguration) {
            var _this = this;
            return JSON.parse(JSON.stringify(rawConfiguration, function (key, value) {
                if (value === '$(sessionId)') {
                    return _this.sessionId;
                }
                if (value === '$(version)') {
                    return _this.version;
                }
                if (value === '$(commit)') {
                    return _this.commit;
                }
                return value;
            }));
        };
        CrashReporter = __decorate([
            __param(2, telemetry_1.ITelemetryService),
            __param(3, configuration_1.IConfigurationService)
        ], CrashReporter);
        return CrashReporter;
    }());
    exports.CrashReporter = CrashReporter;
});
//# sourceMappingURL=crashReporter.js.map