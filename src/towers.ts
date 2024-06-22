import { gameSpeed } from "./game";
import { ProjectileForTowers } from "./projectilefortower";
import { removeEntity } from "./utils";
import { enemies, Enemy } from "./villans";

const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;
export let projectilesfortowers: ProjectileForTowers[] = [];
let nearestEnemy: Enemy | null = null;
// Health bar colors
const HEALTH_BAR_GREEN = "#00FF00";
const HEALTH_BAR_RED = "#FF0000";

class Tower {
  height: number;
  width: number;
  x: number;
  y: number;
  firstFrame: number;
  lastFrame: number;
  frameX: number;
  tower: HTMLImageElement;
  eachWidth: number;
  eachHeight: number;
  lastShootTime: number;
  shootInterval: number;
  defaultShootInterval: number;
  collisionShootInterval: number;
  isColliding: boolean;
  health: number;
  maxHealth: number;
  dustCloudSprite: HTMLImageElement;
  dustCloudFrames: number;
  dustCloudFrameIndex: number;
  dustCloudFrameWidth: number;

  static shooterIndex: number = 0;
  static shooterChangeInterval: number = 3000; // Change shooter every 3 seconds
  static lastShooterChangeTime: number = Date.now();

  constructor(
    height: number,
    width: number,
    x: number,
    y: number,
    firstFrame: number,
    lastFrame: number,
    frameX: number
  ) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.firstFrame = firstFrame;
    this.lastFrame = lastFrame;
    this.frameX = frameX;
    this.tower = new Image();
    this.tower.src = "./images/tower.png";
    this.eachWidth = 128;
    this.eachHeight = 144;
    this.lastShootTime = 0;
    this.defaultShootInterval = 5000;
    this.collisionShootInterval = 100; // Faster shoot interval during collision
    this.shootInterval = this.defaultShootInterval;
    this.isColliding = false;
    this.maxHealth = 400; // Adjust as needed
    this.health = this.maxHealth;
    this.dustCloudSprite = new Image();
    this.dustCloudSprite.src = "./images/mandrake-dust-cloud.png";
    this.dustCloudFrames = 4; // Number of frames in the dust cloud sprite sheet
    this.dustCloudFrameIndex = 0;
    this.dustCloudFrameWidth = 200; // Width of each frame in the sprite sheet
  }

  draw() {
    if (gameSpeed % 6 === 0) {
      if (this.frameX < this.lastFrame) {
        this.frameX += 1;
      } else {
        this.frameX = this.firstFrame;
      }
    }
    ctx1.drawImage(
      this.tower,
      this.eachWidth * this.frameX,
      0,
      this.eachWidth,
      this.eachHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    // Draw health bar
    this.drawHealthBar();

    this.launchProjectile();
    projectilesfortowers.forEach((projectile) => {
      projectile.update();
      projectile.draw();
    });
  }

  launchProjectile() {
    const currentTime = Date.now();
    let nearestEnemy = this.findNearestEnemy();
    if (
      nearestEnemy &&
      currentTime - this.lastShootTime > this.shootInterval &&
      towers.indexOf(this) === Tower.shooterIndex
    ) {
      const peakHeight = 100;
      const projectile = new ProjectileForTowers(
        this.x + 60,
        this.y,
        nearestEnemy.x,
        nearestEnemy.y,
        peakHeight
      );
      projectilesfortowers.push(projectile);
      this.lastShootTime = currentTime;
    }
    console.log(
      `Tower at (${this.x}, ${this.y}) shoot interval: ${this.shootInterval}`
    );
  }

  static updateShooter() {
    const currentTime = Date.now();
    if (
      currentTime - Tower.lastShooterChangeTime >
      Tower.shooterChangeInterval
    ) {
      Tower.shooterIndex = (Tower.shooterIndex + 1) % towers.length;
      Tower.lastShooterChangeTime = currentTime;
      console.log(`Shooter changed to tower index: ${Tower.shooterIndex}`);
    }
  }

  findNearestEnemy() {
    let minDist = Infinity;

    // Determine the y-coordinate range based on a 50% chance
    const targetY = Math.random() < 0.5 ? this.y : this.y + 64;

    enemies.forEach((enemy: any) => {
      if (enemy.y >= targetY && enemy.y <= targetY + 64) {
        const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
        if (dist < minDist && dist <= 64 * 3) {
          // Check for proximity within 3 cells
          minDist = dist;
          nearestEnemy = enemy;
        }
      }
    });

    return nearestEnemy;
  }

  drawHealthBar() {
    const healthBarWidth = this.width;
    const healthBarHeight = 8; // Height of the health bar
    const healthBarX = this.x;
    const healthBarY = this.y - healthBarHeight + 4; // Position above the tower

    // Draw background (green) health bar
    ctx1.fillStyle = HEALTH_BAR_RED;
    ctx1.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    // Calculate the current health percentage
    const healthPercentage = this.health / this.maxHealth;

    // Draw red health bar based on current health
    ctx1.fillStyle = HEALTH_BAR_GREEN;
    ctx1.fillRect(
      healthBarX,
      healthBarY,
      healthBarWidth * healthPercentage,
      healthBarHeight
    );

    // If health is depleted, draw the dust cloud sprite sheet
    if (this.health <= 0) {
      if (gameSpeed % 20 === 0) {
        if (this.frameX < 4) {
          this.frameX += 1;
        } else {
          this.frameX = this.firstFrame;
        }
      }
      ctx1.drawImage(
        this.dustCloudSprite,
        200 * this.frameX,
        0,
        200,
        179,
        this.x,
        this.y,
        this.width + 20,
        this.height
      );

      setTimeout(() => {
        removeEntity(towers, this);
      }, 1000);
    }
  }

  checkCollisionWithEnemies() {
    this.isColliding = false;
    for (let enemy of enemies) {
      if (
        this.x < enemy.x + enemy.width &&
        this.x + this.width > enemy.x &&
        this.y < enemy.y + enemy.height &&
        this.y + this.height > enemy.y
      ) {
        enemy.speed = 0;
        enemy.x = enemy.x + 2;
        enemy.state = "attacking";
        this.isColliding = true;

        // Decrease health upon collision
        this.health -= 10; // Adjust the health decrease amount as needed
        this.shootInterval = this.collisionShootInterval; // Change shoot interval during collision
        break;
      }
    }

    if (!this.isColliding) {
      this.shootInterval = this.defaultShootInterval; // Return to default shoot interval when not colliding
    }

    console.log(
      `Tower at (${this.x}, ${this.y}) is colliding: ${this.isColliding}, health: ${this.health}`
    );
  }
}

// Create instances of the Tower class for the placement of the four towers
export const towers: Tower[] = [
  new Tower(128, 128, 0, 64, 0, 11, 0), // Uses frames 0 to 11
  new Tower(128, 128, 0, 192, 0, 11, 0), // Uses frames 0 to 11
  new Tower(128, 128, 0, 320, 0, 11, 0), // Uses frames 0 to 11
  new Tower(128, 128, 0, 448, 0, 11, 0), // Uses frames 0 to 11
];

export function drawTower() {
  Tower.updateShooter();
  towers.forEach((tower) => {
    tower.checkCollisionWithEnemies();
    tower.draw();
  });
}
