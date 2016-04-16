/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
define(["require", "exports", 'vs/nls', 'vs/base/common/winjs.base', 'vs/base/browser/dom', 'vs/base/common/errors', 'vs/platform/platform', 'vs/base/browser/builder', 'vs/base/common/actions', 'vs/base/browser/ui/actionbar/actionbar', 'vs/workbench/browser/actionBarRegistry', 'vs/base/browser/ui/toolbar/toolbar', 'vs/base/browser/dnd', 'vs/base/common/lifecycle', 'vs/base/browser/ui/splitview/splitview', 'vs/workbench/services/viewlet/common/viewletService', 'vs/workbench/services/editor/common/editorService', 'vs/workbench/browser/composite', 'vs/platform/contextview/browser/contextView', 'vs/platform/message/common/message', 'vs/platform/selection/common/selection'], function (require, exports, nls, winjs_base_1, DOM, errors, platform_1, builder_1, actions_1, actionbar_1, actionBarRegistry_1, toolbar_1, dnd_1, lifecycle_1, splitview_1, viewletService_1, editorService_1, composite_1, contextView_1, message_1, selection_1) {
    "use strict";
    var Viewlet = (function (_super) {
        __extends(Viewlet, _super);
        function Viewlet() {
            _super.apply(this, arguments);
        }
        Viewlet.prototype.getOptimalWidth = function () {
            return null;
        };
        return Viewlet;
    }(composite_1.Composite));
    exports.Viewlet = Viewlet;
    /**
     * Helper subtype of viewlet for those that use a tree inside.
     */
    var ViewerViewlet = (function (_super) {
        __extends(ViewerViewlet, _super);
        function ViewerViewlet() {
            _super.apply(this, arguments);
        }
        ViewerViewlet.prototype.create = function (parent) {
            var _this = this;
            _super.prototype.create.call(this, parent);
            // Container for Viewer
            this.viewerContainer = parent.div();
            // Viewer
            this.viewer = this.createViewer(this.viewerContainer);
            // Eventing
            this.toUnbind.push(this.viewer.addListener('selection', function (e) { return _this.onSelection(e); }));
            this.toUnbind.push(this.viewer.addListener('focus', function (e) { return _this.onFocus(e); }));
            return winjs_base_1.TPromise.as(null);
        };
        /**
         * Returns the viewer that is contained in this viewlet.
         */
        ViewerViewlet.prototype.getViewer = function () {
            return this.viewer;
        };
        ViewerViewlet.prototype.setVisible = function (visible) {
            var promise;
            if (visible) {
                promise = _super.prototype.setVisible.call(this, visible);
                this.getViewer().onVisible();
            }
            else {
                this.getViewer().onHidden();
                promise = _super.prototype.setVisible.call(this, visible);
            }
            return promise;
        };
        ViewerViewlet.prototype.focus = function () {
            if (!this.viewer) {
                return; // return early if viewlet has not yet been created
            }
            // Make sure the current selected element is revealed
            var selection = this.viewer.getSelection();
            if (selection.length > 0) {
                this.reveal(selection[0], 0.5).done(null, errors.onUnexpectedError);
            }
            // Pass Focus to Viewer
            this.viewer.DOMFocus();
        };
        ViewerViewlet.prototype.reveal = function (element, relativeTop) {
            if (!this.viewer) {
                return winjs_base_1.TPromise.as(null); // return early if viewlet has not yet been created
            }
            // The viewer cannot properly reveal without being layed out, so force it if not yet done
            if (!this.wasLayouted) {
                this.viewer.layout();
            }
            // Now reveal
            return this.viewer.reveal(element, relativeTop);
        };
        ViewerViewlet.prototype.layout = function (dimension) {
            if (!this.viewer) {
                return; // return early if viewlet has not yet been created
            }
            // Pass on to Viewer
            this.wasLayouted = true;
            this.viewer.layout(dimension.height);
        };
        ViewerViewlet.prototype.getControl = function () {
            return this.viewer;
        };
        ViewerViewlet.prototype.getSelection = function () {
            if (!this.viewer) {
                return new selection_1.StructuredSelection([]); // return early if viewlet has not yet been created
            }
            return new selection_1.StructuredSelection(this.viewer.getSelection());
        };
        ViewerViewlet.prototype.dispose = function () {
            // Dispose Viewer
            if (this.viewer) {
                this.viewer.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        return ViewerViewlet;
    }(Viewlet));
    exports.ViewerViewlet = ViewerViewlet;
    /**
     * A viewlet descriptor is a leightweight descriptor of a viewlet in the monaco workbench.
     */
    var ViewletDescriptor = (function (_super) {
        __extends(ViewletDescriptor, _super);
        function ViewletDescriptor() {
            _super.apply(this, arguments);
        }
        return ViewletDescriptor;
    }(composite_1.CompositeDescriptor));
    exports.ViewletDescriptor = ViewletDescriptor;
    exports.Extensions = {
        Viewlets: 'workbench.contributions.viewlets'
    };
    var ViewletRegistry = (function (_super) {
        __extends(ViewletRegistry, _super);
        function ViewletRegistry() {
            _super.apply(this, arguments);
        }
        /**
         * Registers a viewlet to the platform.
         */
        ViewletRegistry.prototype.registerViewlet = function (descriptor) {
            _super.prototype.registerComposite.call(this, descriptor);
        };
        /**
         * Returns the viewlet descriptor for the given id or null if none.
         */
        ViewletRegistry.prototype.getViewlet = function (id) {
            return this.getComposite(id);
        };
        /**
         * Returns an array of registered viewlets known to the platform.
         */
        ViewletRegistry.prototype.getViewlets = function () {
            return this.getComposits();
        };
        /**
         * Sets the id of the viewlet that should open on startup by default.
         */
        ViewletRegistry.prototype.setDefaultViewletId = function (id) {
            this.defaultViewletId = id;
        };
        /**
         * Gets the id of the viewlet that should open on startup by default.
         */
        ViewletRegistry.prototype.getDefaultViewletId = function () {
            return this.defaultViewletId;
        };
        return ViewletRegistry;
    }(composite_1.CompositeRegistry));
    exports.ViewletRegistry = ViewletRegistry;
    platform_1.Registry.add(exports.Extensions.Viewlets, new ViewletRegistry());
    /**
     * A reusable action to toggle a viewlet with a specific id.
     */
    var ToggleViewletAction = (function (_super) {
        __extends(ToggleViewletAction, _super);
        function ToggleViewletAction(id, name, viewletId, viewletService, editorService) {
            _super.call(this, id, name);
            this.viewletService = viewletService;
            this.editorService = editorService;
            this.viewletId = viewletId;
            this.enabled = !!this.viewletService && !!this.editorService;
        }
        ToggleViewletAction.prototype.run = function () {
            // Pass focus to viewlet if not open or focussed
            if (this.otherViewletShowing() || !this.sidebarHasFocus()) {
                return this.viewletService.openViewlet(this.viewletId, true);
            }
            // Otherwise pass focus to editor if possible
            var editor = this.editorService.getActiveEditor();
            if (editor) {
                editor.focus();
            }
            return winjs_base_1.TPromise.as(true);
        };
        ToggleViewletAction.prototype.otherViewletShowing = function () {
            var activeViewlet = this.viewletService.getActiveViewlet();
            return !activeViewlet || activeViewlet.getId() !== this.viewletId;
        };
        ToggleViewletAction.prototype.sidebarHasFocus = function () {
            var activeViewlet = this.viewletService.getActiveViewlet();
            var activeElement = document.activeElement;
            return activeViewlet && activeElement && DOM.isAncestor(activeElement, activeViewlet.getContainer().getHTMLElement());
        };
        ToggleViewletAction = __decorate([
            __param(3, viewletService_1.IViewletService),
            __param(4, editorService_1.IWorkbenchEditorService)
        ], ToggleViewletAction);
        return ToggleViewletAction;
    }(actions_1.Action));
    exports.ToggleViewletAction = ToggleViewletAction;
    // Collapse All action
    var CollapseAction = (function (_super) {
        __extends(CollapseAction, _super);
        function CollapseAction(viewer, enabled, clazz) {
            _super.call(this, 'workbench.action.collapse', nls.localize('collapse', "Collapse All"), clazz, enabled, function (context) {
                if (viewer.getHighlight()) {
                    return winjs_base_1.TPromise.as(null); // Global action disabled if user is in edit mode from another action
                }
                viewer.collapseAll();
                viewer.clearSelection();
                viewer.clearFocus();
                viewer.DOMFocus();
                viewer.focusFirst();
                return winjs_base_1.TPromise.as(null);
            });
        }
        return CollapseAction;
    }(actions_1.Action));
    exports.CollapseAction = CollapseAction;
    /**
     * The AdaptiveCollapsibleViewletView can grow with the content inside dynamically.
     */
    var AdaptiveCollapsibleViewletView = (function (_super) {
        __extends(AdaptiveCollapsibleViewletView, _super);
        function AdaptiveCollapsibleViewletView(actionRunner, initialBodySize, collapsed, viewName, messageService, contextMenuService) {
            _super.call(this, {
                expandedBodySize: initialBodySize,
                headerSize: 22,
                initialState: collapsed ? splitview_1.CollapsibleState.COLLAPSED : splitview_1.CollapsibleState.EXPANDED,
                ariaHeaderLabel: viewName
            });
            this.viewName = viewName;
            this.messageService = messageService;
            this.contextMenuService = contextMenuService;
            this.actionRunner = actionRunner;
            this.toDispose = [];
        }
        AdaptiveCollapsibleViewletView.prototype.create = function () {
            return winjs_base_1.TPromise.as(null);
        };
        AdaptiveCollapsibleViewletView.prototype.renderHeader = function (container) {
            var _this = this;
            // Tool bar
            this.toolBar = new toolbar_1.ToolBar(builder_1.$('div.actions').appendTo(container).getHTMLElement(), this.contextMenuService, {
                orientation: actionbar_1.ActionsOrientation.HORIZONTAL,
                actionItemProvider: function (action) { return _this.getActionItem(action); },
                ariaLabel: nls.localize('viewToolbarAriaLabel', "{0} actions", this.viewName)
            });
            this.toolBar.actionRunner = this.actionRunner;
            this.toolBar.setActions(actionBarRegistry_1.prepareActions(this.getActions()), actionBarRegistry_1.prepareActions(this.getSecondaryActions()))();
            // Expand on drag over
            this.dragHandler = new dnd_1.DelayedDragHandler(container, function () {
                if (!_this.isExpanded()) {
                    _this.expand();
                }
            });
        };
        AdaptiveCollapsibleViewletView.prototype.changeState = function (state) {
            updateTreeVisibility(this.tree, state === splitview_1.CollapsibleState.EXPANDED);
            _super.prototype.changeState.call(this, state);
        };
        AdaptiveCollapsibleViewletView.prototype.renderViewTree = function (container) {
            return renderViewTree(container);
        };
        AdaptiveCollapsibleViewletView.prototype.getViewer = function () {
            return this.tree;
        };
        AdaptiveCollapsibleViewletView.prototype.setVisible = function (visible) {
            this.isVisible = visible;
            updateTreeVisibility(this.tree, visible && this.state === splitview_1.CollapsibleState.EXPANDED);
            return winjs_base_1.TPromise.as(null);
        };
        AdaptiveCollapsibleViewletView.prototype.focusBody = function () {
            focus(this.tree);
        };
        AdaptiveCollapsibleViewletView.prototype.getSelection = function () {
            return new selection_1.StructuredSelection(this.tree.getSelection());
        };
        AdaptiveCollapsibleViewletView.prototype.reveal = function (element, relativeTop) {
            return reveal(this.tree, element, relativeTop);
        };
        AdaptiveCollapsibleViewletView.prototype.layoutBody = function (size) {
            this.treeContainer.style.height = size + 'px';
            this.tree.layout(size);
        };
        AdaptiveCollapsibleViewletView.prototype.getActions = function () {
            return [];
        };
        AdaptiveCollapsibleViewletView.prototype.getSecondaryActions = function () {
            return [];
        };
        AdaptiveCollapsibleViewletView.prototype.getActionItem = function (action) {
            return null;
        };
        AdaptiveCollapsibleViewletView.prototype.shutdown = function () {
            // Subclass to implement
        };
        AdaptiveCollapsibleViewletView.prototype.dispose = function () {
            this.isDisposed = true;
            this.treeContainer = null;
            this.tree.dispose();
            this.dragHandler.dispose();
            this.toDispose = lifecycle_1.dispose(this.toDispose);
            if (this.toolBar) {
                this.toolBar.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        AdaptiveCollapsibleViewletView = __decorate([
            __param(4, message_1.IMessageService),
            __param(5, contextView_1.IContextMenuService)
        ], AdaptiveCollapsibleViewletView);
        return AdaptiveCollapsibleViewletView;
    }(splitview_1.FixedCollapsibleView));
    exports.AdaptiveCollapsibleViewletView = AdaptiveCollapsibleViewletView;
    var CollapsibleViewletView = (function (_super) {
        __extends(CollapsibleViewletView, _super);
        function CollapsibleViewletView(actionRunner, collapsed, viewName, messageService, contextMenuService) {
            _super.call(this, {
                minimumSize: 2 * 22,
                initialState: collapsed ? splitview_1.CollapsibleState.COLLAPSED : splitview_1.CollapsibleState.EXPANDED,
                ariaHeaderLabel: viewName
            });
            this.viewName = viewName;
            this.messageService = messageService;
            this.contextMenuService = contextMenuService;
            this.actionRunner = actionRunner;
            this.toDispose = [];
        }
        CollapsibleViewletView.prototype.changeState = function (state) {
            updateTreeVisibility(this.tree, state === splitview_1.CollapsibleState.EXPANDED);
            _super.prototype.changeState.call(this, state);
        };
        CollapsibleViewletView.prototype.create = function () {
            return winjs_base_1.TPromise.as(null);
        };
        CollapsibleViewletView.prototype.renderHeader = function (container) {
            var _this = this;
            // Tool bar
            this.toolBar = new toolbar_1.ToolBar(builder_1.$('div.actions').appendTo(container).getHTMLElement(), this.contextMenuService, {
                orientation: actionbar_1.ActionsOrientation.HORIZONTAL,
                actionItemProvider: function (action) { return _this.getActionItem(action); },
                ariaLabel: nls.localize('viewToolbarAriaLabel', "{0} actions", this.viewName)
            });
            this.toolBar.actionRunner = this.actionRunner;
            this.toolBar.setActions(actionBarRegistry_1.prepareActions(this.getActions()), actionBarRegistry_1.prepareActions(this.getSecondaryActions()))();
            // Expand on drag over
            this.dragHandler = new dnd_1.DelayedDragHandler(container, function () {
                if (!_this.isExpanded()) {
                    _this.expand();
                }
            });
        };
        CollapsibleViewletView.prototype.renderViewTree = function (container) {
            return renderViewTree(container);
        };
        CollapsibleViewletView.prototype.getViewer = function () {
            return this.tree;
        };
        CollapsibleViewletView.prototype.setVisible = function (visible) {
            this.isVisible = visible;
            updateTreeVisibility(this.tree, visible && this.state === splitview_1.CollapsibleState.EXPANDED);
            return winjs_base_1.TPromise.as(null);
        };
        CollapsibleViewletView.prototype.focusBody = function () {
            focus(this.tree);
        };
        CollapsibleViewletView.prototype.getSelection = function () {
            return new selection_1.StructuredSelection(this.tree.getSelection());
        };
        CollapsibleViewletView.prototype.reveal = function (element, relativeTop) {
            return reveal(this.tree, element, relativeTop);
        };
        CollapsibleViewletView.prototype.layoutBody = function (size) {
            this.treeContainer.style.height = size + 'px';
            this.tree.layout(size);
        };
        CollapsibleViewletView.prototype.getActions = function () {
            return [];
        };
        CollapsibleViewletView.prototype.getSecondaryActions = function () {
            return [];
        };
        CollapsibleViewletView.prototype.getActionItem = function (action) {
            return null;
        };
        CollapsibleViewletView.prototype.shutdown = function () {
            // Subclass to implement
        };
        CollapsibleViewletView.prototype.dispose = function () {
            this.isDisposed = true;
            this.treeContainer = null;
            this.tree.dispose();
            this.dragHandler.dispose();
            this.toDispose = lifecycle_1.dispose(this.toDispose);
            if (this.toolBar) {
                this.toolBar.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        CollapsibleViewletView = __decorate([
            __param(3, message_1.IMessageService),
            __param(4, contextView_1.IContextMenuService)
        ], CollapsibleViewletView);
        return CollapsibleViewletView;
    }(splitview_1.CollapsibleView));
    exports.CollapsibleViewletView = CollapsibleViewletView;
    function renderViewTree(container) {
        var treeContainer = document.createElement('div');
        container.appendChild(treeContainer);
        return treeContainer;
    }
    function updateTreeVisibility(tree, isVisible) {
        if (!tree) {
            return;
        }
        if (isVisible) {
            builder_1.$(tree.getHTMLElement()).show();
        }
        else {
            builder_1.$(tree.getHTMLElement()).hide(); // make sure the tree goes out of the tabindex world by hiding it
        }
        if (isVisible) {
            tree.onVisible();
        }
        else {
            tree.onHidden();
        }
    }
    function focus(tree) {
        if (!tree) {
            return; // return early if viewlet has not yet been created
        }
        // Make sure the current selected element is revealed
        var selection = tree.getSelection();
        if (selection.length > 0) {
            reveal(tree, selection[0], 0.5).done(null, errors.onUnexpectedError);
        }
        // Pass Focus to Viewer
        tree.DOMFocus();
    }
    function reveal(tree, element, relativeTop) {
        if (!tree) {
            return winjs_base_1.TPromise.as(null); // return early if viewlet has not yet been created
        }
        return tree.reveal(element, relativeTop);
    }
});
//# sourceMappingURL=viewlet.js.map