define(["require","exports","vs/platform/instantiation/common/instantiation"],function(e,t,n){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";t.ID="storageService",t.IStorageService=n.createDecorator(t.ID),function(e){e[e.GLOBAL=0]="GLOBAL",e[e.WORKSPACE=1]="WORKSPACE"}(t.StorageScope||(t.StorageScope={}));t.StorageScope;t.NullStorageService={_serviceBrand:void 0,store:function(){},swap:function(){},remove:function(){},get:function(e,t,n){return n},getInteger:function(e,t,n){return n},getBoolean:function(e,t,n){return n}}});