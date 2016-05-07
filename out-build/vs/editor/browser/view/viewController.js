define(["require", "exports", 'vs/editor/common/core/position', 'vs/editor/common/editorCommon'], function (require, exports, position_1, editorCommon) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var ViewController = (function () {
        function ViewController(viewModel, configuration, outgoingEventBus, keybindingService) {
            this.viewModel = viewModel;
            this.configuration = configuration;
            this.outgoingEventBus = outgoingEventBus;
            this.keybindingService = keybindingService;
        }
        ViewController.prototype.paste = function (source, text, pasteOnNewLine) {
            this.keybindingService.executeCommand(editorCommon.Handler.Paste, {
                text: text,
                pasteOnNewLine: pasteOnNewLine,
            });
        };
        ViewController.prototype.type = function (source, text) {
            this.keybindingService.executeCommand(editorCommon.Handler.Type, {
                text: text
            });
        };
        ViewController.prototype.replacePreviousChar = function (source, text, replaceCharCnt) {
            this.keybindingService.executeCommand(editorCommon.Handler.ReplacePreviousChar, {
                text: text,
                replaceCharCnt: replaceCharCnt
            });
        };
        ViewController.prototype.cut = function (source) {
            this.keybindingService.executeCommand(editorCommon.Handler.Cut, {});
        };
        ViewController.prototype._validateViewColumn = function (viewPosition) {
            var minColumn = this.viewModel.getLineMinColumn(viewPosition.lineNumber);
            if (viewPosition.column < minColumn) {
                return new position_1.Position(viewPosition.lineNumber, minColumn);
            }
            return viewPosition;
        };
        ViewController.prototype.dispatchMouse = function (data) {
            if (data.startedOnLineNumbers) {
                // If the dragging started on the gutter, then have operations work on the entire line
                if (data.altKey) {
                    if (data.inSelectionMode) {
                        this.lastCursorLineSelect('mouse', data.position);
                    }
                    else {
                        this.createCursor('mouse', data.position, true);
                    }
                }
                else {
                    if (data.inSelectionMode) {
                        this.lineSelectDrag('mouse', data.position);
                    }
                    else {
                        this.lineSelect('mouse', data.position);
                    }
                }
            }
            else if (data.mouseDownCount >= 4) {
                this.selectAll('mouse');
            }
            else if (data.mouseDownCount === 3) {
                if (data.altKey) {
                    if (data.inSelectionMode) {
                        this.lastCursorLineSelectDrag('mouse', data.position);
                    }
                    else {
                        this.lastCursorLineSelect('mouse', data.position);
                    }
                }
                else {
                    if (data.inSelectionMode) {
                        this.lineSelectDrag('mouse', data.position);
                    }
                    else {
                        this.lineSelect('mouse', data.position);
                    }
                }
            }
            else if (data.mouseDownCount === 2) {
                if (data.altKey) {
                    this.lastCursorWordSelect('mouse', data.position);
                }
                else {
                    if (data.inSelectionMode) {
                        this.wordSelectDrag('mouse', data.position);
                    }
                    else {
                        this.wordSelect('mouse', data.position);
                    }
                }
            }
            else {
                if (data.altKey) {
                    if (!data.ctrlKey && !data.metaKey) {
                        if (data.shiftKey) {
                            this.columnSelect('mouse', data.position, data.mouseColumn);
                        }
                        else {
                            // Do multi-cursor operations only when purely alt is pressed
                            if (data.inSelectionMode) {
                                this.lastCursorMoveToSelect('mouse', data.position);
                            }
                            else {
                                this.createCursor('mouse', data.position, false);
                            }
                        }
                    }
                }
                else {
                    if (data.inSelectionMode) {
                        this.moveToSelect('mouse', data.position);
                    }
                    else {
                        this.moveTo('mouse', data.position);
                    }
                }
            }
        };
        ViewController.prototype.moveTo = function (source, viewPosition) {
            viewPosition = this._validateViewColumn(viewPosition);
            this.configuration.handlerDispatcher.trigger(source, editorCommon.Handler.MoveTo, {
                position: this.convertViewToModelPosition(viewPosition),
                viewPosition: viewPosition
            });
        };
        ViewController.prototype.moveToSelect = function (source, viewPosition) {
            viewPosition = this._validateViewColumn(viewPosition);
            this.configuration.handlerDispatcher.trigger(source, editorCommon.Handler.MoveToSelect, {
                position: this.convertViewToModelPosition(viewPosition),
                viewPosition: viewPosition
            });
        };
        ViewController.prototype.columnSelect = function (source, viewPosition, mouseColumn) {
            viewPosition = this._validateViewColumn(viewPosition);
            this.configuration.handlerDispatcher.trigger(source, editorCommon.Handler.ColumnSelect, {
                position: this.convertViewToModelPosition(viewPosition),
                viewPosition: viewPosition,
                mouseColumn: mouseColumn
            });
        };
        ViewController.prototype.createCursor = function (source, viewPosition, wholeLine) {
            viewPosition = this._validateViewColumn(viewPosition);
            this.configuration.handlerDispatcher.trigger(source, editorCommon.Handler.CreateCursor, {
                position: this.convertViewToModelPosition(viewPosition),
                viewPosition: viewPosition,
                wholeLine: wholeLine
            });
        };
        ViewController.prototype.lastCursorMoveToSelect = function (source, viewPosition) {
            viewPosition = this._validateViewColumn(viewPosition);
            this.configuration.handlerDispatcher.trigger(source, editorCommon.Handler.LastCursorMoveToSelect, {
                position: this.convertViewToModelPosition(viewPosition),
                viewPosition: viewPosition
            });
        };
        ViewController.prototype.wordSelect = function (source, viewPosition) {
            viewPosition = this._validateViewColumn(viewPosition);
            this.configuration.handlerDispatcher.trigger(source, editorCommon.Handler.WordSelect, {
                position: this.convertViewToModelPosition(viewPosition)
            });
        };
        ViewController.prototype.wordSelectDrag = function (source, viewPosition) {
            viewPosition = this._validateViewColumn(viewPosition);
            this.configuration.handlerDispatcher.trigger(source, editorCommon.Handler.WordSelectDrag, {
                position: this.convertViewToModelPosition(viewPosition)
            });
        };
        ViewController.prototype.lastCursorWordSelect = function (source, viewPosition) {
            viewPosition = this._validateViewColumn(viewPosition);
            this.configuration.handlerDispatcher.trigger(source, editorCommon.Handler.LastCursorWordSelect, {
                position: this.convertViewToModelPosition(viewPosition)
            });
        };
        ViewController.prototype.lineSelect = function (source, viewPosition) {
            viewPosition = this._validateViewColumn(viewPosition);
            this.configuration.handlerDispatcher.trigger(source, editorCommon.Handler.LineSelect, {
                position: this.convertViewToModelPosition(viewPosition),
                viewPosition: viewPosition
            });
        };
        ViewController.prototype.lineSelectDrag = function (source, viewPosition) {
            viewPosition = this._validateViewColumn(viewPosition);
            this.configuration.handlerDispatcher.trigger(source, editorCommon.Handler.LineSelectDrag, {
                position: this.convertViewToModelPosition(viewPosition),
                viewPosition: viewPosition
            });
        };
        ViewController.prototype.lastCursorLineSelect = function (source, viewPosition) {
            viewPosition = this._validateViewColumn(viewPosition);
            this.configuration.handlerDispatcher.trigger(source, editorCommon.Handler.LastCursorLineSelect, {
                position: this.convertViewToModelPosition(viewPosition),
                viewPosition: viewPosition
            });
        };
        ViewController.prototype.lastCursorLineSelectDrag = function (source, viewPosition) {
            viewPosition = this._validateViewColumn(viewPosition);
            this.configuration.handlerDispatcher.trigger(source, editorCommon.Handler.LastCursorLineSelectDrag, {
                position: this.convertViewToModelPosition(viewPosition),
                viewPosition: viewPosition
            });
        };
        ViewController.prototype.selectAll = function (source) {
            this.configuration.handlerDispatcher.trigger(source, editorCommon.Handler.SelectAll, null);
        };
        // ----------------------
        ViewController.prototype.convertViewToModelPosition = function (viewPosition) {
            return this.viewModel.convertViewPositionToModelPosition(viewPosition.lineNumber, viewPosition.column);
        };
        ViewController.prototype.convertViewToModelRange = function (viewRange) {
            return this.viewModel.convertViewRangeToModelRange(viewRange);
        };
        ViewController.prototype.convertViewToModelMouseEvent = function (e) {
            if (e.target) {
                if (e.target.position) {
                    e.target.position = this.convertViewToModelPosition(e.target.position);
                }
                if (e.target.range) {
                    e.target.range = this.convertViewToModelRange(e.target.range);
                }
            }
        };
        ViewController.prototype.emitKeyDown = function (e) {
            this.outgoingEventBus.emit(editorCommon.EventType.KeyDown, e);
        };
        ViewController.prototype.emitKeyUp = function (e) {
            this.outgoingEventBus.emit(editorCommon.EventType.KeyUp, e);
        };
        ViewController.prototype.emitContextMenu = function (e) {
            this.convertViewToModelMouseEvent(e);
            this.outgoingEventBus.emit(editorCommon.EventType.ContextMenu, e);
        };
        ViewController.prototype.emitMouseMove = function (e) {
            this.convertViewToModelMouseEvent(e);
            this.outgoingEventBus.emit(editorCommon.EventType.MouseMove, e);
        };
        ViewController.prototype.emitMouseLeave = function (e) {
            this.convertViewToModelMouseEvent(e);
            this.outgoingEventBus.emit(editorCommon.EventType.MouseLeave, e);
        };
        ViewController.prototype.emitMouseUp = function (e) {
            this.convertViewToModelMouseEvent(e);
            this.outgoingEventBus.emit(editorCommon.EventType.MouseUp, e);
        };
        ViewController.prototype.emitMouseDown = function (e) {
            this.convertViewToModelMouseEvent(e);
            this.outgoingEventBus.emit(editorCommon.EventType.MouseDown, e);
        };
        return ViewController;
    }());
    exports.ViewController = ViewController;
});
//# sourceMappingURL=viewController.js.map