/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","vs/base/common/errors","vs/base/common/uri","vs/base/common/winjs.base","vs/editor/common/core/range","vs/editor/common/editorCommonExtensions","vs/editor/common/modes","vs/editor/common/services/modelService","vs/base/common/async"],function(e,r,o,t,n,i,s,a,m,g){"use strict";function u(e,r,o){var t=a.DocumentRangeFormattingEditProviderRegistry.ordered(e)[0];return t?g.asWinJsPromise(function(n){return t.provideDocumentRangeFormattingEdits(e,r,o,n)}):n.TPromise.as(void 0)}function d(e,r){var o=a.DocumentFormattingEditProviderRegistry.ordered(e)[0];return o?g.asWinJsPromise(function(t){return o.provideDocumentFormattingEdits(e,r,t)}):u(e,e.getFullModelRange(),r)}function c(e,r,o,t){var i=a.OnTypeFormattingEditProviderRegistry.ordered(e)[0];return i?i.autoFormatTriggerCharacters.indexOf(o)<0?n.TPromise.as(void 0):g.asWinJsPromise(function(n){return i.provideOnTypeFormattingEdits(e,r,o,t,n)}):n.TPromise.as(void 0)}r.getDocumentRangeFormattingEdits=u,r.getDocumentFormattingEdits=d,r.getOnTypeFormattingEdits=c,s.CommonEditorRegistry.registerLanguageCommand("_executeFormatRangeProvider",function(e,r){var n=r.resource,s=r.range,a=r.options;if(!(n instanceof t["default"]&&i.Range.isIRange(s)))throw o.illegalArgument();var g=e.get(m.IModelService).getModel(n);if(!g)throw o.illegalArgument("resource");return u(g,i.Range.lift(s),a)}),s.CommonEditorRegistry.registerLanguageCommand("_executeFormatDocumentProvider",function(e,r){var n=r.resource,i=r.options;if(!(n instanceof t["default"]))throw o.illegalArgument("resource");var s=e.get(m.IModelService).getModel(n);if(!s)throw o.illegalArgument("resource");return d(s,i)}),s.CommonEditorRegistry.registerDefaultLanguageCommand("_executeFormatOnTypeProvider",function(e,r,t){var n=t.ch,i=t.options;if("string"!=typeof n)throw o.illegalArgument("ch");return c(e,r,n,i)})});