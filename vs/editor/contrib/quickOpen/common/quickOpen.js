/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","vs/base/common/errors","vs/base/common/uri","vs/base/common/winjs.base","vs/editor/common/core/range","vs/editor/common/editorCommonExtensions","vs/editor/common/modes","vs/editor/common/services/modelService","vs/base/common/async"],function(e,o,n,r,t,i,s,a,m,c){"use strict";function u(e){var o=[],r=a.DocumentSymbolProviderRegistry.all(e).map(function(r){return c.asWinJsPromise(function(o){return r.provideDocumentSymbols(e,o)}).then(function(e){Array.isArray(e)&&o.push.apply(o,e)},function(e){n.onUnexpectedError(e)})});return t.TPromise.join(r).then(function(){var e=[];return g(e,o,""),e.sort(l),{entries:e}})}function l(e,o){return i.Range.compareRangesUsingStarts(i.Range.lift(e.location.range),i.Range.lift(o.location.range))}function g(e,o,n){for(var r=0,t=o;r<t.length;r++){var i=t[r];e.push({kind:i.kind,location:i.location,name:i.name,containerName:i.containerName||n})}}o.getDocumentSymbols=u,s.CommonEditorRegistry.registerLanguageCommand("_executeDocumentSymbolProvider",function(e,o){var t=o.resource;if(!(t instanceof r["default"]))throw n.illegalArgument("resource");var i=e.get(m.IModelService).getModel(t);if(!i)throw n.illegalArgument("resource");return u(i)})});