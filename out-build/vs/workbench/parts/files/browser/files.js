var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/workbench/browser/parts/editor/baseEditor'], function (require, exports, baseEditor_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    /**
     * A lightweight descriptor of an editor for files. Optionally allows to specify a list of mime types the editor
     * should be used for. This allows for fine grained contribution of editors to the Platform based on mime types. Wildcards
     * can be used (e.g. text/*) to register an editor on a wider range of mime types.
     */
    var FileEditorDescriptor = (function (_super) {
        __extends(FileEditorDescriptor, _super);
        function FileEditorDescriptor(id, name, moduleId, ctorName, mimetypes) {
            _super.call(this, id, name, moduleId, ctorName);
            this.mimetypes = mimetypes;
        }
        FileEditorDescriptor.prototype.getMimeTypes = function () {
            return this.mimetypes;
        };
        return FileEditorDescriptor;
    }(baseEditor_1.EditorDescriptor));
    exports.FileEditorDescriptor = FileEditorDescriptor;
});
//# sourceMappingURL=files.js.map