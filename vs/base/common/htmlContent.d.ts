/**
 * MarkedString can be used to render human readable text. It is either a markdown string
 * or a code-block that provides a language and a code snippet. Note that
 * markdown strings will be sanitized - that means html will be escaped.
 */
export declare type MarkedString = string | {
    language: string;
    value: string;
};
export interface IHTMLContentElementCode {
    language: string;
    value: string;
}
export declare function markedStringsEquals(a: MarkedString | MarkedString[], b: MarkedString | MarkedString[]): boolean;
export declare function textToMarkedString(text: string): MarkedString;
export interface IHTMLContentElement {
    /**
     * supports **bold**, __italics__, and [[actions]]
     */
    formattedText?: string;
    text?: string;
    className?: string;
    style?: string;
    customStyle?: any;
    tagName?: string;
    children?: IHTMLContentElement[];
    isText?: boolean;
    role?: string;
    markdown?: string;
    code?: IHTMLContentElementCode;
}
export declare function htmlContentElementArrEquals(a: IHTMLContentElement[], b: IHTMLContentElement[]): boolean;
