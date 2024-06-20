import { gameSpeed } from "./game";



const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;


class Tower {
    height: number;
    width: number;
    x: number;
    y: number;
    firstFrame: number;
    lastFrame: number;
    frameX: number;
    tower:HTMLImageElement;
    eachWidth:number;
    eachHeight:number;

    constructor(height: number, width: number, x: number, y: number, firstFrame: number, lastFrame: number, frameX: number) {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.firstFrame = firstFrame;
        this.lastFrame = lastFrame;
        this.frameX = frameX;
        this.tower=new Image()
        this.tower.src='./images/tower.png'
        this.eachWidth=128
        this.eachHeight=144
    }

    draw(){
        if (gameSpeed % 12 === 0) {
            // Update frameX to flap wings
            if (this.frameX < this.lastFrame) {
                this.frameX += 1;
            } else {
                this.frameX = this.firstFrame;
            }
        }
        ctx1.drawImage(
            this.tower,
            this.eachWidth * this.frameX, 0,
            this.eachWidth, this.eachHeight,
            this.x, this.y,
            this.width, this.height
        );
      



    }

   
}

// Create instances of the Tower class
const towers: Tower[] = [
    new Tower(128, 128, 0, 64, 0, 11, 0),   // Uses frames 0 to 3
    new Tower(128, 128, 0, 192, 0, 11, 0),  // Uses frames 4 to 7
    new Tower(128, 128, 0, 320, 0, 11, 0), // Uses frames 8 to 11
    new Tower(128, 128, 0, 448, 0, 11, 0),// Uses frames 12 to 15
   
];

export function drawTower(){
towers.forEach(tower => {
    tower.draw()
});

}