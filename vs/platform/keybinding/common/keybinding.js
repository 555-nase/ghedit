define(["require","exports","vs/platform/instantiation/common/instantiation"],function(e,t,n){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function r(e,t){var n=e.getType(),r=t.getType();if(n!==r)return n-r;switch(n){case i.KbDefinedExpression:return e.cmp(t);case i.KbNotExpression:return e.cmp(t);case i.KbEqualsExpression:return e.cmp(t);case i.KbNotEqualsExpression:return e.cmp(t);default:throw new Error("Unknown KbExpr!")}}!function(e){e[e.KbDefinedExpression=1]="KbDefinedExpression",e[e.KbNotExpression=2]="KbNotExpression",e[e.KbEqualsExpression=3]="KbEqualsExpression",e[e.KbNotEqualsExpression=4]="KbNotEqualsExpression",e[e.KbAndExpression=5]="KbAndExpression"}(t.KbExprType||(t.KbExprType={}));var i=t.KbExprType,o=function(){function e(e){this.key=e}return e.prototype.getType=function(){return i.KbDefinedExpression},e.prototype.cmp=function(e){return this.key<e.key?-1:this.key>e.key?1:0},e.prototype.equals=function(t){return t instanceof e&&this.key===t.key},e.prototype.evaluate=function(e){return!!e[this.key]},e.prototype.normalize=function(){return this},e.prototype.serialize=function(){return this.key},e.prototype.keys=function(){return[this.key]},e}();t.KbDefinedExpression=o;var s=function(){function e(e,t){this.key=e,this.value=t}return e.prototype.getType=function(){return i.KbEqualsExpression},e.prototype.cmp=function(e){return this.key<e.key?-1:this.key>e.key?1:this.value<e.value?-1:this.value>e.value?1:0},e.prototype.equals=function(t){return t instanceof e&&(this.key===t.key&&this.value===t.value)},e.prototype.evaluate=function(e){return e[this.key]==this.value},e.prototype.normalize=function(){return"boolean"==typeof this.value?this.value?new o(this.key):new p(this.key):this},e.prototype.serialize=function(){return"boolean"==typeof this.value?this.normalize().serialize():this.key+" == '"+this.value+"'"},e.prototype.keys=function(){return[this.key]},e}();t.KbEqualsExpression=s;var u=function(){function e(e,t){this.key=e,this.value=t}return e.prototype.getType=function(){return i.KbNotEqualsExpression},e.prototype.cmp=function(e){return this.key<e.key?-1:this.key>e.key?1:this.value<e.value?-1:this.value>e.value?1:0},e.prototype.equals=function(t){return t instanceof e&&(this.key===t.key&&this.value===t.value)},e.prototype.evaluate=function(e){return e[this.key]!=this.value},e.prototype.normalize=function(){return"boolean"==typeof this.value?this.value?new p(this.key):new o(this.key):this},e.prototype.serialize=function(){return"boolean"==typeof this.value?this.normalize().serialize():this.key+" != '"+this.value+"'"},e.prototype.keys=function(){return[this.key]},e}();t.KbNotEqualsExpression=u;var p=function(){function e(e){this.key=e}return e.prototype.getType=function(){return i.KbNotExpression},e.prototype.cmp=function(e){return this.key<e.key?-1:this.key>e.key?1:0},e.prototype.equals=function(t){return t instanceof e&&this.key===t.key},e.prototype.evaluate=function(e){return!e[this.key]},e.prototype.normalize=function(){return this},e.prototype.serialize=function(){return"!"+this.key},e.prototype.keys=function(){return[this.key]},e}();t.KbNotExpression=p;var a=function(){function e(t){this.expr=e._normalizeArr(t)}return e.prototype.getType=function(){return i.KbAndExpression},e.prototype.equals=function(t){if(t instanceof e){if(this.expr.length!==t.expr.length)return!1;for(var n=0,r=this.expr.length;n<r;n++)if(!this.expr[n].equals(t.expr[n]))return!1;return!0}},e.prototype.evaluate=function(e){for(var t=0,n=this.expr.length;t<n;t++)if(!this.expr[t].evaluate(e))return!1;return!0},e._normalizeArr=function(t){var n=[];if(t){for(var i=0,o=t.length;i<o;i++){var s=t[i];s&&(s=s.normalize(),s&&(s instanceof e?n=n.concat(s.expr):n.push(s)))}n.sort(r)}return n},e.prototype.normalize=function(){return 0===this.expr.length?null:1===this.expr.length?this.expr[0]:this},e.prototype.serialize=function(){return 0===this.expr.length?"":1===this.expr.length?this.normalize().serialize():this.expr.map(function(e){return e.serialize()}).join(" && ")},e.prototype.keys=function(){for(var e=[],t=0,n=this.expr;t<n.length;t++){var r=n[t];e.push.apply(e,r.keys())}return e},e}();t.KbAndExpression=a,t.KbExpr={has:function(e){return new o(e)},equals:function(e,t){return new s(e,t)},notEquals:function(e,t){return new u(e,t)},not:function(e){return new p(e)},and:function(){for(var e=[],t=0;t<arguments.length;t++)e[t-0]=arguments[t];return new a(e)},deserialize:function(e){if(!e)return null;var n=e.split("&&"),r=new a(n.map(function(e){return t.KbExpr._deserializeOne(e)}));return r.normalize()},_deserializeOne:function(e){if(e=e.trim(),e.indexOf("!=")>=0){var n=e.split("!=");return new u(n[0].trim(),t.KbExpr._deserializeValue(n[1]))}if(e.indexOf("==")>=0){var n=e.split("==");return new s(n[0].trim(),t.KbExpr._deserializeValue(n[1]))}return/^\!\s*/.test(e)?new p(e.substr(1).trim()):new o(e)},_deserializeValue:function(e){if(e=e.trim(),"true"===e)return!0;if("false"===e)return!1;var t=/^'([^']*)'$/.exec(e);return t?t[1].trim():e}},t.IKeybindingService=n.createDecorator("keybindingService"),t.SET_CONTEXT_COMMAND_ID="setContext"});