/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","vs/platform/instantiation/common/instantiation"],function(e,n,t){"use strict";n.VIEWLET_ID="workbench.view.extensions",function(e){e[e.Installing=0]="Installing",e[e.Installed=1]="Installed",e[e.NeedsRestart=2]="NeedsRestart",e[e.Uninstalled=3]="Uninstalled"}(n.ExtensionState||(n.ExtensionState={}));n.ExtensionState;n.SERVICE_ID="extensionsWorkbenchService",n.IExtensionsWorkbenchService=t.createDecorator(n.SERVICE_ID)});