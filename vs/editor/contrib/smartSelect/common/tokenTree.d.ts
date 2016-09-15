import { Position } from 'vs/editor/common/core/position';
import { Range } from 'vs/editor/common/core/range';
import { IModel, IPosition } from 'vs/editor/common/editorCommon';
export declare enum TokenTreeBracket {
    None = 0,
    Open = 1,
    Close = -1,
}
export declare class Node {
    start: Position;
    end: Position;
    range: Range;
    parent: Node;
}
export declare class NodeList extends Node {
    children: Node[];
    start: Position;
    end: Position;
    hasChildren: boolean;
    append(node: Node): boolean;
}
export declare class Block extends Node {
    open: Node;
    close: Node;
    elements: NodeList;
    start: Position;
    end: Position;
    constructor();
}
/**
 * Parses this grammar:
 *	grammer = { line }
 *	line = { block | "token" }
 *	block = "open_bracket" { line } "close_bracket"
 */
export declare function build(model: IModel): Node;
export declare function find(node: Node, position: IPosition): Node;
