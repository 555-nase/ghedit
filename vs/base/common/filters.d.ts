export interface IFilter {
    (word: string, wordToMatchAgainst: string): IMatch[];
}
export interface IMatch {
    start: number;
    end: number;
}
/**
 * @returns A filter which combines the provided set
 * of filters with an or. The *first* filters that
 * matches defined the return value of the returned
 * filter.
 */
export declare function or(...filter: IFilter[]): IFilter;
/**
 * @returns A filter which combines the provided set
 * of filters with an and. The combines matches are
 * returned if *all* filters match.
 */
export declare function and(...filter: IFilter[]): IFilter;
export declare let matchesStrictPrefix: IFilter;
export declare let matchesPrefix: IFilter;
export declare function matchesContiguousSubString(word: string, wordToMatchAgainst: string): IMatch[];
export declare function matchesSubString(word: string, wordToMatchAgainst: string): IMatch[];
export declare function matchesCamelCase(word: string, camelCaseWord: string): IMatch[];
export declare function matchesWords(word: string, target: string): IMatch[];
export declare enum SubstringMatching {
    Contiguous = 0,
    Separate = 1,
}
export declare const fuzzyContiguousFilter: IFilter;
export declare function matchesFuzzy(word: string, wordToMatchAgainst: string, enableSeparateSubstringMatching?: boolean): IMatch[];
