const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;
import { gameSpeed } from "./game";
export let trees: Tree[] = [];

export class Tree {
  height: number;
  width: number;
  x: number;
  y: number;
  image: HTMLImageElement;
  numXFrames: number;
  numYFrames: number;
  spriteWidth: number;
  spriteHeight: number;
  cardFrameX: number;
  cardFrameY: number;
  lastFrameTime: number;

  constructor(
    height: number,
    width: number,
    x: number,
    y: number,
    imageSrc: string,
    numXFrames: number,
    numYFrames: number,
    spriteWidth: number,
    spriteHeight: number
  ) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = imageSrc;

    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.numXFrames = numXFrames;
    this.numYFrames = numYFrames;
    this.lastFrameTime = Date.now();
    this.cardFrameX = 10;
    this.cardFrameY = 0;
  }

  draw() {
    if (gameSpeed % 5 === 0) {
      this.cardFrameX++;
      if (this.cardFrameX >= this.numXFrames) {
        this.cardFrameX = 0;
        this.cardFrameY++;
        if (this.cardFrameY >= this.numYFrames) {
          this.cardFrameY = 0;
        }
      }
    }

    ctx1.drawImage(
      this.image,
      this.cardFrameX * this.spriteWidth,
      this.cardFrameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class OakTree extends Tree {
  constructor(x: number, y: number) {
    super(
      100,
      130,
      x,
      y,
      "./images/tree1.png",
      11, // Number of frames in the x direction
      0, // Number of frames in the y direction
      249, // Sprite width
      341 // Sprite height
    );
  }
}

export class PineTree extends Tree {
  constructor(x: number, y: number) {
    super(
      100,
      130,
      x,
      y,
      "./images/tree2.png",
      28, // Number of frames in the x direction
      0, // Number of frames in the y direction
      519, // Sprite width
      549 // Sprite height
    );
  }
}

export function drawTrees() {
  trees.forEach((tree) => {
    console.log("Hey");

    tree.draw();
  });
}

trees.push(new OakTree(770, 0));

trees.push(new PineTree(1200, 79));

trees.push(new PineTree(600, 200));

trees.push(new PineTree(300, 390));
