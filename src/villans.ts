import { gridCellHeight, gridCellWidth, gameSpeed } from "./game";
import { Projectile } from "./projectiles";

const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;
export let villanprojectiles: Projectile[] = [];

let enemytypes: any = [];
export let enemies: any = [];

const enemy1 = new Image();
enemy1.src = "./images/enemy1.png";
enemytypes.push(enemy1);
const enemy2 = new Image();
enemy2.src = "./images/battleturtleattack.png";

enemytypes.push(enemy2);

const enemy3 = new Image();
enemy3.src = "./images/enemy3.png";
enemytypes.push(enemy3);

const enemy4 = new Image();
enemy4.src = "./images/centipidewalk.png";
enemytypes.push(enemy4);

// Define Villain class
export class Enemy {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {}
  enemyMovement() {}
}

// Define more enemy types similarly
class zombieVillager extends Enemy {
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
  state: "idle" | "attacking" | "hurt" | "dead" | "dustcloud";
  attackAnimationFrames: number;
  hurtAnimationFrames: number;
  deathAnimationFrames: number;
  dustCloudAnimationFrames: number;
  attackImageSrc: string;
  hurtImageSrc: string;
  deathImageSrc: string;
  dustCloudImageSrc: string;

  // Image elements
  attackImage: HTMLImageElement;
  hurtImage: HTMLImageElement;
  deathImage: HTMLImageElement;
  dustCloudImage: HTMLImageElement;
  endurance: number;
  isCollidingWithVilan: boolean;
  isCollidingWithHero: boolean;
  type: string;

  constructor(x: number, y: number) {
    super(x, y, gridCellWidth, gridCellHeight); // Adjust width and height if needed
    this.speed = 0.4;
    this.moment = this.speed;
    this.health = 120;
    this.pointsAwarded = this.health;
    this.frameX = 0;
    this.frameY = 0;
    this.eachWidth = 900;
    this.eachHeight = 900;
    this.firstFrame = 1;
    this.lastFrame = 11;
    this.enemytype = enemytypes[0];
    // Set the specific image/type for EnemyType2
    this.attackAnimationFrames = 11;
    this.hurtAnimationFrames = 11;
    this.deathAnimationFrames = 14;
    this.dustCloudAnimationFrames = 4;

    // Load additional images
    this.attackImageSrc = "./images/zomievillagerattack.png";
    this.hurtImageSrc = "./images/zomievillagerhurt.png";
    this.deathImageSrc = "./images/zomievillagerdeath.png";
    this.dustCloudImageSrc = "./images/mandrake-dust-cloud.png";

    this.attackImage = new Image();
    this.attackImage.src = this.attackImageSrc;

    this.hurtImage = new Image();
    this.hurtImage.src = this.hurtImageSrc;

    this.deathImage = new Image();
    this.deathImage.src = this.deathImageSrc;

    this.dustCloudImage = new Image();
    this.dustCloudImage.src = this.dustCloudImageSrc;
    this.state = "idle";
    this.endurance = 20;
    this.isCollidingWithVilan = false;
    this.isCollidingWithHero = false;
    this.type = "enemy";
  }

  enemyMovement() {
    this.x = this.x - this.speed;
    if (gameSpeed % 5 === 0) {
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
    switch (this.state) {
      case "idle":
        if (gameSpeed % 17 === 0) {
          if (this.frameX < this.lastFrame) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
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

        break;
      case "attacking":
        if (gameSpeed % 10 === 0) {
          if (this.frameX < this.attackAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.attackImage,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );

        break;
      case "hurt":
        if (gameSpeed % 8 === 0) {
          if (this.frameX < this.hurtAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.hurtImage,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );

        break;
      case "dead":
        if (gameSpeed % 10 === 0) {
          if (this.frameX < this.deathAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.deathImage,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );

        break;
      case "dustcloud":
        if (gameSpeed % 8 === 0) {
          if (this.frameX < this.dustCloudAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.dustCloudImage,
          200 * this.frameX,
          0,
          200,
          179,
          this.x,
          this.y,
          this.width,
          this.height
        );

        break;
    }
  }
}

class BattleTurtle extends Enemy {
  type: string;
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
  state: "idle" | "attacking" | "hurt" | "dead" | "dustcloud";
  attackAnimationFrames: number;
  hurtAnimationFrames: number;
  deathAnimationFrames: number;
  dustCloudAnimationFrames: number;
  attackImageSrc: string;
  hurtImageSrc: string;
  deathImageSrc: string;
  dustCloudImageSrc: string;

  // Image elements
  attackImage: HTMLImageElement;
  hurtImage: HTMLImageElement;
  deathImage: HTMLImageElement;
  dustCloudImage: HTMLImageElement;
  endurance: number;
  isCollidingWithVilan: boolean;
  isCollidingWithHero: boolean;
  shootInterval: number;
  lastShotTime: number;

  projectileImageSrc: string;

  constructor(x: number, y: number) {
    super(x, y, gridCellWidth, gridCellHeight); // Adjust width and height if needed
    this.speed = 0.4;
    this.moment = this.speed;
    this.health = 120;
    this.pointsAwarded = this.health;
    this.frameX = 0;
    this.frameY = 0;
    this.eachWidth = 72.5;
    this.eachHeight = 72;
    this.firstFrame = 0;
    this.lastFrame = 11;
    this.type = "enemy";
    this.enemytype = enemytypes[1];
    // Set the specific image/type for EnemyType2
    this.attackAnimationFrames = 3;
    this.hurtAnimationFrames = 1;
    this.deathAnimationFrames = 3;
    this.dustCloudAnimationFrames = 4;

    // Load additional images
    this.attackImageSrc = "./images/battleturtlefight.png";
    this.hurtImageSrc = "./images/battleturtlehurt.png";
    this.deathImageSrc = "./images/battleturtledead.png";
    this.dustCloudImageSrc = "./images/mandrake-dust-cloud.png";

    this.attackImage = new Image();
    this.attackImage.src = this.attackImageSrc;

    this.hurtImage = new Image();
    this.hurtImage.src = this.hurtImageSrc;

    this.deathImage = new Image();
    this.deathImage.src = this.deathImageSrc;

    this.dustCloudImage = new Image();
    this.dustCloudImage.src = this.dustCloudImageSrc;
    this.state = "idle";
    this.endurance = 20;
    this.isCollidingWithVilan = false;
    this.isCollidingWithHero = false;
    this.shootInterval = 1000;
    this.lastShotTime = 300;

    this.projectileImageSrc = "./images/ninjaturtlebullet.png";
  }
  shoot() {
    const projectile = new Projectile(
      this.x + this.width - 30,
      this.y + 20,
      -3,
      this.projectileImageSrc,
      "fireball",
      128,
      128,
      0,
      0,
      128,
      128
    );
    villanprojectiles.push(projectile);
  }

  enemyMovement() {
    const currentTime = Date.now();
    if (currentTime - this.lastShotTime >= this.shootInterval) {
      console.log("Hello");
      console.log(this.shootInterval);

      this.shoot();
      this.lastShotTime = currentTime;
    }

    this.x = this.x - this.speed;
    if (gameSpeed % 5 === 0) {
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
    switch (this.state) {
      case "idle":
        if (gameSpeed % 100 === 0) {
          if (this.frameX < this.lastFrame) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.enemytype,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y - 20,
          this.width,
          this.height + 10
        );

        break;
      case "attacking":
        if (gameSpeed % 5 === 0) {
          if (this.frameX < this.attackAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.attackImage,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y - 20,
          this.width,
          this.height + 10
        );

        break;
      case "hurt":
        if (gameSpeed % 5 === 0) {
          if (this.frameX < this.hurtAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.hurtImage,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y - 20,
          this.width,
          this.height + 10
        );

        break;
      case "dead":
        if (gameSpeed % 15 === 0) {
          if (this.frameX < this.deathAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.deathImage,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y - 20,
          this.width,
          this.height + 10
        );

        break;
      case "dustcloud":
        if (gameSpeed % 8 === 0) {
          if (this.frameX < this.dustCloudAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.dustCloudImage,
          200 * this.frameX,
          0,
          200,
          179,
          this.x,
          this.y,
          this.width,
          this.height
        );

        break;
    }
  }
}

class Centipide extends Enemy {
  type: string;
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
  state: "idle" | "attacking" | "hurt" | "dead" | "dustcloud";
  attackAnimationFrames: number;
  hurtAnimationFrames: number;
  deathAnimationFrames: number;
  dustCloudAnimationFrames: number;
  attackImageSrc: string;
  hurtImageSrc: string;
  deathImageSrc: string;
  dustCloudImageSrc: string;

  // Image elements
  attackImage: HTMLImageElement;
  hurtImage: HTMLImageElement;
  deathImage: HTMLImageElement;
  dustCloudImage: HTMLImageElement;
  endurance: number;
  isCollidingWithVilan: boolean;
  isCollidingWithHero: boolean;

  constructor(x: number, y: number) {
    super(x, y, gridCellWidth, gridCellHeight);
    this.type = "enemy"; // Adjust width and height if needed
    this.speed = 0.4;
    this.moment = this.speed;
    this.health = 120;
    this.pointsAwarded = this.health;
    this.frameX = 0;
    this.frameY = 0;
    this.eachWidth = 72;
    this.eachHeight = 72;
    this.firstFrame = 0;
    this.lastFrame = 3;
    this.enemytype = enemytypes[3];
    // Set the specific image/type for EnemyType2
    this.attackAnimationFrames = 15;
    this.hurtAnimationFrames = 1;
    this.deathAnimationFrames = 3;
    this.dustCloudAnimationFrames = 4;

    // Load additional images
    this.attackImageSrc = "./images/centipideattack.png";
    this.hurtImageSrc = "./images/centipidehurt.png";
    this.deathImageSrc = "./images/centipidedeath.png";
    this.dustCloudImageSrc = "./images/mandrake-dust-cloud.png";

    this.attackImage = new Image();
    this.attackImage.src = this.attackImageSrc;

    this.hurtImage = new Image();
    this.hurtImage.src = this.hurtImageSrc;

    this.deathImage = new Image();
    this.deathImage.src = this.deathImageSrc;

    this.dustCloudImage = new Image();
    this.dustCloudImage.src = this.dustCloudImageSrc;
    this.state = "idle";
    this.endurance = 20;
    this.isCollidingWithVilan = false;
    this.isCollidingWithHero = false;
  }

  enemyMovement() {
    this.x = this.x - this.speed;
    if (gameSpeed % 5 === 0) {
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
    switch (this.state) {
      case "idle":
        if (gameSpeed % 100 === 0) {
          if (this.frameX < this.lastFrame) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.enemytype,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y - 30,
          this.width + 20,
          this.height + 20
        );

        break;
      case "attacking":
        if (gameSpeed % 500 === 0) {
          if (this.frameX < this.attackAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.attackImage,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y - 30,
          this.width + 20,
          this.height + 20
        );

        break;
      case "hurt":
        if (gameSpeed % 8 === 0) {
          if (this.frameX < this.hurtAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.hurtImage,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y - 30,
          this.width + 20,
          this.height + 20
        );

        break;
      case "dead":
        if (gameSpeed % 10 === 0) {
          if (this.frameX < this.deathAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.deathImage,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y - 30,
          this.width + 20,
          this.height + 20
        );

        break;
      case "dustcloud":
        if (gameSpeed % 8 === 0) {
          if (this.frameX < this.dustCloudAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.dustCloudImage,
          200 * this.frameX,
          0,
          200,
          179,
          this.x,
          this.y,
          this.width,
          this.height
        );

        break;
    }
  }
}

class FallenAngel extends Enemy {
  type: string;
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
  state: "idle" | "attacking" | "hurt" | "dead" | "dustcloud";
  attackAnimationFrames: number;
  hurtAnimationFrames: number;
  deathAnimationFrames: number;
  dustCloudAnimationFrames: number;
  attackImageSrc: string;
  hurtImageSrc: string;
  deathImageSrc: string;
  dustCloudImageSrc: string;

  // Image elements
  attackImage: HTMLImageElement;
  hurtImage: HTMLImageElement;
  deathImage: HTMLImageElement;
  dustCloudImage: HTMLImageElement;
  endurance: number;
  isCollidingWithVilan: boolean;
  isCollidingWithHero: boolean;

  constructor(x: number, y: number) {
    super(x, y, gridCellWidth, gridCellHeight);
    this.type = "enemy"; // Adjust width and height if needed
    this.speed = 0.4;
    this.moment = this.speed;
    this.health = 120;
    this.pointsAwarded = this.health;
    this.frameX = 0;
    this.frameY = 0;
    this.eachWidth = 900;
    this.eachHeight = 900;
    this.firstFrame = 0;
    this.lastFrame = 11;
    this.enemytype = enemytypes[2];
    // Set the specific image/type for EnemyType2
    this.attackAnimationFrames = 11;
    this.hurtAnimationFrames = 11;
    this.deathAnimationFrames = 14;
    this.dustCloudAnimationFrames = 4;

    // Load additional images
    this.attackImageSrc = "./images/fallenangelattack.png";
    this.hurtImageSrc = "./images/fallenangelhurt.png";
    this.deathImageSrc = "./images/fallenangeldeath.png";
    this.dustCloudImageSrc = "./images/mandrake-dust-cloud.png";

    this.attackImage = new Image();
    this.attackImage.src = this.attackImageSrc;

    this.hurtImage = new Image();
    this.hurtImage.src = this.hurtImageSrc;

    this.deathImage = new Image();
    this.deathImage.src = this.deathImageSrc;

    this.dustCloudImage = new Image();
    this.dustCloudImage.src = this.dustCloudImageSrc;
    this.state = "idle";
    this.endurance = 20;
    this.isCollidingWithVilan = false;
    this.isCollidingWithHero = false;
  }

  enemyMovement() {
    this.x = this.x - this.speed;
    if (gameSpeed % 5 === 0) {
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
    switch (this.state) {
      case "idle":
        if (gameSpeed % 17 === 0) {
          if (this.frameX < this.lastFrame) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
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

        break;
      case "attacking":
        if (gameSpeed % 10 === 0) {
          if (this.frameX < this.attackAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.attackImage,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );

        break;
      case "hurt":
        if (gameSpeed % 8 === 0) {
          if (this.frameX < this.hurtAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.hurtImage,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );

        break;
      case "dead":
        if (gameSpeed % 10 === 0) {
          if (this.frameX < this.deathAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.deathImage,
          this.eachWidth * this.frameX,
          0,
          this.eachWidth,
          this.eachHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );

        break;
      case "dustcloud":
        if (gameSpeed % 8 === 0) {
          if (this.frameX < this.dustCloudAnimationFrames) {
            this.frameX += 1;
          } else {
            this.frameX = this.firstFrame;
          }
        }
        ctx1.drawImage(
          this.dustCloudImage,
          200 * this.frameX,
          0,
          200,
          179,
          this.x,
          this.y,
          this.width,
          this.height
        );

        break;
    }
  }
}

export const wave1Enemies = [
  FallenAngel,
  zombieVillager,
  BattleTurtle,
  Centipide,
];

export function drawVillan() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].enemyMovement();
    enemies[i].draw();

    // Remove enemies that are off-screen or have no health
    if (enemies[i].x + enemies[i].width < 0) {
      enemies.splice(i, 1);
      i--;
    }
  }
  for (let i = villanprojectiles.length - 1; i >= 0; i--) {
    villanprojectiles[i]
      ? villanprojectiles[i].update(villanprojectiles[i])
      : null;
    villanprojectiles[i] ? villanprojectiles[i].draw(ctx1) : null;
  }
}
