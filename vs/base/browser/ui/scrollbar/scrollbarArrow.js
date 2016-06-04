var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/base/browser/globalMouseMoveMonitor', 'vs/base/browser/ui/widget', 'vs/base/common/async'], function (require, exports, globalMouseMoveMonitor_1, widget_1, async_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    /**
     * The arrow image size.
     */
    exports.ARROW_IMG_SIZE = 11;
    var ScrollbarArrow = (function (_super) {
        __extends(ScrollbarArrow, _super);
        function ScrollbarArrow(opts) {
            var _this = this;
            _super.call(this);
            this._onActivate = opts.onActivate;
            this.bgDomNode = document.createElement('div');
            this.bgDomNode.className = 'arrow-background';
            this.bgDomNode.style.position = 'absolute';
            this.bgDomNode.style.width = opts.bgWidth + 'px';
            this.bgDomNode.style.height = opts.bgHeight + 'px';
            if (typeof opts.top !== 'undefined') {
                this.bgDomNode.style.top = '0px';
            }
            if (typeof opts.left !== 'undefined') {
                this.bgDomNode.style.left = '0px';
            }
            if (typeof opts.bottom !== 'undefined') {
                this.bgDomNode.style.bottom = '0px';
            }
            if (typeof opts.right !== 'undefined') {
                this.bgDomNode.style.right = '0px';
            }
            this.domNode = document.createElement('div');
            this.domNode.className = opts.className;
            this.domNode.style.position = 'absolute';
            this.domNode.style.width = exports.ARROW_IMG_SIZE + 'px';
            this.domNode.style.height = exports.ARROW_IMG_SIZE + 'px';
            if (typeof opts.top !== 'undefined') {
                this.domNode.style.top = opts.top + 'px';
            }
            if (typeof opts.left !== 'undefined') {
                this.domNode.style.left = opts.left + 'px';
            }
            if (typeof opts.bottom !== 'undefined') {
                this.domNode.style.bottom = opts.bottom + 'px';
            }
            if (typeof opts.right !== 'undefined') {
                this.domNode.style.right = opts.right + 'px';
            }
            this._mouseMoveMonitor = this._register(new globalMouseMoveMonitor_1.GlobalMouseMoveMonitor());
            this.onmousedown(this.bgDomNode, function (e) { return _this._arrowMouseDown(e); });
            this.onmousedown(this.domNode, function (e) { return _this._arrowMouseDown(e); });
            this._mousedownRepeatTimer = this._register(new async_1.IntervalTimer());
            this._mousedownScheduleRepeatTimer = this._register(new async_1.TimeoutTimer());
        }
        ScrollbarArrow.prototype._arrowMouseDown = function (e) {
            var _this = this;
            var scheduleRepeater = function () {
                _this._mousedownRepeatTimer.cancelAndSet(function () { return _this._onActivate(); }, 1000 / 24);
            };
            this._onActivate();
            this._mousedownRepeatTimer.cancel();
            this._mousedownScheduleRepeatTimer.cancelAndSet(scheduleRepeater, 200);
            this._mouseMoveMonitor.startMonitoring(globalMouseMoveMonitor_1.standardMouseMoveMerger, function (mouseMoveData) {
                /* Intentional empty */
            }, function () {
                _this._mousedownRepeatTimer.cancel();
                _this._mousedownScheduleRepeatTimer.cancel();
            });
            e.preventDefault();
        };
        return ScrollbarArrow;
    }(widget_1.Widget));
    exports.ScrollbarArrow = ScrollbarArrow;
});
//# sourceMappingURL=scrollbarArrow.js.map