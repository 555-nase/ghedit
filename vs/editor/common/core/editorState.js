define(["require","exports","vs/base/common/strings","vs/editor/common/editorCommon"],function(t,o,e,i){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var s=function(){function t(t,o){var s=this;this.flags=o,o.forEach(function(o){switch(o){case i.CodeEditorStateFlag.Value:var n=t.getModel();s.modelVersionId=n?e.format("{0}#{1}",n.uri.toString(),n.getVersionId()):null;break;case i.CodeEditorStateFlag.Position:s.position=t.getPosition();break;case i.CodeEditorStateFlag.Selection:s.selection=t.getSelection();break;case i.CodeEditorStateFlag.Scroll:s.scrollLeft=t.getScrollLeft(),s.scrollTop=t.getScrollTop()}})}return t.prototype._equals=function(o){if(!(o instanceof t))return!1;var e=o;return this.modelVersionId===e.modelVersionId&&(this.scrollLeft===e.scrollLeft&&this.scrollTop===e.scrollTop&&(!(!this.position&&e.position||this.position&&!e.position||this.position&&e.position&&!this.position.equals(e.position))&&!(!this.selection&&e.selection||this.selection&&!e.selection||this.selection&&e.selection&&!this.selection.equalsRange(e.selection))))},t.prototype.validate=function(o){return this._equals(new t(o,this.flags))},t}();o.EditorState=s});