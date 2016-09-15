define(["require","exports","vs/nls","vs/base/common/strings","vs/base/common/processes","vs/base/node/processes"],function(t,e,s,n,r,i){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var o="build",a="test",u=function(){function t(t){this.regexp=t}return t.prototype.init=function(){},t.prototype.match=function(t,e){var s=this.regexp.exec(e);s&&s.length>0&&t.push(s[1])},t}(),c=function(){function t(){}return t.prototype.init=function(){this.tasksStart=!1,this.tasksEnd=!1,this.descriptionOffset=null},t.prototype.match=function(t,e){if(this.tasksStart||this.tasksEnd){if(this.tasksStart&&!this.tasksEnd)if(0===e.indexOf("Tasks run in the order specified"))this.tasksEnd=!0;else{null===this.descriptionOffset&&(this.descriptionOffset=e.match(/\S  \S/).index+1);var s=e.substr(0,this.descriptionOffset).trim();s.length>0&&t.push(s)}}else 0===e.indexOf("Available tasks")&&(this.tasksStart=!0)},t}(),l=function(){function t(t,e,s,n){void 0===n&&(n=null),this.fileService=t,this.contextService=e,this.variables=s,this.taskConfiguration=n,this._stderr=[],this._stdout=[]}return t.supports=function(e){return t.SupportedRunners[e]},t.detectorConfig=function(e){return t.TaskMatchers[e]},Object.defineProperty(t.prototype,"stderr",{get:function(){return this._stderr},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"stdout",{get:function(){return this._stdout},enumerable:!0,configurable:!0}),t.prototype.detect=function(e,s){var n=this;if(void 0===e&&(e=!1),this.taskConfiguration&&this.taskConfiguration.command&&t.supports(this.taskConfiguration.command)){var o=t.detectorConfig(this.taskConfiguration.command),a=(this.taskConfiguration.args||[]).concat(o.arg),u=this.taskConfiguration.options?r.resolveCommandOptions(this.taskConfiguration.options,this.variables):{cwd:this.variables.workspaceRoot},c=!!this.taskConfiguration.isShellCommand;return this.runDetection(new i.LineProcess(this.taskConfiguration.command,this.variables.resolve(a),c,u),this.taskConfiguration.command,c,o.matcher,t.DefaultProblemMatchers,e)}if(s){var l=void 0;return"gulp"===s?l=this.tryDetectGulp(e):"jake"===s?l=this.tryDetectJake(e):"grunt"===s&&(l=this.tryDetectGrunt(e)),l.then(function(t){return t?t:{config:null,stdout:n.stdout,stderr:n.stderr}})}return this.tryDetectGulp(e).then(function(t){return t?t:n.tryDetectJake(e).then(function(t){return t?t:n.tryDetectGrunt(e).then(function(t){return t?t:{config:null,stdout:n.stdout,stderr:n.stderr}})})})},t.prototype.tryDetectGulp=function(e){var s=this;return this.fileService.resolveFile(this.contextService.toResource("gulpfile.js")).then(function(n){var r=t.detectorConfig("gulp"),o=new i.LineProcess("gulp",[r.arg,"--no-color"],(!0),{cwd:s.variables.workspaceRoot});return s.runDetection(o,"gulp",!0,r.matcher,t.DefaultProblemMatchers,e)},function(t){return null})},t.prototype.tryDetectGrunt=function(e){var s=this;return this.fileService.resolveFile(this.contextService.toResource("Gruntfile.js")).then(function(n){var r=t.detectorConfig("grunt"),o=new i.LineProcess("grunt",[r.arg,"--no-color"],(!0),{cwd:s.variables.workspaceRoot});return s.runDetection(o,"grunt",!0,r.matcher,t.DefaultProblemMatchers,e)},function(t){return null})},t.prototype.tryDetectJake=function(e){var s=this,n=function(){var n=t.detectorConfig("jake"),r=new i.LineProcess("jake",[n.arg],(!0),{cwd:s.variables.workspaceRoot});return s.runDetection(r,"jake",!0,n.matcher,t.DefaultProblemMatchers,e)};return this.fileService.resolveFile(this.contextService.toResource("Jakefile")).then(function(t){return n()},function(t){return s.fileService.resolveFile(s.contextService.toResource("Jakefile.js")).then(function(t){return n()},function(t){return null})})},t.prototype.runDetection=function(e,i,o,a,u,c){var l=this,d=[];return a.init(),e.start().then(function(e){if(0===d.length)return 0!==e.cmdCode&&("gulp"===i?l._stderr.push(s.localize("TaskSystemDetector.noGulpTasks","Running gulp --tasks-simple didn't list any tasks. Did you run npm install?")):"jake"===i&&l._stderr.push(s.localize("TaskSystemDetector.noJakeTasks","Running jake --tasks didn't list any tasks. Did you run npm install?"))),{config:null,stdout:l._stdout,stderr:l._stderr};var n={version:t.Version,command:i,isShellCommand:o};return"gulp"===i&&(n.args=["--no-color"]),n.tasks=l.createTaskDescriptions(d,u,c),{config:n,stdout:l._stdout,stderr:l._stderr}},function(t){var e=t.error;return"ENOENT"===e.code?"gulp"===i?l._stderr.push(s.localize("TaskSystemDetector.noGulpProgram","Gulp is not installed on your system. Run npm install -g gulp to install it.")):"jake"===i?l._stderr.push(s.localize("TaskSystemDetector.noJakeProgram","Jake is not installed on your system. Run npm install -g jake to install it.")):"grunt"===i&&l._stderr.push(s.localize("TaskSystemDetector.noGruntProgram","Grunt is not installed on your system. Run npm install -g grunt to install it.")):l._stderr.push(s.localize("TaskSystemDetector.noProgram","Program {0} was not found. Message is {1}",i,e.message)),{config:null,stdout:l._stdout,stderr:l._stderr}},function(t){if(t.source===r.Source.stderr)return void l._stderr.push(t.line);var e=n.removeAnsiEscapeCodes(t.line),s=a.match(d,e);s&&s.length>0&&d.push(s[1])})},t.prototype.createTaskDescriptions=function(t,e,n){var r=this,i=[];if(n)t.forEach(function(t){i.push({taskName:t,args:[],isWatching:!1})});else{var o={build:{index:-1,exact:-1},test:{index:-1,exact:-1}};if(t.forEach(function(t,e){r.testBuild(o.build,t,e),r.testTest(o.test,t,e)}),o.build.index!==-1){var a=t[o.build.index];this._stdout.push(s.localize("TaskSystemDetector.buildTaskDetected","Build task named '{0}' detected.",a)),i.push({taskName:a,args:[],isBuildCommand:!0,isWatching:!1,problemMatcher:e})}if(o.test.index!==-1){var u=t[o.test.index];this._stdout.push(s.localize("TaskSystemDetector.testTaskDetected","Test task named '{0}' detected.",u)),i.push({taskName:u,args:[],isTestCommand:!0})}}return i},t.prototype.testBuild=function(t,e,s){e===o?(t.index=s,t.exact=3):(n.startsWith(e,o)||n.endsWith(e,o))&&t.exact<3?(t.index=s,t.exact=2):e.indexOf(o)!==-1&&t.exact<2&&(t.index=s,t.exact=1)},t.prototype.testTest=function(t,e,s){e===a?(t.index=s,t.exact=3):(n.startsWith(e,a)||n.endsWith(e,a))&&t.exact<3?(t.index=s,t.exact=2):e.indexOf(a)!==-1&&t.exact<2&&(t.index=s,t.exact=1)},t.Version="0.1.0",t.SupportedRunners={gulp:!0,jake:!0,grunt:!0},t.TaskMatchers={gulp:{matcher:new u(/^(.*)$/),arg:"--tasks-simple"},jake:{matcher:new u(/^jake\s+([^\s]+)\s/),arg:"--tasks"},grunt:{matcher:new c,arg:"--help"}},t.DefaultProblemMatchers=["$lessCompile","$tsc","$jshint"],t}();e.ProcessRunnerDetector=l});