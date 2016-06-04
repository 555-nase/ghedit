define(["require", "exports"], function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var ViewContext = (function () {
        function ViewContext(configuration, model, privateViewEventBus, addEventHandler, removeEventHandler) {
            this.configuration = configuration;
            this.model = model;
            this.privateViewEventBus = privateViewEventBus;
            this.addEventHandler = addEventHandler;
            this.removeEventHandler = removeEventHandler;
        }
        return ViewContext;
    }());
    exports.ViewContext = ViewContext;
});
//# sourceMappingURL=viewContext.js.map