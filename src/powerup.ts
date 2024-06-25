import { gameSpeed } from "./game";
import { resources, removeresource } from "./heroes";
import { FloatingMessage, floatingmessage } from "./floatingmessage";
import { removeEntity } from "./utils";
const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;
const cards: PowerCard[] = [];
let selectedCard: PowerCard | null = null;
export let powerups: Powerup[] = [];
interface PowerCard {
  x: number;
  y: number;
  width: number;
  height: number;
  imageSrc: string;
  frameX: number;
  frameY: number;
  eachWidth: number;
  eachHeight: number;
  firstFrame: number;
  lastFrame: number;
  image: HTMLImageElement;
  cost: number;
  name: string;
  imageX: number;
  imageY: number;
  classType: string;
}

// Function to create a PowerCard
function createPowerCard(
  imageSrc: string,
  x: number,
  y: number,
  width: number,
  height: number,
  frameX: number,
  frameY: number,
  eachWidth: number,
  eachHeight: number,
  firstFrame: number,
  lastFrame: number,
  cost: number,
  name: string,
  imageX: number,
  imageY: number,

  classType: string
): PowerCard {
  const image = new Image();
  image.src = imageSrc;

  const newCard: PowerCard = {
    x,
    y,
    width,
    height,
    imageSrc,
    frameX,
    frameY,
    eachWidth,
    eachHeight,
    firstFrame,
    lastFrame,
    image,
    cost,
    name,
    imageX,
    imageY,
    classType,
  };

  cards.push(newCard);

  return newCard;
}

createPowerCard(
  "./images/rocketpowerup.png",
  64 * 13,
  0,
  64,
  64,
  0,
  0,
  128,
  128,
  0,
  3,
  1000,
  "Rocket",
  64 * 13,
  0,
  "PowerupType1"
);
createPowerCard(
  "./images/landmine.png",
  64 * 14,
  0,
  64,
  64,
  0,
  0,
  368,
  383,
  0,
  0,
  500,
  "Land-Mine",
  64 * 14,
  0,
  "PowerupType2"
);
createPowerCard(
  "./images/pipebomb.png",
  64 * 15,
  0,
  64,
  64,
  0,
  0,
  368,
  383,
  0,
  3,
  500,
  "Pipe-bomb",
  64 * 15,
  0,
  "PowerupType3"
);

export function chooseCard() {
  cards.forEach((card) => {
    ctx1.strokeStyle = "white";
    ctx1.strokeRect(card.x, card.y, card.width, card.height);
    ctx1.fillStyle = "grey";
    ctx1.fillRect(card.x, card.y, card.width, card.height);

    if (gameSpeed % 9 === 0) {
      if (card.frameX < card.lastFrame) {
        card.frameX += 1;
      } else {
        card.frameX = card.firstFrame;
      }
    }
    ctx1.fillStyle = "white";
    ctx1.font = "8px Audiowide";
    ctx1.fillText(`${card.name}`, card.x + 11, card.y + 10);
    ctx1.fillText(`Cost: ${card.cost}`, card.x + 11, card.y + 20);
    ctx1.drawImage(
      card.image,
      card.eachWidth * card.frameX,
      0,
      card.eachWidth,
      card.eachHeight,
      card.imageX + 10,
      card.imageY + 20,
      card.width - 20,
      card.height - 20
    );
  });
}
let mouseX: number | null = null;
let mouseY: number | null = null;

canvas1.addEventListener("mousemove", (event) => {
  const rect = canvas1.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;

  drawHoverEffect();
});

function drawHoverEffect() {
  mouseX = mouseX ? mouseX - (mouseX % 64) : null;
  mouseY = mouseY ? mouseY - (mouseY % 64) : null;

  // If a card is selected, draw the hero at the mouse position
  if (
    selectedCard &&
    mouseX !== null &&
    mouseY !== null &&
    mouseY >= 64 &&
    mouseY < 576 &&
    mouseX >= 128
  ) {
    ctx1.strokeStyle = "gold";
    ctx1.strokeRect(mouseX, mouseY, 64, 64);
    ctx1.drawImage(
      selectedCard.image,
      selectedCard.eachWidth * selectedCard.frameX,
      0,
      selectedCard.eachWidth,
      selectedCard.eachHeight,
      mouseX + 10,
      mouseY + 10,
      selectedCard.width - 20,
      selectedCard.height - 20
    );
  }
}

// Define a Powerup class
class Powerup {
  x: number;
  y: number;
  type: string;
  image: HTMLImageElement;
  firstFrame: number;
  lastFrame: number;
  eachWidth: number;
  eachHeight: number;
  frameX: number;
  frameY: number;
  width: number;
  height: number;
  speed: number;
  constructor(
    x: number,
    y: number,
    type: string,
    imageSrc: string,
    firstFrame: number,
    lastFrame: number,
    eachWidth: number,
    eachHeight: number,
    speed: number
  ) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.image = new Image();
    this.image.src = imageSrc;
    this.eachWidth = eachWidth;
    this.eachHeight = eachHeight;
    this.firstFrame = firstFrame;
    this.lastFrame = lastFrame;
    this.frameX = firstFrame;
    this.frameY = 0;
    this.width = 64;
    this.height = 64;
    this.speed = speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (gameSpeed % 7 === 0) {
      if (this.frameX < this.lastFrame) {
        this.frameX += 1;
      } else {
        this.frameX = this.firstFrame;
      }
    }

    ctx.drawImage(
      this.image,
      this.eachWidth * this.frameX,
      0,
      this.eachWidth,
      this.eachHeight,
      this.x + 10,
      this.y + 10,
      this.width - 20,
      this.height - 20
    );
  }
  movement() {
    this.x += this.speed;
  }
}
canvas1.addEventListener("click", (event) => {
  const rect = canvas1.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  // Snap to grid
  x = x - (x % 64);
  y = y - (y % 64);

  // Check if a card is selected
  if ((!selectedCard && y == 0) || (selectedCard && y == 0)) {
    // Check if a card was clicked
    cards.forEach((card) => {
      if (
        x >= card.x &&
        x <= card.x + card.width &&
        y >= card.y &&
        y <= card.y + card.height
      ) {
        selectedCard = card;
      }
    });
  } else {
    if (selectedCard) {
      // Check if y is within the valid range
      if (y >= 64 && y <= 564 && x >= 128) {
        if (selectedCard.cost > resources) {
          floatingmessage.push(
            new FloatingMessage(
              "Not Enough Resources",
              canvas1.width / 2 - 200,
              canvas1.height / 2 + 50,
              50,
              1,
              "white"
            )
          );
        } else {
          if (selectedCard.classType === "PowerupType1") {
            const newPowerup = new Powerup(
              x,
              y,
              selectedCard.classType,
              selectedCard.imageSrc,
              0,
              3,
              128,
              128,
              2
            );
            powerups.push(newPowerup);
            removeresource(selectedCard.cost);
          }
          if (selectedCard.classType === "PowerupType2") {
            const newPowerup = new Powerup(
              x,
              y,
              selectedCard.classType,
              selectedCard.imageSrc,
              0,
              0,
              368,
              383,
              0
            );
            powerups.push(newPowerup);
            removeresource(selectedCard.cost);
          }
          if (selectedCard.classType === "PowerupType3") {
            const newPowerup = new Powerup(
              x,
              y,
              selectedCard.classType,
              selectedCard.imageSrc,
              0,
              3,
              368,
              383,
              3
            );
            powerups.push(newPowerup);
            removeresource(selectedCard.cost);
          } else {
          }
        }
      }
    } else {
    }
    selectedCard = null;
    // Reset the selected card after placing the powerup
  }
});

export function drawPowerUps() {
  for (let i = 0; i <= powerups.length - 1; i++) {
    powerups[i].draw(ctx1);
    powerups[i].movement();
    if (powerups[i].x > canvas1.width) {
      removeEntity(powerups, powerups[i]);
    }
  }
  drawHoverEffect();
}
