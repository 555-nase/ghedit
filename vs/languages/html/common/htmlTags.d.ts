/*!
BEGIN THIRD PARTY
*/
export interface IHTMLTagProvider {
    collectTags(collector: (tag: string, label: string) => void): void;
    collectAttributes(tag: string, collector: (attribute: string, type: string) => void): void;
    collectValues(tag: string, attribute: string, collector: (value: string) => void): void;
}
export interface ITagSet {
    [tag: string]: HTMLTagSpecification;
}
export declare class HTMLTagSpecification {
    label: string;
    attributes: string[];
    constructor(label: string, attributes?: string[]);
}
export declare const HTML_TAGS: ITagSet;
export declare const IONIC_TAGS: ITagSet;
export declare function getHTML5TagProvider(): IHTMLTagProvider;
export declare function getAngularTagProvider(): IHTMLTagProvider;
export declare function getIonicTagProvider(): IHTMLTagProvider;
