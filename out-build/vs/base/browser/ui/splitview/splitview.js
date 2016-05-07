/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/base/common/lifecycle', 'vs/base/common/eventEmitter', 'vs/base/common/types', 'vs/base/common/objects', 'vs/base/browser/dom', 'vs/base/common/numbers', 'vs/base/browser/ui/sash/sash', 'vs/base/browser/keyboardEvent', 'vs/base/common/keyCodes', 'vs/base/common/event', 'vs/css!./splitview'], function (require, exports, lifecycle, ee, types, objects, dom, numbers, sash, keyboardEvent_1, keyCodes_1, event_1) {
    'use strict';
    (function (Orientation) {
        Orientation[Orientation["VERTICAL"] = 0] = "VERTICAL";
        Orientation[Orientation["HORIZONTAL"] = 1] = "HORIZONTAL";
    })(exports.Orientation || (exports.Orientation = {}));
    var Orientation = exports.Orientation;
    (function (ViewSizing) {
        ViewSizing[ViewSizing["Flexible"] = 0] = "Flexible";
        ViewSizing[ViewSizing["Fixed"] = 1] = "Fixed";
    })(exports.ViewSizing || (exports.ViewSizing = {}));
    var ViewSizing = exports.ViewSizing;
    var View = (function (_super) {
        __extends(View, _super);
        function View(opts) {
            _super.call(this);
            this.size = 0;
            this._sizing = types.isUndefined(opts.sizing) ? ViewSizing.Flexible : opts.sizing;
            this._fixedSize = types.isUndefined(opts.fixedSize) ? 22 : opts.fixedSize;
            this._minimumSize = types.isUndefined(opts.minimumSize) ? 22 : opts.minimumSize;
        }
        Object.defineProperty(View.prototype, "sizing", {
            get: function () { return this._sizing; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "fixedSize", {
            get: function () { return this._fixedSize; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "minimumSize", {
            get: function () { return this.sizing === ViewSizing.Fixed ? this.fixedSize : this._minimumSize; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "maximumSize", {
            get: function () { return this.sizing === ViewSizing.Fixed ? this.fixedSize : Number.POSITIVE_INFINITY; },
            enumerable: true,
            configurable: true
        });
        View.prototype.setFlexible = function (size) {
            this._sizing = ViewSizing.Flexible;
            this.emit('change', types.isUndefined(size) ? this._minimumSize : size);
        };
        View.prototype.setFixed = function (size) {
            this._sizing = ViewSizing.Fixed;
            this._fixedSize = types.isUndefined(size) ? this._fixedSize : size;
            this.emit('change', this._fixedSize);
        };
        return View;
    }(ee.EventEmitter));
    exports.View = View;
    var HeaderView = (function (_super) {
        __extends(HeaderView, _super);
        function HeaderView(opts) {
            _super.call(this, opts);
            this.headerSize = types.isUndefined(opts.headerSize) ? 22 : opts.headerSize;
        }
        HeaderView.prototype.render = function (container, orientation) {
            this.header = document.createElement('div');
            this.header.className = 'header';
            var headerSize = this.headerSize + 'px';
            if (orientation === Orientation.HORIZONTAL) {
                this.header.style.width = headerSize;
            }
            else {
                this.header.style.height = headerSize;
            }
            this.renderHeader(this.header);
            container.appendChild(this.header);
            this.body = document.createElement('div');
            this.body.className = 'body';
            this.layoutBodyContainer(orientation);
            this.renderBody(this.body);
            container.appendChild(this.body);
        };
        HeaderView.prototype.layout = function (size, orientation) {
            this.layoutBodyContainer(orientation);
            this.layoutBody(size - this.headerSize);
        };
        HeaderView.prototype.layoutBodyContainer = function (orientation) {
            var size = "calc(100% - " + this.headerSize + "px)";
            if (orientation === Orientation.HORIZONTAL) {
                this.body.style.width = size;
            }
            else {
                this.body.style.height = size;
            }
        };
        HeaderView.prototype.dispose = function () {
            this.header = null;
            this.body = null;
            _super.prototype.dispose.call(this);
        };
        return HeaderView;
    }(View));
    exports.HeaderView = HeaderView;
    (function (CollapsibleState) {
        CollapsibleState[CollapsibleState["EXPANDED"] = 0] = "EXPANDED";
        CollapsibleState[CollapsibleState["COLLAPSED"] = 1] = "COLLAPSED";
    })(exports.CollapsibleState || (exports.CollapsibleState = {}));
    var CollapsibleState = exports.CollapsibleState;
    var AbstractCollapsibleView = (function (_super) {
        __extends(AbstractCollapsibleView, _super);
        function AbstractCollapsibleView(opts) {
            _super.call(this, opts);
            this.ariaHeaderLabel = opts && opts.ariaHeaderLabel;
            this.changeState(types.isUndefined(opts.initialState) ? CollapsibleState.EXPANDED : opts.initialState);
        }
        AbstractCollapsibleView.prototype.render = function (container, orientation) {
            var _this = this;
            _super.prototype.render.call(this, container, orientation);
            dom.addClass(this.header, 'collapsible');
            dom.addClass(this.body, 'collapsible');
            // Keyboard access
            this.header.setAttribute('tabindex', '0');
            this.header.setAttribute('role', 'toolbar');
            if (this.ariaHeaderLabel) {
                this.header.setAttribute('aria-label', this.ariaHeaderLabel);
            }
            this.header.setAttribute('aria-expanded', String(this.state === CollapsibleState.EXPANDED));
            this.headerKeyListener = dom.addDisposableListener(this.header, dom.EventType.KEY_DOWN, function (e) {
                var event = new keyboardEvent_1.StandardKeyboardEvent(e);
                var eventHandled = false;
                if (event.equals(keyCodes_1.CommonKeybindings.ENTER) || event.equals(keyCodes_1.CommonKeybindings.SPACE) || (event.equals(keyCodes_1.CommonKeybindings.LEFT_ARROW) && _this.state === CollapsibleState.EXPANDED) || (event.equals(keyCodes_1.CommonKeybindings.RIGHT_ARROW) && _this.state === CollapsibleState.COLLAPSED)) {
                    _this.toggleExpansion();
                    eventHandled = true;
                }
                else if (event.equals(keyCodes_1.CommonKeybindings.ESCAPE)) {
                    _this.header.blur();
                    eventHandled = true;
                }
                else if (event.equals(keyCodes_1.CommonKeybindings.UP_ARROW)) {
                    _this.emit('focusPrevious');
                    eventHandled = true;
                }
                else if (event.equals(keyCodes_1.CommonKeybindings.DOWN_ARROW)) {
                    _this.emit('focusNext');
                    eventHandled = true;
                }
                if (eventHandled) {
                    dom.EventHelper.stop(event, true);
                }
            });
            // Mouse access
            this.headerClickListener = dom.addDisposableListener(this.header, dom.EventType.CLICK, function () { return _this.toggleExpansion(); });
            // Track state of focus in header so that other components can adjust styles based on that
            // (for example show or hide actions based on the state of being focused or not)
            this.focusTracker = dom.trackFocus(this.header);
            this.focusTracker.addFocusListener(function () {
                dom.addClass(_this.header, 'focused');
            });
            this.focusTracker.addBlurListener(function () {
                dom.removeClass(_this.header, 'focused');
            });
        };
        AbstractCollapsibleView.prototype.focus = function () {
            if (this.header) {
                this.header.focus();
            }
        };
        AbstractCollapsibleView.prototype.layout = function (size, orientation) {
            this.layoutHeader();
            _super.prototype.layout.call(this, size, orientation);
        };
        AbstractCollapsibleView.prototype.isExpanded = function () {
            return this.state === CollapsibleState.EXPANDED;
        };
        AbstractCollapsibleView.prototype.expand = function () {
            if (this.isExpanded()) {
                return;
            }
            this.changeState(CollapsibleState.EXPANDED);
        };
        AbstractCollapsibleView.prototype.collapse = function () {
            if (!this.isExpanded()) {
                return;
            }
            this.changeState(CollapsibleState.COLLAPSED);
        };
        AbstractCollapsibleView.prototype.toggleExpansion = function () {
            if (this.isExpanded()) {
                this.collapse();
            }
            else {
                this.expand();
            }
        };
        AbstractCollapsibleView.prototype.layoutHeader = function () {
            if (!this.header) {
                return;
            }
            if (this.state === CollapsibleState.COLLAPSED) {
                dom.addClass(this.header, 'collapsed');
            }
            else {
                dom.removeClass(this.header, 'collapsed');
            }
        };
        AbstractCollapsibleView.prototype.changeState = function (state) {
            this.state = state;
            if (this.header) {
                this.header.setAttribute('aria-expanded', String(this.state === CollapsibleState.EXPANDED));
            }
            this.layoutHeader();
        };
        AbstractCollapsibleView.prototype.dispose = function () {
            if (this.headerClickListener) {
                this.headerClickListener.dispose();
                this.headerClickListener = null;
            }
            if (this.headerKeyListener) {
                this.headerKeyListener.dispose();
                this.headerKeyListener = null;
            }
            if (this.focusTracker) {
                this.focusTracker.dispose();
                this.focusTracker = null;
            }
            _super.prototype.dispose.call(this);
        };
        return AbstractCollapsibleView;
    }(HeaderView));
    exports.AbstractCollapsibleView = AbstractCollapsibleView;
    var CollapsibleView = (function (_super) {
        __extends(CollapsibleView, _super);
        function CollapsibleView(opts) {
            _super.call(this, opts);
            this.previousSize = null;
        }
        CollapsibleView.prototype.changeState = function (state) {
            _super.prototype.changeState.call(this, state);
            if (state === CollapsibleState.EXPANDED) {
                this.setFlexible(this.previousSize || this._minimumSize);
            }
            else {
                this.previousSize = this.size;
                this.setFixed();
            }
        };
        return CollapsibleView;
    }(AbstractCollapsibleView));
    exports.CollapsibleView = CollapsibleView;
    var FixedCollapsibleView = (function (_super) {
        __extends(FixedCollapsibleView, _super);
        function FixedCollapsibleView(opts) {
            _super.call(this, objects.mixin({ sizing: ViewSizing.Fixed }, opts));
            this._expandedBodySize = types.isUndefined(opts.expandedBodySize) ? 22 : opts.expandedBodySize;
        }
        Object.defineProperty(FixedCollapsibleView.prototype, "fixedSize", {
            get: function () { return this.state === CollapsibleState.EXPANDED ? this.expandedSize : this.headerSize; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FixedCollapsibleView.prototype, "expandedSize", {
            get: function () { return this.expandedBodySize + this.headerSize; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FixedCollapsibleView.prototype, "expandedBodySize", {
            get: function () { return this._expandedBodySize; },
            set: function (size) {
                this._expandedBodySize = size;
                this.setFixed(this.fixedSize);
            },
            enumerable: true,
            configurable: true
        });
        FixedCollapsibleView.prototype.changeState = function (state) {
            _super.prototype.changeState.call(this, state);
            this.setFixed(this.fixedSize);
        };
        return FixedCollapsibleView;
    }(AbstractCollapsibleView));
    exports.FixedCollapsibleView = FixedCollapsibleView;
    var PlainView = (function (_super) {
        __extends(PlainView, _super);
        function PlainView() {
            _super.apply(this, arguments);
        }
        PlainView.prototype.render = function () { };
        PlainView.prototype.focus = function () { };
        PlainView.prototype.layout = function () { };
        return PlainView;
    }(View));
    var DeadView = (function (_super) {
        __extends(DeadView, _super);
        function DeadView(view) {
            _super.call(this, { sizing: ViewSizing.Fixed, fixedSize: 0 });
            this.size = view.size;
        }
        return DeadView;
    }(PlainView));
    var VoidView = (function (_super) {
        __extends(VoidView, _super);
        function VoidView() {
            _super.call(this, { sizing: ViewSizing.Fixed, minimumSize: 0, fixedSize: 0 });
        }
        VoidView.prototype.setFlexible = function (size) {
            _super.prototype.setFlexible.call(this, size);
        };
        VoidView.prototype.setFixed = function (size) {
            _super.prototype.setFixed.call(this, size);
        };
        return VoidView;
    }(PlainView));
    function sum(arr) {
        return arr.reduce(function (a, b) { return a + b; });
    }
    var SplitView = (function () {
        function SplitView(container, options) {
            options = options || {};
            this.orientation = types.isUndefined(options.orientation) ? Orientation.VERTICAL : options.orientation;
            this.el = document.createElement('div');
            dom.addClass(this.el, 'monaco-split-view');
            dom.addClass(this.el, this.orientation === Orientation.VERTICAL ? 'vertical' : 'horizontal');
            container.appendChild(this.el);
            this.size = null;
            this.viewElements = [];
            this.views = [];
            this.viewChangeListeners = [];
            this.viewFocusPreviousListeners = [];
            this.viewFocusNextListeners = [];
            this.viewFocusListeners = [];
            this.initialWeights = [];
            this.sashes = [];
            this.sashesListeners = [];
            this.animationTimeout = null;
            this._onFocus = new event_1.Emitter();
            this.sashOrientation = this.orientation === Orientation.VERTICAL
                ? sash.Orientation.HORIZONTAL
                : sash.Orientation.VERTICAL;
            if (this.orientation === Orientation.VERTICAL) {
                this.measureContainerSize = function () { return dom.getContentHeight(container); };
                this.layoutViewElement = function (viewElement, size) { return viewElement.style.height = size + 'px'; };
                this.eventWrapper = function (e) { return { start: e.startY, current: e.currentY }; };
            }
            else {
                this.measureContainerSize = function () { return dom.getContentWidth(container); };
                this.layoutViewElement = function (viewElement, size) { return viewElement.style.width = size + 'px'; };
                this.eventWrapper = function (e) { return { start: e.startX, current: e.currentX }; };
            }
            // The void space exists to handle the case where all other views are fixed size
            this.addView(new VoidView(), 1, 0);
        }
        Object.defineProperty(SplitView.prototype, "onFocus", {
            get: function () {
                return this._onFocus.event;
            },
            enumerable: true,
            configurable: true
        });
        SplitView.prototype.addView = function (view, initialWeight, index) {
            var _this = this;
            if (initialWeight === void 0) { initialWeight = 1; }
            if (index === void 0) { index = this.views.length - 1; }
            if (initialWeight <= 0) {
                throw new Error('Initial weight must be a positive number.');
            }
            var viewCount = this.views.length;
            // Create view container
            var viewElement = document.createElement('div');
            dom.addClass(viewElement, 'split-view-view');
            this.viewElements.splice(index, 0, viewElement);
            // Create view
            view.render(viewElement, this.orientation);
            this.views.splice(index, 0, view);
            // Initial weight
            this.initialWeights.splice(index, 0, initialWeight);
            // Render view
            if (index === viewCount) {
                this.el.appendChild(viewElement);
            }
            else {
                this.el.insertBefore(viewElement, this.el.children.item(index));
            }
            // Add sash
            if (this.views.length > 2) {
                var s_1 = new sash.Sash(this.el, this, { orientation: this.sashOrientation });
                this.sashes.splice(index - 1, 0, s_1);
                this.sashesListeners.push(s_1.addListener2('start', function (e) { return _this.onSashStart(s_1, _this.eventWrapper(e)); }));
                this.sashesListeners.push(s_1.addListener2('change', function (e) { return _this.onSashChange(s_1, _this.eventWrapper(e)); }));
            }
            this.viewChangeListeners.splice(index, 0, view.addListener2('change', function (size) { return _this.onViewChange(view, size); }));
            this.onViewChange(view, view.minimumSize);
            var viewFocusTracker = dom.trackFocus(viewElement);
            this.viewFocusListeners.splice(index, 0, viewFocusTracker);
            viewFocusTracker.addFocusListener(function () { return _this._onFocus.fire(view); });
            this.viewFocusPreviousListeners.splice(index, 0, view.addListener2('focusPrevious', function () { return index > 0 && _this.views[index - 1].focus(); }));
            this.viewFocusNextListeners.splice(index, 0, view.addListener2('focusNext', function () { return index < _this.views.length && _this.views[index + 1].focus(); }));
        };
        SplitView.prototype.removeView = function (view) {
            var index = this.views.indexOf(view);
            if (index < 0) {
                return;
            }
            var deadView = new DeadView(view);
            this.views[index] = deadView;
            this.onViewChange(deadView, 0);
            var sashIndex = Math.max(index - 1, 0);
            this.sashes[sashIndex].dispose();
            this.sashes.splice(sashIndex, 1);
            this.viewChangeListeners[index].dispose();
            this.viewChangeListeners.splice(index, 1);
            this.viewFocusPreviousListeners[index].dispose();
            this.viewFocusPreviousListeners.splice(index, 1);
            this.viewFocusListeners[index].dispose();
            this.viewFocusListeners.splice(index, 1);
            this.viewFocusNextListeners[index].dispose();
            this.viewFocusNextListeners.splice(index, 1);
            this.views.splice(index, 1);
            this.el.removeChild(this.viewElements[index]);
            this.viewElements.splice(index, 1);
            deadView.dispose();
            view.dispose();
        };
        SplitView.prototype.layout = function (size) {
            size = size || this.measureContainerSize();
            if (this.size === null) {
                this.size = size;
                this.initialLayout();
                return;
            }
            size = Math.max(size, this.views.reduce(function (t, v) { return t + v.minimumSize; }, 0));
            var diff = Math.abs(this.size - size);
            var up = numbers.countToArray(this.views.length - 1, -1);
            var collapses = this.views.map(function (v) { return v.size - v.minimumSize; });
            var expands = this.views.map(function (v) { return v.maximumSize - v.size; });
            if (size < this.size) {
                this.expandCollapse(Math.min(diff, sum(collapses)), collapses, expands, up, []);
            }
            else if (size > this.size) {
                this.expandCollapse(Math.min(diff, sum(expands)), collapses, expands, [], up);
            }
            this.size = size;
            this.layoutViews();
        };
        SplitView.prototype.onSashStart = function (sash, event) {
            var i = this.sashes.indexOf(sash);
            var collapses = this.views.map(function (v) { return v.size - v.minimumSize; });
            var expands = this.views.map(function (v) { return v.maximumSize - v.size; });
            var up = numbers.countToArray(i, -1);
            var down = numbers.countToArray(i + 1, this.views.length);
            var collapsesUp = up.map(function (i) { return collapses[i]; });
            var collapsesDown = down.map(function (i) { return collapses[i]; });
            var expandsUp = up.map(function (i) { return expands[i]; });
            var expandsDown = down.map(function (i) { return expands[i]; });
            this.state = {
                start: event.start,
                sizes: this.views.map(function (v) { return v.size; }),
                up: up,
                down: down,
                maxUp: Math.min(sum(collapsesUp), sum(expandsDown)),
                maxDown: Math.min(sum(expandsUp), sum(collapsesDown)),
                collapses: collapses,
                expands: expands
            };
        };
        SplitView.prototype.onSashChange = function (sash, event) {
            var diff = event.current - this.state.start;
            for (var i = 0; i < this.views.length; i++) {
                this.views[i].size = this.state.sizes[i];
            }
            if (diff < 0) {
                this.expandCollapse(Math.min(-diff, this.state.maxUp), this.state.collapses, this.state.expands, this.state.up, this.state.down);
            }
            else {
                this.expandCollapse(Math.min(diff, this.state.maxDown), this.state.collapses, this.state.expands, this.state.down, this.state.up);
            }
            this.layoutViews();
        };
        // Main algorithm
        SplitView.prototype.expandCollapse = function (collapse, collapses, expands, collapseIndexes, expandIndexes) {
            var _this = this;
            var totalCollapse = collapse;
            var totalExpand = totalCollapse;
            collapseIndexes.forEach(function (i) {
                var collapse = Math.min(collapses[i], totalCollapse);
                totalCollapse -= collapse;
                _this.views[i].size -= collapse;
            });
            expandIndexes.forEach(function (i) {
                var expand = Math.min(expands[i], totalExpand);
                totalExpand -= expand;
                _this.views[i].size += expand;
            });
        };
        SplitView.prototype.initialLayout = function () {
            var _this = this;
            var totalWeight = 0;
            var fixedSize = 0;
            this.views.forEach(function (v, i) {
                if (v.sizing === ViewSizing.Flexible) {
                    totalWeight += _this.initialWeights[i];
                }
                else {
                    fixedSize += v.fixedSize;
                }
            });
            var flexibleSize = this.size - fixedSize;
            this.views.forEach(function (v, i) {
                if (v.sizing === ViewSizing.Flexible) {
                    v.size = _this.initialWeights[i] * flexibleSize / totalWeight;
                }
                else {
                    v.size = v.fixedSize;
                }
            });
            // Leftover
            var index = this.getLastFlexibleViewIndex();
            if (index >= 0) {
                this.views[index].size += this.size - this.views.reduce(function (t, v) { return t + v.size; }, 0);
            }
            // Layout
            this.layoutViews();
        };
        SplitView.prototype.getLastFlexibleViewIndex = function (exceptIndex) {
            if (exceptIndex === void 0) { exceptIndex = null; }
            for (var i = this.views.length - 1; i >= 0; i--) {
                if (exceptIndex === i) {
                    continue;
                }
                if (this.views[i].sizing === ViewSizing.Flexible) {
                    return i;
                }
            }
            return -1;
        };
        SplitView.prototype.layoutViews = function () {
            for (var i = 0; i < this.views.length; i++) {
                // Layout the view elements
                this.layoutViewElement(this.viewElements[i], this.views[i].size);
                // Layout the views themselves
                this.views[i].layout(this.views[i].size, this.orientation);
            }
            // Layout the sashes
            this.sashes.forEach(function (s) { return s.layout(); });
            // Update sashes enablement
            var previous = false;
            var collapsesDown = this.views.map(function (v) { return previous = (v.size - v.minimumSize > 0) || previous; });
            previous = false;
            var expandsDown = this.views.map(function (v) { return previous = (v.maximumSize - v.size > 0) || previous; });
            var reverseViews = this.views.slice().reverse();
            previous = false;
            var collapsesUp = reverseViews.map(function (v) { return previous = (v.size - v.minimumSize > 0) || previous; }).reverse();
            previous = false;
            var expandsUp = reverseViews.map(function (v) { return previous = (v.maximumSize - v.size > 0) || previous; }).reverse();
            this.sashes.forEach(function (s, i) {
                if ((collapsesDown[i] && expandsUp[i + 1]) || (expandsDown[i] && collapsesUp[i + 1])) {
                    s.enable();
                }
                else {
                    s.disable();
                }
            });
        };
        SplitView.prototype.onViewChange = function (view, size) {
            if (view !== this.voidView) {
                if (this.areAllViewsFixed()) {
                    this.voidView.setFlexible();
                }
                else {
                    this.voidView.setFixed();
                }
            }
            if (this.size === null) {
                return;
            }
            if (size === view.size) {
                return;
            }
            this.setupAnimation();
            var index = this.views.indexOf(view);
            var diff = Math.abs(size - view.size);
            var up = numbers.countToArray(index - 1, -1);
            var down = numbers.countToArray(index + 1, this.views.length);
            var downUp = down.concat(up);
            var collapses = this.views.map(function (v) { return Math.max(v.size - v.minimumSize, 0); });
            var expands = this.views.map(function (v) { return Math.max(v.maximumSize - v.size, 0); });
            var collapse, collapseIndexes, expandIndexes;
            if (size < view.size) {
                collapse = Math.min(downUp.reduce(function (t, i) { return t + expands[i]; }, 0), diff);
                collapseIndexes = [index];
                expandIndexes = downUp;
            }
            else {
                collapse = Math.min(downUp.reduce(function (t, i) { return t + collapses[i]; }, 0), diff);
                collapseIndexes = downUp;
                expandIndexes = [index];
            }
            this.expandCollapse(collapse, collapses, expands, collapseIndexes, expandIndexes);
            this.layoutViews();
        };
        SplitView.prototype.setupAnimation = function () {
            var _this = this;
            if (types.isNumber(this.animationTimeout)) {
                window.clearTimeout(this.animationTimeout);
            }
            dom.addClass(this.el, 'animated');
            this.animationTimeout = window.setTimeout(function () { return _this.clearAnimation(); }, 200);
        };
        SplitView.prototype.clearAnimation = function () {
            this.animationTimeout = null;
            dom.removeClass(this.el, 'animated');
        };
        Object.defineProperty(SplitView.prototype, "voidView", {
            get: function () {
                return this.views[this.views.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        SplitView.prototype.areAllViewsFixed = function () {
            var _this = this;
            return this.views.every(function (v, i) { return v.sizing === ViewSizing.Fixed || i === _this.views.length - 1; });
        };
        SplitView.prototype.getVerticalSashLeft = function (sash) {
            return this.getSashPosition(sash);
        };
        SplitView.prototype.getHorizontalSashTop = function (sash) {
            return this.getSashPosition(sash);
        };
        SplitView.prototype.getSashPosition = function (sash) {
            var index = this.sashes.indexOf(sash);
            var position = 0;
            for (var i = 0; i <= index; i++) {
                position += this.views[i].size;
            }
            return position;
        };
        SplitView.prototype.dispose = function () {
            var _this = this;
            if (types.isNumber(this.animationTimeout)) {
                window.clearTimeout(this.animationTimeout);
            }
            this.orientation = null;
            this.size = null;
            this.viewElements.forEach(function (e) { return _this.el.removeChild(e); });
            this.el = null;
            this.viewElements = [];
            this.views = lifecycle.dispose(this.views);
            this.sashes = lifecycle.dispose(this.sashes);
            this.sashesListeners = lifecycle.dispose(this.sashesListeners);
            this.measureContainerSize = null;
            this.layoutViewElement = null;
            this.eventWrapper = null;
            this.state = null;
        };
        return SplitView;
    }());
    exports.SplitView = SplitView;
});
//# sourceMappingURL=splitview.js.map