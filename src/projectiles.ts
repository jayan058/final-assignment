


export let projectiles: Projectile[] = [];
import {  gameSpeed} from "./game";
import { removeEntity } from "./utils";

export class Projectile {
    x: number;
    y: number;
    speed: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    type: 'arrow' | 'fireball';
    firstframe:number;
    lastframe:number;
    eachwidth:number;
    eachheight:number;
    firedPosition:number;

    

    constructor(x: number, y: number, speed: number, imageSrc: string, type: 'arrow' | 'fireball',height:number,width:number,firstframe:number,lastframe:number,eachwidth:number,eachheight:number) {
        this.x = x;
        this.y = y;
        this.firedPosition=this.x;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
        this.type = type;
        this.firstframe=firstframe;
        this.lastframe=lastframe;
        this.eachwidth=eachwidth;
        this.eachheight=eachheight
    }

    draw(ctx: CanvasRenderingContext2D) {

        console.log("Hello");
       
        ctx.drawImage(
            this.image,
            this.eachwidth * this.firstframe, 0,
            this.eachwidth, this.eachheight,
            this.x, this.y,
            this.width, this.height
        );
        
        if (gameSpeed % 10 === 0) {
            
            if (this.firstframe < this.lastframe) {
                this.firstframe += 1;
            } else {
                this.firstframe = this.firstframe;
            } 
            
           
    }
        }
          

        update(projectile:any) {
            // Set the fired position when the projectile is first created
            
    
            // Check if the projectile has traveled 30 pixels from the fired position
            if (Math.abs(this.x - this.firedPosition) >= 64*3.5) {
                removeEntity(projectiles, projectile);
            } else {
                this.x += this.speed;
            }
        }
}