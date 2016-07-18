var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", 'vs/nls', 'vs/base/common/platform', 'vs/base/browser/dom', 'vs/base/common/winjs.base', 'vs/base/browser/ui/button/button', 'vs/base/browser/builder', 'vs/base/browser/ui/splitview/splitview', 'vs/platform/platform', 'vs/workbench/common/actionRegistry', 'vs/platform/instantiation/common/instantiation'], function (require, exports, nls, env, DOM, winjs_base_1, button_1, builder_1, splitview_1, platform_1, actionRegistry_1, instantiation_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var EmptyView = (function (_super) {
        __extends(EmptyView, _super);
        function EmptyView(instantiationService) {
            _super.call(this, {
                minimumSize: 2 * 22,
                ariaHeaderLabel: nls.localize('explorerSection', "Files Explorer Section")
            });
            this.instantiationService = instantiationService;
        }
        EmptyView.prototype.renderHeader = function (container) {
            var titleDiv = builder_1.$('div.title').appendTo(container);
            builder_1.$('span').text(nls.localize('noWorkspace', "No Folder Opened")).appendTo(titleDiv);
        };
        EmptyView.prototype.renderBody = function (container) {
            var _this = this;
            DOM.addClass(container, 'explorer-empty-view');
            var titleDiv = builder_1.$('div.section').appendTo(container);
            builder_1.$('p').text(nls.localize('noWorkspaceHelp', "You have not yet opened a folder.")).appendTo(titleDiv);
            var section = builder_1.$('div.section').appendTo(container);
            var button = new button_1.Button(section);
            button.label = nls.localize('openFolder', "Open Folder");
            button.on('click', function () {
                _this.runWorkbenchAction(env.isMacintosh ? 'workbench.action.files.openFileFolder' : 'workbench.action.files.openFolder');
            });
        };
        EmptyView.prototype.layoutBody = function (size) {
            // no-op
        };
        EmptyView.prototype.runWorkbenchAction = function (actionId) {
            var actionRegistry = platform_1.Registry.as(actionRegistry_1.Extensions.WorkbenchActions);
            var actionDescriptor = actionRegistry.getWorkbenchAction(actionId);
            var action = this.instantiationService.createInstance(actionDescriptor.syncDescriptor);
            return action.run().done(function () { return action.dispose(); });
        };
        EmptyView.prototype.create = function () {
            return winjs_base_1.TPromise.as(null);
        };
        EmptyView.prototype.setVisible = function (visible) {
            return winjs_base_1.TPromise.as(null);
        };
        EmptyView.prototype.focusBody = function () {
            // Ignore
        };
        EmptyView.prototype.reveal = function (element, relativeTop) {
            return winjs_base_1.TPromise.as(null);
        };
        EmptyView.prototype.getActions = function () {
            return [];
        };
        EmptyView.prototype.getSecondaryActions = function () {
            return [];
        };
        EmptyView.prototype.getActionItem = function (action) {
            return null;
        };
        EmptyView.prototype.shutdown = function () {
            // Subclass to implement
        };
        EmptyView = __decorate([
            __param(0, instantiation_1.IInstantiationService)
        ], EmptyView);
        return EmptyView;
    }(splitview_1.CollapsibleView));
    exports.EmptyView = EmptyView;
});
//# sourceMappingURL=emptyView.js.map