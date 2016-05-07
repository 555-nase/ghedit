var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/workbench/parts/gettingStarted/common/abstractGettingStarted', 'vs/base/common/platform', 'electron'], function (require, exports, abstractGettingStarted_1, platform, electron_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var ElectronGettingStarted = (function (_super) {
        __extends(ElectronGettingStarted, _super);
        function ElectronGettingStarted() {
            _super.apply(this, arguments);
        }
        ElectronGettingStarted.prototype.openExternal = function (url) {
            // Don't open the welcome page as the root user on Linux, this is due to a bug with xdg-open
            // which recommends against running itself as root.
            if (platform.isLinux && platform.isRootUser) {
                return;
            }
            electron_1.shell.openExternal(url);
        };
        ElectronGettingStarted.prototype.handleWelcome = function () {
            //make sure the user is online, otherwise refer to the next run to show the welcome page
            if (navigator.onLine) {
                _super.prototype.handleWelcome.call(this);
            }
        };
        return ElectronGettingStarted;
    }(abstractGettingStarted_1.AbstractGettingStarted));
    exports.ElectronGettingStarted = ElectronGettingStarted;
});
//# sourceMappingURL=electronGettingStarted.js.map