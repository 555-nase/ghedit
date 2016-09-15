import 'vs/css!./button';
import { EventEmitter } from 'vs/base/common/eventEmitter';
import { Builder } from 'vs/base/browser/builder';
export declare class Button extends EventEmitter {
    private $el;
    constructor(container: Builder);
    constructor(container: HTMLElement);
    getElement(): HTMLElement;
    label: string;
    icon: string;
    enabled: boolean;
    focus(): void;
    dispose(): void;
}
