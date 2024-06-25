import { gridCellHeight, gridCellWidth } from "./game";
import { Enemy } from "./villans";
const enemytypes: any = [];
const enemy1 = new Image();
enemy1.src = "./images/golemrun.png";
enemytypes.push(enemy1);
const enemy2 = new Image();
enemy2.src = "./images/fireballrun.png";
enemytypes.push(enemy2);
const enemy3 = new Image();
enemy3.src = "./images/monsterdogwalk.png";
enemytypes.push(enemy3);
const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;
import { gameSpeed } from "./game";

class Golem extends Enemy {
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
    this.speed = 0.4;
    this.type = "enemy";
    this.moment = this.speed;
    this.health = 120;
    this.pointsAwarded = this.health;
    this.frameX = 0;
    this.frameY = 0;
    this.eachWidth = 900;
    this.eachHeight = 900;
    this.firstFrame = 0;
    this.lastFrame = 11;
    this.enemytype = enemytypes[0];

    this.attackAnimationFrames = 3;
    this.hurtAnimationFrames = 1;
    this.deathAnimationFrames = 4;
    this.dustCloudAnimationFrames = 4;

    // Load additional images
    this.attackImageSrc = "./images/golemattack.png";
    this.hurtImageSrc = "./images/golemhurt.png";
    this.deathImageSrc = "./images/golemdead.png";
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

class FireSpirit extends Enemy {
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
    this.speed = 0.4;
    this.moment = this.speed;
    this.health = 120;
    this.type = "enemy";
    this.pointsAwarded = this.health;
    this.frameX = 0;
    this.frameY = 0;
    this.eachWidth = 128;
    this.eachHeight = 128;
    this.firstFrame = 0;
    this.lastFrame = 20;
    this.enemytype = enemytypes[1];

    this.attackAnimationFrames = 23;
    this.hurtAnimationFrames = 2;
    this.deathAnimationFrames = 4;
    this.dustCloudAnimationFrames = 4;

    // Load additional images
    this.attackImageSrc = "./images/fireballattack.png";
    this.hurtImageSrc = "./images/fireballhurt.png";
    this.deathImageSrc = "./images/fireballdead.png";
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
    ctx1.font = "10px Arial";
    ctx1.fillText(this.health.toString(), this.x + 35, this.y + 10);
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
          this.y - 10,
          this.width + 30,
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

class MonsterDog extends Enemy {
  speed: number;
  type: string;
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
    this.speed = 0.4;
    this.moment = this.speed;
    this.health = 120;
    this.type = "enemy";
    this.pointsAwarded = this.health;
    this.frameX = 0;
    this.frameY = 0;
    this.eachWidth = 96;
    this.eachHeight = 96;
    this.firstFrame = 0;
    this.lastFrame = 5;
    this.enemytype = enemytypes[2];

    this.attackAnimationFrames = 11;
    this.hurtAnimationFrames = 3;
    this.deathAnimationFrames = 5;
    this.dustCloudAnimationFrames = 4;

    // Load additional images
    this.attackImageSrc = "./images/monsterdogattack.png";
    this.hurtImageSrc = "./images/monterdoghurt.png";
    this.deathImageSrc = "./images/monsterdogdeath.png";
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
    ctx1.font = "10px Arial";
    ctx1.fillText(this.health.toString(), this.x + 35, this.y + 10);
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
          this.y - 30,
          this.width + 10,
          this.height + 20
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
          this.y - 30,
          this.width + 10,
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
          this.width + 10,
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
          this.width + 10,
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

export const wave2Enemies = [Golem, FireSpirit, MonsterDog];
