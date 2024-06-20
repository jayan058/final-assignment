const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;

import { gameSpeed } from './game';
import { addResources } from "./heroes";
const mandrakeImage = new Image();
mandrakeImage.src = './images/mandrake.png';
const manDrakeDustCloud=new Image();
manDrakeDustCloud.src='./images/mandrake-dust-cloud.png'

const gridCellWidth = 64;
const gridCellHeight = 64;
const mandrakeSize = 110; // Size of the Mandrake within the grid cell
let gamepoints: number[] = [50, 60, 70, 80];
let mandrakes: Mandrake[] = [];

class Mandrake {
    x: number;
    y: number;
    size: number; // Size of the Mandrake
    gamePoint: number;
    creationTime: number;
    frameX: number;
    frameY: number;
    spriteWidth: number;
    spriteHeight: number;
    minFrame: number;
    maxFrame: number;

    constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.gamePoint = gamepoints[Math.floor(Math.random() * gamepoints.length)];
        this.creationTime = Date.now();
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 256;
        this.spriteHeight = 256;
        this.minFrame = 0;
        this.maxFrame = 355;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (gameSpeed % 2 === 0) {
            this.frameX++;
            if (this.frameX >= 18) {
                this.frameX = 0;
                this.frameY++;
                if (this.frameY >= 18) {
                    this.frameY = 0;
                }
            }
        }

        // Draw the sprite frame
        ctx1.drawImage(
            mandrakeImage,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x + (gridCellWidth - this.size) / 2, // Centering Mandrake within grid cell
            this.y + (gridCellHeight - this.size) / 2, // Centering Mandrake within grid cell
            gridCellHeight*2,
            gridCellHeight*2
        );

        ctx.fillStyle = 'gold';
        ctx.font = '10px Arial';
        ctx.fillText(this.gamePoint.toString(), this.x + 25, this.y);
      
    }

    isExpired() {
        return Date.now() - this.creationTime > 5500; // 10 seconds
    }

    isHovered(mouseX: number, mouseY: number,mandrake:any) {
        const hovered = (
            mouseX >= this.x &&
            mouseX <= this.x + gridCellWidth * 1.3 &&
            mouseY >= this.y &&
            mouseY <= this.y + gridCellHeight * 1.3
        );

        if (hovered) {
          addResources(mandrake.gamePoint)
        }

        return hovered;

    }
}

function getRandomTilePosition() {
    const maxColumns = canvas1.width / gridCellWidth;
    const maxRows = canvas1.height / gridCellHeight;

    const randomColumn = Math.floor(Math.random() * (maxColumns - 2)) + 2;
    const randomRow = Math.floor(Math.random() * (maxRows - 1)) + 1;

    const x = randomColumn * gridCellWidth;
    const y = randomRow * gridCellHeight;

    return { x, y };
}

export function drawMandrake() {
    const { x, y } = getRandomTilePosition();
    const mandrake = new Mandrake(x, y, mandrakeSize);
    mandrakes.push(mandrake);
}

export function updateMandrakes() {
    mandrakes = mandrakes.filter(mandrake => !mandrake.isExpired());
    for (let mandrake of mandrakes) {
        mandrake.draw(ctx1);
    }
}

canvas1.addEventListener('mousemove', (event: MouseEvent) => {
    const rect = canvas1.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    mandrakes = mandrakes.filter(mandrake => !mandrake.isHovered(mouseX, mouseY,mandrake));
});
