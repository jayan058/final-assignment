// hero.ts
const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;

import { gridCellHeight, gridCellWidth } from "./game";


 export let defenders:any=[]
export let resources=300;
export let heroCount=0



// Define the base Hero class
class Hero {
    x: number;
    y: number;
    width: number;
    height: number;
    isAttacking: boolean;
    health: number;
    weapon: any[];
    intervalOfAttack: number;
    cost: number;

    constructor(x: number, y: number, health: number, intervalOfAttack: number, cost: number) {
        this.x = x;
        this.y = y;
        this.width = gridCellWidth;
        this.height = gridCellHeight;
        this.isAttacking = false;
        this.health = health;
        this.weapon = [];
        this.intervalOfAttack = intervalOfAttack;
        this.cost = cost;
    }

    draw() {
        ctx1.fillStyle = 'red';
        ctx1.fillRect(this.x, this.y, this.width, this.height);
        ctx1.fillStyle = 'gold';
        ctx1.font='20px Arial'
        ctx1.fillText(this.health.toString(), this.x+15 , this.y+20 ); // 
        
    }
}



canvas1.addEventListener('click',function(event:MouseEvent){
  heroCount++
    getDefendersLength()
    const rect = canvas1.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const gridX = Math.floor(mouseX / gridCellWidth) * gridCellWidth;
  const gridY = Math.floor(mouseY / gridCellHeight) * gridCellHeight;
  
   for(let i=0;i<=defenders.length-1;i++){
    if(defenders[i].x==gridX && defenders[i].y==gridY){
        return
    }
   }

  if (gridY === 0 || gridY >= canvas1.height - gridCellHeight) {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height); 
   
    return;
  }

  let heroCost=100
  if(heroCost<=resources){
    defenders.push(new Hero(gridX,gridY,100,20,100))
    resources=resources-heroCost
  }


  
  



})


export function getDefendersLength() {
  
  
  
  return heroCount
   
}


export function drawDefender(){
    for(let i=0;i<=defenders.length-1;i++){
        defenders[i].draw()

    }
}



export function addResources(x:number){
 resources=resources+x
}

