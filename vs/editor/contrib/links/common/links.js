/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","vs/base/common/errors","vs/base/common/uri","vs/base/common/winjs.base","vs/editor/common/core/range","vs/editor/common/modes","vs/base/common/async","vs/platform/commands/common/commands","vs/editor/common/services/modelService"],function(e,r,n,o,s,i,t,a,m,c){"use strict";function u(e){var r=[],o=t.LinkProviderRegistry.ordered(e).reverse().map(function(o){return a.asWinJsPromise(function(r){return o.provideLinks(e,r)}).then(function(e){Array.isArray(e)&&(r=g(r,e))},n.onUnexpectedError)});return s.TPromise.join(o).then(function(){return r})}function g(e,r){var n,o,s,t,a,m,c,u=[];for(n=0,s=0,o=e.length,t=r.length;n<o&&s<t;)a=e[n],m=r[s],i.Range.areIntersectingOrTouching(a.range,m.range)?n++:(c=i.Range.compareRangesUsingStarts(a.range,m.range),c<0?(u.push(a),n++):(u.push(m),s++));for(;n<o;n++)u.push(e[n]);for(;s<t;s++)u.push(r[s]);return u}r.getLinks=u,m.CommandsRegistry.registerCommand("_executeLinkProvider",function(e){for(var r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];var s=r[0];if(s instanceof o["default"]){var i=e.get(c.IModelService).getModel(s);if(i)return u(i)}})});