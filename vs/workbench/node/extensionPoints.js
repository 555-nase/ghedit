/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/nls', 'vs/base/common/platform', 'vs/base/node/pfs', 'vs/base/common/severity', 'vs/base/common/winjs.base', 'vs/base/common/collections', 'vs/base/common/paths', 'vs/base/common/json', 'vs/base/common/types', 'vs/platform/extensions/node/extensionValidator', 'semver'], function (require, exports, nls, Platform, pfs, severity_1, winjs_base_1, collections_1, paths, json, Types, extensionValidator_1, semver) {
    'use strict';
    var MANIFEST_FILE = 'package.json';
    var devMode = !!process.env['VSCODE_DEV'];
    var nlsConfig = {
        locale: Platform.locale,
        pseudo: Platform.locale === 'pseudo'
    };
    var MessagesCollector = (function () {
        function MessagesCollector() {
            this._messages = [];
        }
        MessagesCollector.prototype.getMessages = function () {
            return this._messages;
        };
        MessagesCollector.prototype._msg = function (source, type, message) {
            this._messages.push({
                type: type,
                message: message,
                source: source
            });
        };
        MessagesCollector.prototype.error = function (source, message) {
            this._msg(source, severity_1.default.Error, message);
        };
        MessagesCollector.prototype.warn = function (source, message) {
            this._msg(source, severity_1.default.Warning, message);
        };
        MessagesCollector.prototype.info = function (source, message) {
            this._msg(source, severity_1.default.Info, message);
        };
        return MessagesCollector;
    }());
    exports.MessagesCollector = MessagesCollector;
    var ExtensionManifestHandler = (function () {
        function ExtensionManifestHandler(ourVersion, collector, absoluteFolderPath, isBuiltin) {
            this._ourVersion = ourVersion;
            this._collector = collector;
            this._absoluteFolderPath = absoluteFolderPath;
            this._isBuiltin = isBuiltin;
            this._absoluteManifestPath = paths.join(absoluteFolderPath, MANIFEST_FILE);
        }
        return ExtensionManifestHandler;
    }());
    var ExtensionManifestParser = (function (_super) {
        __extends(ExtensionManifestParser, _super);
        function ExtensionManifestParser() {
            _super.apply(this, arguments);
        }
        ExtensionManifestParser.prototype.parse = function () {
            var _this = this;
            return pfs.readFile(this._absoluteManifestPath).then(function (manifestContents) {
                var errors = [];
                var extensionDescription = json.parse(manifestContents.toString(), errors);
                if (errors.length > 0) {
                    errors.forEach(function (error) {
                        _this._collector.error(_this._absoluteFolderPath, nls.localize('jsonParseFail', "Failed to parse {0}: {1}.", _this._absoluteManifestPath, error));
                    });
                    return null;
                }
                return extensionDescription;
            }, function (err) {
                _this._collector.error(_this._absoluteFolderPath, nls.localize('fileReadFail', "Cannot read file {0}: {1}.", _this._absoluteManifestPath, err.message));
                return null;
            });
        };
        return ExtensionManifestParser;
    }(ExtensionManifestHandler));
    var ExtensionManifestNLSReplacer = (function (_super) {
        __extends(ExtensionManifestNLSReplacer, _super);
        function ExtensionManifestNLSReplacer() {
            _super.apply(this, arguments);
        }
        ExtensionManifestNLSReplacer.prototype.replaceNLS = function (extensionDescription) {
            var _this = this;
            var extension = paths.extname(this._absoluteManifestPath);
            var basename = this._absoluteManifestPath.substr(0, this._absoluteManifestPath.length - extension.length);
            return pfs.fileExists(basename + '.nls' + extension).then(function (exists) {
                if (!exists) {
                    return extensionDescription;
                }
                return ExtensionManifestNLSReplacer.findMessageBundle(basename).then(function (messageBundle) {
                    if (!messageBundle) {
                        return extensionDescription;
                    }
                    return pfs.readFile(messageBundle).then(function (messageBundleContent) {
                        var errors = [];
                        var messages = json.parse(messageBundleContent.toString(), errors);
                        if (errors.length > 0) {
                            errors.forEach(function (error) {
                                _this._collector.error(_this._absoluteFolderPath, nls.localize('jsonParseFail', "Failed to parse {0}: {1}.", messageBundle, error));
                            });
                            return extensionDescription;
                        }
                        ExtensionManifestNLSReplacer._replaceNLStrings(extensionDescription, messages, _this._collector, _this._absoluteFolderPath);
                        return extensionDescription;
                    }, function (err) {
                        _this._collector.error(_this._absoluteFolderPath, nls.localize('fileReadFail', "Cannot read file {0}: {1}.", messageBundle, err.message));
                        return null;
                    });
                });
            });
        };
        ExtensionManifestNLSReplacer.findMessageBundle = function (basename) {
            return new winjs_base_1.TPromise(function (c, e, p) {
                function loop(basename, locale) {
                    var toCheck = basename + ".nls." + locale + ".json";
                    pfs.fileExists(toCheck).then(function (exists) {
                        if (exists) {
                            c(toCheck);
                        }
                        var index = locale.lastIndexOf('-');
                        if (index === -1) {
                            c(basename + ".nls.json");
                        }
                        else {
                            locale = locale.substring(0, index);
                            loop(basename, locale);
                        }
                    });
                }
                if (devMode || nlsConfig.pseudo || !nlsConfig.locale) {
                    return c(basename + '.nls.json');
                }
                loop(basename, nlsConfig.locale);
            });
        };
        /**
         * This routine make the following assumptions:
         * The root element is a object literal
         * Strings to replace are one values of a key. So for example string[] are ignored.
         * This is done to speed things up.
         */
        ExtensionManifestNLSReplacer._replaceNLStrings = function (literal, messages, collector, messageScope) {
            Object.keys(literal).forEach(function (key) {
                if (literal.hasOwnProperty(key)) {
                    var value = literal[key];
                    if (Types.isString(value)) {
                        var str = value;
                        var length_1 = str.length;
                        if (length_1 > 1 && str[0] === '%' && str[length_1 - 1] === '%') {
                            var messageKey = str.substr(1, length_1 - 2);
                            var message = messages[messageKey];
                            if (message) {
                                if (nlsConfig.pseudo) {
                                    // FF3B and FF3D is the Unicode zenkaku representation for [ and ]
                                    message = '\uFF3B' + message.replace(/[aouei]/g, '$&$&') + '\uFF3D';
                                }
                                literal[key] = message;
                            }
                            else {
                                collector.warn(messageScope, nls.localize('missingNLSKey', "Couldn't find message for key {0}.", messageKey));
                            }
                        }
                    }
                    else if (Types.isObject(value)) {
                        ExtensionManifestNLSReplacer._replaceNLStrings(value, messages, collector, messageScope);
                    }
                    else if (Types.isArray(value)) {
                        value.forEach(function (element) {
                            if (Types.isObject(element)) {
                                ExtensionManifestNLSReplacer._replaceNLStrings(element, messages, collector, messageScope);
                            }
                        });
                    }
                }
            });
        };
        return ExtensionManifestNLSReplacer;
    }(ExtensionManifestHandler));
    var ExtensionManifestValidator = (function (_super) {
        __extends(ExtensionManifestValidator, _super);
        function ExtensionManifestValidator() {
            _super.apply(this, arguments);
        }
        ExtensionManifestValidator.prototype.validate = function (extensionDescription) {
            var _this = this;
            extensionDescription.isBuiltin = this._isBuiltin;
            var notices = [];
            if (!extensionValidator_1.isValidExtensionDescription(this._ourVersion, this._absoluteFolderPath, extensionDescription, notices)) {
                notices.forEach(function (error) {
                    _this._collector.error(_this._absoluteFolderPath, error);
                });
                return null;
            }
            // in this case the notices are warnings
            notices.forEach(function (error) {
                _this._collector.warn(_this._absoluteFolderPath, error);
            });
            // id := `publisher.name`
            extensionDescription.id = extensionDescription.publisher + "." + extensionDescription.name;
            // main := absolutePath(`main`)
            if (extensionDescription.main) {
                extensionDescription.main = paths.normalize(paths.join(this._absoluteFolderPath, extensionDescription.main));
            }
            extensionDescription.extensionFolderPath = this._absoluteFolderPath;
            return extensionDescription;
        };
        return ExtensionManifestValidator;
    }(ExtensionManifestHandler));
    var ExtensionScanner = (function () {
        function ExtensionScanner() {
        }
        /**
         * Read the extension defined in `absoluteFolderPath`
         */
        ExtensionScanner.scanExtension = function (version, collector, absoluteFolderPath, isBuiltin) {
            absoluteFolderPath = paths.normalize(absoluteFolderPath);
            var parser = new ExtensionManifestParser(version, collector, absoluteFolderPath, isBuiltin);
            return parser.parse().then(function (extensionDescription) {
                if (extensionDescription === null) {
                    return null;
                }
                var nlsReplacer = new ExtensionManifestNLSReplacer(version, collector, absoluteFolderPath, isBuiltin);
                return nlsReplacer.replaceNLS(extensionDescription);
            }).then(function (extensionDescription) {
                if (extensionDescription === null) {
                    return null;
                }
                var validator = new ExtensionManifestValidator(version, collector, absoluteFolderPath, isBuiltin);
                return validator.validate(extensionDescription);
            });
        };
        /**
         * Scan a list of extensions defined in `absoluteFolderPath`
         */
        ExtensionScanner.scanExtensions = function (version, collector, absoluteFolderPath, isBuiltin) {
            var _this = this;
            var obsolete = winjs_base_1.TPromise.as({});
            if (!isBuiltin) {
                obsolete = pfs.readFile(paths.join(absoluteFolderPath, '.obsolete'), 'utf8')
                    .then(function (raw) { return JSON.parse(raw); })
                    .then(null, function (err) { return ({}); });
            }
            return obsolete.then(function (obsolete) {
                return pfs.readDirsInDir(absoluteFolderPath)
                    .then(function (folders) { return winjs_base_1.TPromise.join(folders.map(function (f) { return _this.scanExtension(version, collector, paths.join(absoluteFolderPath, f), isBuiltin); })); })
                    .then(function (extensionDescriptions) { return extensionDescriptions.filter(function (item) { return item !== null; }); })
                    .then(function (extensionDescriptions) { return extensionDescriptions.filter(function (p) { return !obsolete[(p.publisher + "." + p.name + "-" + p.version)]; }); })
                    .then(function (extensionDescriptions) {
                    var extensionDescriptionsById = collections_1.values(collections_1.groupBy(extensionDescriptions, function (p) { return p.id; }));
                    return extensionDescriptionsById.map(function (p) { return p.sort(function (a, b) { return semver.rcompare(a.version, b.version); })[0]; });
                })
                    .then(null, function (err) {
                    collector.error(absoluteFolderPath, err);
                    return [];
                });
            });
        };
        /**
         * Combination of scanExtension and scanExtensions: If an extension manifest is found at root, we load just this extension,
         * otherwise we assume the folder contains multiple extensions.
         */
        ExtensionScanner.scanOneOrMultipleExtensions = function (version, collector, absoluteFolderPath, isBuiltin) {
            var _this = this;
            return pfs.fileExists(paths.join(absoluteFolderPath, MANIFEST_FILE)).then(function (exists) {
                if (exists) {
                    return _this.scanExtension(version, collector, absoluteFolderPath, isBuiltin).then(function (extensionDescription) {
                        if (extensionDescription === null) {
                            return [];
                        }
                        return [extensionDescription];
                    });
                }
                return _this.scanExtensions(version, collector, absoluteFolderPath, isBuiltin);
            }, function (err) {
                collector.error(absoluteFolderPath, err);
                return [];
            });
        };
        return ExtensionScanner;
    }());
    exports.ExtensionScanner = ExtensionScanner;
});
//# sourceMappingURL=extensionPoints.js.map