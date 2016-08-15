/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Copyright (c) Spiffcode, Inc. All rights reserved.
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
define(["require", "exports", 'vs/base/common/winjs.base', 'vs/base/common/types', 'vs/base/common/lifecycle', 'vs/base/common/strings', 'vs/base/browser/dom', 'vs/base/browser/builder', 'vs/base/common/async', 'vs/base/common/assert', 'vs/base/common/timer', 'vs/base/common/errors', 'vs/platform/platform', 'vs/workbench/common/constants', 'vs/workbench/common/events', 'vs/workbench/common/contributions', 'vs/workbench/browser/parts/editor/baseEditor', 'vs/workbench/common/editor', 'vs/workbench/services/history/browser/history', 'vs/workbench/browser/parts/activitybar/activitybarPart', 'vs/workbench/browser/parts/editor/editorPart', 'vs/workbench/browser/parts/sidebar/sidebarPart', 'vs/workbench/browser/parts/panel/panelPart', 'vs/workbench/browser/parts/statusbar/statusbarPart', 'vs/workbench/browser/layout', 'vs/workbench/browser/actionBarRegistry', 'vs/workbench/browser/viewlet', 'vs/workbench/browser/panel', 'vs/workbench/browser/parts/quickopen/quickOpenController', 'vs/workbench/common/editor/diffEditorInput', 'vs/platform/instantiation/common/extensions', 'vs/workbench/services/untitled/common/untitledEditorService', 'vs/workbench/services/editor/browser/editorService', 'vs/workbench/services/part/common/partService', 'vs/workbench/services/workspace/common/contextService', 'vs/platform/storage/common/storage', 'vs/platform/keybinding/common/keybindingService', 'vs/workbench/services/activity/common/activityService', 'vs/workbench/services/viewlet/common/viewletService', 'vs/workbench/services/panel/common/panelService', 'vs/workbench/services/message/browser/messageService', 'vs/workbench/services/editor/common/editorService', 'vs/workbench/services/quickopen/common/quickOpenService', 'vs/workbench/services/history/common/history', 'vs/platform/event/common/event', 'vs/platform/instantiation/common/instantiation', 'vs/platform/lifecycle/common/lifecycle', 'vs/platform/message/common/message', 'vs/platform/telemetry/common/telemetry', 'vs/platform/thread/common/thread', 'vs/platform/thread/common/mainThreadService', 'vs/workbench/services/statusbar/common/statusbarService', 'vs/css!vs/workbench/browser/media/workbench'], function (require, exports, winjs_base_1, types, lifecycle_1, strings, DOM, builder_1, async_1, assert, timer, errors, platform_1, constants_1, events_1, contributions_1, baseEditor_1, editor_1, history_1, activitybarPart_1, editorPart_1, sidebarPart_1, panelPart_1, statusbarPart_1, layout_1, actionBarRegistry_1, viewlet_1, panel_1, quickOpenController_1, diffEditorInput_1, extensions_1, untitledEditorService_1, editorService_1, partService_1, contextService_1, storage_1, keybindingService_1, activityService_1, viewletService_1, panelService_1, messageService_1, editorService_2, quickOpenService_1, history_2, event_1, instantiation_1, lifecycle_2, message_1, telemetry_1, thread_1, mainThreadService_1, statusbarService_1) {
    // Forked from c212f0908f3d29933317bbc3233568fbca7944b1:vs/workbench/browser/workbench.ts
    'use strict';
    /**
     * The workbench creates and lays out all parts that make up the Monaco Workbench.
     */
    var Workbench = (function () {
        function Workbench(container, workspace, configuration, options, isWelcomeMode, serviceCollection, instantiationService, untitledEditorService, eventService, contextService, storageService, telemetryService, keybindingService, lifecycleService, messageService, threadService) {
            var _this = this;
            this.instantiationService = instantiationService;
            this.untitledEditorService = untitledEditorService;
            this.eventService = eventService;
            this.contextService = contextService;
            this.storageService = storageService;
            this.telemetryService = telemetryService;
            this.keybindingService = keybindingService;
            this.lifecycleService = lifecycleService;
            this.messageService = messageService;
            this.threadService = threadService;
            this.serviceId = partService_1.IPartService;
            this.isWelcomeMode = isWelcomeMode;
            // Validate params
            this.validateParams(container, configuration, options);
            // If String passed in as container, try to find it in DOM
            if (types.isString(container)) {
                var element = builder_1.withElementById(container.toString());
                this.container = element.getHTMLElement();
            }
            else {
                this.container = container;
            }
            this.workbenchParams = {
                workspace: workspace,
                configuration: configuration,
                options: options || {},
                serviceCollection: serviceCollection
            };
            this.toDispose = [];
            this.toShutdown = [];
            this.editorBackgroundDelayer = new async_1.Delayer(50);
            this.creationPromise = new winjs_base_1.TPromise(function (c, e, p) {
                _this.creationPromiseComplete = c;
            });
        }
        Workbench.prototype.validateParams = function (container, configuration, options) {
            // Container
            assert.ok(container, 'Workbench requires a container to be created with');
            if (types.isString(container)) {
                var element = builder_1.withElementById(container.toString());
                assert.ok(element, strings.format('Can not find HTMLElement with id \'{0}\'.', container));
            }
        };
        /**
         * Starts the workbench and creates the HTML elements on the container. A workbench can only be started
         * once. Use the shutdown function to free up resources created by the workbench on startup.
         */
        Workbench.prototype.startup = function (callbacks) {
            var _this = this;
            assert.ok(!this.workbenchStarted, 'Can not start a workbench that was already started');
            assert.ok(!this.workbenchShutdown, 'Can not start a workbench that was shutdown');
            try {
                this.workbenchStarted = true;
                this.callbacks = callbacks;
                // Create Workbench
                this.createWorkbench();
                // Services
                this.initServices();
                if (this.callbacks && this.callbacks.onServicesCreated) {
                    this.callbacks.onServicesCreated();
                }
                // Register Listeners
                this.registerListeners();
                // Settings
                this.initSettings();
                // Create Workbench and Parts
                this.renderWorkbench();
                // Workbench Layout
                this.createWorkbenchLayout();
                // Register Emitters
                this.registerEmitters();
                // Load composits and editors in parallel
                var compositeAndEditorPromises = [];
                // Show default viewlet unless sidebar is hidden or we dont have a default viewlet
                var viewletRegistry = platform_1.Registry.as(viewlet_1.Extensions.Viewlets);
                var viewletId = viewletRegistry.getDefaultViewletId();
                if (!this.workbenchParams.configuration.env.isBuilt) {
                    viewletId = this.storageService.get(sidebarPart_1.SidebarPart.activeViewletSettingsKey, storage_1.StorageScope.WORKSPACE, viewletRegistry.getDefaultViewletId()); // help developers and restore last view
                }
                if (!this.sideBarHidden && !!viewletId) {
                    var viewletTimerEvent_1 = timer.start(timer.Topic.STARTUP, strings.format('Opening Viewlet: {0}', viewletId));
                    compositeAndEditorPromises.push(this.sidebarPart.openViewlet(viewletId, false).then(function () { return viewletTimerEvent_1.stop(); }));
                }
                var panelRegistry = platform_1.Registry.as(panel_1.Extensions.Panels);
                var panelId = this.storageService.get(panelPart_1.PanelPart.activePanelSettingsKey, storage_1.StorageScope.WORKSPACE, panelRegistry.getDefaultPanelId());
                if (!this.panelHidden && !!panelId) {
                    compositeAndEditorPromises.push(this.panelPart.openPanel(panelId, false));
                }
                // Check for configured options to open files on startup and resolve if any or open untitled for empty workbench
                var editorTimerEvent_1 = timer.start(timer.Topic.STARTUP, strings.format('Restoring Editor(s)'));
                var resolveEditorInputsPromise = winjs_base_1.TPromise.as(null);
                var options_1 = [];
                if (this.isWelcomeMode) {
                    resolveEditorInputsPromise = winjs_base_1.TPromise.as([]);
                }
                else {
                    // Files to open, diff or create
                    var wbopt = this.workbenchParams.options;
                    if ((wbopt.filesToCreate && wbopt.filesToCreate.length) || (wbopt.filesToOpen && wbopt.filesToOpen.length) || (wbopt.filesToDiff && wbopt.filesToDiff.length)) {
                        var filesToCreate = wbopt.filesToCreate || [];
                        var filesToOpen_1 = wbopt.filesToOpen || [];
                        var filesToDiff_1 = wbopt.filesToDiff;
                        // Files to diff is exclusive
                        if (filesToDiff_1 && filesToDiff_1.length) {
                            resolveEditorInputsPromise = winjs_base_1.TPromise.join(filesToDiff_1.map(function (resourceInput) { return _this.editorService.inputToType(resourceInput); })).then(function (inputsToDiff) {
                                return [new diffEditorInput_1.DiffEditorInput(diffEditorInput_1.toDiffLabel(filesToDiff_1[0].resource, filesToDiff_1[1].resource, _this.contextService), null, inputsToDiff[0], inputsToDiff[1])];
                            });
                        }
                        else {
                            var inputs_1 = [];
                            // Files to create
                            inputs_1.push.apply(inputs_1, filesToCreate.map(function (resourceInput) { return _this.untitledEditorService.createOrGet(resourceInput.resource); }));
                            options_1.push.apply(options_1, filesToCreate.map(function (r) { return null; })); // fill empty options for files to create because we dont have options there
                            // Files to open
                            resolveEditorInputsPromise = winjs_base_1.TPromise.join(filesToOpen_1.map(function (resourceInput) { return _this.editorService.inputToType(resourceInput); })).then(function (inputsToOpen) {
                                inputs_1.push.apply(inputs_1, inputsToOpen);
                                options_1.push.apply(options_1, filesToOpen_1.map(function (resourceInput) { return editor_1.TextEditorOptions.from(resourceInput); }));
                                return inputs_1;
                            });
                        }
                    }
                    else if (!this.workbenchParams.workspace) {
                        resolveEditorInputsPromise = winjs_base_1.TPromise.as([this.untitledEditorService.createOrGet()]);
                    }
                }
                // Restore editor state (either from last session or with given inputs)
                compositeAndEditorPromises.push(resolveEditorInputsPromise.then(function (inputs) {
                    return _this.editorPart.restoreEditorState(inputs, options_1).then(function () {
                        _this.onEditorOpenedOrClosed(); // make sure we show the proper background in the editor area
                        editorTimerEvent_1.stop();
                    });
                }));
                // Flag workbench as created once done
                var workbenchDone_1 = function (error) {
                    _this.workbenchCreated = true;
                    _this.creationPromiseComplete(true);
                    if (_this.callbacks && _this.callbacks.onWorkbenchStarted) {
                        _this.callbacks.onWorkbenchStarted();
                    }
                    if (error) {
                        errors.onUnexpectedError(error);
                    }
                };
                // Join viewlet, panel and editor promises
                winjs_base_1.TPromise.join(compositeAndEditorPromises).then(function () { return workbenchDone_1(); }, function (error) { return workbenchDone_1(error); });
            }
            catch (error) {
                // Print out error
                console.error(errors.toErrorMessage(error, true));
                // Rethrow
                throw error;
            }
        };
        Workbench.prototype.initServices = function () {
            var _this = this;
            var serviceCollection = this.workbenchParams.serviceCollection;
            this.toDispose.push(this.lifecycleService.onShutdown(this.shutdownComponents, this));
            // Services we contribute
            serviceCollection.set(partService_1.IPartService, this);
            // Viewlet service (sidebar part)
            this.sidebarPart = this.instantiationService.createInstance(sidebarPart_1.SidebarPart, constants_1.Identifiers.SIDEBAR_PART);
            this.toDispose.push(this.sidebarPart);
            this.toShutdown.push(this.sidebarPart);
            serviceCollection.set(viewletService_1.IViewletService, this.sidebarPart);
            // Panel service (panel part)
            this.panelPart = this.instantiationService.createInstance(panelPart_1.PanelPart, constants_1.Identifiers.PANEL_PART);
            this.toDispose.push(this.panelPart);
            this.toShutdown.push(this.panelPart);
            serviceCollection.set(panelService_1.IPanelService, this.panelPart);
            // Activity service (activitybar part)
            this.activitybarPart = this.instantiationService.createInstance(activitybarPart_1.ActivitybarPart, constants_1.Identifiers.ACTIVITYBAR_PART);
            this.toDispose.push(this.activitybarPart);
            this.toShutdown.push(this.activitybarPart);
            serviceCollection.set(activityService_1.IActivityService, this.activitybarPart);
            // Editor service (editor part)
            this.editorPart = this.instantiationService.createInstance(editorPart_1.EditorPart, constants_1.Identifiers.EDITOR_PART);
            this.toDispose.push(this.editorPart);
            this.toShutdown.push(this.editorPart);
            this.editorService = new editorService_1.WorkbenchEditorService(this.editorPart, this.untitledEditorService, this.instantiationService);
            serviceCollection.set(editorService_2.IWorkbenchEditorService, this.editorService);
            // Quick open service (quick open controller)
            this.quickOpen = this.instantiationService.createInstance(quickOpenController_1.QuickOpenController);
            this.toDispose.push(this.quickOpen);
            this.toShutdown.push(this.quickOpen);
            if (this.messageService instanceof messageService_1.WorkbenchMessageService) {
                this.toDispose.push(this.quickOpen.onShow(function () { return _this.messageService.suspend(); })); // when quick open is open, don't show messages behind
                this.toDispose.push(this.quickOpen.onHide(function () { return _this.messageService.resume(); })); // resume messages once quick open is closed again
            }
            serviceCollection.set(quickOpenService_1.IQuickOpenService, this.quickOpen);
            // Status bar
            this.statusbarPart = this.instantiationService.createInstance(statusbarPart_1.StatusbarPart, constants_1.Identifiers.STATUSBAR_PART);
            this.toDispose.push(this.statusbarPart);
            this.toShutdown.push(this.statusbarPart);
            serviceCollection.set(statusbarService_1.IStatusbarService, this.statusbarPart);
            // History
            serviceCollection.set(history_2.IHistoryService, new history_1.HistoryService(this.eventService, this.editorService, this.contextService, this.quickOpen));
            // Contributed services
            var contributedServices = extensions_1.getServices();
            for (var _i = 0, contributedServices_1 = contributedServices; _i < contributedServices_1.length; _i++) {
                var contributedService = contributedServices_1[_i];
                serviceCollection.set(contributedService.id, contributedService.descriptor);
            }
            // Some services need to be set explicitly after all services are created
            if (this.threadService instanceof mainThreadService_1.MainThreadService) {
                this.threadService.setInstantiationService(this.instantiationService);
            }
            if (this.messageService instanceof messageService_1.WorkbenchMessageService) {
                this.messageService.setWorkbenchServices(this.statusbarPart);
            }
            this.keybindingService.setInstantiationService(this.instantiationService);
            // Set the some services to registries that have been created eagerly
            platform_1.Registry.as(actionBarRegistry_1.Extensions.Actionbar).setInstantiationService(this.instantiationService);
            platform_1.Registry.as(contributions_1.Extensions.Workbench).setInstantiationService(this.instantiationService);
            platform_1.Registry.as(baseEditor_1.Extensions.Editors).setInstantiationService(this.instantiationService);
            this.instantiationService.invokeFunction(telemetry_1.Extenstions.TelemetryAppenders.activate);
        };
        Workbench.prototype.initSettings = function () {
            // Sidebar visibility
            this.sideBarHidden = this.storageService.getBoolean(Workbench.sidebarHiddenSettingKey, storage_1.StorageScope.WORKSPACE, false);
            if (!!this.workbenchParams.options.singleFileMode) {
                this.sideBarHidden = true; // we hide sidebar in single-file-mode
            }
            var viewletRegistry = platform_1.Registry.as(viewlet_1.Extensions.Viewlets);
            if (!viewletRegistry.getDefaultViewletId()) {
                this.sideBarHidden = true; // can only hide sidebar if we dont have a default viewlet id
            }
            if (this.isWelcomeMode) {
                this.sideBarHidden = true; // hide the sidebar if in welcome mode
            }
            // Panel part visibility
            var panelRegistry = platform_1.Registry.as(panel_1.Extensions.Panels);
            this.panelHidden = this.storageService.getBoolean(Workbench.panelHiddenSettingKey, storage_1.StorageScope.WORKSPACE, true);
            if (!!this.workbenchParams.options.singleFileMode || !panelRegistry.getDefaultPanelId()) {
                // we hide panel part in single-file-mode or if there is no default panel
                this.panelHidden = true;
            }
            // Sidebar position
            var rawPosition = this.storageService.get(Workbench.sidebarPositionSettingKey, storage_1.StorageScope.GLOBAL, 'left');
            this.sideBarPosition = (rawPosition === 'left') ? partService_1.Position.LEFT : partService_1.Position.RIGHT;
        };
        /**
         * Returns whether the workbench has been started.
         */
        Workbench.prototype.isStarted = function () {
            return this.workbenchStarted && !this.workbenchShutdown;
        };
        /**
         * Returns whether the workbench has been fully created.
         */
        Workbench.prototype.isCreated = function () {
            return this.workbenchCreated && this.workbenchStarted;
        };
        Workbench.prototype.joinCreation = function () {
            return this.creationPromise;
        };
        Workbench.prototype.hasFocus = function (part) {
            var activeElement = document.activeElement;
            if (!activeElement) {
                return false;
            }
            var container = null;
            switch (part) {
                case partService_1.Parts.ACTIVITYBAR_PART:
                    container = this.activitybarPart.getContainer();
                    break;
                case partService_1.Parts.SIDEBAR_PART:
                    container = this.sidebarPart.getContainer();
                    break;
                case partService_1.Parts.PANEL_PART:
                    container = this.panelPart.getContainer();
                    break;
                case partService_1.Parts.EDITOR_PART:
                    container = this.editorPart.getContainer();
                    break;
                case partService_1.Parts.STATUSBAR_PART:
                    if (!this.statusbarPart) {
                        return false; // could be disabled by options
                    }
                    container = this.statusbarPart.getContainer();
                    break;
            }
            return DOM.isAncestor(activeElement, container.getHTMLElement());
        };
        Workbench.prototype.isVisible = function (part) {
            if (part === partService_1.Parts.SIDEBAR_PART) {
                return !this.sideBarHidden;
            }
            if (part === partService_1.Parts.PANEL_PART) {
                return !this.panelHidden;
            }
            return true; // any other part cannot be hidden
        };
        Workbench.prototype.isSideBarHidden = function () {
            return this.sideBarHidden;
        };
        Workbench.prototype.setSideBarHidden = function (hidden, skipLayout) {
            this.sideBarHidden = hidden;
            // Adjust CSS
            if (hidden) {
                this.workbench.addClass('nosidebar');
            }
            else {
                this.workbench.removeClass('nosidebar');
            }
            // Layout
            if (!skipLayout) {
                this.workbenchLayout.layout(true);
            }
            // If sidebar becomes hidden, also hide the current active viewlet if any
            if (hidden && this.sidebarPart.getActiveViewlet()) {
                this.sidebarPart.hideActiveViewlet();
                // Pass Focus to Editor if Sidebar is now hidden
                var editor = this.editorPart.getActiveEditor();
                if (editor) {
                    editor.focus();
                }
            }
            else if (!hidden && !this.sidebarPart.getActiveViewlet()) {
                var registry = platform_1.Registry.as(viewlet_1.Extensions.Viewlets);
                var viewletToOpen = this.sidebarPart.getLastActiveViewletId() || registry.getDefaultViewletId();
                if (viewletToOpen) {
                    this.sidebarPart.openViewlet(viewletToOpen, true).done(null, errors.onUnexpectedError);
                }
            }
            // Remember in settings
            this.storageService.store(Workbench.sidebarHiddenSettingKey, hidden ? 'true' : 'false', storage_1.StorageScope.WORKSPACE);
        };
        Workbench.prototype.isPanelHidden = function () {
            return this.panelHidden;
        };
        Workbench.prototype.setPanelHidden = function (hidden, skipLayout) {
            this.panelHidden = hidden;
            // Layout
            if (!skipLayout) {
                this.workbenchLayout.layout(true);
            }
            // If panel part becomes hidden, also hide the current active panel if any
            if (hidden && this.panelPart.getActivePanel()) {
                this.panelPart.hideActivePanel();
                // Pass Focus to Editor if Panel part is now hidden
                var editor = this.editorPart.getActiveEditor();
                if (editor) {
                    editor.focus();
                }
            }
            else if (!hidden && !this.panelPart.getActivePanel()) {
                var registry = platform_1.Registry.as(panel_1.Extensions.Panels);
                var panelToOpen = this.panelPart.getLastActivePanelId() || registry.getDefaultPanelId();
                if (panelToOpen) {
                    this.panelPart.openPanel(panelToOpen, true).done(null, errors.onUnexpectedError);
                }
            }
            // Remember in settings
            this.storageService.store(Workbench.panelHiddenSettingKey, hidden ? 'true' : 'false', storage_1.StorageScope.WORKSPACE);
        };
        Workbench.prototype.getSideBarPosition = function () {
            return this.sideBarPosition;
        };
        Workbench.prototype.setSideBarPosition = function (position) {
            if (this.sideBarHidden) {
                this.setSideBarHidden(false, true /* Skip Layout */);
            }
            var newPositionValue = (position === partService_1.Position.LEFT) ? 'left' : 'right';
            var oldPositionValue = (this.sideBarPosition === partService_1.Position.LEFT) ? 'left' : 'right';
            this.sideBarPosition = position;
            // Adjust CSS
            this.activitybarPart.getContainer().removeClass(oldPositionValue);
            this.sidebarPart.getContainer().removeClass(oldPositionValue);
            this.activitybarPart.getContainer().addClass(newPositionValue);
            this.sidebarPart.getContainer().addClass(newPositionValue);
            // Layout
            this.workbenchLayout.layout(true);
            // Remember in settings
            this.storageService.store(Workbench.sidebarPositionSettingKey, position === partService_1.Position.LEFT ? 'left' : 'right', storage_1.StorageScope.GLOBAL);
        };
        Workbench.prototype.dispose = function () {
            if (this.isStarted()) {
                this.shutdownComponents();
                this.workbenchShutdown = true;
            }
            this.toDispose = lifecycle_1.dispose(this.toDispose);
        };
        /**
         * Asks the workbench and all its UI components inside to lay out according to
         * the containers dimension the workbench is living in.
         */
        Workbench.prototype.layout = function () {
            if (this.isStarted()) {
                this.workbenchLayout.layout();
            }
        };
        Workbench.prototype.shutdownComponents = function () {
            // Pass shutdown on to each participant
            this.toShutdown.forEach(function (s) { return s.shutdown(); });
        };
        Workbench.prototype.registerEmitters = function () {
            // Part Emitters
            this.hookPartListeners(this.activitybarPart);
            this.hookPartListeners(this.editorPart);
            this.hookPartListeners(this.sidebarPart);
            this.hookPartListeners(this.panelPart);
            // Storage Emitter
            this.toDispose.push(this.toDisposable(this.eventService.addEmitter(this.storageService)));
        };
        Workbench.prototype.hookPartListeners = function (part) {
            this.toDispose.push(this.toDisposable(this.eventService.addEmitter(part, part.getId())));
        };
        Workbench.prototype.registerListeners = function () {
            var _this = this;
            // Listen to editor changes
            this.toDispose.push(this.toDisposable(this.eventService.addListener(events_1.EventType.EDITOR_CLOSED, function () { return _this.onEditorOpenedOrClosed(); })));
            this.toDispose.push(this.toDisposable(this.eventService.addListener(events_1.EventType.EDITOR_OPENED, function () { return _this.onEditorOpenedOrClosed(); })));
        };
        Workbench.prototype.onEditorOpenedOrClosed = function () {
            var _this = this;
            var visibleEditors = this.editorService.getVisibleEditors().length;
            // We update the editorpart class to indicate if an editor is opened or not
            // through a delay to accomodate for fast editor switching
            if (visibleEditors === 0) {
                this.editorBackgroundDelayer.trigger(function () { return _this.editorPart.getContainer().addClass('empty'); });
            }
            else {
                this.editorBackgroundDelayer.trigger(function () { return _this.editorPart.getContainer().removeClass('empty'); });
            }
        };
        Workbench.prototype.toDisposable = function (fn) {
            return {
                dispose: function () {
                    fn();
                }
            };
        };
        Workbench.prototype.createWorkbenchLayout = function () {
            var options = new layout_1.LayoutOptions();
            options.setMargin(new builder_1.Box(0, 0, 0, 0));
            this.workbenchLayout = this.instantiationService.createInstance(layout_1.WorkbenchLayout, builder_1.$(this.container), // Parent
            this.workbench, // Workbench Container
            {
                activitybar: this.activitybarPart,
                editor: this.editorPart,
                sidebar: this.sidebarPart,
                panel: this.panelPart,
                statusbar: this.statusbarPart,
            }, this.quickOpen, // Quickopen
            options // Layout Options
            );
            this.toDispose.push(this.workbenchLayout);
        };
        Workbench.prototype.createWorkbench = function () {
            // Create Workbench DIV Off-DOM
            this.workbenchContainer = builder_1.$('.monaco-workbench-container');
            this.workbench = builder_1.$().div({ 'class': 'monaco-workbench', id: constants_1.Identifiers.WORKBENCH_CONTAINER }).appendTo(this.workbenchContainer);
        };
        Workbench.prototype.renderWorkbench = function () {
            // Apply sidebar state as CSS class
            if (this.sideBarHidden) {
                this.workbench.addClass('nosidebar');
            }
            // Apply readonly state as CSS class
            if (this.workbenchParams.options.readOnly) {
                this.workbench.addClass('readonly');
            }
            // Apply no-workspace state as CSS class
            if (!this.workbenchParams.workspace) {
                this.workbench.addClass('no-workspace');
            }
            // Create Parts
            this.createActivityBarPart();
            this.createSidebarPart();
            this.createEditorPart();
            this.createPanelPart();
            this.createStatusbarPart();
            // Create QuickOpen
            this.createQuickOpen();
            // Add Workbench to DOM
            this.workbenchContainer.build(this.container);
        };
        Workbench.prototype.createActivityBarPart = function () {
            var activitybarPartContainer = builder_1.$(this.workbench)
                .div({
                'class': ['part', 'activitybar', this.sideBarPosition === partService_1.Position.LEFT ? 'left' : 'right'],
                id: constants_1.Identifiers.ACTIVITYBAR_PART,
                role: 'navigation'
            });
            this.activitybarPart.create(activitybarPartContainer);
            // TODO: Architect a way to hide the activity bar and have layout work rather than use this hack.
            if (this.isWelcomeMode) {
                this.activitybarPart.getContainer().getHTMLElement().style.minWidth = '0px';
                this.activitybarPart.getContainer().getHTMLElement().style.width = '0px';
            }
        };
        Workbench.prototype.createSidebarPart = function () {
            var sidebarPartContainer = builder_1.$(this.workbench)
                .div({
                'class': ['part', 'sidebar', this.sideBarPosition === partService_1.Position.LEFT ? 'left' : 'right'],
                id: constants_1.Identifiers.SIDEBAR_PART,
                role: 'complementary'
            });
            this.sidebarPart.create(sidebarPartContainer);
        };
        Workbench.prototype.createPanelPart = function () {
            var panelPartContainer = builder_1.$(this.workbench)
                .div({
                'class': ['part', 'panel', 'monaco-editor-background'],
                id: constants_1.Identifiers.PANEL_PART,
                role: 'complementary'
            });
            this.panelPart.create(panelPartContainer);
        };
        Workbench.prototype.createEditorPart = function () {
            var editorContainer = builder_1.$(this.workbench)
                .div({
                'class': ['part', 'editor', 'monaco-editor-background'],
                id: constants_1.Identifiers.EDITOR_PART,
                role: 'main'
            });
            this.editorPart.create(editorContainer);
        };
        Workbench.prototype.createStatusbarPart = function () {
            var statusbarContainer = builder_1.$(this.workbench).div({
                'class': ['part', 'statusbar'],
                id: constants_1.Identifiers.STATUSBAR_PART,
                role: 'contentinfo'
            });
            this.statusbarPart.create(statusbarContainer);
        };
        Workbench.prototype.createQuickOpen = function () {
            this.quickOpen.create();
        };
        Workbench.prototype.getEditorPart = function () {
            assert.ok(this.workbenchStarted, 'Workbench is not started. Call startup() first.');
            return this.editorPart;
        };
        Workbench.prototype.getSidebarPart = function () {
            assert.ok(this.workbenchStarted, 'Workbench is not started. Call startup() first.');
            return this.sidebarPart;
        };
        Workbench.prototype.getPanelPart = function () {
            assert.ok(this.workbenchStarted, 'Workbench is not started. Call startup() first.');
            return this.panelPart;
        };
        Workbench.prototype.getInstantiationService = function () {
            assert.ok(this.workbenchStarted, 'Workbench is not started. Call startup() first.');
            return this.instantiationService;
        };
        Workbench.prototype.addClass = function (clazz) {
            if (this.workbench) {
                this.workbench.addClass(clazz);
            }
        };
        Workbench.prototype.removeClass = function (clazz) {
            if (this.workbench) {
                this.workbench.removeClass(clazz);
            }
        };
        Workbench.sidebarPositionSettingKey = 'workbench.sidebar.position';
        Workbench.sidebarHiddenSettingKey = 'workbench.sidebar.hidden';
        Workbench.panelHiddenSettingKey = 'workbench.panel.hidden';
        Workbench = __decorate([
            __param(6, instantiation_1.IInstantiationService),
            __param(7, untitledEditorService_1.IUntitledEditorService),
            __param(8, event_1.IEventService),
            __param(9, contextService_1.IWorkspaceContextService),
            __param(10, storage_1.IStorageService),
            __param(11, telemetry_1.ITelemetryService),
            __param(12, keybindingService_1.IKeybindingService),
            __param(13, lifecycle_2.ILifecycleService),
            __param(14, message_1.IMessageService),
            __param(15, thread_1.IThreadService)
        ], Workbench);
        return Workbench;
    }());
    exports.Workbench = Workbench;
});
//# sourceMappingURL=workbench.js.map