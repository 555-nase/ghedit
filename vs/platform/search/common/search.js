define(["require","exports","vs/platform/instantiation/common/instantiation"],function(e,t,i){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";t.ID="searchService",t.ISearchService=i.createDecorator(t.ID),function(e){e[e.File=1]="File",e[e.Text=2]="Text"}(t.QueryType||(t.QueryType={}));var n=(t.QueryType,function(){function e(e){this.resource=e,this.lineMatches=[]}return e}());t.FileMatch=n;var r=function(){function e(e,t,i){this.preview=e,this.lineNumber=t,this.offsetAndLengths=i}return e}();t.LineMatch=r});