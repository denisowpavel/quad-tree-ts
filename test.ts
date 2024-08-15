import { QuadTree } from "./src/QuadTree";
import { IBounds } from "./src/Interfaces";

const bounds: IBounds = {
  x: 0,
  y: 0,
  width: 800,
  height: 600,
};

const quad = new QuadTree(bounds);

// Insert a random point
quad.insert({
  x: 12,
  y: 25,
  height: 10,
  width: 25,
});

const items: IBounds[] = quad.retrieve({ x: 11, y: 20, height: 10, width: 20 });
console.log(items);
