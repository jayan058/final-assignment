import {
  checkCollisions,
  showResources,
  collisionWithProjectile,
  checkCollisionWithTower,
  collisionWithVillanProjectile,
  collisionWithRocket,
} from "./utils";
import { audio } from "./heroes";
import { drawMandrake, updateMandrakes, mandrakes } from "./mandrake";
import { powerups } from "./powerup";
import {
  drawVillan,
  enemies,
  villanprojectiles,
  wave1Enemies,
} from "./villans";
import {
  chooseHero,
  drawDefenders,
  heroes,
  initializeResources,
  occupiedGridPositions,
  cards,
  setupHeroTimeouts,
} from "./heroes";
import { drawTower, towers } from "./towers";
import { checkCollisionWithProjectileFromTower } from "./utils";
import { waveCountdown } from "./countdown";
import { wave2Enemies } from "./wavetwoenemies";
import { wave3Enemies } from "./wavethreeeenemies";
import { drawGameOverScreen } from "./gameover";
import { Tower, projectilesfortowers } from "./towers";
import { projectiles } from "./projectiles";
import { drawTrees } from "./trees";
import { drawMessages, floatingmessage } from "./floatingmessage";
import { drawGameWonScreen } from "./gamewon";
import { chooseCard, drawPowerUps } from "./powerup";

const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;
export const initialTowerPositions = [
  { x: 64, y: 0 },
  { x: 192, y: 0 },
  { x: 320, y: 0 },
  { x: 448, y: 0 },
];

canvas1.height = 576;
canvas1.width = 1344;

var mainTheme = new Audio();
mainTheme.src = "./sound/maintheme.mp3";

export let gameSpeed = 0;
export const gridCellWidth = 64;
export const gridCellHeight = 64;
const hoverImage = new Image();
hoverImage.src = "./images/hovertile.png";

export let currentWave = 1;
let allEnemies: any[] = [];

const countdownBarWidth = 64 * 2; // Width of the countdown bar
const countdownBarHeight = 20; // Height of the countdown bar
const countdownBarX = canvas1.width - countdownBarWidth - 20; // X position of the countdown bar
const countdownBarY = 20; // Y position of the countdown bar
let waveProgress = countdownBarWidth;
const countdownBarBorderWidth = 2; // Border width of the countdown bar
const countdownBarBorderColor = "#333";
ctx1.font = "25px Audiowide"; // Border color of the countdown bar
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
let waveDuration: number = 80;
let timeBetweenWaves: number = 1;

function drawStartButton() {
  ctx1.fillStyle = "#4CAF50";
  ctx1.fillRect(buttonX, buttonY + 200, buttonWidth, buttonHeight);
  ctx1.fillStyle = "white";
  ctx1.font = "25px Audiowide";
  ctx1.fillText("Start Game", buttonX + 20, buttonY + 235);
}

function drawGameTitleAndInstructions() {
  ctx1.fillStyle = "#333"; // Dark background
  ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
  ctx1.fillStyle = "#FFD700";
  ctx1.font = "60px Audiowide";
  ctx1.fillStyle = "red";
  ctx1.fillText("Siege Guardians", canvas1.width / 2 - 260, 100);

  ctx1.font = "20px Audiowide";
  ctx1.fillStyle = "gold";
  const instructions = [
    "Instructions:",
    "1. Select a hero, hover over the game board and click on the gameboard to drop it.",
    "2. Enemies come in waves.",
    "3. After each wave, two new heroes will be awarded.",
    "4. Mandrake appears at intervals across the game board. Hover over it to collect coins.",
    "5. If all the 4 towers are destroyed, the game is over.",
    "6. All the hero's have different abilities and different damage taking capabilities.",
    "7. Three powerup's are available, use them wisely.",
    "8. Watch out for the towers health because if all 4 are destroyed its GAME OVER.",
    "9. Survive the three waves of enemies and VICTORY IS YOURS",
    "10. Towers also shoot projectiles if the enemies are in range",
  ];

  for (let i = 0; i < instructions.length; i++) {
    ctx1.fillText(instructions[i], canvas1.width / 2 - 430, 150 + i * 30);
  }
}

canvas1.addEventListener("click", function (event) {
  console.log("Hello");

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

      waveStartTime = Date.now(); // Start the wave countdown
      resetGame();
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
  mainTheme.play();
  audio.pause();
  cards.length = 4;
  powerups.length = 0;
  floatingmessage.length = 0;
  spawnInterval = 5000;
  projectilesfortowers.length = 0;
  mandrakes.length = 0;
  projectiles.length = 0;
  occupiedGridPositions.clear();
  heroes.length = 0;
  towers.length = 0;
  initialTowerPositions.forEach((pos) => {
    towers.push(new Tower(128, 128, 0, pos.x, pos.y, 11, 0));
  });
  console.log(gameStarted);
  gameSpeed = 0;
  waveProgress = countdownBarWidth;
  villanprojectiles.length = 0;
  currentWave = 1;
  console.log(gameStarted);
  enemies.length = 0;
  gameSpeed = 0;
  waveProgress = countdownBarWidth; // Reset waveProgress to full width
  currentWave = 1;
  allEnemies = [...wave1Enemies]; // Reset enemies to the first wave
  spawnedEnemies = [];
  waveStartTime = Date.now(); // Reset the wave start time
  gameStarted = true; // Ensure the game state is set to started
  initializeResources();
  setupHeroTimeouts();
}
function animate() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

  if (!gameStarted) {
    drawGameTitleAndInstructions();
    drawStartButton();
    return;
  }

  if (towers.length === 0) {
    mainTheme.pause();
    audio.pause();
    drawGameOverScreen();
    return;
  }

  if (currentWave > 3 && enemies.length === 0) {
    mainTheme.pause();
    audio.pause();
    drawGameWonScreen();
    return;
  }
  mainTheme.volume = 0.1;
  mainTheme.play();
  collisionWithRocket();
  chooseHero();
  drawTheGrid();
  showResources();
  drawDefenders();
  drawMessages();
  drawVillan();
  drawPowerUps();
  if (currentWave <= 3) {
    spawnEnemy();
  }

  gameSpeed++;

  let waveElapsedTime = (Date.now() - waveStartTime) / 1000;
  waveProgress =
    countdownBarWidth - (waveElapsedTime / waveDuration) * countdownBarWidth;
  if (currentWave < 3) {
    ctx1.font = "25px Audiowide";
    nextWaveText = "Next wave in";
  } else if (currentWave === 3) {
    nextWaveText = "Survive for";
  } else {
    ctx1.font = "25px Audiowide";
    ctx1.fillStyle = "red";
    nextWaveText = "Kill them all!";
  }

  if (waveElapsedTime < timeBetweenWaves) {
    waveCountdown(ctx1, canvas1);
  }

  updateMandrakes();
  checkCollisions();
  collisionWithProjectile();
  checkCollisionWithTower();
  checkCollisionWithProjectileFromTower();
  collisionWithVillanProjectile();

  if (waveElapsedTime >= waveDuration + timeBetweenWaves && currentWave <= 3) {
    waveProgress = countdownBarWidth;
    waveStartTime = Date.now(); // Start the countdown for the next wave
    currentWave++;

    // Immediately add new wave enemies to allEnemies
    switch (currentWave) {
      case 2:
        allEnemies.push(...wave2Enemies);
        break;
      case 3:
        allEnemies.push(...wave3Enemies);
        break;
    }

    // Mix new wave enemies with the remaining enemies from the previous wave
    allEnemies = shuffleArray(allEnemies);
  }

  chooseCard();
  drawTower();
  if (currentWave <= 3) {
    drawCountdownBar();
  } else {
    ctx1.font = "30px Audiowide";
    ctx1.fillStyle = "black";
    ctx1.fillText("Kill them all!", countdownBarX - 100, countdownBarY + 20);
  }

  drawTrees();

  requestAnimationFrame(animate);
}

function drawCountdownBar() {
  if (currentWave <= 3) {
    ctx1.fillStyle = countdownBarBorderColor;
    ctx1.fillRect(
      countdownBarX,
      countdownBarY,
      countdownBarWidth,
      countdownBarHeight
    );

    // Draw filled bar
    ctx1.fillStyle = "red"; // Color of the countdown bar
    ctx1.fillRect(
      countdownBarX + 2,
      countdownBarY + countdownBarBorderWidth,
      waveProgress - 2,
      countdownBarHeight - 2 * countdownBarBorderWidth
    );

    // Draw next wave text
    ctx1.fillStyle = "white";
    ctx1.font = "20px Audiowide";
    ctx1.fillText(nextWaveText, countdownBarX - 150, countdownBarY + 15);
  }
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

    // Randomly select an enemy type from allEnemies
    const enemyTypeIndex = Math.floor(Math.random() * allEnemies.length);
    const newEnemy = new allEnemies[enemyTypeIndex](canvas1.width, rowY);

    enemies.push(newEnemy);
    spawnedEnemies.push(newEnemy);

    // Decrease the spawn interval over time, but not below 2500 milliseconds
    if (spawnInterval > 2500) {
      spawnInterval -= 100;
    }

    // Shuffle allEnemies after each spawn to maintain randomness
    allEnemies = shuffleArray(allEnemies);
  }
}

// Utility function to shuffle an array
function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

drawGameTitleAndInstructions(); // Initially draw the game title and instructions
drawStartButton(); // Initially draw the start button
setInterval(drawMandrake, 5000);
export { resetGame, drawGameTitleAndInstructions, drawStartButton, animate };
