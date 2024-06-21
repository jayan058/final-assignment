
import { checkCollisions, showResources,collisionWithProjectile, checkCollisionWithTower } from "./utils";

import {  drawMandrake, updateMandrakes } from "./mandrake";

import { drawVillan, spawnEnemy } from "./villans";
import { chooseHero, drawDefenders } from "./heroes";
import { drawTower } from "./towers";
import { checkCollisionWithProjectileFromTower } from "./utils";


const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;

canvas1.height = 576;
canvas1.width = 1344;
export let gameSpeed=0


export const gridCellWidth = 64;
export const gridCellHeight = 64;
const hoverImage = new Image();
hoverImage.src = './images/hovertile.png'; 

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
    for (let i = 64; i < canvas1.height ; i += gridCellHeight) {
        for (let j = 128; j < canvas1.width; j += gridCellWidth) {
            grid.push(new Gridcell(j, i)); 
        }
    }
}

makeTheGrid();


function drawTheGrid() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].draw();
    }
}

canvas1.addEventListener('mousemove', function(event) {
    const rect = canvas1.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let hoveredRow: number | null = null;
    let hoveredCol: number | null = null;

    for (let i = 0; i < grid.length; i++) {
        const cell = grid[i];
        if (mouseX >= cell.x && mouseX < cell.x + cell.width &&
            mouseY >= cell.y && mouseY < cell.y + cell.height) {
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

function animate() {
   
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height); 
  
      chooseHero()
    drawTheGrid();
    showResources();
   
   drawDefenders()
    gameSpeed++
    drawVillan() 
    spawnEnemy()
    updateMandrakes()
    checkCollisions()
    collisionWithProjectile()
    drawTower()
    checkCollisionWithTower()
    checkCollisionWithProjectileFromTower()
   
    requestAnimationFrame(animate);
}




animate();
setInterval(drawMandrake, 5000);
export { animate };


