import { IPickOpenEntry } from 'vs/workbench/services/quickopen/common/quickOpenService';
export interface TaskEntry extends IPickOpenEntry {
    sort?: string;
    autoDetect: boolean;
    content: string;
}
export declare let templates: TaskEntry[];
