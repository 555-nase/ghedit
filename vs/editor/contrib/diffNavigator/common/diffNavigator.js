var __extends=this&&this.__extends||function(t,i){function e(){this.constructor=t}for(var n in i)i.hasOwnProperty(n)&&(t[n]=i[n]);t.prototype=null===i?Object.create(i):(e.prototype=i.prototype,new e)};define(["require","exports","vs/base/common/assert","vs/base/common/eventEmitter","vs/base/common/objects","vs/editor/common/core/range","vs/base/common/lifecycle"],function(t,i,e,n,s,o,r){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var a={followsCaret:!0,ignoreCharChanges:!0,alwaysRevealFirst:!0},h=function(t){function i(e,n){var o=this;void 0===n&&(n={}),t.call(this,[i.Events.UPDATED]),this.editor=e,this.options=s.mixin(n,a,!1),this.disposed=!1,this.toUnbind=[],this.nextIdx=-1,this.ranges=[],this.ignoreSelectionChange=!1,this.revealFirst=this.options.alwaysRevealFirst,this.toUnbind.push(this.editor.onDidDispose(function(){return o.dispose()})),this.toUnbind.push(this.editor.onDidUpdateDiff(function(){return o.onDiffUpdated()})),this.options.followsCaret&&this.toUnbind.push(this.editor.getModifiedEditor().onDidChangeCursorPosition(function(t){o.ignoreSelectionChange||(o.nextIdx=-1)})),this.options.alwaysRevealFirst&&this.toUnbind.push(this.editor.getModifiedEditor().onDidChangeModel(function(t){o.revealFirst=!0})),this.init()}return __extends(i,t),i.prototype.init=function(){var t=this.editor.getLineChanges()},i.prototype.onDiffUpdated=function(){this.init(),this.compute(this.editor.getLineChanges()),this.revealFirst&&null!==this.editor.getLineChanges()&&(this.revealFirst=!1,this.nextIdx=-1,this.next())},i.prototype.compute=function(t){var e=this;this.ranges=[],t&&t.forEach(function(t){!e.options.ignoreCharChanges&&t.charChanges?t.charChanges.forEach(function(t){e.ranges.push({rhs:!0,range:new o.Range(t.modifiedStartLineNumber,t.modifiedStartColumn,t.modifiedEndLineNumber,t.modifiedEndColumn)})}):e.ranges.push({rhs:!0,range:new o.Range(t.modifiedStartLineNumber,1,t.modifiedStartLineNumber,1)})}),this.ranges.sort(function(t,i){return t.range.getStartPosition().isBeforeOrEqual(i.range.getStartPosition())?-1:i.range.getStartPosition().isBeforeOrEqual(t.range.getStartPosition())?1:0}),this.emit(i.Events.UPDATED,{})},i.prototype.initIdx=function(t){for(var i=!1,e=this.editor.getPosition(),n=0,s=this.ranges.length;n<s&&!i;n++){var o=this.ranges[n].range;e.isBeforeOrEqual(o.getStartPosition())&&(this.nextIdx=n+(t?0:-1),i=!0)}i||(this.nextIdx=t?0:this.ranges.length-1),this.nextIdx<0&&(this.nextIdx=this.ranges.length-1)},i.prototype.move=function(t){if(e.ok(!this.disposed,"Illegal State - diff navigator has been disposed"),this.canNavigate()){this.nextIdx===-1?this.initIdx(t):t?(this.nextIdx+=1,this.nextIdx>=this.ranges.length&&(this.nextIdx=0)):(this.nextIdx-=1,this.nextIdx<0&&(this.nextIdx=this.ranges.length-1));var i=this.ranges[this.nextIdx];this.ignoreSelectionChange=!0;try{var n=i.range.getStartPosition();this.editor.setPosition(n),this.editor.revealPositionInCenter(n)}finally{this.ignoreSelectionChange=!1}}},i.prototype.canNavigate=function(){return this.ranges&&this.ranges.length>0},i.prototype.next=function(){this.move(!0)},i.prototype.previous=function(){this.move(!1)},i.prototype.dispose=function(){this.toUnbind=r.dispose(this.toUnbind),this.ranges=null,this.disposed=!0,t.prototype.dispose.call(this)},i.Events={UPDATED:"navigation.updated"},i}(n.EventEmitter);i.DiffNavigator=h});