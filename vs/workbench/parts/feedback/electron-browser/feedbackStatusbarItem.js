/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", 'vs/workbench/parts/feedback/browser/feedback', 'vs/platform/contextview/browser/contextView', 'vs/platform/instantiation/common/instantiation', 'vs/platform/workspace/common/workspace', 'electron'], function (require, exports, feedback_1, contextView_1, instantiation_1, workspace_1, electron_1) {
    'use strict';
    var TwitterFeedbackService = (function () {
        function TwitterFeedbackService() {
        }
        TwitterFeedbackService.prototype.combineHashTagsAsString = function () {
            return TwitterFeedbackService.HASHTAGS.join(',');
        };
        TwitterFeedbackService.prototype.submitFeedback = function (feedback) {
            var queryString = "?" + (feedback.sentiment === 1 ? "hashtags=" + this.combineHashTagsAsString() + "&" : null) + "ref_src=twsrc%5Etfw&related=twitterapi%2Ctwitter&text=" + feedback.feedback + "&tw_p=tweetbutton&via=" + TwitterFeedbackService.VIA_NAME;
            var url = TwitterFeedbackService.TWITTER_URL + queryString;
            electron_1.shell.openExternal(url);
        };
        TwitterFeedbackService.prototype.getCharacterLimit = function (sentiment) {
            var length = 0;
            if (sentiment === 1) {
                TwitterFeedbackService.HASHTAGS.forEach(function (element) {
                    length += element.length + 2;
                });
            }
            if (TwitterFeedbackService.VIA_NAME) {
                length += (" via @" + TwitterFeedbackService.VIA_NAME).length;
            }
            return 140 - length;
        };
        TwitterFeedbackService.TWITTER_URL = 'https://twitter.com/intent/tweet';
        TwitterFeedbackService.VIA_NAME = 'code';
        TwitterFeedbackService.HASHTAGS = ['HappyCoding'];
        return TwitterFeedbackService;
    }());
    var FeedbackStatusbarItem = (function () {
        function FeedbackStatusbarItem(instantiationService, contextViewService, contextService) {
            this.instantiationService = instantiationService;
            this.contextViewService = contextViewService;
            this.contextService = contextService;
        }
        FeedbackStatusbarItem.prototype.render = function (element) {
            if (this.contextService.getConfiguration().env.sendASmile) {
                return this.instantiationService.createInstance(feedback_1.FeedbackDropdown, element, {
                    contextViewProvider: this.contextViewService,
                    feedbackService: this.instantiationService.createInstance(TwitterFeedbackService)
                });
            }
        };
        FeedbackStatusbarItem = __decorate([
            __param(0, instantiation_1.IInstantiationService),
            __param(1, contextView_1.IContextViewService),
            __param(2, workspace_1.IWorkspaceContextService)
        ], FeedbackStatusbarItem);
        return FeedbackStatusbarItem;
    }());
    exports.FeedbackStatusbarItem = FeedbackStatusbarItem;
});
//# sourceMappingURL=feedbackStatusbarItem.js.map