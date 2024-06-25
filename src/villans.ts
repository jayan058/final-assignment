import { gridCellHeight, gridCellWidth, gameSpeed } from "./game";
import { Projectile } from "./projectiles";
const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;
export let villanprojectiles: Projectile[] = [];

let enemytypes: any = [];
export let enemies: any = [];

const enemy1 = new Image();
enemy1.src = "./images/firevizardattack.png";
enemytypes.push(enemy1);
const enemy2 = new Image();
enemy2.src = "./images/battleturtleattack.png";

enemytypes.push(enemy2);

const enemy3 = new Image();
enemy3.src = "./images/tengurun.png";
enemytypes.push(enemy3);

const enemy4 = new Image();
enemy4.src = "./images/mazerun.png";
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
  projectileImageSrc: string;
  shootInterval: number;
  lastShotTime: number;

  constructor(x: number, y: number) {
    super(x, y, gridCellWidth, gridCellHeight);
    this.speed = 0.4;
    this.moment = this.speed;
    this.health = 120;
    this.pointsAwarded = this.health;
    this.frameX = 0;
    this.frameY = 0;
    this.eachWidth = 128;
    this.eachHeight = 128;
    this.firstFrame = 1;
    this.lastFrame = 15;
    this.enemytype = enemytypes[0];

    this.attackAnimationFrames = 13;
    this.hurtAnimationFrames = 2;
    this.deathAnimationFrames = 5;
    this.dustCloudAnimationFrames = 4;

    // Load additional images
    this.attackImageSrc = "./images/vizardattack.png";
    this.hurtImageSrc = "./images/vizardhurt.png";
    this.deathImageSrc = "./images/vizarddead.png";
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
    this.shootInterval = 1300;
    this.lastShotTime = 600;

    this.projectileImageSrc = "./images/fireballattack.png";
  }

  shoot() {
    const projectile = new Projectile(
      this.x + this.width - 150,
      this.y,
      -3,
      this.projectileImageSrc,
      "fireball",
      64,
      64,
      0,
      23,
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
      if (this.frameX < this.lastFrame) {
        this.frameX += 1;
      } else {
        this.frameX = this.firstFrame;
      }
    }
  }

  draw() {
    ctx1.fillStyle = "gold";
    ctx1.font = "8px Audiowide";
    ctx1.fillText(this.health.toString(), this.x + 20, this.y);
    switch (this.state) {
      case "idle":
        if (gameSpeed % 10000 === 0) {
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
          this.x - 50,
          this.y - 40,
          this.width + 50,
          this.height + 30
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
          this.x - 50,
          this.y - 40,
          this.width + 50,
          this.height + 30
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
          this.x - 50,
          this.y - 40,
          this.width + 50,
          this.height + 30
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
          this.x - 50,
          this.y - 40,
          this.width + 50,
          this.height + 30
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
          this.x - 50,
          this.y - 40,
          this.width + 50,
          this.height + 30
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
    super(x, y, gridCellWidth, gridCellHeight);
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
      9,
      10,
      0,
      0,
      9,
      10
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
      if (this.frameX < this.lastFrame) {
        this.frameX += 1;
      } else {
        this.frameX = this.firstFrame;
      }
    }
  }

  draw() {
    ctx1.fillStyle = "gold";
    ctx1.font = "8px Audiowide";
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
  projectileImageSrc: string;
  shootInterval: number;
  lastShotTime: number;

  constructor(x: number, y: number) {
    super(x, y, gridCellWidth, gridCellHeight);
    this.type = "enemy";
    this.speed = 0.4;
    this.moment = this.speed;
    this.health = 120;
    this.pointsAwarded = this.health;
    this.frameX = 0;
    this.frameY = 0;
    this.eachWidth = 128;
    this.eachHeight = 128;
    this.firstFrame = 0;
    this.lastFrame = 14;
    this.enemytype = enemytypes[3];

    this.attackAnimationFrames = 3;
    this.hurtAnimationFrames = 2;
    this.deathAnimationFrames = 4;
    this.dustCloudAnimationFrames = 4;

    // Load additional images
    this.attackImageSrc = "./images/mageattack.png";
    this.hurtImageSrc = "./images/magehurt.png";
    this.deathImageSrc = "./images/magedead.png";
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
    this.shootInterval = 1200;
    this.lastShotTime = 0;

    this.projectileImageSrc = "./images/magefireball.png";
  }

  shoot() {
    const projectile = new Projectile(
      this.x + this.width - 100,
      this.y,
      -3,
      this.projectileImageSrc,
      "fireball",
      64,
      64,
      0,
      8,
      64,
      64
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
      if (this.frameX < this.lastFrame) {
        this.frameX += 1;
      } else {
        this.frameX = this.firstFrame;
      }
    }
  }

  draw() {
    ctx1.fillStyle = "gold";
    ctx1.font = "8px Audiowide";
    ctx1.fillText(this.health.toString(), this.x + 5, this.y);
    switch (this.state) {
      case "idle":
        if (gameSpeed % 1000 === 0) {
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
          this.x - 50,
          this.y - 40,
          this.width + 50,
          this.height + 30
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
          this.x - 50,
          this.y - 40,
          this.width + 50,
          this.height + 30
        );

        break;
      case "hurt":
        if (gameSpeed % 3 === 0) {
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
          this.x - 50,
          this.y - 40,
          this.width + 50,
          this.height + 30
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
          this.x - 50,
          this.y - 40,
          this.width + 50,
          this.height + 30
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
    this.type = "enemy";
    this.speed = 0.4;
    this.moment = this.speed;
    this.health = 120;
    this.pointsAwarded = this.health;
    this.frameX = 0;
    this.frameY = 0;
    this.eachWidth = 128;
    this.eachHeight = 128;
    this.firstFrame = 0;
    this.lastFrame = 22;
    this.enemytype = enemytypes[2];

    this.attackAnimationFrames = 12;
    this.hurtAnimationFrames = 2;
    this.deathAnimationFrames = 6;
    this.dustCloudAnimationFrames = 4;

    // Load additional images
    this.attackImageSrc = "./images/tenguattack.png";
    this.hurtImageSrc = "./images/tenguhurt.png";
    this.deathImageSrc = "./images/tengudead.png";
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
      if (this.frameX < this.lastFrame) {
        this.frameX += 1;
      } else {
        this.frameX = this.firstFrame;
      }
    }
  }

  draw() {
    ctx1.fillStyle = "gold";
    ctx1.font = "8px Audiowide";
    ctx1.fillText(this.health.toString(), this.x, this.y);
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
          this.x - 20,
          this.y - 20,
          this.width + 10,
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
          this.x - 20,
          this.y - 20,
          this.width + 10,
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
          this.x - 20,
          this.y - 20,
          this.width + 10,
          this.height + 10
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
          this.x - 20,
          this.y - 20,
          this.width + 10,
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
          this.x - 20,
          this.y - 20,
          this.width + 10,
          this.height + 10
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
