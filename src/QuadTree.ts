import { IBounds, IPoint } from "./Interfaces";
import { Node } from "./Node";
import { BoundsNode } from "./BoundsNode";

/**
 * QuadTree data structure.
 * @class QuadTree
 * @constructor
 * @param {IBounds} An object representing the bounds of the top level of the QuadTree. The object
 * should contain the following properties : x, y, width, height
 * @param {Boolean} pointQuad Whether the QuadTree will contain points (true), or items with bounds
 * (width / height)(false). Default value is false.
 * @param {Number} maxDepth The maximum number of levels that the quadtree will create. Default is 4.
 * @param {Number} maxChildren The maximum number of children that a node can contain before it is split into sub-nodes.
 **/

export class QuadTree {
  /**
   * The root node of the QuadTree which covers the entire area being segmented.
   * @property root
   * @type Node
   **/
  root: Node;

  constructor(
    bounds: IBounds,
    pointQuad: boolean = false,
    maxDepth: number = 4,
    maxChildren: number = 0,
  ) {
    //TODO: PointQuad mode should be implemented, not ready yet
    if (pointQuad) {
      this.root = new Node(bounds, 0, maxDepth, maxChildren);
    } else {
      this.root = new BoundsNode(bounds, 0, maxDepth, maxChildren);
    }
  }

  /**
   * Inserts an item into the QuadTree.
   * @method insert
   * @param {IBounds|Array<IBounds>} item The item or Array of items to be inserted into the QuadTree. The item should expose x, y
   * properties that represents its position in 2D space.
   **/
  insert(item: IBounds | Array<IBounds>): void {
    if (Array.isArray(item)) {
      const len = item.length;
      for (let i = 0; i < len; i++) {
        this.root.insert(item[i]);
      }
    } else {
      this.root.insert(item);
    }
  }

  /**
   * Clears all nodes and children from the QuadTree
   * @method clear
   **/
  clear(): void {
    this.root.clear();
  }

  /**
   * Retrieves all items / points in the same node as the specified item / point. If the specified item
   * overlaps the bounds of a node, then all children in both nodes will be returned.
   * @method retrieve
   * @param { IPoint | IBounds } item An object representing a 2D coordinate point (with x, y properties), or a shape
   * with dimensions (x, y, width, height) properties.
   **/
  retrieve(item: IPoint | IBounds): Array<IBounds> {
    // get a copy of the array of items
    const out = this.root.retrieve(item).slice(0);
    return out;
  }
}
