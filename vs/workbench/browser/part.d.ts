import 'vs/css!./media/part';
import { Dimension, Builder } from 'vs/base/browser/builder';
import { WorkbenchComponent } from 'vs/workbench/common/component';
/**
 * Parts are layed out in the workbench and have their own layout that arranges a title,
 * content and status area to show content.
 */
export declare abstract class Part extends WorkbenchComponent {
    private parent;
    private titleArea;
    private contentArea;
    private statusArea;
    private partLayout;
    constructor(id: string);
    /**
     * Note: Clients should not call this method, the workbench calls this
     * method. Calling it otherwise may result in unexpected behavior.
     *
     * Called to create title, content and status area of the part.
     */
    create(parent: Builder): void;
    /**
     * Returns the overall part container.
     */
    getContainer(): Builder;
    /**
     * Subclasses override to provide a title area implementation.
     */
    createTitleArea(parent: Builder): Builder;
    /**
     * Returns the title area container.
     */
    getTitleArea(): Builder;
    /**
     * Subclasses override to provide a content area implementation.
     */
    createContentArea(parent: Builder): Builder;
    /**
     * Returns the content area container.
     */
    getContentArea(): Builder;
    /**
     * Subclasses override to provide a status area implementation.
     */
    createStatusArea(parent: Builder): Builder;
    /**
     * Returns the status area container.
     */
    getStatusArea(): Builder;
    /**
     * Layout title, content and status area in the given dimension.
     */
    layout(dimension: Dimension): Dimension[];
    /**
     * Returns the part layout implementation.
     */
    getLayout(): PartLayout;
}
export declare class EmptyPart extends Part {
    constructor(id: string);
}
export declare class PartLayout {
    private container;
    private titleArea;
    private contentArea;
    private statusArea;
    private titleStyle;
    private containerStyle;
    private statusStyle;
    constructor(container: Builder, titleArea: Builder, contentArea: Builder, statusArea: Builder);
    computeStyle(): void;
    layout(dimension: Dimension): Dimension[];
}
