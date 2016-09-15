import 'vs/css!vs/base/browser/ui/progressbar/progressbar';
import { IOpenerService } from 'vs/platform/opener/common/opener';
import { IModeService } from 'vs/editor/common/services/modeService';
import { Range } from 'vs/editor/common/core/range';
import { Hover } from 'vs/editor/common/modes';
import { ICodeEditor } from 'vs/editor/browser/editorBrowser';
import { ContentHoverWidget } from './hoverWidgets';
export declare class ModesContentHoverWidget extends ContentHoverWidget {
    static ID: string;
    private _messages;
    private _lastRange;
    private _computer;
    private _hoverOperation;
    private _highlightDecorations;
    private _isChangingDecorations;
    private _openerService;
    private _modeService;
    private _shouldFocus;
    constructor(editor: ICodeEditor, openerService: IOpenerService, modeService: IModeService);
    dispose(): void;
    onModelDecorationsChanged(): void;
    startShowingAt(range: Range, focus: boolean): void;
    hide(): void;
    _withResult(result: Hover[], complete: boolean): void;
    private _renderMessages(renderRange, messages);
}
