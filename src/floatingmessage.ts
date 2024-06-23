import { removeEntity } from "./utils";

const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;
export let floatingmessage: FloatingMessage[] = [];
export class FloatingMessage {
  value: number | string;
  x: number;
  y: number;
  size: number;
  life: number;
  color: string;
  opacity: number;
  constructor(
    value: number | string,
    x: number,
    y: number,
    size: number,
    life: number,
    color: string
  ) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.size = size;
    this.life = life;
    this.color = color;
    this.opacity = 1;
  }
  update() {
    this.y = this.y - 0.6;
    this.life = this.life + 1;
    if (this.opacity > 0.02) {
      this.opacity -= 0.02;
    }
  }

  draw() {
    ctx1.globalAlpha = this.opacity;
    ctx1.fillStyle = this.color;
    ctx1.font = `${this.size}px Georgia`;
    ctx1.fillText(this.value.toString(), this.x, this.y);
    ctx1.globalAlpha = 1;
  }
}

export function drawMessages() {
  for (let i = 0; i <= floatingmessage.length - 1; i++) {
    floatingmessage[i].draw();
    floatingmessage[i].update();
    if (floatingmessage[i].life > 500000000) {
      removeEntity(floatingmessage, floatingmessage[i]);
    }
  }
}
