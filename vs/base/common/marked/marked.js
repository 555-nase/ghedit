/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
require.config({shim:{"vs/base/common/marked/raw.marked":{exports:function(){return this.marked}}}}),define(["./raw.marked"],function(r){return{marked:r}});