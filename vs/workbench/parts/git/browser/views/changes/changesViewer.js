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
define(["require", "exports", 'vs/base/common/winjs.base', 'vs/nls!vs/workbench/parts/git/browser/views/changes/changesViewer', 'vs/base/common/platform', 'vs/base/common/paths', 'vs/base/common/severity', 'vs/base/browser/dom', 'vs/base/common/comparers', 'vs/base/browser/ui/actionbar/actionbar', 'vs/base/browser/ui/countBadge/countBadge', 'vs/base/parts/tree/browser/tree', 'vs/base/parts/tree/browser/treeDnd', 'vs/base/parts/tree/browser/treeDefaults', 'vs/workbench/parts/git/common/git', 'vs/workbench/parts/git/common/gitModel', 'vs/workbench/parts/git/browser/gitActions', 'vs/platform/contextview/browser/contextView', 'vs/platform/instantiation/common/instantiation', 'vs/platform/message/common/message', 'vs/base/common/keyCodes', 'vs/platform/workspace/common/workspace', 'vs/base/common/uri'], function (require, exports, winjs, nls, platform, paths, severity_1, dom, comparers, actionbar, countbadge, tree, treednd, treedefaults, git, gitmodel, gitactions, contextView_1, instantiation_1, message_1, keyCodes_1, workspace_1, uri_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var IGitService = git.IGitService;
    function toReadablePath(path) {
        if (!platform.isWindows) {
            return path;
        }
        return path.replace(/\//g, '\\');
    }
    var $ = dom.emmet;
    var ActionContainer = (function () {
        function ActionContainer(instantiationService) {
            this.cache = {};
            this.instantiationService = instantiationService;
        }
        ActionContainer.prototype.getAction = function (ctor) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var action = this.cache[ctor.ID];
            if (!action) {
                args.unshift(ctor);
                action = this.cache[ctor.ID] = this.instantiationService.createInstance.apply(this.instantiationService, args);
            }
            return action;
        };
        ActionContainer.prototype.dispose = function () {
            var _this = this;
            Object.keys(this.cache).forEach(function (k) {
                _this.cache[k].dispose();
            });
            this.cache = null;
        };
        return ActionContainer;
    }());
    exports.ActionContainer = ActionContainer;
    var DataSource = (function () {
        function DataSource() {
        }
        DataSource.prototype.getId = function (tree, element) {
            if (element instanceof gitmodel.StatusModel) {
                return 'root';
            }
            else if (element instanceof gitmodel.StatusGroup) {
                var statusGroup = element;
                switch (statusGroup.getType()) {
                    case git.StatusType.INDEX: return 'index';
                    case git.StatusType.WORKING_TREE: return 'workingTree';
                    case git.StatusType.MERGE: return 'merge';
                    default: throw new Error('Invalid group type');
                }
            }
            var status = element;
            return status.getId();
        };
        DataSource.prototype.hasChildren = function (tree, element) {
            if (element instanceof gitmodel.StatusModel) {
                return true;
            }
            else if (element instanceof gitmodel.StatusGroup) {
                var statusGroup = element;
                return statusGroup.all().length > 0;
            }
        };
        DataSource.prototype.getChildren = function (tree, element) {
            if (element instanceof gitmodel.StatusModel) {
                var model = element;
                return winjs.TPromise.as(model.getGroups());
            }
            else if (element instanceof gitmodel.StatusGroup) {
                var statusGroup = element;
                return winjs.TPromise.as(statusGroup.all());
            }
            return winjs.TPromise.as([]);
        };
        DataSource.prototype.getParent = function (tree, element) {
            return winjs.TPromise.as(null);
        };
        return DataSource;
    }());
    exports.DataSource = DataSource;
    var ActionProvider = (function (_super) {
        __extends(ActionProvider, _super);
        function ActionProvider(instantiationService, gitService) {
            _super.call(this, instantiationService);
            this.gitService = gitService;
        }
        ActionProvider.prototype.hasActions = function (tree, element) {
            if (element instanceof gitmodel.FileStatus) {
                return true;
            }
            else if (element instanceof gitmodel.StatusGroup && element.all().length > 0) {
                return true;
            }
            return false;
        };
        ActionProvider.prototype.getActions = function (tree, element) {
            if (element instanceof gitmodel.StatusGroup) {
                return winjs.TPromise.as(this.getActionsForGroupStatusType(element.getType()));
            }
            else {
                return winjs.TPromise.as(this.getActionsForFileStatusType(element.getType()));
            }
        };
        ActionProvider.prototype.getActionsForFileStatusType = function (statusType) {
            switch (statusType) {
                case git.StatusType.INDEX:
                    return [this.getAction(gitactions.UnstageAction)];
                case git.StatusType.WORKING_TREE:
                    return [this.getAction(gitactions.UndoAction), this.getAction(gitactions.StageAction)];
                case git.StatusType.MERGE:
                    return [this.getAction(gitactions.StageAction)];
                default:
                    return [];
            }
        };
        ActionProvider.prototype.getActionsForGroupStatusType = function (statusType) {
            switch (statusType) {
                case git.StatusType.INDEX:
                    return [this.getAction(gitactions.GlobalUnstageAction)];
                case git.StatusType.WORKING_TREE:
                    return [this.getAction(gitactions.GlobalUndoAction), this.getAction(gitactions.GlobalStageAction)];
                case git.StatusType.MERGE:
                    return [this.getAction(gitactions.StageAction)];
                default:
                    return [];
            }
        };
        ActionProvider.prototype.hasSecondaryActions = function (tree, element) {
            return this.hasActions(tree, element);
        };
        ActionProvider.prototype.getSecondaryActions = function (tree, element) {
            var _this = this;
            return this.getActions(tree, element).then(function (actions) {
                if (element instanceof gitmodel.FileStatus) {
                    var fileStatus = element;
                    var status = fileStatus.getStatus();
                    actions.push(new actionbar.Separator());
                    if (status !== git.Status.DELETED && status !== git.Status.INDEX_DELETED) {
                        actions.push(_this.getAction(gitactions.OpenFileAction));
                    }
                    actions.push(_this.getAction(gitactions.OpenChangeAction));
                }
                actions.reverse();
                return actions;
            });
        };
        ActionProvider.prototype.getActionItem = function (tree, element, action) {
            return null;
        };
        ActionProvider = __decorate([
            __param(0, instantiation_1.IInstantiationService),
            __param(1, IGitService)
        ], ActionProvider);
        return ActionProvider;
    }(ActionContainer));
    exports.ActionProvider = ActionProvider;
    var Renderer = (function () {
        function Renderer(actionProvider, actionRunner, messageService, gitService, contextService) {
            this.actionProvider = actionProvider;
            this.actionRunner = actionRunner;
            this.messageService = messageService;
            this.gitService = gitService;
            this.contextService = contextService;
            // noop
        }
        Renderer.prototype.getHeight = function (tree, element) {
            return 22;
        };
        Renderer.prototype.getTemplateId = function (tree, element) {
            if (element instanceof gitmodel.StatusGroup) {
                switch (element.getType()) {
                    case git.StatusType.INDEX: return 'index';
                    case git.StatusType.WORKING_TREE: return 'workingTree';
                    case git.StatusType.MERGE: return 'merge';
                }
            }
            if (element instanceof gitmodel.FileStatus) {
                switch (element.getType()) {
                    case git.StatusType.INDEX: return 'file:index';
                    case git.StatusType.WORKING_TREE: return 'file:workingTree';
                    case git.StatusType.MERGE: return 'file:merge';
                }
            }
            return null;
        };
        Renderer.prototype.renderTemplate = function (tree, templateId, container) {
            if (/^file:/.test(templateId)) {
                return this.renderFileStatusTemplate(Renderer.templateIdToStatusType(templateId), container);
            }
            else {
                return this.renderStatusGroupTemplate(Renderer.templateIdToStatusType(templateId), container);
            }
        };
        Renderer.prototype.renderStatusGroupTemplate = function (statusType, container) {
            var _this = this;
            var data = Object.create(null);
            data.root = dom.append(container, $('.status-group'));
            switch (statusType) {
                case git.StatusType.INDEX:
                    data.root.textContent = nls.localize(0, null);
                    break;
                case git.StatusType.WORKING_TREE:
                    data.root.textContent = nls.localize(1, null);
                    break;
                case git.StatusType.MERGE:
                    data.root.textContent = nls.localize(2, null);
                    break;
            }
            var wrapper = dom.append(container, $('.count-badge-wrapper'));
            data.count = new countbadge.CountBadge(wrapper);
            data.actionBar = new actionbar.ActionBar(container, { actionRunner: this.actionRunner });
            data.actionBar.push(this.actionProvider.getActionsForGroupStatusType(statusType), { icon: true, label: false });
            data.actionBar.addListener2('run', function (e) { return e.error && _this.onError(e.error); });
            return data;
        };
        Renderer.prototype.renderFileStatusTemplate = function (statusType, container) {
            var _this = this;
            var data = Object.create(null);
            data.root = dom.append(container, $('.file-status'));
            data.status = dom.append(data.root, $('span.status'));
            data.name = dom.append(data.root, $('a.name.plain'));
            data.folder = dom.append(data.root, $('span.folder'));
            var rename = dom.append(data.root, $('span.rename'));
            var arrow = dom.append(rename, $('span.rename-arrow'));
            arrow.textContent = '←';
            data.renameName = dom.append(rename, $('span.rename-name'));
            data.renameFolder = dom.append(rename, $('span.rename-folder'));
            data.actionBar = new actionbar.ActionBar(container, { actionRunner: this.actionRunner });
            data.actionBar.push(this.actionProvider.getActionsForFileStatusType(statusType), { icon: true, label: false });
            data.actionBar.addListener2('run', function (e) { return e.error && _this.onError(e.error); });
            return data;
        };
        Renderer.prototype.renderElement = function (tree, element, templateId, templateData) {
            if (/^file:/.test(templateId)) {
                this.renderFileStatus(tree, element, templateData);
            }
            else {
                Renderer.renderStatusGroup(element, templateData);
            }
        };
        Renderer.renderStatusGroup = function (statusGroup, data) {
            data.actionBar.context = statusGroup;
            data.count.setCount(statusGroup.all().length);
        };
        Renderer.prototype.renderFileStatus = function (tree, fileStatus, data) {
            data.actionBar.context = {
                tree: tree,
                fileStatus: fileStatus
            };
            var repositoryRoot = this.gitService.getModel().getRepositoryRoot();
            var workspaceRoot = this.contextService.getWorkspace().resource.fsPath;
            var status = fileStatus.getStatus();
            var renamePath = fileStatus.getRename();
            var path = fileStatus.getPath();
            var lastSlashIndex = path.lastIndexOf('/');
            var name = lastSlashIndex === -1 ? path : path.substr(lastSlashIndex + 1, path.length);
            var folder = (lastSlashIndex === -1 ? '' : path.substr(0, lastSlashIndex));
            data.root.className = 'file-status ' + Renderer.statusToClass(status);
            data.status.textContent = Renderer.statusToChar(status);
            data.status.title = Renderer.statusToTitle(status);
            var resource = uri_1.default.file(paths.normalize(paths.join(repositoryRoot, path)));
            var isInWorkspace = paths.isEqualOrParent(resource.fsPath, workspaceRoot);
            var rename = '';
            var renameFolder = '';
            if (renamePath) {
                var renameLastSlashIndex = renamePath.lastIndexOf('/');
                rename = renameLastSlashIndex === -1 ? renamePath : renamePath.substr(renameLastSlashIndex + 1, renamePath.length);
                renameFolder = (renameLastSlashIndex === -1 ? '' : renamePath.substr(0, renameLastSlashIndex));
                data.renameName.textContent = name;
                data.renameFolder.textContent = folder;
                var resource_1 = uri_1.default.file(paths.normalize(paths.join(repositoryRoot, renamePath)));
                isInWorkspace = paths.isEqualOrParent(resource_1.fsPath, workspaceRoot);
            }
            if (isInWorkspace) {
                data.root.title = '';
            }
            else {
                data.root.title = nls.localize(3, null);
                data.root.className += ' out-of-workspace';
            }
            data.name.textContent = rename || name;
            data.folder.textContent = toReadablePath(renameFolder || folder);
        };
        Renderer.prototype.disposeTemplate = function (tree, templateId, templateData) {
            if (/^file:/.test(templateId)) {
                Renderer.disposeFileStatusTemplate(templateData);
            }
        };
        Renderer.disposeFileStatusTemplate = function (templateData) {
            templateData.actionBar.dispose();
        };
        Renderer.statusToChar = function (status) {
            switch (status) {
                case git.Status.INDEX_MODIFIED: return nls.localize(4, null);
                case git.Status.MODIFIED: return nls.localize(5, null);
                case git.Status.INDEX_ADDED: return nls.localize(6, null);
                case git.Status.INDEX_DELETED: return nls.localize(7, null);
                case git.Status.DELETED: return nls.localize(8, null);
                case git.Status.INDEX_RENAMED: return nls.localize(9, null);
                case git.Status.INDEX_COPIED: return nls.localize(10, null);
                case git.Status.UNTRACKED: return nls.localize(11, null);
                case git.Status.IGNORED: return nls.localize(12, null);
                case git.Status.BOTH_DELETED: return nls.localize(13, null);
                case git.Status.ADDED_BY_US: return nls.localize(14, null);
                case git.Status.DELETED_BY_THEM: return nls.localize(15, null);
                case git.Status.ADDED_BY_THEM: return nls.localize(16, null);
                case git.Status.DELETED_BY_US: return nls.localize(17, null);
                case git.Status.BOTH_ADDED: return nls.localize(18, null);
                case git.Status.BOTH_MODIFIED: return nls.localize(19, null);
                default: return '';
            }
        };
        Renderer.statusToTitle = function (status) {
            switch (status) {
                case git.Status.INDEX_MODIFIED: return nls.localize(20, null);
                case git.Status.MODIFIED: return nls.localize(21, null);
                case git.Status.INDEX_ADDED: return nls.localize(22, null);
                case git.Status.INDEX_DELETED: return nls.localize(23, null);
                case git.Status.DELETED: return nls.localize(24, null);
                case git.Status.INDEX_RENAMED: return nls.localize(25, null);
                case git.Status.INDEX_COPIED: return nls.localize(26, null);
                case git.Status.UNTRACKED: return nls.localize(27, null);
                case git.Status.IGNORED: return nls.localize(28, null);
                case git.Status.BOTH_DELETED: return nls.localize(29, null);
                case git.Status.ADDED_BY_US: return nls.localize(30, null);
                case git.Status.DELETED_BY_THEM: return nls.localize(31, null);
                case git.Status.ADDED_BY_THEM: return nls.localize(32, null);
                case git.Status.DELETED_BY_US: return nls.localize(33, null);
                case git.Status.BOTH_ADDED: return nls.localize(34, null);
                case git.Status.BOTH_MODIFIED: return nls.localize(35, null);
                default: return '';
            }
        };
        Renderer.statusToClass = function (status) {
            switch (status) {
                case git.Status.INDEX_MODIFIED: return 'modified';
                case git.Status.MODIFIED: return 'modified';
                case git.Status.INDEX_ADDED: return 'added';
                case git.Status.INDEX_DELETED: return 'deleted';
                case git.Status.DELETED: return 'deleted';
                case git.Status.INDEX_RENAMED: return 'renamed';
                case git.Status.INDEX_COPIED: return 'copied';
                case git.Status.UNTRACKED: return 'untracked';
                case git.Status.IGNORED: return 'ignored';
                case git.Status.BOTH_DELETED: return 'conflict both-deleted';
                case git.Status.ADDED_BY_US: return 'conflict added-by-us';
                case git.Status.DELETED_BY_THEM: return 'conflict deleted-by-them';
                case git.Status.ADDED_BY_THEM: return 'conflict added-by-them';
                case git.Status.DELETED_BY_US: return 'conflict deleted-by-us';
                case git.Status.BOTH_ADDED: return 'conflict both-added';
                case git.Status.BOTH_MODIFIED: return 'conflict both-modified';
                default: return '';
            }
        };
        Renderer.templateIdToStatusType = function (templateId) {
            if (/index$/.test(templateId)) {
                return git.StatusType.INDEX;
            }
            else if (/workingTree$/.test(templateId)) {
                return git.StatusType.WORKING_TREE;
            }
            else {
                return git.StatusType.MERGE;
            }
        };
        Renderer.prototype.onError = function (error) {
            this.messageService.show(severity_1.default.Error, error);
        };
        Renderer = __decorate([
            __param(2, message_1.IMessageService),
            __param(3, IGitService),
            __param(4, workspace_1.IWorkspaceContextService)
        ], Renderer);
        return Renderer;
    }());
    exports.Renderer = Renderer;
    var Filter = (function () {
        function Filter() {
        }
        Filter.prototype.isVisible = function (tree, element) {
            if (element instanceof gitmodel.StatusGroup) {
                var statusGroup = element;
                switch (statusGroup.getType()) {
                    case git.StatusType.INDEX:
                    case git.StatusType.MERGE:
                        return statusGroup.all().length > 0;
                    case git.StatusType.WORKING_TREE:
                        return true;
                }
            }
            return true;
        };
        return Filter;
    }());
    exports.Filter = Filter;
    var Sorter = (function () {
        function Sorter() {
        }
        Sorter.prototype.compare = function (tree, element, otherElement) {
            if (!(element instanceof gitmodel.FileStatus && otherElement instanceof gitmodel.FileStatus)) {
                return 0;
            }
            return Sorter.compareStatus(element, otherElement);
        };
        Sorter.compareStatus = function (element, otherElement) {
            var one = element.getPathComponents();
            var other = otherElement.getPathComponents();
            var lastOne = one.length - 1;
            var lastOther = other.length - 1;
            var endOne, endOther, onePart, otherPart;
            for (var i = 0;; i++) {
                endOne = lastOne === i;
                endOther = lastOther === i;
                if (endOne && endOther) {
                    return comparers.compareFileNames(one[i], other[i]);
                }
                else if (endOne) {
                    return -1;
                }
                else if (endOther) {
                    return 1;
                }
                else if ((onePart = one[i].toLowerCase()) !== (otherPart = other[i].toLowerCase())) {
                    return onePart < otherPart ? -1 : 1;
                }
            }
        };
        return Sorter;
    }());
    exports.Sorter = Sorter;
    var DragAndDrop = (function (_super) {
        __extends(DragAndDrop, _super);
        function DragAndDrop(instantiationService, gitService, messageService) {
            _super.call(this, instantiationService);
            this.gitService = gitService;
            this.messageService = messageService;
        }
        DragAndDrop.prototype.getDragURI = function (tree, element) {
            if (element instanceof gitmodel.StatusGroup) {
                var statusGroup = element;
                return 'git:' + statusGroup.getType();
            }
            else if (element instanceof gitmodel.FileStatus) {
                var status = element;
                return 'git:' + status.getType() + ':' + status.getPath();
            }
            return null;
        };
        DragAndDrop.prototype.onDragStart = function (tree, data, originalEvent) {
            // no-op
        };
        DragAndDrop.prototype.onDragOver = function (_tree, data, targetElement, originalEvent) {
            if (!this.gitService.isIdle()) {
                return tree.DRAG_OVER_REJECT;
            }
            if (!(data instanceof treednd.ElementsDragAndDropData)) {
                return tree.DRAG_OVER_REJECT;
            }
            var elements = data.getData();
            var element = elements[0];
            if (element instanceof gitmodel.StatusGroup) {
                var statusGroup = element;
                return this.onDrag(targetElement, statusGroup.getType());
            }
            else if (element instanceof gitmodel.FileStatus) {
                var status = element;
                return this.onDrag(targetElement, status.getType());
            }
            else {
                return tree.DRAG_OVER_REJECT;
            }
        };
        DragAndDrop.prototype.onDrag = function (targetElement, type) {
            if (type === git.StatusType.WORKING_TREE) {
                return this.onDragWorkingTree(targetElement);
            }
            else if (type === git.StatusType.INDEX) {
                return this.onDragIndex(targetElement);
            }
            else if (type === git.StatusType.MERGE) {
                return this.onDragMerge(targetElement);
            }
            else {
                return tree.DRAG_OVER_REJECT;
            }
        };
        DragAndDrop.prototype.onDragWorkingTree = function (targetElement) {
            if (targetElement instanceof gitmodel.StatusGroup) {
                var targetStatusGroup = targetElement;
                return targetStatusGroup.getType() === git.StatusType.INDEX ? tree.DRAG_OVER_ACCEPT_BUBBLE_DOWN : tree.DRAG_OVER_REJECT;
            }
            else if (targetElement instanceof gitmodel.FileStatus) {
                var targetStatus = targetElement;
                return targetStatus.getType() === git.StatusType.INDEX ? tree.DRAG_OVER_ACCEPT_BUBBLE_UP : tree.DRAG_OVER_REJECT;
            }
            else {
                return tree.DRAG_OVER_REJECT;
            }
        };
        DragAndDrop.prototype.onDragIndex = function (targetElement) {
            if (targetElement instanceof gitmodel.StatusGroup) {
                var targetStatusGroup = targetElement;
                return targetStatusGroup.getType() === git.StatusType.WORKING_TREE ? tree.DRAG_OVER_ACCEPT_BUBBLE_DOWN : tree.DRAG_OVER_REJECT;
            }
            else if (targetElement instanceof gitmodel.FileStatus) {
                var targetStatus = targetElement;
                return targetStatus.getType() === git.StatusType.WORKING_TREE ? tree.DRAG_OVER_ACCEPT_BUBBLE_UP : tree.DRAG_OVER_REJECT;
            }
            else {
                return tree.DRAG_OVER_REJECT;
            }
        };
        DragAndDrop.prototype.onDragMerge = function (targetElement) {
            if (targetElement instanceof gitmodel.StatusGroup) {
                var targetStatusGroup = targetElement;
                return targetStatusGroup.getType() === git.StatusType.INDEX ? tree.DRAG_OVER_ACCEPT_BUBBLE_DOWN : tree.DRAG_OVER_REJECT;
            }
            else if (targetElement instanceof gitmodel.FileStatus) {
                var targetStatus = targetElement;
                return targetStatus.getType() === git.StatusType.INDEX ? tree.DRAG_OVER_ACCEPT_BUBBLE_UP : tree.DRAG_OVER_REJECT;
            }
            else {
                return tree.DRAG_OVER_REJECT;
            }
        };
        DragAndDrop.prototype.drop = function (tree, data, targetElement, originalEvent) {
            var _this = this;
            var elements = data.getData();
            var element = elements[0];
            var files;
            if (element instanceof gitmodel.StatusGroup) {
                files = element.all();
            }
            else {
                files = elements;
            }
            var targetGroup = targetElement;
            // Add files to index
            if (targetGroup.getType() === git.StatusType.INDEX) {
                this.getAction(gitactions.StageAction).run(files).done(null, function (e) { return _this.onError(e); });
            }
            // Remove files from index
            if (targetGroup.getType() === git.StatusType.WORKING_TREE) {
                this.getAction(gitactions.UnstageAction).run(files).done(null, function (e) { return _this.onError(e); });
            }
        };
        DragAndDrop.prototype.onError = function (error) {
            this.messageService.show(severity_1.default.Error, error);
        };
        DragAndDrop = __decorate([
            __param(0, instantiation_1.IInstantiationService),
            __param(1, IGitService),
            __param(2, message_1.IMessageService)
        ], DragAndDrop);
        return DragAndDrop;
    }(ActionContainer));
    exports.DragAndDrop = DragAndDrop;
    var AccessibilityProvider = (function () {
        function AccessibilityProvider() {
        }
        AccessibilityProvider.prototype.getAriaLabel = function (tree, element) {
            if (element instanceof gitmodel.FileStatus) {
                var fileStatus = element;
                var status_1 = fileStatus.getStatus();
                var path = fileStatus.getPath();
                var lastSlashIndex = path.lastIndexOf('/');
                var name_1 = lastSlashIndex === -1 ? path : path.substr(lastSlashIndex + 1, path.length);
                var folder = (lastSlashIndex === -1 ? '' : path.substr(0, lastSlashIndex));
                return nls.localize(36, null, name_1, folder, Renderer.statusToTitle(status_1));
            }
            if (element instanceof gitmodel.StatusGroup) {
                switch (element.getType()) {
                    case git.StatusType.INDEX: return nls.localize(37, null);
                    case git.StatusType.WORKING_TREE: return nls.localize(38, null);
                    case git.StatusType.MERGE: return nls.localize(39, null);
                }
            }
        };
        return AccessibilityProvider;
    }());
    exports.AccessibilityProvider = AccessibilityProvider;
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller(actionProvider, contextMenuService) {
            _super.call(this, { clickBehavior: treedefaults.ClickBehavior.ON_MOUSE_UP });
            this.actionProvider = actionProvider;
            this.contextMenuService = contextMenuService;
            this.downKeyBindingDispatcher.set(keyCodes_1.CommonKeybindings.SHIFT_UP_ARROW, this.onUp.bind(this));
            this.downKeyBindingDispatcher.set(keyCodes_1.CommonKeybindings.SHIFT_DOWN_ARROW, this.onDown.bind(this));
            this.downKeyBindingDispatcher.set(keyCodes_1.CommonKeybindings.SHIFT_PAGE_UP, this.onPageUp.bind(this));
            this.downKeyBindingDispatcher.set(keyCodes_1.CommonKeybindings.SHIFT_PAGE_DOWN, this.onPageDown.bind(this));
        }
        Controller.prototype.onLeftClick = function (tree, element, event) {
            // Status group should never get selected nor expanded/collapsed
            if (element instanceof gitmodel.StatusGroup) {
                event.preventDefault();
                event.stopPropagation();
                return true;
            }
            if (event.shiftKey) {
                var focus = tree.getFocus();
                if (!(focus instanceof gitmodel.FileStatus) || !(element instanceof gitmodel.FileStatus)) {
                    return;
                }
                var focusStatus = focus;
                var elementStatus = element;
                if (focusStatus.getType() !== elementStatus.getType()) {
                    return;
                }
                if (this.canSelect(tree, element)) {
                    tree.setFocus(element);
                    if (tree.isSelected(element)) {
                        tree.deselectRange(focusStatus, elementStatus);
                    }
                    else {
                        tree.selectRange(focusStatus, elementStatus);
                    }
                }
                return;
            }
            tree.setFocus(element);
            if (platform.isMacintosh ? event.metaKey : event.ctrlKey) {
                if (this.canSelect(tree, element)) {
                    tree.toggleSelection(element, { origin: 'mouse', originalEvent: event });
                }
                return;
            }
            return _super.prototype.onLeftClick.call(this, tree, element, event);
        };
        Controller.prototype.onEnter = function (tree, event) {
            var element = tree.getFocus();
            // Status group should never get selected nor expanded/collapsed
            if (element instanceof gitmodel.StatusGroup) {
                event.preventDefault();
                event.stopPropagation();
                return true;
            }
            return _super.prototype.onEnter.call(this, tree, event);
        };
        Controller.prototype.onSpace = function (tree, event) {
            var focus = tree.getFocus();
            if (!focus) {
                event.preventDefault();
                event.stopPropagation();
                return true;
            }
            if (!this.canSelect(tree, focus)) {
                return false;
            }
            tree.toggleSelection(focus, { origin: 'keyboard', originalEvent: event });
            event.preventDefault();
            event.stopPropagation();
            return true;
        };
        Controller.prototype.onContextMenu = function (tree, element, event) {
            var _this = this;
            if (event.target && event.target.tagName && event.target.tagName.toLowerCase() === 'input') {
                return false;
            }
            event.preventDefault();
            event.stopPropagation();
            tree.setFocus(element);
            if (this.actionProvider.hasSecondaryActions(tree, element)) {
                var anchor = { x: event.posx + 1, y: event.posy };
                var context = {
                    selection: tree.getSelection(),
                    focus: element
                };
                this.contextMenuService.showContextMenu({
                    getAnchor: function () { return anchor; },
                    getActions: function () { return _this.actionProvider.getSecondaryActions(tree, element); },
                    getActionItem: this.actionProvider.getActionItem.bind(this.actionProvider, tree, element),
                    getActionsContext: function () { return context; },
                    onHide: function (wasCancelled) {
                        if (wasCancelled) {
                            tree.DOMFocus();
                        }
                    }
                });
                return true;
            }
            return false;
        };
        Controller.prototype.onLeft = function (tree, event) {
            return true;
        };
        Controller.prototype.onRight = function (tree, event) {
            return true;
        };
        Controller.prototype.onUp = function (tree, event) {
            var oldFocus = tree.getFocus();
            var base = _super.prototype.onUp.call(this, tree, event);
            if (!base || !event.shiftKey) {
                return false;
            }
            return this.shiftSelect(tree, oldFocus, event);
        };
        Controller.prototype.onPageUp = function (tree, event) {
            var oldFocus = tree.getFocus();
            var base = _super.prototype.onPageUp.call(this, tree, event);
            if (!base || !event.shiftKey) {
                return false;
            }
            return this.shiftSelect(tree, oldFocus, event);
        };
        Controller.prototype.onDown = function (tree, event) {
            var oldFocus = tree.getFocus();
            var base = _super.prototype.onDown.call(this, tree, event);
            if (!base || !event.shiftKey) {
                return false;
            }
            return this.shiftSelect(tree, oldFocus, event);
        };
        Controller.prototype.onPageDown = function (tree, event) {
            var oldFocus = tree.getFocus();
            var base = _super.prototype.onPageDown.call(this, tree, event);
            if (!base || !event.shiftKey) {
                return false;
            }
            return this.shiftSelect(tree, oldFocus, event);
        };
        Controller.prototype.canSelect = function (tree) {
            var elements = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                elements[_i - 1] = arguments[_i];
            }
            if (elements.some(function (e) { return e instanceof gitmodel.StatusGroup || e instanceof gitmodel.StatusModel; })) {
                return false;
            }
            return elements.every(function (e) {
                var first = tree.getSelection()[0];
                var clicked = e;
                return !first || (first.getType() === clicked.getType());
            });
        };
        Controller.prototype.shiftSelect = function (tree, oldFocus, event) {
            var payload = { origin: 'keyboard', originalEvent: event };
            var focus = tree.getFocus();
            if (focus === oldFocus) {
                return false;
            }
            var oldFocusIsSelected = tree.isSelected(oldFocus);
            var focusIsSelected = tree.isSelected(focus);
            if (oldFocusIsSelected && focusIsSelected) {
                tree.deselectRange(focus, oldFocus, payload);
            }
            else if (!oldFocusIsSelected && !focusIsSelected) {
                if (this.canSelect(tree, oldFocus, focus)) {
                    tree.selectRange(focus, oldFocus, payload);
                }
            }
            else if (oldFocusIsSelected) {
                if (this.canSelect(tree, focus)) {
                    tree.selectRange(focus, oldFocus, payload);
                }
            }
            else {
                tree.deselectRange(focus, oldFocus, payload);
            }
            return true;
        };
        Controller = __decorate([
            __param(1, contextView_1.IContextMenuService)
        ], Controller);
        return Controller;
    }(treedefaults.DefaultController));
    exports.Controller = Controller;
});
//# sourceMappingURL=changesViewer.js.map