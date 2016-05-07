define(["require", "exports", 'vs/platform/platform', 'vs/platform/instantiation/common/instantiation'], function (require, exports, platform_1, instantiation_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    /**
     * Mime type used by the output editor.
     */
    exports.OUTPUT_MIME = 'text/x-monaco-output';
    /**
     * Id used by the output editor.
     */
    exports.OUTPUT_MODE_ID = 'Log';
    /**
     * Output editor input id.
     */
    exports.OUTPUT_EDITOR_INPUT_ID = 'vs.output';
    /**
     * Output panel id
     */
    exports.OUTPUT_PANEL_ID = 'workbench.panel.output';
    exports.Extensions = {
        OutputChannels: 'workbench.contributions.outputChannels'
    };
    exports.OUTPUT_SERVICE_ID = 'outputService';
    exports.MAX_OUTPUT_LENGTH = 10000 /* Max. number of output lines to show in output */ * 100;
    exports.IOutputService = instantiation_1.createDecorator(exports.OUTPUT_SERVICE_ID);
    var OutputChannelRegistry = (function () {
        function OutputChannelRegistry() {
            this.channels = [];
        }
        OutputChannelRegistry.prototype.registerChannel = function (id, label) {
            if (this.channels.every(function (channel) { return channel.id !== id; })) {
                this.channels.push({ id: id, label: label });
            }
        };
        OutputChannelRegistry.prototype.getChannels = function () {
            return this.channels;
        };
        return OutputChannelRegistry;
    }());
    platform_1.Registry.add(exports.Extensions.OutputChannels, new OutputChannelRegistry());
});
//# sourceMappingURL=output.js.map