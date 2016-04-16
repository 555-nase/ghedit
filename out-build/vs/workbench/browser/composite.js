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
define(["require", "exports", 'vs/base/common/winjs.base', 'vs/base/common/actions', 'vs/workbench/common/component', 'vs/workbench/common/events', 'vs/platform/telemetry/common/telemetry', 'vs/platform/instantiation/common/descriptors', 'vs/platform/selection/common/selection'], function (require, exports, winjs_base_1, actions_1, component_1, events_1, telemetry_1, descriptors_1, selection_1) {
    "use strict";
    /**
     * Internal composite events to communicate with composite container.
     */
    exports.EventType = {
        INTERNAL_COMPOSITE_TITLE_AREA_UPDATE: 'internalCompositeTitleAreaUpdate'
    };
    /**
     * Composites are layed out in the sidebar and panel part of the workbench. At a time only one composite
     * can be open in the sidebar, and only one composite can be open in the panel.
     * Each composite has a minimized representation that is good enough to provide some
     * information about the state of the composite data.
     * The workbench will keep a composite alive after it has been created and show/hide it based on
     * user interaction. The lifecycle of a composite goes in the order create(), setVisible(true|false),
     * layout(), focus(), dispose(). During use of the workbench, a composite will often receive a setVisible,
     * layout and focus call, but only one create and dispose call.
     */
    var Composite = (function (_super) {
        __extends(Composite, _super);
        /**
         * Create a new composite with the given ID and context.
         */
        function Composite(id, _telemetryService) {
            _super.call(this, id);
            this._telemetryService = _telemetryService;
            this._telemetryData = {};
            this.visible = false;
        }
        Composite.prototype.getTitle = function () {
            return null;
        };
        Object.defineProperty(Composite.prototype, "telemetryService", {
            get: function () {
                return this._telemetryService;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Composite.prototype, "telemetryData", {
            get: function () {
                return this._telemetryData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Note: Clients should not call this method, the monaco workbench calls this
         * method. Calling it otherwise may result in unexpected behavior.
         *
         * Called to create this composite on the provided builder. This method is only
         * called once during the lifetime of the workbench.
         * Note that DOM-dependent calculations should be performed from the setVisible()
         * call. Only then the composite will be part of the DOM.
         */
        Composite.prototype.create = function (parent) {
            this.parent = parent;
            return winjs_base_1.TPromise.as(null);
        };
        /**
         * Returns the container this composite is being build in.
         */
        Composite.prototype.getContainer = function () {
            return this.parent;
        };
        /**
         * Note: Clients should not call this method, the monaco workbench calls this
         * method. Calling it otherwise may result in unexpected behavior.
         *
         * Called to indicate that the composite has become visible or hidden. This method
         * is called more than once during workbench lifecycle depending on the user interaction.
         * The composite will be on-DOM if visible is set to true and off-DOM otherwise.
         *
         * The returned promise is complete when the composite is visible. As such it is valid
         * to do a long running operation from this call. Typically this operation should be
         * fast though because setVisible might be called many times during a session.
         */
        Composite.prototype.setVisible = function (visible) {
            this.visible = visible;
            // Reset telemetry data when composite becomes visible
            if (visible) {
                this._telemetryData = {};
                this._telemetryData.startTime = new Date();
            }
            else {
                this._telemetryData.timeSpent = (Date.now() - this._telemetryData.startTime) / 1000;
                delete this._telemetryData.startTime;
                // Only submit telemetry data when not running from an integration test
                if (this._telemetryService && this._telemetryService.publicLog) {
                    var eventName = 'compositeShown';
                    this._telemetryData.composite = this.getId();
                    this._telemetryService.publicLog(eventName, this._telemetryData);
                }
            }
            return winjs_base_1.TPromise.as(null);
        };
        /**
         * Called when this composite should receive keyboard focus.
         */
        Composite.prototype.focus = function () {
            // Subclasses can implement
        };
        /**
         * Returns an array of actions to show in the action bar of the composite.
         */
        Composite.prototype.getActions = function () {
            return [];
        };
        /**
         * Returns an array of actions to show in the action bar of the composite
         * in a less prominent way then action from getActions.
         */
        Composite.prototype.getSecondaryActions = function () {
            return [];
        };
        /**
         * For any of the actions returned by this composite, provide an IActionItem in
         * cases where the implementor of the composite wants to override the presentation
         * of an action. Returns null to indicate that the action is not rendered through
         * an action item.
         */
        Composite.prototype.getActionItem = function (action) {
            return null;
        };
        /**
         * Returns the instance of IActionRunner to use with this composite for the
         * composite tool bar.
         */
        Composite.prototype.getActionRunner = function () {
            if (!this.actionRunner) {
                this.actionRunner = new actions_1.ActionRunner();
            }
            return this.actionRunner;
        };
        /**
         * Method for composite implementors to indicate to the composite container that the title or the actions
         * of the composite have changed. Calling this method will cause the container to ask for title (getTitle())
         * and actions (getActions(), getSecondaryActions()) if the composite is visible or the next time the composite
         * gets visible.
         */
        Composite.prototype.updateTitleArea = function () {
            this.emit(exports.EventType.INTERNAL_COMPOSITE_TITLE_AREA_UPDATE, new events_1.CompositeEvent(this.getId()));
        };
        /**
         * Returns an array of elements that are selected in the composite.
         */
        Composite.prototype.getSelection = function () {
            return selection_1.Selection.EMPTY;
        };
        /**
         * Returns true if this composite is currently visible and false otherwise.
         */
        Composite.prototype.isVisible = function () {
            return this.visible;
        };
        /**
         * Returns the underlying composite control or null if it is not accessible.
         */
        Composite.prototype.getControl = function () {
            return null;
        };
        Composite = __decorate([
            __param(1, telemetry_1.ITelemetryService)
        ], Composite);
        return Composite;
    }(component_1.WorkbenchComponent));
    exports.Composite = Composite;
    /**
     * A composite descriptor is a leightweight descriptor of a composite in the monaco workbench.
     */
    var CompositeDescriptor = (function (_super) {
        __extends(CompositeDescriptor, _super);
        function CompositeDescriptor(moduleId, ctorName, id, name, cssClass, order) {
            _super.call(this, moduleId, ctorName);
            this.id = id;
            this.name = name;
            this.cssClass = cssClass;
            this.order = order;
        }
        return CompositeDescriptor;
    }(descriptors_1.AsyncDescriptor));
    exports.CompositeDescriptor = CompositeDescriptor;
    var CompositeRegistry = (function () {
        function CompositeRegistry() {
            this.composits = [];
        }
        CompositeRegistry.prototype.registerComposite = function (descriptor) {
            if (this.compositeById(descriptor.id) !== null) {
                return;
            }
            this.composits.push(descriptor);
        };
        CompositeRegistry.prototype.getComposite = function (id) {
            return this.compositeById(id);
        };
        CompositeRegistry.prototype.getComposits = function () {
            return this.composits.slice(0);
        };
        CompositeRegistry.prototype.setComposits = function (compositsToSet) {
            this.composits = compositsToSet;
        };
        CompositeRegistry.prototype.compositeById = function (id) {
            for (var i = 0; i < this.composits.length; i++) {
                if (this.composits[i].id === id) {
                    return this.composits[i];
                }
            }
            return null;
        };
        return CompositeRegistry;
    }());
    exports.CompositeRegistry = CompositeRegistry;
});
