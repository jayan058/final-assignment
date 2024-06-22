import { gridCellHeight, gridCellWidth } from "./game";
import { Enemy } from "./villans";
const enemytypes: any = [];
const enemy3 = new Image();
enemy3.src = "./images/enemy2.png";
enemytypes.push(enemy3);
const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;
import { gameSpeed } from "./game";

class Ghost extends Enemy {
  speed: number;
  moment: number;
  health: number;
  pointsAwarded: number;
  frameX: number;
  frameY: number;
  eachWidth: number;
  eachHeight: number;
  firstFrame: number;
  lastFrame: number;
  enemytype: HTMLImageElement;
  attackInterval: number;

  constructor(x: number, y: number) {
    super(x, y, gridCellWidth, gridCellHeight); // Adjust width and height if needed
    this.speed = 0.7;
    this.moment = this.speed;
    this.health = 120;
    this.pointsAwarded = this.health;
    this.frameX = 0;
    this.frameY = 0;
    this.eachWidth = 900;
    this.eachHeight = 900;
    this.firstFrame = 0;
    this.lastFrame = 11;
    this.enemytype = enemytypes[0]; // Set the specific image/type for EnemyType2
    this.attackInterval = 20;
  }

  enemyMovement() {
    this.x = this.x - this.speed;
    if (gameSpeed % 10 === 0) {
      // Update frameX to flap wings
      if (this.frameX < this.lastFrame) {
        this.frameX += 1;
      } else {
        this.frameX = this.firstFrame;
      }
    }
  }

  draw() {
    ctx1.fillStyle = "gold";
    ctx1.font = "10px Arial";
    ctx1.fillText(this.health.toString(), this.x + 25, this.y + 10);
    ctx1.drawImage(
      this.enemytype,
      this.eachWidth * this.frameX,
      0,
      this.eachWidth,
      this.eachHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export const wave3Enemies = [Ghost];
