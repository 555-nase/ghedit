import htmlWorker = require('vs/languages/html/common/htmlWorker');
import htmlTags = require('vs/languages/html/common/htmlTags');
export declare function getRazorTagProvider(): htmlTags.IHTMLTagProvider;
export declare class RAZORWorker extends htmlWorker.HTMLWorker {
    protected addCustomTagProviders(providers: htmlTags.IHTMLTagProvider[]): void;
}
