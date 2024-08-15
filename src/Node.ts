import { IBounds, IPoint } from './Interfaces';

export class Node {
  public _bounds: IBounds;
  public children: IBounds[] = [];
  public nodes: Node[] = [];
  protected _depth: number = 0;
  protected _maxChildren: number = 4;
  protected _maxDepth: number = 4;

  static TOP_LEFT: number = 0;
  static TOP_RIGHT: number = 1;
  static BOTTOM_LEFT: number = 2;
  static BOTTOM_RIGHT: number = 3;

  constructor(
    bounds: IBounds,
    depth?: number,
    maxDepth?: number,
    maxChildren?: number,
  ) {
    this._bounds = bounds;

    if (maxChildren) {
      this._maxChildren = maxChildren;
    }

    if (maxDepth) {
      this._maxDepth = maxDepth;
    }

    if (depth) {
      this._depth = depth;
    }
  }

  insert(item: IBounds): void {
    if (this.nodes.length) {
      const index = this._findIndex(item);
      this.nodes[index].insert(item);
      return;
    }

    this.children.push(item);
    const len = this.children.length;

    if (!(this._depth >= this._maxDepth) && len > this._maxChildren) {
      this.subdivide();

      for (let i = 0; i < len; i++) {
        this.insert(this.children[i]);
      }

      this.children.length = 0;
    }
  }

  retrieve(item: IPoint): IBounds[] {
    if (this.nodes.length) {
      const index = this._findIndex(item);
      return this.nodes[index].retrieve(item);
    }

    return this.children;
  }

  protected _findIndex(item: IPoint): number {
    const b = this._bounds;
    const left = item.x <= b.x + b.width / 2;
    const top = item.y <= b.y + b.height / 2;

    let index = Node.TOP_LEFT;
    if (left) {
      if (!top) {
        index = Node.BOTTOM_LEFT;
      }
    } else {
      if (top) {
        index = Node.TOP_RIGHT;
      } else {
        index = Node.BOTTOM_RIGHT;
      }
    }

    return index;
  }

  subdivide(): void {
    const depth = this._depth + 1;

    const bx = this._bounds.x;
    const by = this._bounds.y;

    const b_w_h = Math.floor(this._bounds.width / 2);
    const b_h_h = Math.floor(this._bounds.height / 2);
    const bx_b_w_h = bx + b_w_h;
    const by_b_h_h = by + b_h_h;

    this.nodes[Node.TOP_LEFT] = new Node(
      {
        x: bx,
        y: by,
        width: b_w_h,
        height: b_h_h,
      },
      depth,
    );

    this.nodes[Node.TOP_RIGHT] = new Node(
      {
        x: bx_b_w_h,
        y: by,
        width: b_w_h,
        height: b_h_h,
      },
      depth,
    );

    this.nodes[Node.BOTTOM_LEFT] = new Node(
      {
        x: bx,
        y: by_b_h_h,
        width: b_w_h,
        height: b_h_h,
      },
      depth,
    );

    this.nodes[Node.BOTTOM_RIGHT] = new Node(
      {
        x: bx_b_w_h,
        y: by_b_h_h,
        width: b_w_h,
        height: b_h_h,
      },
      depth,
    );
  }

  clear(): void {
    this.children.length = 0;

    const len = this.nodes.length;
    for (let i = 0; i < len; i++) {
      this.nodes[i].clear();
    }

    this.nodes.length = 0;
  }
}
