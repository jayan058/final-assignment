const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;

var image = new Image();
image.src = "./images/projectilefortower.png";

export class ProjectileForTowers {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  peakHeight: number;
  speed: number;
  progress: number;
  width: number;
  height: number;

  constructor(
    startX: number,
    startY: number,
    targetX: number,
    targetY: number,
    peakHeight: number = 0
  ) {
    this.x = startX;
    this.y = startY;
    this.startX = startX;
    this.startY = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.peakHeight = peakHeight;
    this.speed = targetX > 384 ? 0.8 : 0.8;
    this.progress = 0;
    this.width = 25;
    this.height = 25;
  }

  update() {
    this.progress += this.speed;
    const totalDistance = Math.hypot(
      this.targetX - this.startX,
      this.targetY - this.startY
    );
    const normalizedProgress = this.progress / totalDistance;

    // Linear interpolation for x and y
    this.x = this.startX + (this.targetX - this.startX) * normalizedProgress;
    this.y = this.startY + (this.targetY - this.startY) * normalizedProgress;

    if (normalizedProgress >= 1) {
      // Reached the target
      this.progress = totalDistance + canvas1.width; // Stop further updates
    }
  }

  draw() {
    // Draw the sprite frame
    ctx1.drawImage(image, this.x, this.y, this.width, this.height);
  }
}
