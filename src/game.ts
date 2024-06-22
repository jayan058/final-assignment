import {
  checkCollisions,
  showResources,
  collisionWithProjectile,
  checkCollisionWithTower,
} from "./utils";
import { drawMandrake, updateMandrakes } from "./mandrake";
import { drawVillan, enemies, wave1Enemies } from "./villans";
import { chooseHero, drawDefenders } from "./heroes";
import { drawTower } from "./towers";
import { checkCollisionWithProjectileFromTower } from "./utils";
import { waveCountdown, updateWaveTime } from "./countdown";
import { wave2Enemies } from "./wavetwoenemies";
import { wave3Enemies } from "./wavethreeeenemies";
const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;

canvas1.height = 576;
canvas1.width = 1344;

export let gameSpeed = 0;
export const gridCellWidth = 64;
export const gridCellHeight = 64;
const hoverImage = new Image();
hoverImage.src = "./images/hovertile.png";

let currentWave = 1;
let allEnemies: any[] = [];

const countdownBarWidth = 64 * 4; // Width of the countdown bar
const countdownBarHeight = 20; // Height of the countdown bar
const countdownBarX = canvas1.width - countdownBarWidth - 20; // X position of the countdown bar
const countdownBarY = 20; // Y position of the countdown bar
let waveProgress = countdownBarWidth;
const countdownBarBorderWidth = 2; // Border width of the countdown bar
const countdownBarBorderColor = "#333"; // Border color of the countdown bar
let nextWaveText = ""; // Text indicating next wave countdown
let spawnedEnemies: any[] = [];

allEnemies.push(...wave1Enemies);

class Gridcell {
  x: number;
  y: number;
  width: number;
  height: number;
  isHovered: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = gridCellWidth;
    this.height = gridCellHeight;
    this.isHovered = false;
  }

  draw() {
    if (this.isHovered) {
      ctx1.drawImage(hoverImage, this.x, this.y, this.width, this.height);
    }
  }
}

const grid: Gridcell[] = [];

function makeTheGrid() {
  grid.length = 0; // Clear the grid array
  for (let i = 64; i < canvas1.height; i += gridCellHeight) {
    for (let j = 128; j < canvas1.width; j += gridCellWidth) {
      grid.push(new Gridcell(j, i));
    }
  }
}

function drawTheGrid() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].draw();
  }
}

// Define the start button dimensions and position
const buttonX = canvas1.width / 2 - 100;
const buttonY = canvas1.height / 2 - 25;
const buttonWidth = 200;
const buttonHeight = 50;
let gameStarted = false;

let waveStartTime: number = 0;
let waveDuration: number = 100;
let timeBetweenWaves: number = 1.5;

function drawStartButton() {
  ctx1.fillStyle = "#4CAF50";
  ctx1.fillRect(buttonX, buttonY + 200, buttonWidth, buttonHeight);
  ctx1.fillStyle = "white";
  ctx1.font = "30px Arial";
  ctx1.fillText("Start Game", buttonX + 20, buttonY + 235);
}

function drawGameTitleAndInstructions() {
  ctx1.fillStyle = "#333"; // Dark background
  ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
  ctx1.fillStyle = "#FFD700"; // Gold color for title
  ctx1.font = "60px Georgia";
  ctx1.fillText("Siege Guardians", canvas1.width / 2 - 150, 100);

  ctx1.font = "24px Arial";
  ctx1.fillStyle = "white";
  const instructions = [
    "Instructions:",
    "1. Select a hero, hover over the game board and click on the gameboard drop it.",
    "2. Enemies come in waves.",
    "3. After each wave, each hero's damage-taking capability increases.",
    "4. Mandrake appears at intervals across the game board. Hover over it to collect coins.",
    "5. If all the 4 towers are destroyed, the game is over.",
    "6. All the hero's have different abilities and different damgae taking capabilities.",
    "7. You will be awarded with a new hero every 20 seconds.",
    "8. Watch out for the towers health because if all 4 are destroyed its GAME OVER.",
  ];

  for (let i = 0; i < instructions.length; i++) {
    ctx1.fillText(instructions[i], canvas1.width / 2 - 300, 150 + i * 30);
  }
}

canvas1.addEventListener("click", function (event) {
  const rect = canvas1.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Adjust the buttonY value to match the position where the button is drawn
  if (
    mouseX >= buttonX &&
    mouseX < buttonX + buttonWidth &&
    mouseY >= buttonY + 200 &&
    mouseY < buttonY + 200 + buttonHeight
  ) {
    if (!gameStarted) {
      gameStarted = true;
      resetGame();
      waveStartTime = Date.now(); // Start the wave countdown

      animate();
    }
  }
});

canvas1.addEventListener("mousemove", function (event) {
  if (!gameStarted) return;

  const rect = canvas1.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  let hoveredRow: number | null = null;
  let hoveredCol: number | null = null;

  for (let i = 0; i < grid.length; i++) {
    const cell = grid[i];
    if (
      mouseX >= cell.x &&
      mouseX < cell.x + cell.width &&
      mouseY >= cell.y &&
      mouseY < cell.y + cell.height
    ) {
      hoveredRow = cell.y;
      hoveredCol = cell.x;
      break;
    }
  }

  for (let i = 0; i < grid.length; i++) {
    const cell = grid[i];
    if (cell.x === hoveredCol || cell.y === hoveredRow) {
      cell.isHovered = true;
    } else {
      cell.isHovered = false;
    }
  }

  drawTheGrid();
});

function resetGame() {
  gameSpeed = 0;
  makeTheGrid();
}

function animate() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

  if (!gameStarted) {
    drawGameTitleAndInstructions();
    drawStartButton();
    return;
  }

  chooseHero();
  drawTheGrid();
  showResources();
  drawDefenders();
  drawVillan();
  spawnEnemy();
  gameSpeed++;

  let waveElapsedTime = (Date.now() - waveStartTime) / 1000;
  waveProgress =
    countdownBarWidth - (waveElapsedTime / waveDuration) * countdownBarWidth;
  nextWaveText = `Next wave in`;
  if (waveElapsedTime < timeBetweenWaves) {
    waveCountdown(ctx1, canvas1);
  }

  updateMandrakes();
  checkCollisions();
  collisionWithProjectile();
  checkCollisionWithTower();
  checkCollisionWithProjectileFromTower();

  if (waveElapsedTime >= waveDuration + timeBetweenWaves) {
    waveProgress = countdownBarWidth;
    // Wave duration has ended, prepare for the next wave
    updateWaveTime();
    waveStartTime = Date.now(); // Start the countdown for the next wave
    currentWave++;

    // Add new enemies for the next wave
    switch (currentWave) {
      case 2:
        allEnemies.push(...wave2Enemies);
        break;
      case 3:
        allEnemies.push(...wave3Enemies);
        break;

      default:
        break;
    }
  }

  drawTower();
  drawCountdownBar();
  requestAnimationFrame(animate);
}

function drawCountdownBar() {
  // Draw border
  ctx1.fillStyle = countdownBarBorderColor;
  ctx1.fillRect(
    countdownBarX,
    countdownBarY,
    countdownBarWidth,
    countdownBarHeight
  );

  // Draw filled bar
  ctx1.fillStyle = "#00CED1"; // Color of the countdown bar
  ctx1.fillRect(
    countdownBarX + 2,
    countdownBarY + countdownBarBorderWidth,
    waveProgress - 2,
    countdownBarHeight - 2 * countdownBarBorderWidth
  );

  // Draw next wave text
  ctx1.fillStyle = "white";
  ctx1.font = "30px Georgia";
  ctx1.fillText(nextWaveText, countdownBarX - 180, countdownBarY + 20);
}

const rows = [64, 128, 192, 256, 320, 384, 448, 512, 576]; // Define Y positions of each row

const ROW_COUNT = 8;

let spawnInterval = 5000; // Initial interval between enemy spawns in milliseconds
let lastSpawnTime = -spawnInterval;
function spawnEnemy() {
  const currentTime = Date.now();
  if (currentTime - lastSpawnTime > spawnInterval) {
    lastSpawnTime = currentTime;

    // Randomly select a row
    const randomRowIndex = Math.floor(Math.random() * ROW_COUNT);
    const rowY = rows[randomRowIndex];

    // Randomly select an enemy type index from all available enemies
    const enemyTypeIndex = Math.floor(Math.random() * allEnemies.length);

    // Create new enemy instance using the selected class
    const newEnemy = new allEnemies[enemyTypeIndex](canvas1.width, rowY);

    // Push the new enemy into the enemies array
    enemies.push(newEnemy);
    spawnedEnemies.push(newEnemy); // Track spawned enemies

    if (spawnInterval > 1500) {
      spawnInterval -= 150;
    }
  }
}

drawGameTitleAndInstructions(); // Initially draw the game title and instructions
drawStartButton(); // Initially draw the start button
setInterval(drawMandrake, 5000);
export { animate };
