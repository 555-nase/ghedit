import 'vs/css!./countBadge';
import { Builder } from 'vs/base/browser/builder';
export declare class CountBadge {
    private $el;
    private count;
    private titleFormat;
    constructor(container: Builder, count?: number, titleFormat?: string);
    constructor(container: HTMLElement, count?: number, titleFormat?: string);
    setCount(count: number): void;
    setTitleFormat(titleFormat: string): void;
    private render();
    dispose(): void;
}
