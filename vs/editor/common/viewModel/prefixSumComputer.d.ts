export declare class PrefixSumIndexOfResult {
    _prefixSumIndexOfResultBrand: void;
    index: number;
    remainder: number;
    constructor(index: number, remainder: number);
}
export declare class PrefixSumComputer {
    /**
     * values[i] is the value at index i
     */
    private values;
    /**
     * prefixSum[i] = SUM(heights[j]), 0 <= j <= i
     */
    private prefixSum;
    /**
     * prefixSum[i], 0 <= i <= prefixSumValidIndex can be trusted
     */
    private prefixSumValidIndex;
    constructor(values: number[]);
    getCount(): number;
    insertValue(insertIndex: number, value: number): void;
    insertValues(insertIndex: number, values: number[]): void;
    private static _zeroArray(count);
    changeValue(index: number, value: number): void;
    removeValues(startIndex: number, cnt: number): void;
    getTotalValue(): number;
    getAccumulatedValue(index: number): number;
    getIndexOf(accumulatedValue: number): PrefixSumIndexOfResult;
}
