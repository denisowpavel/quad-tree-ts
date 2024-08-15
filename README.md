# TypeScript Port of QuadTree

### Original project:
https://github.com/mikechambers/ExamplesByMesh/blob/master/JavaScript/QuadTree

### Author of original project:
Mike Chambers
http://www.mikechambers.com

### Author of port from JavaScript to TypeScript
Pavel Denisow

### Example
```typescript
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

```

### License
The MIT License

Copyright (c) 2011 Mike Chambers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


