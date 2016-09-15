var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},__decorate=this&&this.__decorate||function(e,t,n,r){var i,o=arguments.length,s=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,n,s):i(t,n))||s);return o>3&&s&&Object.defineProperty(t,n,s),s},__param=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};define(["require","exports","vs/editor/common/modes","vs/languages/html/common/html","vs/languages/handlebars/common/handlebarsTokenTypes","vs/platform/instantiation/common/instantiation","vs/editor/common/services/modeService","vs/editor/common/modes/languageConfigurationRegistry","vs/editor/common/modes/abstractMode","vs/base/common/async","vs/editor/common/services/compatWorkerService","vs/platform/workspace/common/workspace"],function(e,t,n,r,i,o,s,a,c,d,p,l){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";!function(e){e[e.HTML=0]="HTML",e[e.Expression=1]="Expression",e[e.UnescapedExpression=2]="UnescapedExpression"}(t.States||(t.States={}));var u=t.States,h=function(e){function t(t,n,r,i,o,s,a,c){e.call(this,t,n,i,o,s,a,c),this.handlebarsKind=r}return __extends(t,e),t.prototype.makeClone=function(){return new t(this.getMode(),this.kind,this.handlebarsKind,this.lastTagName,this.lastAttributeName,this.embeddedContentType,this.attributeValueQuote,this.attributeValueLength)},t.prototype.equals=function(n){return n instanceof t&&e.prototype.equals.call(this,n)},t.prototype.tokenize=function(t){switch(this.handlebarsKind){case u.HTML:if(t.advanceIfString("{{{").length>0)return this.handlebarsKind=u.UnescapedExpression,{type:i.EMBED_UNESCAPED};if(t.advanceIfString("{{").length>0)return this.handlebarsKind=u.Expression,{type:i.EMBED};break;case u.Expression:case u.UnescapedExpression:if(this.handlebarsKind===u.Expression&&t.advanceIfString("}}").length>0)return this.handlebarsKind=u.HTML,{type:i.EMBED};if(this.handlebarsKind===u.UnescapedExpression&&t.advanceIfString("}}}").length>0)return this.handlebarsKind=u.HTML,{type:i.EMBED_UNESCAPED};if(t.skipWhitespace().length>0)return{type:""};if("#"===t.peek())return t.advanceWhile(/^[^\s}]/),{type:i.KEYWORD};if("/"===t.peek())return t.advanceWhile(/^[^\s}]/),{type:i.KEYWORD};if(t.advanceIfString("else")){var n=t.peek();if(" "===n||"\t"===n||"}"===n)return{type:i.KEYWORD};t.goBack(4)}if(t.advanceWhile(/^[^\s}]/).length>0)return{type:i.VARIABLE}}return e.prototype.tokenize.call(this,t)},t}(r.State);t.HandlebarsState=h;var g=function(e){function t(t,n,r,i,o){e.call(this,t,n,r,i,o)}return __extends(t,e),t.prototype._registerSupports=function(){var e=this;n.SuggestRegistry.register(this.getId(),{triggerCharacters:[".",":","<",'"',"=","/"],provideCompletionItems:function(t,n,r){return d.wireCancellationToken(r,e._provideCompletionItems(t.uri,n))}},!0),n.DocumentHighlightProviderRegistry.register(this.getId(),{provideDocumentHighlights:function(t,n,r){return d.wireCancellationToken(r,e._provideDocumentHighlights(t.uri,n))}},!0),n.LinkProviderRegistry.register(this.getId(),{provideLinks:function(t,n){return d.wireCancellationToken(n,e.provideLinks(t.uri))}},!0),a.LanguageConfigurationRegistry.register(this.getId(),t.LANG_CONFIG)},t.prototype.getInitialState=function(){return new h(this,r.States.Content,u.HTML,"","","","",0)},t.prototype.getLeavingNestedModeData=function(t,n){var i=e.prototype.getLeavingNestedModeData.call(this,t,n);return i&&(i.stateAfterNestedMode=new h(this,r.States.Content,u.HTML,"","","","",0)),i},t.LANG_CONFIG={wordPattern:c.createWordRegExp("#-?%"),comments:{blockComment:["<!--","-->"]},brackets:[["<!--","-->"],["{{","}}"]],__electricCharacterSupport:{embeddedElectricCharacters:["*","}","]",")"]},autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:"<",close:">"},{open:'"',close:'"'},{open:"'",close:"'"}],onEnterRules:[{beforeText:new RegExp("<(?!(?:"+r.EMPTY_ELEMENTS.join("|")+"))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$","i"),afterText:/^<\/(\w[\w\d]*)\s*>$/i,action:{indentAction:n.IndentAction.IndentOutdent}},{beforeText:new RegExp("<(?!(?:"+r.EMPTY_ELEMENTS.join("|")+"))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$","i"),action:{indentAction:n.IndentAction.Indent}}]},t=__decorate([__param(1,o.IInstantiationService),__param(2,s.IModeService),__param(3,p.ICompatWorkerService),__param(4,l.IWorkspaceContextService)],t)}(r.HTMLMode);t.HandlebarsMode=g});