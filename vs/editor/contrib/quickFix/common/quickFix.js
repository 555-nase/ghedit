/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","vs/base/common/errors","vs/base/common/uri","vs/base/common/winjs.base","vs/base/common/idGenerator","vs/editor/common/core/range","vs/editor/common/editorCommonExtensions","vs/editor/common/modes","vs/editor/common/services/modelService","vs/base/common/async"],function(e,o,r,n,i,t,s,c,m,a,d){"use strict";function u(e,o){var n=[],s=new t.IdGenerator("quickfix"),c=m.CodeActionProviderRegistry.all(e).map(function(i){return d.asWinJsPromise(function(r){return i.provideCodeActions(e,o,r)}).then(function(e){if(Array.isArray(e))for(var o=0,r=e;o<r.length;o++){var t=r[o];n.push({command:t.command,score:t.score,id:s.nextId(),support:i})}},function(e){r.onUnexpectedError(e)})});return i.TPromise.join(c).then(function(){return n})}o.getCodeActions=u,c.CommonEditorRegistry.registerLanguageCommand("_executeCodeActionProvider",function(e,o){var i=o.resource,t=o.range;if(!(i instanceof n["default"]&&s.Range.isIRange(t)))throw r.illegalArgument();var c=e.get(a.IModelService).getModel(i);if(!c)throw r.illegalArgument();var m=s.Range.lift(t);return u(c,m)})});