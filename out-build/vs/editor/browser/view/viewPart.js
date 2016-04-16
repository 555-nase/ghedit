var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/editor/common/viewModel/viewEventHandler'], function (require, exports, viewEventHandler_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var ViewPart = (function (_super) {
        __extends(ViewPart, _super);
        function ViewPart(context) {
            _super.call(this);
            this._context = context;
            this._context.addEventHandler(this);
        }
        ViewPart.prototype.dispose = function () {
            this._context.removeEventHandler(this);
            this._context = null;
        };
        return ViewPart;
    }(viewEventHandler_1.ViewEventHandler));
    exports.ViewPart = ViewPart;
});
