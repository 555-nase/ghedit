define(["require", "exports", 'vs/editor/common/editorCommon'], function (require, exports, editorCommon) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var ViewEventHandler = (function () {
        function ViewEventHandler() {
            this._shouldRender = true;
        }
        ViewEventHandler.prototype.shouldRender = function () {
            return this._shouldRender;
        };
        ViewEventHandler.prototype.setShouldRender = function () {
            this._shouldRender = true;
        };
        ViewEventHandler.prototype.onDidRender = function () {
            this._shouldRender = false;
        };
        // --- begin event handlers
        ViewEventHandler.prototype.onLineMappingChanged = function () {
            return false;
        };
        ViewEventHandler.prototype.onModelFlushed = function () {
            return false;
        };
        ViewEventHandler.prototype.onModelDecorationsChanged = function (e) {
            return false;
        };
        ViewEventHandler.prototype.onModelLinesDeleted = function (e) {
            return false;
        };
        ViewEventHandler.prototype.onModelLineChanged = function (e) {
            return false;
        };
        ViewEventHandler.prototype.onModelLinesInserted = function (e) {
            return false;
        };
        ViewEventHandler.prototype.onModelTokensChanged = function (e) {
            return false;
        };
        ViewEventHandler.prototype.onCursorPositionChanged = function (e) {
            return false;
        };
        ViewEventHandler.prototype.onCursorSelectionChanged = function (e) {
            return false;
        };
        ViewEventHandler.prototype.onCursorRevealRange = function (e) {
            return false;
        };
        ViewEventHandler.prototype.onCursorScrollRequest = function (e) {
            return false;
        };
        ViewEventHandler.prototype.onConfigurationChanged = function (e) {
            return false;
        };
        ViewEventHandler.prototype.onLayoutChanged = function (layoutInfo) {
            return false;
        };
        ViewEventHandler.prototype.onScrollChanged = function (e) {
            return false;
        };
        ViewEventHandler.prototype.onZonesChanged = function () {
            return false;
        };
        ViewEventHandler.prototype.onScrollWidthChanged = function (scrollWidth) {
            return false;
        };
        ViewEventHandler.prototype.onScrollHeightChanged = function (scrollHeight) {
            return false;
        };
        ViewEventHandler.prototype.onViewFocusChanged = function (isFocused) {
            return false;
        };
        // --- end event handlers
        ViewEventHandler.prototype.handleEvents = function (events) {
            var shouldRender = false;
            for (var i = 0, len = events.length; i < len; i++) {
                var e = events[i];
                var data = e.getData();
                switch (e.getType()) {
                    case editorCommon.ViewEventNames.LineMappingChangedEvent:
                        if (this.onLineMappingChanged()) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.ViewEventNames.ModelFlushedEvent:
                        if (this.onModelFlushed()) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.ViewEventNames.LinesDeletedEvent:
                        if (this.onModelLinesDeleted(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.ViewEventNames.LinesInsertedEvent:
                        if (this.onModelLinesInserted(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.ViewEventNames.LineChangedEvent:
                        if (this.onModelLineChanged(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.ViewEventNames.TokensChangedEvent:
                        if (this.onModelTokensChanged(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.ViewEventNames.DecorationsChangedEvent:
                        if (this.onModelDecorationsChanged(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.ViewEventNames.CursorPositionChangedEvent:
                        if (this.onCursorPositionChanged(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.ViewEventNames.CursorSelectionChangedEvent:
                        if (this.onCursorSelectionChanged(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.ViewEventNames.RevealRangeEvent:
                        if (this.onCursorRevealRange(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.ViewEventNames.ScrollRequestEvent:
                        if (this.onCursorScrollRequest(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.EventType.ConfigurationChanged:
                        if (this.onConfigurationChanged(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.EventType.ViewLayoutChanged:
                        if (this.onLayoutChanged(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.EventType.ViewScrollChanged:
                        if (this.onScrollChanged(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.EventType.ViewZonesChanged:
                        if (this.onZonesChanged()) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.EventType.ViewScrollWidthChanged:
                        if (this.onScrollWidthChanged(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.EventType.ViewScrollHeightChanged:
                        if (this.onScrollHeightChanged(data)) {
                            shouldRender = true;
                        }
                        break;
                    case editorCommon.EventType.ViewFocusChanged:
                        if (this.onViewFocusChanged(data)) {
                            shouldRender = true;
                        }
                        break;
                    default:
                        console.info('View received unknown event: ');
                        console.info(e);
                }
            }
            if (shouldRender) {
                this._shouldRender = true;
            }
        };
        return ViewEventHandler;
    }());
    exports.ViewEventHandler = ViewEventHandler;
});
//# sourceMappingURL=viewEventHandler.js.map