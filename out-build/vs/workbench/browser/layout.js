var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", 'vs/base/browser/builder', 'vs/workbench/common/events', 'vs/base/browser/ui/sash/sash', 'vs/workbench/services/editor/common/editorService', 'vs/workbench/services/part/common/partService', 'vs/workbench/services/workspace/common/contextService', 'vs/workbench/services/viewlet/common/viewletService', 'vs/platform/storage/common/storage', 'vs/platform/contextview/browser/contextView', 'vs/platform/event/common/event', 'vs/workbench/services/themes/common/themeService', 'vs/base/common/lifecycle'], function (require, exports, builder_1, events_1, sash_1, editorService_1, partService_1, contextService_1, viewletService_1, storage_1, contextView_1, event_1, themeService_1, lifecycle_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var DEFAULT_MIN_PART_WIDTH = 170;
    var DEFAULT_MIN_PANEL_PART_HEIGHT = 170;
    var DEFAULT_MIN_EDITOR_PART_HEIGHT = 170;
    var HIDE_SIDEBAR_WIDTH_THRESHOLD = 50;
    var HIDE_PANEL_HEIGHT_THRESHOLD = 50;
    var LayoutOptions = (function () {
        function LayoutOptions() {
            this.margin = new builder_1.Box(0, 0, 0, 0);
        }
        LayoutOptions.prototype.setMargin = function (margin) {
            this.margin = margin;
            return this;
        };
        return LayoutOptions;
    }());
    exports.LayoutOptions = LayoutOptions;
    /**
     * The workbench layout is responsible to lay out all parts that make the Monaco Workbench.
     */
    var WorkbenchLayout = (function () {
        // Take parts as an object bag since instatation service does not have typings for constructors with 9+ arguments
        function WorkbenchLayout(parent, workbenchContainer, parts, quickopen, options, storageService, eventService, contextViewService, editorService, contextService, partService, viewletService, themeService) {
            var _this = this;
            this.storageService = storageService;
            this.contextViewService = contextViewService;
            this.editorService = editorService;
            this.contextService = contextService;
            this.partService = partService;
            this.viewletService = viewletService;
            this.parent = parent;
            this.workbenchContainer = workbenchContainer;
            this.activitybar = parts.activitybar;
            this.editor = parts.editor;
            this.sidebar = parts.sidebar;
            this.panel = parts.panel;
            this.statusbar = parts.statusbar;
            this.quickopen = quickopen;
            this.options = options || new LayoutOptions();
            this.toUnbind = [];
            this.computedStyles = null;
            this.sashX = new sash_1.Sash(this.workbenchContainer.getHTMLElement(), this, {
                baseSize: 5
            });
            this.sashY = new sash_1.Sash(this.workbenchContainer.getHTMLElement(), this, {
                baseSize: 5,
                orientation: sash_1.Orientation.HORIZONTAL
            });
            this.sidebarWidth = this.storageService.getInteger(WorkbenchLayout.sashXWidthSettingsKey, storage_1.StorageScope.GLOBAL, -1);
            this.panelHeight = this.storageService.getInteger(WorkbenchLayout.sashYHeightSettingsKey, storage_1.StorageScope.GLOBAL, 0);
            this.toUnbind.push(themeService.onDidThemeChange(function (_) { return _this.relayout(); }));
            this.toUnbind.push(eventService.addListener2(events_1.EventType.EDITOR_INPUT_CHANGING, function (e) { return _this.onEditorInputChanging(e); }));
            this.registerSashListeners();
        }
        WorkbenchLayout.prototype.registerSashListeners = function () {
            var _this = this;
            var startX = 0;
            var startY = 0;
            this.sashX.addListener('start', function (e) {
                _this.startSidebarWidth = _this.sidebarWidth;
                startX = e.startX;
            });
            this.sashY.addListener('start', function (e) {
                _this.startPanelHeight = _this.panelHeight;
                startY = e.startY;
            });
            this.sashX.addListener('change', function (e) {
                var doLayout = false;
                var sidebarPosition = _this.partService.getSideBarPosition();
                var isSidebarHidden = _this.partService.isSideBarHidden();
                var newSashWidth = (sidebarPosition === partService_1.Position.LEFT) ? _this.startSidebarWidth + e.currentX - startX : _this.startSidebarWidth - e.currentX + startX;
                // Sidebar visible
                if (!isSidebarHidden) {
                    // Automatically hide side bar when a certain threshold is met
                    if (newSashWidth + HIDE_SIDEBAR_WIDTH_THRESHOLD < _this.computedStyles.sidebar.minWidth) {
                        var dragCompensation = DEFAULT_MIN_PART_WIDTH - HIDE_SIDEBAR_WIDTH_THRESHOLD;
                        _this.partService.setSideBarHidden(true);
                        startX = (sidebarPosition === partService_1.Position.LEFT) ? Math.max(_this.computedStyles.activitybar.minWidth, e.currentX - dragCompensation) : Math.min(e.currentX + dragCompensation, _this.workbenchSize.width - _this.computedStyles.activitybar.minWidth);
                        _this.sidebarWidth = _this.startSidebarWidth; // when restoring sidebar, restore to the sidebar width we started from
                    }
                    else {
                        _this.sidebarWidth = Math.max(_this.computedStyles.sidebar.minWidth, newSashWidth); // Sidebar can not become smaller than MIN_PART_WIDTH
                        doLayout = newSashWidth >= _this.computedStyles.sidebar.minWidth;
                    }
                }
                else {
                    if ((sidebarPosition === partService_1.Position.LEFT && e.currentX - startX >= _this.computedStyles.sidebar.minWidth) ||
                        (sidebarPosition === partService_1.Position.RIGHT && startX - e.currentX >= _this.computedStyles.sidebar.minWidth)) {
                        _this.startSidebarWidth = _this.computedStyles.sidebar.minWidth - (sidebarPosition === partService_1.Position.LEFT ? e.currentX - startX : startX - e.currentX);
                        _this.sidebarWidth = _this.computedStyles.sidebar.minWidth;
                        _this.partService.setSideBarHidden(false);
                    }
                }
                if (doLayout) {
                    _this.layout();
                }
            });
            this.sashY.addListener('change', function (e) {
                var doLayout = false;
                var isPanelHidden = _this.partService.isPanelHidden();
                var newSashHeight = _this.startPanelHeight - (e.currentY - startY);
                // Panel visible
                if (!isPanelHidden) {
                    // Automatically hide panel when a certain threshold is met
                    if (newSashHeight + HIDE_PANEL_HEIGHT_THRESHOLD < _this.computedStyles.panel.minHeight) {
                        var dragCompensation = DEFAULT_MIN_PANEL_PART_HEIGHT - HIDE_PANEL_HEIGHT_THRESHOLD;
                        _this.partService.setPanelHidden(true);
                        startY = Math.min(_this.sidebarHeight - _this.computedStyles.statusbar.height, e.currentY + dragCompensation);
                        _this.panelHeight = _this.startPanelHeight; // when restoring panel, restore to the panel height we started from
                    }
                    else {
                        _this.panelHeight = Math.max(_this.computedStyles.panel.minHeight, newSashHeight); // Panel can not become smaller than MIN_PART_HEIGHT
                        doLayout = newSashHeight >= _this.computedStyles.panel.minHeight;
                    }
                }
                else {
                    if (startY - e.currentY >= _this.computedStyles.panel.minHeight) {
                        _this.startPanelHeight = 0;
                        _this.panelHeight = _this.computedStyles.panel.minHeight;
                        _this.partService.setPanelHidden(false);
                    }
                }
                if (doLayout) {
                    _this.layout();
                }
            });
            this.sashX.addListener('end', function () {
                _this.storageService.store(WorkbenchLayout.sashXWidthSettingsKey, _this.sidebarWidth, storage_1.StorageScope.GLOBAL);
            });
            this.sashY.addListener('end', function () {
                _this.storageService.store(WorkbenchLayout.sashYHeightSettingsKey, _this.panelHeight, storage_1.StorageScope.GLOBAL);
            });
            this.sashY.addListener('reset', function () {
                _this.panelHeight = DEFAULT_MIN_PANEL_PART_HEIGHT;
                _this.storageService.store(WorkbenchLayout.sashYHeightSettingsKey, _this.panelHeight, storage_1.StorageScope.GLOBAL);
                _this.partService.setPanelHidden(false);
                _this.layout();
            });
            this.sashX.addListener('reset', function () {
                var activeViewlet = _this.viewletService.getActiveViewlet();
                var optimalWidth = activeViewlet && activeViewlet.getOptimalWidth();
                _this.sidebarWidth = Math.max(DEFAULT_MIN_PART_WIDTH, optimalWidth || 0);
                _this.storageService.store(WorkbenchLayout.sashXWidthSettingsKey, _this.sidebarWidth, storage_1.StorageScope.GLOBAL);
                _this.partService.setSideBarHidden(false);
                _this.layout();
            });
        };
        WorkbenchLayout.prototype.onEditorInputChanging = function (e) {
            // Make sure that we layout properly in case we detect that the sidebar is large enought to cause
            // multiple opened editors to go below minimal size. The fix is to trigger a layout for any editor
            // input change that falls into this category.
            if (this.workbenchSize && this.sidebarWidth) {
                var visibleEditors = this.editorService.getVisibleEditors().length;
                if (visibleEditors > 1 && this.workbenchSize.width - this.sidebarWidth < visibleEditors * DEFAULT_MIN_PART_WIDTH) {
                    this.layout();
                }
            }
        };
        WorkbenchLayout.prototype.relayout = function () {
            // Recompute Styles
            this.computeStyle();
            this.editor.getLayout().computeStyle();
            this.sidebar.getLayout().computeStyle();
            this.panel.getLayout().computeStyle();
            // Trigger Layout
            this.layout();
        };
        WorkbenchLayout.prototype.computeStyle = function () {
            var sidebarStyle = this.sidebar.getContainer().getComputedStyle();
            var panelStyle = this.panel.getContainer().getComputedStyle();
            var editorStyle = this.editor.getContainer().getComputedStyle();
            var activitybarStyle = this.activitybar.getContainer().getComputedStyle();
            this.computedStyles = {
                activitybar: {
                    minWidth: parseInt(activitybarStyle.getPropertyValue('min-width'), 10) || 0
                },
                sidebar: {
                    minWidth: parseInt(sidebarStyle.getPropertyValue('min-width'), 10) || DEFAULT_MIN_PART_WIDTH
                },
                panel: {
                    minHeight: parseInt(panelStyle.getPropertyValue('min-height'), 10) || DEFAULT_MIN_PANEL_PART_HEIGHT
                },
                editor: {
                    minWidth: parseInt(editorStyle.getPropertyValue('min-width'), 10) || DEFAULT_MIN_PART_WIDTH
                },
                statusbar: {
                    height: 0
                }
            };
            if (this.statusbar) {
                var statusbarStyle = this.statusbar.getContainer().getComputedStyle();
                this.computedStyles.statusbar.height = parseInt(statusbarStyle.getPropertyValue('height'), 10) || 18;
            }
        };
        WorkbenchLayout.prototype.layout = function (forceStyleReCompute) {
            if (forceStyleReCompute) {
                this.computeStyle();
                this.editor.getLayout().computeStyle();
                this.sidebar.getLayout().computeStyle();
                this.panel.getLayout().computeStyle();
            }
            if (!this.computedStyles) {
                this.computeStyle();
            }
            this.workbenchSize = this.getWorkbenchArea();
            var isSidebarHidden = this.partService.isSideBarHidden();
            var isPanelHidden = this.partService.isPanelHidden();
            var sidebarPosition = this.partService.getSideBarPosition();
            // Sidebar
            var sidebarWidth;
            if (isSidebarHidden) {
                sidebarWidth = 0;
            }
            else if (this.sidebarWidth !== -1) {
                sidebarWidth = Math.max(this.computedStyles.sidebar.minWidth, this.sidebarWidth);
            }
            else {
                sidebarWidth = this.workbenchSize.width / 5;
                this.sidebarWidth = sidebarWidth;
            }
            this.sidebarHeight = this.workbenchSize.height - this.computedStyles.statusbar.height;
            var sidebarSize = new builder_1.Dimension(sidebarWidth, this.sidebarHeight);
            // Activity Bar
            var activityBarMinWidth = this.computedStyles.activitybar.minWidth;
            var activityBarSize = new builder_1.Dimension(activityBarMinWidth, sidebarSize.height);
            // Panel part
            var panelHeight;
            if (isPanelHidden) {
                panelHeight = 0;
            }
            else if (this.panelHeight > 0) {
                panelHeight = Math.min(sidebarSize.height - DEFAULT_MIN_EDITOR_PART_HEIGHT, Math.max(this.computedStyles.panel.minHeight, this.panelHeight));
            }
            else {
                panelHeight = sidebarSize.height * 0.4;
            }
            var panelDimension = new builder_1.Dimension(this.workbenchSize.width - sidebarSize.width - activityBarSize.width, panelHeight);
            this.panelWidth = panelDimension.width;
            // Editor
            var editorSize = {
                width: 0,
                height: 0,
                remainderLeft: 0,
                remainderRight: 0
            };
            var editorDimension = new builder_1.Dimension(panelDimension.width, sidebarSize.height - panelDimension.height);
            editorSize.width = editorDimension.width;
            editorSize.height = editorDimension.height;
            // Sidebar hidden
            if (isSidebarHidden) {
                editorSize.width = Math.min(this.workbenchSize.width - activityBarSize.width, this.workbenchSize.width - activityBarMinWidth);
                if (sidebarPosition === partService_1.Position.LEFT) {
                    editorSize.remainderLeft = Math.round((this.workbenchSize.width - editorSize.width + activityBarSize.width) / 2);
                    editorSize.remainderRight = this.workbenchSize.width - editorSize.width - editorSize.remainderLeft;
                }
                else {
                    editorSize.remainderRight = Math.round((this.workbenchSize.width - editorSize.width + activityBarSize.width) / 2);
                    editorSize.remainderLeft = this.workbenchSize.width - editorSize.width - editorSize.remainderRight;
                }
            }
            // Assert Sidebar and Editor Size to not overflow
            var editorMinWidth = this.computedStyles.editor.minWidth;
            var visibleEditorCount = this.editorService.getVisibleEditors().length;
            if (visibleEditorCount > 1) {
                editorMinWidth *= visibleEditorCount;
            }
            if (editorSize.width < editorMinWidth) {
                var diff = editorMinWidth - editorSize.width;
                editorSize.width = editorMinWidth;
                panelDimension.width = editorMinWidth;
                sidebarSize.width -= diff;
                sidebarSize.width = Math.max(DEFAULT_MIN_PART_WIDTH, sidebarSize.width);
            }
            if (!isSidebarHidden) {
                this.sidebarWidth = sidebarSize.width;
                this.storageService.store(WorkbenchLayout.sashXWidthSettingsKey, this.sidebarWidth, storage_1.StorageScope.GLOBAL);
            }
            if (!isPanelHidden) {
                this.panelHeight = panelDimension.height;
                this.storageService.store(WorkbenchLayout.sashYHeightSettingsKey, this.panelHeight, storage_1.StorageScope.GLOBAL);
            }
            // Workbench
            this.workbenchContainer
                .position(this.options.margin.top, this.options.margin.right, this.options.margin.bottom, this.options.margin.left, 'relative')
                .size(this.workbenchSize.width, this.workbenchSize.height);
            // Bug on Chrome: Sometimes Chrome wants to scroll the workbench container on layout changes. The fix is to reset scrollTop in this case.
            if (this.workbenchContainer.getHTMLElement().scrollTop > 0) {
                this.workbenchContainer.getHTMLElement().scrollTop = 0;
            }
            // Editor Part and Panel part
            this.editor.getContainer().size(editorSize.width, editorSize.height);
            this.panel.getContainer().size(panelDimension.width, panelDimension.height);
            var editorBottom = this.computedStyles.statusbar.height + panelDimension.height;
            if (isSidebarHidden) {
                this.editor.getContainer().position(0, editorSize.remainderRight, editorBottom, editorSize.remainderLeft);
                this.panel.getContainer().position(editorDimension.height, editorSize.remainderRight, this.computedStyles.statusbar.height, editorSize.remainderLeft);
            }
            else if (sidebarPosition === partService_1.Position.LEFT) {
                this.editor.getContainer().position(0, 0, editorBottom, sidebarSize.width + activityBarSize.width);
                this.panel.getContainer().position(editorDimension.height, 0, this.computedStyles.statusbar.height, sidebarSize.width + activityBarSize.width);
            }
            else {
                this.editor.getContainer().position(0, sidebarSize.width, editorBottom, 0);
                this.panel.getContainer().position(editorDimension.height, sidebarSize.width, this.computedStyles.statusbar.height, 0);
            }
            // Activity Bar Part
            this.activitybar.getContainer().size(null, activityBarSize.height);
            if (sidebarPosition === partService_1.Position.LEFT) {
                this.activitybar.getContainer().getHTMLElement().style.right = '';
                this.activitybar.getContainer().position(0, null, 0, 0);
            }
            else {
                this.activitybar.getContainer().getHTMLElement().style.left = '';
                this.activitybar.getContainer().position(0, 0, 0, null);
            }
            // Sidebar Part
            this.sidebar.getContainer().size(sidebarSize.width, sidebarSize.height);
            if (sidebarPosition === partService_1.Position.LEFT) {
                this.sidebar.getContainer().position(0, editorSize.width, 0, activityBarSize.width);
            }
            else {
                this.sidebar.getContainer().position(0, null, 0, editorSize.width);
            }
            // Statusbar Part
            if (this.statusbar) {
                this.statusbar.getContainer().position(this.workbenchSize.height - this.computedStyles.statusbar.height);
            }
            // Quick open
            this.quickopen.layout(this.workbenchSize);
            // Sashes
            this.sashX.layout();
            this.sashY.layout();
            // Propagate to Part Layouts
            this.editor.layout(new builder_1.Dimension(editorSize.width, editorSize.height));
            this.sidebar.layout(sidebarSize);
            this.panel.layout(panelDimension);
            // Propagate to Context View
            if (this.contextViewService) {
                this.contextViewService.layout();
            }
        };
        WorkbenchLayout.prototype.getWorkbenchArea = function () {
            // Client Area: Parent
            var clientArea = this.parent.getClientArea();
            // Workbench: Client Area - Margins
            return clientArea.substract(this.options.margin);
        };
        WorkbenchLayout.prototype.getVerticalSashTop = function (sash) {
            return 0;
        };
        WorkbenchLayout.prototype.getVerticalSashLeft = function (sash) {
            var isSidebarHidden = this.partService.isSideBarHidden();
            var sidebarPosition = this.partService.getSideBarPosition();
            var activitybarWidth = this.computedStyles.activitybar.minWidth;
            if (sidebarPosition === partService_1.Position.LEFT) {
                return !isSidebarHidden ? this.sidebarWidth + activitybarWidth : activitybarWidth;
            }
            return !isSidebarHidden ? this.workbenchSize.width - this.sidebarWidth - activitybarWidth : this.workbenchSize.width - activitybarWidth;
        };
        WorkbenchLayout.prototype.getVerticalSashHeight = function (sash) {
            return this.sidebarHeight;
        };
        WorkbenchLayout.prototype.getHorizontalSashTop = function (sash) {
            return this.partService.isPanelHidden() ? this.sidebarHeight : this.sidebarHeight - this.panelHeight;
        };
        WorkbenchLayout.prototype.getHorizontalSashLeft = function (sash) {
            return this.partService.getSideBarPosition() === partService_1.Position.LEFT ? this.getVerticalSashLeft(sash) : 0;
        };
        WorkbenchLayout.prototype.getHorizontalSashWidth = function (sash) {
            return this.panelWidth;
        };
        WorkbenchLayout.prototype.dispose = function () {
            if (this.toUnbind) {
                lifecycle_1.dispose(this.toUnbind);
                this.toUnbind = null;
            }
        };
        WorkbenchLayout.sashXWidthSettingsKey = 'workbench.sidebar.width';
        WorkbenchLayout.sashYHeightSettingsKey = 'workbench.panel.height';
        WorkbenchLayout = __decorate([
            __param(5, storage_1.IStorageService),
            __param(6, event_1.IEventService),
            __param(7, contextView_1.IContextViewService),
            __param(8, editorService_1.IWorkbenchEditorService),
            __param(9, contextService_1.IWorkspaceContextService),
            __param(10, partService_1.IPartService),
            __param(11, viewletService_1.IViewletService),
            __param(12, themeService_1.IThemeService)
        ], WorkbenchLayout);
        return WorkbenchLayout;
    }());
    exports.WorkbenchLayout = WorkbenchLayout;
});
//# sourceMappingURL=layout.js.map