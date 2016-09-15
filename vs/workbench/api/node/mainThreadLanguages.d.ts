import { TPromise } from 'vs/base/common/winjs.base';
import { IModeService } from 'vs/editor/common/services/modeService';
import { MainThreadLanguagesShape } from './extHost.protocol';
export declare class MainThreadLanguages extends MainThreadLanguagesShape {
    private _modeService;
    constructor(modeService: IModeService);
    $getLanguages(): TPromise<string[]>;
}
