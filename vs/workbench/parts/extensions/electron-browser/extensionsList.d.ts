import { IDisposable } from 'vs/base/common/lifecycle';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IMessageService } from 'vs/platform/message/common/message';
import { IDelegate } from 'vs/base/browser/ui/list/list';
import { IPagedRenderer } from 'vs/base/browser/ui/list/listPaging';
import { IExtension } from './extensions';
export interface ITemplateData {
    element: HTMLElement;
    icon: HTMLImageElement;
    name: HTMLElement;
    installCount: HTMLElement;
    ratings: HTMLElement;
    author: HTMLElement;
    description: HTMLElement;
    extension: IExtension;
    disposables: IDisposable[];
}
export declare class Delegate implements IDelegate<IExtension> {
    getHeight(): number;
    getTemplateId(): string;
}
export declare class Renderer implements IPagedRenderer<IExtension, ITemplateData> {
    private instantiationService;
    private messageService;
    constructor(instantiationService: IInstantiationService, messageService: IMessageService);
    templateId: string;
    renderTemplate(root: HTMLElement): ITemplateData;
    renderPlaceholder(index: number, data: ITemplateData): void;
    renderElement(extension: IExtension, index: number, data: ITemplateData): void;
    disposeTemplate(data: ITemplateData): void;
}
