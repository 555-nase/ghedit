import URI from 'vs/base/common/uri';
import { IFileStat } from 'vs/platform/files/common/files';
export declare enum StatType {
    FILE = 0,
    FOLDER = 1,
    ANY = 2,
}
export declare class FileStat implements IFileStat {
    resource: URI;
    name: string;
    mtime: number;
    etag: string;
    mime: string;
    isDirectory: boolean;
    hasChildren: boolean;
    children: FileStat[];
    parent: FileStat;
    isDirectoryResolved: boolean;
    constructor(resource: URI, isDirectory?: boolean, hasChildren?: boolean, name?: string, mtime?: number, etag?: string);
    getId(): string;
    static create(raw: IFileStat, resolveTo?: URI[]): FileStat;
    /**
     * Merges the stat which was resolved from the disk with the local stat by copying over properties
     * and children. The merge will only consider resolved stat elements to avoid overwriting data which
     * exists locally.
     */
    static mergeLocalWithDisk(disk: FileStat, local: FileStat): void;
    /**
     * Returns a deep copy of this model object.
     */
    clone(): FileStat;
    /**
     * Adds a child element to this folder.
     */
    addChild(child: FileStat): void;
    /**
     * Returns true if this stat is a directory that contains a child with the given name.
     *
     * @param ignoreCase if true, will check for the name ignoring case.
     * @param type the type of stat to check for.
     */
    hasChild(name: string, ignoreCase?: boolean, type?: StatType): boolean;
    /**
     * Removes a child element from this folder.
     */
    removeChild(child: FileStat): void;
    /**
     * Moves this element under a new parent element.
     */
    move(newParent: FileStat, fnBetweenStates?: (callback: () => void) => void, fnDone?: () => void): void;
    private updateResource(recursive);
    /**
     * Tells this stat that it was renamed. This requires changes to all children of this stat (if any)
     * so that the path property can be updated properly.
     */
    rename(renamedStat: IFileStat): void;
    /**
     * Returns a child stat from this stat that matches with the provided path.
     * Will return "null" in case the child does not exist.
     */
    find(resource: URI): FileStat;
    private fileResourceEquals(r1, r2);
}
export declare class NewStatPlaceholder extends FileStat {
    private static ID;
    private id;
    constructor(isDirectory: boolean);
    destroy(): void;
    getId(): string;
    /**
     * Returns a deep copy of this model object.
     */
    clone(): NewStatPlaceholder;
    addChild(child: NewStatPlaceholder): void;
    hasChild(name: string, ignoreCase?: boolean): boolean;
    removeChild(child: NewStatPlaceholder): void;
    move(newParent: NewStatPlaceholder): void;
    rename(renamedStat: NewStatPlaceholder): void;
    find(resource: URI): NewStatPlaceholder;
    static addNewStatPlaceholder(parent: FileStat, isDirectory: boolean): NewStatPlaceholder;
}
