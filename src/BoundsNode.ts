import { Node } from "./Node";
import { IBounds } from "./Interfaces"; // Adjust the import path as necessary

export class BoundsNode extends Node {
  private _stuckChildren: IBounds[] = [];
  private _out: IBounds[] = [];

  constructor(
    bounds: IBounds,
    depth: number,
    maxChildren: number,
    maxDepth: number,
  ) {
    super(bounds, depth, maxChildren, maxDepth);
  }

  override insert(item: IBounds): void {
    if (this.nodes.length) {
      const index = this._findIndex(item);
      const node = this.nodes[index];
      if (!node) {
        return;
      }

      if (
        item.x >= node._bounds.x &&
        item.x + item.width <= node._bounds.x + node._bounds.width &&
        item.y >= node._bounds.y &&
        item.y + item.height <= node._bounds.y + node._bounds.height
      ) {
        this.nodes[index]?.insert(item);
      } else {
        this._stuckChildren.push(item);
      }

      return;
    }

    this.children.push(item);
    const len = this.children.length;

    if (!(this._depth >= this._maxDepth) && len > this._maxChildren) {
      this.subdivide();

      for (let i = 0; i < len; i++) {
        this.insert(this.children[i] as IBounds);
      }

      this.children.length = 0;
    }
  }

  getChildren(): IBounds[] {
    return this.children.concat(this._stuckChildren);
  }

  override retrieve(item: IBounds): IBounds[] {
    const out = this._out;
    out.length = 0;
    if (this.nodes.length) {
      const index = this._findIndex(item);
      const node = this.nodes[index];
      if (node) {
        out.push(...node.retrieve(item));
      }
    }

    out.push(...this._stuckChildren);
    out.push(...this.children);

    return out;
  }

  override clear(): void {
    this._stuckChildren.length = 0;
    this.children.length = 0;

    const len = this.nodes.length;

    if (!len) {
      return;
    }

    for (let i = 0; i < len; i++) {
      this.nodes[i]?.clear();
    }

    //array
    this.nodes.length = 0;

    //we could call the super clear function but for now, im just going to inline it
    //call the hidden super.clear, and make sure its called with this = this instance
    //Object.getPrototypeOf(BoundsNode.prototype).clear.call(this);
  }
}
