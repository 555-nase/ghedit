/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", 'vs/nls!vs/editor/contrib/rename/common/rename', 'vs/base/common/async', 'vs/base/common/errors', 'vs/editor/common/editorCommonExtensions', 'vs/editor/common/modes'], function (require, exports, nls_1, async_1, errors_1, editorCommonExtensions_1, modes_1) {
    'use strict';
    function rename(model, position, newName) {
        var supports = modes_1.RenameRegistry.ordered(model);
        var resource = model.getAssociatedResource();
        var rejects = [];
        var hasResult = false;
        var factory = supports.map(function (support) {
            return function () {
                if (!hasResult) {
                    return support.rename(resource, position, newName).then(function (result) {
                        if (!result) {
                        }
                        else if (!result.rejectReason) {
                            hasResult = true;
                            return result;
                        }
                        else {
                            rejects.push(result.rejectReason);
                        }
                    });
                }
            };
        });
        return async_1.sequence(factory).then(function (values) {
            var result = values[0];
            if (rejects.length > 0) {
                return {
                    currentName: undefined,
                    edits: undefined,
                    rejectReason: rejects.join('\n')
                };
            }
            else if (!result) {
                return {
                    currentName: undefined,
                    edits: undefined,
                    rejectReason: nls_1.localize(0, null)
                };
            }
            else {
                return result;
            }
        });
    }
    exports.rename = rename;
    editorCommonExtensions_1.CommonEditorRegistry.registerDefaultLanguageCommand('_executeDocumentRenameProvider', function (model, position, args) {
        var newName = args.newName;
        if (typeof newName !== 'string') {
            throw errors_1.illegalArgument('newName');
        }
        return rename(model, position, newName);
    });
});
//# sourceMappingURL=rename.js.map