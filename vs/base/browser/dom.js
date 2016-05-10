var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/base/common/async', 'vs/base/common/errors', 'vs/base/common/eventEmitter', 'vs/base/common/lifecycle', 'vs/base/common/types', 'vs/base/browser/browser', 'vs/base/browser/browserService', 'vs/base/browser/keyboardEvent', 'vs/base/browser/mouseEvent'], function (require, exports, async_1, errors_1, eventEmitter_1, lifecycle_1, types_1, browser_1, browserService_1, keyboardEvent_1, mouseEvent_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    function clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
    exports.clearNode = clearNode;
    /**
     * Calls JSON.Stringify with a replacer to break apart any circular references.
     * This prevents JSON.stringify from throwing the exception
     *  "Uncaught TypeError: Converting circular structure to JSON"
     */
    function safeStringifyDOMAware(obj) {
        var seen = [];
        return JSON.stringify(obj, function (key, value) {
            // HTML elements are never going to serialize nicely
            if (value instanceof Element) {
                return '[Element]';
            }
            if (types_1.isObject(value) || Array.isArray(value)) {
                if (seen.indexOf(value) !== -1) {
                    return '[Circular]';
                }
                else {
                    seen.push(value);
                }
            }
            return value;
        });
    }
    exports.safeStringifyDOMAware = safeStringifyDOMAware;
    function isInDOM(node) {
        while (node) {
            if (node === document.body) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }
    exports.isInDOM = isInDOM;
    var _blank = ' '.charCodeAt(0);
    var lastStart, lastEnd;
    function _findClassName(node, className) {
        var classes = node.className;
        if (!classes) {
            lastStart = -1;
            return;
        }
        className = className.trim();
        var classesLen = classes.length, classLen = className.length;
        if (classLen === 0) {
            lastStart = -1;
            return;
        }
        if (classesLen < classLen) {
            lastStart = -1;
            return;
        }
        if (classes === className) {
            lastStart = 0;
            lastEnd = classesLen;
            return;
        }
        var idx = -1, idxEnd;
        while ((idx = classes.indexOf(className, idx + 1)) >= 0) {
            idxEnd = idx + classLen;
            // a class that is followed by another class
            if ((idx === 0 || classes.charCodeAt(idx - 1) === _blank) && classes.charCodeAt(idxEnd) === _blank) {
                lastStart = idx;
                lastEnd = idxEnd + 1;
                return;
            }
            // last class
            if (idx > 0 && classes.charCodeAt(idx - 1) === _blank && idxEnd === classesLen) {
                lastStart = idx - 1;
                lastEnd = idxEnd;
                return;
            }
            // equal - duplicate of cmp above
            if (idx === 0 && idxEnd === classesLen) {
                lastStart = 0;
                lastEnd = idxEnd;
                return;
            }
        }
        lastStart = -1;
    }
    /**
     * @param node a dom node
     * @param className a class name
     * @return true if the className attribute of the provided node contains the provided className
     */
    function hasClass(node, className) {
        _findClassName(node, className);
        return lastStart !== -1;
    }
    exports.hasClass = hasClass;
    /**
     * Adds the provided className to the provided node. This is a no-op
     * if the class is already set.
     * @param node a dom node
     * @param className a class name
     */
    function addClass(node, className) {
        if (!node.className) {
            node.className = className;
        }
        else {
            _findClassName(node, className); // see if it's already there
            if (lastStart === -1) {
                node.className = node.className + ' ' + className;
            }
        }
    }
    exports.addClass = addClass;
    /**
     * Removes the className for the provided node. This is a no-op
     * if the class isn't present.
     * @param node a dom node
     * @param className a class name
     */
    function removeClass(node, className) {
        _findClassName(node, className);
        if (lastStart === -1) {
            return; // Prevent styles invalidation if not necessary
        }
        else {
            node.className = node.className.substring(0, lastStart) + node.className.substring(lastEnd);
        }
    }
    exports.removeClass = removeClass;
    /**
     * @param node a dom node
     * @param className a class name
     * @param shouldHaveIt
     */
    function toggleClass(node, className, shouldHaveIt) {
        _findClassName(node, className);
        if (lastStart !== -1 && !shouldHaveIt) {
            removeClass(node, className);
        }
        if (lastStart === -1 && shouldHaveIt) {
            addClass(node, className);
        }
    }
    exports.toggleClass = toggleClass;
    var DomListener = (function (_super) {
        __extends(DomListener, _super);
        function DomListener(node, type, handler, useCapture) {
            _super.call(this);
            this._node = node;
            this._type = type;
            this._useCapture = (useCapture || false);
            this._wrapHandler = function (e) {
                e = e || window.event;
                handler(e);
            };
            if (typeof this._node.addEventListener === 'function') {
                this._usedAddEventListener = true;
                this._node.addEventListener(this._type, this._wrapHandler, this._useCapture);
            }
            else {
                this._usedAddEventListener = false;
                this._node.attachEvent('on' + this._type, this._wrapHandler);
            }
        }
        DomListener.prototype.dispose = function () {
            if (!this._wrapHandler) {
                // Already disposed
                return;
            }
            if (this._usedAddEventListener) {
                this._node.removeEventListener(this._type, this._wrapHandler, this._useCapture);
            }
            else {
                this._node.detachEvent('on' + this._type, this._wrapHandler);
            }
            // Prevent leakers from holding on to the dom or handler func
            this._node = null;
            this._wrapHandler = null;
        };
        return DomListener;
    }(lifecycle_1.Disposable));
    function addDisposableListener(node, type, handler, useCapture) {
        return new DomListener(node, type, handler, useCapture);
    }
    exports.addDisposableListener = addDisposableListener;
    function _wrapAsStandardMouseEvent(handler) {
        return function (e) {
            return handler(new mouseEvent_1.StandardMouseEvent(e));
        };
    }
    function _wrapAsStandardKeyboardEvent(handler) {
        return function (e) {
            return handler(new keyboardEvent_1.StandardKeyboardEvent(e));
        };
    }
    exports.addStandardDisposableListener = function addStandardDisposableListener(node, type, handler, useCapture) {
        var wrapHandler = handler;
        if (type === 'click') {
            wrapHandler = _wrapAsStandardMouseEvent(handler);
        }
        else if (type === 'keydown' || type === 'keypress' || type === 'keyup') {
            wrapHandler = _wrapAsStandardKeyboardEvent(handler);
        }
        node.addEventListener(type, wrapHandler, useCapture || false);
        return {
            dispose: function () {
                if (!wrapHandler) {
                    // Already removed
                    return;
                }
                node.removeEventListener(type, wrapHandler, useCapture || false);
                // Prevent leakers from holding on to the dom node or handler func
                wrapHandler = null;
                node = null;
                handler = null;
            }
        };
    };
    function addDisposableNonBubblingMouseOutListener(node, handler) {
        return addDisposableListener(node, 'mouseout', function (e) {
            // Mouse out bubbles, so this is an attempt to ignore faux mouse outs coming from children elements
            var toElement = (e.relatedTarget || e.toElement);
            while (toElement && toElement !== node) {
                toElement = toElement.parentNode;
            }
            if (toElement === node) {
                return;
            }
            handler(e);
        });
    }
    exports.addDisposableNonBubblingMouseOutListener = addDisposableNonBubblingMouseOutListener;
    var _animationFrame = (function () {
        var emulatedRequestAnimationFrame = function (callback) {
            return setTimeout(function () { return callback(new Date().getTime()); }, 0);
        };
        var nativeRequestAnimationFrame = self.requestAnimationFrame
            || self.msRequestAnimationFrame
            || self.webkitRequestAnimationFrame
            || self.mozRequestAnimationFrame
            || self.oRequestAnimationFrame;
        var emulatedCancelAnimationFrame = function (id) { };
        var nativeCancelAnimationFrame = self.cancelAnimationFrame || self.cancelRequestAnimationFrame
            || self.msCancelAnimationFrame || self.msCancelRequestAnimationFrame
            || self.webkitCancelAnimationFrame || self.webkitCancelRequestAnimationFrame
            || self.mozCancelAnimationFrame || self.mozCancelRequestAnimationFrame
            || self.oCancelAnimationFrame || self.oCancelRequestAnimationFrame;
        var isNative = !!nativeRequestAnimationFrame;
        var request = nativeRequestAnimationFrame || emulatedRequestAnimationFrame;
        var cancel = nativeCancelAnimationFrame || emulatedCancelAnimationFrame;
        return {
            isNative: isNative,
            request: function (callback) {
                return request(callback);
            },
            cancel: function (id) {
                return cancel(id);
            }
        };
    })();
    var AnimationFrameQueueItem = (function () {
        function AnimationFrameQueueItem(runner, priority) {
            this._runner = runner;
            this.priority = priority;
            this._canceled = false;
        }
        AnimationFrameQueueItem.prototype.dispose = function () {
            this._canceled = true;
        };
        AnimationFrameQueueItem.prototype.execute = function () {
            if (this._canceled) {
                return;
            }
            try {
                this._runner();
            }
            catch (e) {
                errors_1.onUnexpectedError(e);
            }
        };
        // Sort by priority (largest to lowest)
        AnimationFrameQueueItem.sort = function (a, b) {
            return b.priority - a.priority;
        };
        return AnimationFrameQueueItem;
    }());
    (function () {
        /**
         * The runners scheduled at the next animation frame
         */
        var NEXT_QUEUE = [];
        /**
         * The runners scheduled at the current animation frame
         */
        var CURRENT_QUEUE = null;
        /**
         * A flag to keep track if the native requestAnimationFrame was already called
         */
        var animFrameRequested = false;
        /**
         * A flag to indicate if currently handling a native requestAnimationFrame callback
         */
        var inAnimationFrameRunner = false;
        var animationFrameRunner = function () {
            animFrameRequested = false;
            CURRENT_QUEUE = NEXT_QUEUE;
            NEXT_QUEUE = [];
            inAnimationFrameRunner = true;
            while (CURRENT_QUEUE.length > 0) {
                CURRENT_QUEUE.sort(AnimationFrameQueueItem.sort);
                var top_1 = CURRENT_QUEUE.shift();
                top_1.execute();
            }
            inAnimationFrameRunner = false;
        };
        exports.scheduleAtNextAnimationFrame = function (runner, priority) {
            if (priority === void 0) { priority = 0; }
            var item = new AnimationFrameQueueItem(runner, priority);
            NEXT_QUEUE.push(item);
            if (!animFrameRequested) {
                animFrameRequested = true;
                // TODO@Alex: also check if it is electron
                if (browser_1.isChrome) {
                    var handle_1;
                    _animationFrame.request(function () {
                        clearTimeout(handle_1);
                        animationFrameRunner();
                    });
                    // This is a fallback in-case chrome dropped
                    // the request for an animation frame. This
                    // is sick but was spotted in the wild
                    handle_1 = setTimeout(animationFrameRunner, 1000);
                }
                else {
                    _animationFrame.request(animationFrameRunner);
                }
            }
            return item;
        };
        exports.runAtThisOrScheduleAtNextAnimationFrame = function (runner, priority) {
            if (inAnimationFrameRunner) {
                var item = new AnimationFrameQueueItem(runner, priority);
                CURRENT_QUEUE.push(item);
                return item;
            }
            else {
                return exports.scheduleAtNextAnimationFrame(runner, priority);
            }
        };
    })();
    var MINIMUM_TIME_MS = 16;
    var DEFAULT_EVENT_MERGER = function (lastEvent, currentEvent) {
        return currentEvent;
    };
    var TimeoutThrottledDomListener = (function (_super) {
        __extends(TimeoutThrottledDomListener, _super);
        function TimeoutThrottledDomListener(node, type, handler, eventMerger, minimumTimeMs) {
            if (eventMerger === void 0) { eventMerger = DEFAULT_EVENT_MERGER; }
            if (minimumTimeMs === void 0) { minimumTimeMs = MINIMUM_TIME_MS; }
            _super.call(this);
            var lastEvent = null;
            var lastHandlerTime = 0;
            var timeout = this._register(new async_1.TimeoutTimer());
            var invokeHandler = function () {
                lastHandlerTime = (new Date()).getTime();
                handler(lastEvent);
                lastEvent = null;
            };
            this._register(addDisposableListener(node, type, function (e) {
                lastEvent = eventMerger(lastEvent, e);
                var elapsedTime = (new Date()).getTime() - lastHandlerTime;
                if (elapsedTime >= minimumTimeMs) {
                    timeout.cancel();
                    invokeHandler();
                }
                else {
                    timeout.setIfNotSet(invokeHandler, minimumTimeMs - elapsedTime);
                }
            }));
        }
        return TimeoutThrottledDomListener;
    }(lifecycle_1.Disposable));
    function addDisposableThrottledListener(node, type, handler, eventMerger, minimumTimeMs) {
        return new TimeoutThrottledDomListener(node, type, handler, eventMerger, minimumTimeMs);
    }
    exports.addDisposableThrottledListener = addDisposableThrottledListener;
    function getComputedStyle(el) {
        return document.defaultView.getComputedStyle(el, null);
    }
    exports.getComputedStyle = getComputedStyle;
    // Adapted from WinJS
    // Converts a CSS positioning string for the specified element to pixels.
    var convertToPixels = (function () {
        return function (element, value) {
            return parseFloat(value) || 0;
        };
    })();
    function getDimension(element, cssPropertyName, jsPropertyName) {
        var computedStyle = getComputedStyle(element);
        var value = '0';
        if (computedStyle) {
            if (computedStyle.getPropertyValue) {
                value = computedStyle.getPropertyValue(cssPropertyName);
            }
            else {
                // IE8
                value = computedStyle.getAttribute(jsPropertyName);
            }
        }
        return convertToPixels(element, value);
    }
    var sizeUtils = {
        getBorderLeftWidth: function (element) {
            return getDimension(element, 'border-left-width', 'borderLeftWidth');
        },
        getBorderTopWidth: function (element) {
            return getDimension(element, 'border-top-width', 'borderTopWidth');
        },
        getBorderRightWidth: function (element) {
            return getDimension(element, 'border-right-width', 'borderRightWidth');
        },
        getBorderBottomWidth: function (element) {
            return getDimension(element, 'border-bottom-width', 'borderBottomWidth');
        },
        getPaddingLeft: function (element) {
            return getDimension(element, 'padding-left', 'paddingLeft');
        },
        getPaddingTop: function (element) {
            return getDimension(element, 'padding-top', 'paddingTop');
        },
        getPaddingRight: function (element) {
            return getDimension(element, 'padding-right', 'paddingRight');
        },
        getPaddingBottom: function (element) {
            return getDimension(element, 'padding-bottom', 'paddingBottom');
        },
        getMarginLeft: function (element) {
            return getDimension(element, 'margin-left', 'marginLeft');
        },
        getMarginTop: function (element) {
            return getDimension(element, 'margin-top', 'marginTop');
        },
        getMarginRight: function (element) {
            return getDimension(element, 'margin-right', 'marginRight');
        },
        getMarginBottom: function (element) {
            return getDimension(element, 'margin-bottom', 'marginBottom');
        },
        __commaSentinel: false
    };
    // ----------------------------------------------------------------------------------------
    // Position & Dimension
    function getTopLeftOffset(element) {
        // Adapted from WinJS.Utilities.getPosition
        // and added borders to the mix
        var offsetParent = element.offsetParent, top = element.offsetTop, left = element.offsetLeft;
        while ((element = element.parentNode) !== null && element !== document.body && element !== document.documentElement) {
            top -= element.scrollTop;
            var c = getComputedStyle(element);
            if (c) {
                left -= c.direction !== 'rtl' ? element.scrollLeft : -element.scrollLeft;
            }
            if (element === offsetParent) {
                left += sizeUtils.getBorderLeftWidth(element);
                top += sizeUtils.getBorderTopWidth(element);
                top += element.offsetTop;
                left += element.offsetLeft;
                offsetParent = element.offsetParent;
            }
        }
        return {
            left: left,
            top: top
        };
    }
    exports.getTopLeftOffset = getTopLeftOffset;
    function getDomNodePosition(domNode) {
        var r = getTopLeftOffset(domNode);
        return {
            left: r.left,
            top: r.top,
            width: domNode.clientWidth,
            height: domNode.clientHeight
        };
    }
    exports.getDomNodePosition = getDomNodePosition;
    // Adapted from WinJS
    // Gets the width of the content of the specified element. The content width does not include borders or padding.
    function getContentWidth(element) {
        var border = sizeUtils.getBorderLeftWidth(element) + sizeUtils.getBorderRightWidth(element);
        var padding = sizeUtils.getPaddingLeft(element) + sizeUtils.getPaddingRight(element);
        return element.offsetWidth - border - padding;
    }
    exports.getContentWidth = getContentWidth;
    // Adapted from WinJS
    // Gets the width of the element, including margins.
    function getTotalWidth(element) {
        var margin = sizeUtils.getMarginLeft(element) + sizeUtils.getMarginRight(element);
        return element.offsetWidth + margin;
    }
    exports.getTotalWidth = getTotalWidth;
    // Adapted from WinJS
    // Gets the height of the content of the specified element. The content height does not include borders or padding.
    function getContentHeight(element) {
        var border = sizeUtils.getBorderTopWidth(element) + sizeUtils.getBorderBottomWidth(element);
        var padding = sizeUtils.getPaddingTop(element) + sizeUtils.getPaddingBottom(element);
        return element.offsetHeight - border - padding;
    }
    exports.getContentHeight = getContentHeight;
    // Adapted from WinJS
    // Gets the height of the element, including its margins.
    function getTotalHeight(element) {
        var margin = sizeUtils.getMarginTop(element) + sizeUtils.getMarginBottom(element);
        return element.offsetHeight + margin;
    }
    exports.getTotalHeight = getTotalHeight;
    // Gets the left coordinate of the specified element relative to the specified parent.
    function getRelativeLeft(element, parent) {
        if (element === null) {
            return 0;
        }
        var elementPosition = getTopLeftOffset(element);
        var parentPosition = getTopLeftOffset(parent);
        return elementPosition.left - parentPosition.left;
    }
    exports.getRelativeLeft = getRelativeLeft;
    // Gets the top coordinate of the element relative to the specified parent.
    function getRelativeTop(element, parent) {
        if (element === null) {
            return 0;
        }
        var elementPosition = getTopLeftOffset(element);
        var parentPosition = getTopLeftOffset(parent);
        return parentPosition.top - elementPosition.top;
    }
    exports.getRelativeTop = getRelativeTop;
    function getLargestChildWidth(parent, children) {
        var childWidths = children.map(function (child) {
            return getTotalWidth(child) + getRelativeLeft(child, parent) || 0;
        });
        var maxWidth = Math.max.apply(Math, childWidths);
        return maxWidth;
    }
    exports.getLargestChildWidth = getLargestChildWidth;
    // ----------------------------------------------------------------------------------------
    function isAncestor(testChild, testAncestor) {
        while (testChild) {
            if (testChild === testAncestor) {
                return true;
            }
            testChild = testChild.parentNode;
        }
        return false;
    }
    exports.isAncestor = isAncestor;
    function findParentWithClass(node, clazz, stopAtClazz) {
        while (node) {
            if (hasClass(node, clazz)) {
                return node;
            }
            if (stopAtClazz && hasClass(node, stopAtClazz)) {
                return null;
            }
            node = node.parentNode;
        }
        return null;
    }
    exports.findParentWithClass = findParentWithClass;
    function createStyleSheet() {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.media = 'screen';
        document.getElementsByTagName('head')[0].appendChild(style);
        return style;
    }
    exports.createStyleSheet = createStyleSheet;
    var sharedStyle = createStyleSheet();
    function getDynamicStyleSheetRules(style) {
        if (style && style.sheet && style.sheet.rules) {
            // Chrome, IE
            return style.sheet.rules;
        }
        if (style && style.sheet && style.sheet.cssRules) {
            // FF
            return style.sheet.cssRules;
        }
        return [];
    }
    function createCSSRule(selector, cssText, style) {
        if (style === void 0) { style = sharedStyle; }
        if (!style || !cssText) {
            return;
        }
        style.sheet.insertRule(selector + '{' + cssText + '}', 0);
    }
    exports.createCSSRule = createCSSRule;
    function getCSSRule(selector, style) {
        if (style === void 0) { style = sharedStyle; }
        if (!style) {
            return null;
        }
        var rules = getDynamicStyleSheetRules(style);
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            var normalizedSelectorText = rule.selectorText.replace(/::/gi, ':');
            if (normalizedSelectorText === selector) {
                return rule;
            }
        }
        return null;
    }
    exports.getCSSRule = getCSSRule;
    function removeCSSRulesWithPrefix(ruleName, style) {
        if (style === void 0) { style = sharedStyle; }
        if (!style) {
            return;
        }
        var rules = getDynamicStyleSheetRules(style);
        var toDelete = [];
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            var normalizedSelectorText = rule.selectorText.replace(/::/gi, ':');
            if (normalizedSelectorText.indexOf(ruleName) === 0) {
                toDelete.push(i);
            }
        }
        for (var i = toDelete.length - 1; i >= 0; i--) {
            style.sheet.deleteRule(toDelete[i]);
        }
    }
    exports.removeCSSRulesWithPrefix = removeCSSRulesWithPrefix;
    function isHTMLElement(o) {
        return browserService_1.getService().isHTMLElement(o);
    }
    exports.isHTMLElement = isHTMLElement;
    exports.EventType = {
        // Mouse
        CLICK: 'click',
        DBLCLICK: 'dblclick',
        MOUSE_UP: 'mouseup',
        MOUSE_DOWN: 'mousedown',
        MOUSE_OVER: 'mouseover',
        MOUSE_MOVE: 'mousemove',
        MOUSE_OUT: 'mouseout',
        CONTEXT_MENU: 'contextmenu',
        // Keyboard
        KEY_DOWN: 'keydown',
        KEY_PRESS: 'keypress',
        KEY_UP: 'keyup',
        // HTML Document
        LOAD: 'load',
        UNLOAD: 'unload',
        ABORT: 'abort',
        ERROR: 'error',
        RESIZE: 'resize',
        SCROLL: 'scroll',
        // Form
        SELECT: 'select',
        CHANGE: 'change',
        SUBMIT: 'submit',
        RESET: 'reset',
        FOCUS: 'focus',
        BLUR: 'blur',
        INPUT: 'input',
        // Local Storage
        STORAGE: 'storage',
        // Drag
        DRAG_START: 'dragstart',
        DRAG: 'drag',
        DRAG_ENTER: 'dragenter',
        DRAG_LEAVE: 'dragleave',
        DRAG_OVER: 'dragover',
        DROP: 'drop',
        DRAG_END: 'dragend',
        // Animation
        ANIMATION_START: browser_1.isWebKit ? 'webkitAnimationStart' : 'animationstart',
        ANIMATION_END: browser_1.isWebKit ? 'webkitAnimationEnd' : 'animationend',
        ANIMATION_ITERATION: browser_1.isWebKit ? 'webkitAnimationIteration' : 'animationiteration'
    };
    exports.EventHelper = {
        stop: function (e, cancelBubble) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            else {
                // IE8
                e.returnValue = false;
            }
            if (cancelBubble) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                else {
                    // IE8
                    e.cancelBubble = true;
                }
            }
        }
    };
    function saveParentsScrollTop(node) {
        var r = [];
        for (var i = 0; node && node.nodeType === node.ELEMENT_NODE; i++) {
            r[i] = node.scrollTop;
            node = node.parentNode;
        }
        return r;
    }
    exports.saveParentsScrollTop = saveParentsScrollTop;
    function restoreParentsScrollTop(node, state) {
        for (var i = 0; node && node.nodeType === node.ELEMENT_NODE; i++) {
            if (node.scrollTop !== state[i]) {
                node.scrollTop = state[i];
            }
            node = node.parentNode;
        }
    }
    exports.restoreParentsScrollTop = restoreParentsScrollTop;
    var FocusTracker = (function (_super) {
        __extends(FocusTracker, _super);
        function FocusTracker(element) {
            var _this = this;
            _super.call(this);
            var hasFocus = false;
            var loosingFocus = false;
            this._eventEmitter = this._register(new eventEmitter_1.EventEmitter());
            var onFocus = function (event) {
                loosingFocus = false;
                if (!hasFocus) {
                    hasFocus = true;
                    _this._eventEmitter.emit('focus', {});
                }
            };
            var onBlur = function (event) {
                if (hasFocus) {
                    loosingFocus = true;
                    window.setTimeout(function () {
                        if (loosingFocus) {
                            loosingFocus = false;
                            hasFocus = false;
                            _this._eventEmitter.emit('blur', {});
                        }
                    }, 0);
                }
            };
            this._register(addDisposableListener(element, exports.EventType.FOCUS, onFocus, true));
            this._register(addDisposableListener(element, exports.EventType.BLUR, onBlur, true));
        }
        FocusTracker.prototype.addFocusListener = function (fn) {
            return this._eventEmitter.addListener2('focus', fn);
        };
        FocusTracker.prototype.addBlurListener = function (fn) {
            return this._eventEmitter.addListener2('blur', fn);
        };
        return FocusTracker;
    }(lifecycle_1.Disposable));
    function trackFocus(element) {
        return new FocusTracker(element);
    }
    exports.trackFocus = trackFocus;
    function append(parent, child) {
        parent.appendChild(child);
        return child;
    }
    exports.append = append;
    var SELECTOR_REGEX = /([\w\-]+)?(#([\w\-]+))?((.([\w\-]+))*)/;
    // Similar to builder, but much more lightweight
    function emmet(description) {
        var match = SELECTOR_REGEX.exec(description);
        if (!match) {
            throw new Error('Bad use of emmet');
        }
        var result = document.createElement(match[1] || 'div');
        if (match[3]) {
            result.id = match[3];
        }
        if (match[4]) {
            result.className = match[4].replace(/\./g, ' ').trim();
        }
        return result;
    }
    exports.emmet = emmet;
    function show() {
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i - 0] = arguments[_i];
        }
        for (var _a = 0, elements_1 = elements; _a < elements_1.length; _a++) {
            var element = elements_1[_a];
            element.style.display = null;
        }
    }
    exports.show = show;
    function hide() {
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i - 0] = arguments[_i];
        }
        for (var _a = 0, elements_2 = elements; _a < elements_2.length; _a++) {
            var element = elements_2[_a];
            element.style.display = 'none';
        }
    }
    exports.hide = hide;
    function findParentWithAttribute(node, attribute) {
        while (node) {
            if (node instanceof HTMLElement && node.hasAttribute(attribute)) {
                return node;
            }
            node = node.parentNode;
        }
        return null;
    }
    function removeTabIndexAndUpdateFocus(node) {
        if (!node || !node.hasAttribute('tabIndex')) {
            return;
        }
        // If we are the currently focused element and tabIndex is removed,
        // standard DOM behavior is to move focus to the <body> element. We
        // typically never want that, rather put focus to the closest element
        // in the hierarchy of the parent DOM nodes.
        if (document.activeElement === node) {
            var parentFocusable = findParentWithAttribute(node.parentElement, 'tabIndex');
            if (parentFocusable) {
                parentFocusable.focus();
            }
        }
        node.removeAttribute('tabindex');
    }
    exports.removeTabIndexAndUpdateFocus = removeTabIndexAndUpdateFocus;
    function getElementsByTagName(tag) {
        return Array.prototype.slice.call(document.getElementsByTagName(tag), 0);
    }
    exports.getElementsByTagName = getElementsByTagName;
});
//# sourceMappingURL=dom.js.map