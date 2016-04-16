/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", 'vs/editor/common/core/range'], function (require, exports, range_1) {
    "use strict";
    function getIndentationEditOperations(model, builder, tabSize, tabsToSpaces) {
        if (model.getLineCount() === 1 && model.getLineMaxColumn(1) === 1) {
            // Model is empty
            return;
        }
        var spaces = '';
        for (var i = 0; i < tabSize; i++) {
            spaces += ' ';
        }
        var content = model.getLinesContent();
        for (var i = 0; i < content.length; i++) {
            var lastIndentationColumn = model.getLineFirstNonWhitespaceColumn(i + 1);
            if (lastIndentationColumn === 0) {
                lastIndentationColumn = model.getLineMaxColumn(i + 1);
            }
            var text = (tabsToSpaces ? content[i].substr(0, lastIndentationColumn).replace(/\t/ig, spaces) :
                content[i].substr(0, lastIndentationColumn).replace(new RegExp(spaces, 'gi'), '\t')) +
                content[i].substr(lastIndentationColumn);
            builder.addEditOperation(new range_1.Range(i + 1, 1, i + 1, model.getLineMaxColumn(i + 1)), text);
        }
    }
    var IndentationToSpacesCommand = (function () {
        function IndentationToSpacesCommand(selection, tabSize) {
            this.selection = selection;
            this.tabSize = tabSize;
        }
        IndentationToSpacesCommand.prototype.getEditOperations = function (model, builder) {
            this.selectionId = builder.trackSelection(this.selection);
            getIndentationEditOperations(model, builder, this.tabSize, true);
        };
        IndentationToSpacesCommand.prototype.computeCursorState = function (model, helper) {
            return helper.getTrackedSelection(this.selectionId);
        };
        return IndentationToSpacesCommand;
    }());
    exports.IndentationToSpacesCommand = IndentationToSpacesCommand;
    var IndentationToTabsCommand = (function () {
        function IndentationToTabsCommand(selection, tabSize) {
            this.selection = selection;
            this.tabSize = tabSize;
        }
        IndentationToTabsCommand.prototype.getEditOperations = function (model, builder) {
            this.selectionId = builder.trackSelection(this.selection);
            getIndentationEditOperations(model, builder, this.tabSize, false);
        };
        IndentationToTabsCommand.prototype.computeCursorState = function (model, helper) {
            return helper.getTrackedSelection(this.selectionId);
        };
        return IndentationToTabsCommand;
    }());
    exports.IndentationToTabsCommand = IndentationToTabsCommand;
});
