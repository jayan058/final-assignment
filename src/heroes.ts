import { Projectile, projectiles } from "./projectiles";
import { enemies } from "./villans";

class Hero {
    x: number;
    y: number;
    speed: number;
    health: number;
    frameX: number;
    frameY: number;
    eachWidth: number;
    eachHeight: number;
    firstFrame: number;
    lastFrame: number;
    image: HTMLImageElement;
    width:number;
    height:number;
    state: 'idle' | 'attacking' | 'hurt' | 'dead' |'dustcloud';
    attackAnimationFrames: number;
    hurtAnimationFrames: number;
    deathAnimationFrames: number;
    dustCloudAnimationFrames: number;
    moment:number;
    // Image sources
    
    attackImageSrc: string;
    hurtImageSrc: string;
    deathImageSrc: string;
    dustCloudImageSrc: string;

    // Image elements
    attackImage: HTMLImageElement;
    hurtImage: HTMLImageElement;
    deathImage: HTMLImageElement;
    dustCloudImage: HTMLImageElement;
    endurance:number;
    projectileImageSrc: string;


    constructor(   imageSrc: string,
       
        x: number,
        y: number,
        speed: number,
        health: number,
        firstFrame: number,
        lastFrame: number,
        eachWidth: number,
        eachHeight: number, 
        attackImageSrc: string,
        hurtImageSrc: string,
        deathImageSrc: string,
        dustCloudImageSrc: string,
        attackAnimationFrames: number,
        hurtAnimationFrames: number,
        deathAnimationFrames: number,        
        dustCloudAnimationFrames: number,endurance:number,projectileImageSrc:string) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.moment=this.speed
            this.health = health;
            this.frameX = firstFrame;
            this.frameY = 0;
            this.eachWidth = eachWidth;
            this.eachHeight = eachHeight;
            this.firstFrame = firstFrame;
            this.lastFrame = lastFrame;
            this.image = new Image();
            this.image.src = imageSrc;
            this.width = 64;
            this.height = 64;
            this.health = health;
            this.state = 'idle';
            this.attackAnimationFrames = attackAnimationFrames;
            this.hurtAnimationFrames = hurtAnimationFrames;
            this.deathAnimationFrames = deathAnimationFrames;
            this.dustCloudAnimationFrames = dustCloudAnimationFrames;
    
            // Load additional images
            this.attackImageSrc = attackImageSrc;
            this.hurtImageSrc = hurtImageSrc;
            this.deathImageSrc = deathImageSrc;
            this.dustCloudImageSrc = dustCloudImageSrc;
    
            this.attackImage = new Image();
            this.attackImage.src = attackImageSrc;
    
            this.hurtImage = new Image();
            this.hurtImage.src = hurtImageSrc;
    
            this.deathImage = new Image();
            this.deathImage.src = deathImageSrc;
    
            this.dustCloudImage = new Image();
            this.dustCloudImage.src = dustCloudImageSrc;
            this.endurance=endurance;
            this.projectileImageSrc=projectileImageSrc;

    }
    
  

    draw(ctx: CanvasRenderingContext2D) {
       

        
        ctx.fillStyle='gold'
        ctx.font='10px Arial'
        ctx.fillText(`${this.health}`,this.x+18,this.y+15)
        
        switch (this.state) {
            case 'idle':
             
            if (gameSpeed % 25 === 0) {
                if (this.frameX < this.lastFrame) {
                    this.frameX += 1;
                } else {
                    this.frameX = this.firstFrame;
                }
            }
                ctx.drawImage(
                    this.image,
                    this.eachWidth * this.frameX, 0,
                    this.eachWidth, this.eachHeight,
                    this.x, this.y-10,
                    this.width, this.height
                );
              
                break;
            case 'attacking':

            if (gameSpeed % 15 === 0) {
                if (this.frameX < this.attackAnimationFrames) {
                    this.frameX += 1;
                } else {
                    this.frameX = this.firstFrame;
                }
            }
                ctx.drawImage(
                    this.attackImage,
                    this.eachWidth * this.frameX, 0,
                    this.eachWidth, this.eachHeight,
                    this.x, this.y-10,
                    this.width, this.height
                );
              
                break;
            case 'hurt':

            if (gameSpeed % 15 === 0) {
                if (this.frameX < this.hurtAnimationFrames) {
                    this.frameX += 1;
                } else {
                    this.frameX = this.firstFrame;
                }
            }
                ctx.drawImage(
                    this.hurtImage,
                    this.eachWidth * this.frameX, 0,
                    this.eachWidth, this.eachHeight,
                    this.x, this.y-10,
                    this.width, this.height
                );
              
                break;
            case 'dead':

            if (gameSpeed % 100 === 0) {
                if (this.frameX < this.deathAnimationFrames) {
                    this.frameX += 1;
                } else {
                    this.frameX = this.firstFrame;
                }
            }
                ctx.drawImage(
                    this.deathImage,
                    this.eachWidth * this.frameX, 0,
                    this.eachWidth, this.eachHeight,
                    this.x, this.y-10,
                    this.width, this.height
                );
              
                break;
            case 'dustcloud':

            if (gameSpeed % 30 === 0) {
                if (this.frameX < this.dustCloudAnimationFrames) {
                    this.frameX += 1;
                } else {
                    this.frameX = this.firstFrame;
                }
            }
                ctx.drawImage(
                    this.dustCloudImage,
                    200* this.frameX, 0,
                    200, 179,
                    this.x, this.y-10,
                    this.width, this.height
                );
              
            break;
        }
      
      


      
    }

    


   


    heroMovement() {
      
        // Other movement logic as before
        if (gameSpeed % 15 === 0) {
            if (this.frameX < this.lastFrame) {
                this.frameX += 1;
            } else {
                this.frameX = this.firstFrame;
            }
        }
    }
}

class HeroType1 extends Hero {
    shootInterval: number;
    lastShotTime: number;
    constructor(x: number, y: number) {
        super('./images/hero1attack.png', x, y, 0.2, 100, 0, 13, 128,128,'./images/hero1attack_2.png','./images/hero1hurt.png','./images/hero1dead.png','./images/mandrake-dust-cloud.png',3,2,2,4,20,'./images/archerarrow.png');
        this.shootInterval = 3000; // Time in milliseconds between shots
        this.lastShotTime = 0;
    }

    heroMovement(): void {
        const currentTime = Date.now();
        if (currentTime - this.lastShotTime >= this.shootInterval) {
            this.shoot();
            this.lastShotTime = currentTime;
        }
    }
    shoot() {
        const projectile = new Projectile(this.x + this.width-30, this.y, 2, this.projectileImageSrc, 'arrow',64,35,0,0,48,48);
        projectiles.push(projectile);
    }
   

   
    
}

class HeroType2 extends Hero {
    shootInterval: number;
    lastShotTime: number;
    constructor(x: number, y: number) {
        super('./images/hero2attack.png', x, y, 0.2, 100, 0, 4, 128, 128,'./images/hero2attack.png','./images/hero2hurt.png','./images/hero2dead.png','./images/mandrake-dust-cloud.png',6,3,3,4,20,'./images/hero2fireball.png');
        this.shootInterval = 1000; // Time in milliseconds between shots
        this.lastShotTime = 500;
    }
    heroMovement(): void {
        const currentTime = Date.now();
        if (currentTime - this.lastShotTime >= this.shootInterval) {
            this.shoot();
            this.lastShotTime = currentTime;
        }
    }
    shoot() {
        const projectile = new Projectile(this.x + this.width-30, this.y, 2, this.projectileImageSrc, 'fireball',60,60,0,6,128,128);
        projectiles.push(projectile);
    }
}

class HeroType3 extends Hero {
    constructor(x: number, y: number,projectileImageSrc:string) {
        super('./images/hero3run.png', x, y, 0.4, 100, 0, 7, 128, 128,'./images/hero3attack.png','./images/hero3hurt.png','./images/hero3dead.png','./images/mandrake-dust-cloud.png',3,2,2,4,20,projectileImageSrc);
    }
    heroMovement() {
        this.x=this.x+this.speed
         // Other movement logic as before
         if (gameSpeed % 15 === 0) {
             if (this.frameX < this.lastFrame) {
                 this.frameX += 1;
             } else {
                 this.frameX = this.firstFrame;
             }
         }
     }
}

class HeroType4 extends Hero {
    constructor(x: number, y: number,projectileImageSrc:string) {
        super('./images/hero4run.png', x, y, 0.4, 100, 0, 5, 96.4, 98,'./images/hero4attack.png','./images/hero4hurt.png','./images/hero4dead.png','./images/mandrake-dust-cloud.png',2,2,3,4,10,projectileImageSrc);
    }
    heroMovement() {
        this.x=this.x+this.speed
         // Other movement logic as before
         if (gameSpeed % 15 === 0) {
             if (this.frameX < this.lastFrame) {
                 this.frameX += 1;
             } else {
                 this.frameX = this.firstFrame;
             }
         }
     }
}

class HeroType5 extends Hero {
    constructor(x: number, y: number,projectileImageSrc:string) {
        super('./images/hero5run.png', x, y, 0.4, 100, 0, 5, 96.4, 98,'./images/hero5attack.png','./images/hero5hurt.png','./images/hero5dead.png','./images/mandrake-dust-cloud.png',2,0,3,4,10,projectileImageSrc );
    }


    heroMovement() {
       this.x=this.x+this.speed
        // Other movement logic as before
        if (gameSpeed % 15 === 0) {
            if (this.frameX < this.lastFrame) {
                this.frameX += 1;
            } else {
                this.frameX = this.firstFrame;
            }
        }
    }
}


class HeroType6 extends Hero {
    constructor(x: number, y: number,projectileImageSrc:string) {
        super('./images/hero6run.png', x, y, 0.4, 100, 0, 7, 128, 128,'./images/hero6attack.png','./images/hero6hurt.png','./images/hero6dead.png','./images/mandrake-dust-cloud.png',3,2,2,4,5,projectileImageSrc );
    }


    heroMovement() {
       this.x=this.x+this.speed
        // Other movement logic as before
        if (gameSpeed % 15 === 0) {
            if (this.frameX < this.lastFrame) {
                this.frameX += 1;
            } else {
                this.frameX = this.firstFrame;
            }
        }
    }
}
const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;

import { gameSpeed } from "./game";
const audio = new Audio();
audio.src = './sound/resouce-increase.mp3';

interface HeroCard {
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
    heroClass: new (x: number, y: number) => Hero;
    cost:number;
    name:string
}

const cards: HeroCard[] = [];
export const heroes: Hero[] = [];
let selectedCard: HeroCard | null = null;

function createHeroCard(imageSrc: string, x: number, y: number, firstFrame: number, lastFrame: number, eachWidth: number, eachHeight: number, heroClass: new (x: number, y: number) => Hero,cost:number,name:string): HeroCard {
    const image = new Image();
    image.src = imageSrc;

    const newCard: HeroCard = {
        x,
        y,
        width: 64,
        height: 64,
        imageSrc,
        frameX: 0,
        frameY: 0,
        eachWidth: eachWidth,
        eachHeight: eachHeight,
        firstFrame,
        lastFrame,
        image,
        heroClass,
         cost:cost,
        name:name
    };

    cards.push(newCard);
    return newCard;
}

// Initial cards
createHeroCard('./images/card1.png', 64 * 4, 0, 0, 21, 128, 128, HeroType1,100,'Archer');
createHeroCard('./images/card2.png', 64 * 5, 0, 0, 11, 128, 128, HeroType2,100,'Wizard');
createHeroCard('./images/card3.png', 64 * 6, 0, 0, 19, 128, 128, HeroType3,100,'Swordsman');

export function chooseHero() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    cards.forEach(card => {
        ctx1.strokeStyle='black'
        ctx1.strokeRect(card.x, card.y, card.width, card.height);
        ctx1.fillStyle = 'purple';
        ctx1.fillRect(card.x, card.y, card.width, card.height);

        if (gameSpeed % 15 === 0) {
            if (card.frameX < card.lastFrame) {
                card.frameX += 1;
            } else {
                card.frameX = card.firstFrame;
            }
        }
        ctx1.fillStyle='gold'
        ctx1.font='10px Arial'
        ctx1.fillText(`${card.name}`,card.x+5,card.y+10)
        ctx1.fillText(`Cost:${card.cost}`,card.x+5,card.y+20)
        ctx1.drawImage(
            card.image,
            card.eachWidth * card.frameX, 0,
            card.eachWidth, card.eachHeight,
            card.x, card.y,
            card.width, card.height
        );
    });

    
}


// Define a set to keep track of occupied grid positions
 export const occupiedGridPositions: Set<string> = new Set();

// Function to check if a grid position is occupied
function isGridOccupied(x: number, y: number): boolean {
    const gridKey = `${x},${y}`;
    return occupiedGridPositions.has(gridKey);
}

// Add event listener for canvas click
canvas1.addEventListener('click', (event) => {
    const rect = canvas1.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    // Snap to grid
    x = x - (x % 64);
    y = y - (y % 64);



    // Check if a card is selected or y is in the topmost row
    if (!selectedCard || (selectedCard && y == 0)) {
        // Check if a card was clicked
        cards.forEach(card => {
            if (x >= card.x && x <= card.x + card.width && y >= card.y && y <= card.y + card.height) {
                selectedCard = card;
            }
        });
    } else {
        // Check if y is within the valid range (not in the first or last row)
        if (y >= 64 && y <= 564 && x>=128) {
            // Special hero types that can be placed anywhere
            if (selectedCard.heroClass === HeroType3 || selectedCard.heroClass === HeroType4 || selectedCard.heroClass === HeroType5 || selectedCard.heroClass === HeroType6) {
                const newHero = new selectedCard.heroClass(x, y);
                heroes.push(newHero);
            } else if ((!isGridOccupied(x, y) && selectedCard.heroClass==HeroType1) || (!isGridOccupied(x, y) && selectedCard.heroClass==HeroType2)  ) {
                // Create a new hero using the heroClass from the selected card
                const newHero = new selectedCard.heroClass(x, y);
                heroes.push(newHero);

                // Mark the grid position as occupied
                const gridKey = `${x},${y}`;
                occupiedGridPositions.add(gridKey);
            } else {
                console.log("Cannot drop hero on an occupied grid position.");
            }
        } else {
            console.log("Cannot place hero in the first or last row.");
        }

        // Reset the selected card after placing the hero
        selectedCard = null;
    }
});







export function drawDefenders(){
  
        for(var i=0;i<=heroes.length-1;i++){
        heroes[i].heroMovement()
        heroes[i].draw(ctx1)
      
    }
    drawHoverEffect()
    
    for (let i = projectiles.length - 1; i >= 0; i--) {
       projectiles[i]? projectiles[i].update(projectiles[i]):null;
       projectiles[i]? projectiles[i].draw(ctx1):null;
    }

  
}

// Schedule card addition
setTimeout(() => {
    audio.play();
    createHeroCard('./images/card4.png', 64 * 7, 0, 0, 9, 96.4, 98, HeroType4,150,'Kings Guard');
}, 0);

setTimeout(() => {
    audio.play();
    createHeroCard(`./images/card5.png`, 64 * 8, 0, 0, 11, 96.4, 98, HeroType5,150,'Viking Hero');
},0);


setTimeout(() => {
    audio.play();
    createHeroCard(`./images/card6.png`, 64 * 9, 0, 0, 11, 128.2, 130, HeroType6,200,'Fighter');
},0);

export let resources = 300;
export let drawHeroCardNow = false;

export function addResources(x: number) {
    resources += x;
    audio.play();

}

let mouseX: number | null = null
let mouseY: number | null = null;



canvas1.addEventListener('mousemove', (event) => {
    const rect = canvas1.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    // Redraw the canvas to update the hover effect
    drawHoverEffect();
});


function drawHoverEffect() {
  
   mouseX?mouseX = mouseX - (mouseX % 64):null;
   mouseY?mouseY = mouseY - (mouseY % 64):null;


    // If a card is selected, draw the hero name at the mouse position
    if (selectedCard && mouseX !== null && mouseY !== null && mouseY >= 64 && mouseY < 512) {
      
        if (gameSpeed % 25 === 0) {
            if (selectedCard.frameX < selectedCard.lastFrame) {
                selectedCard.frameX += 1;
            } else {
                selectedCard.frameX = selectedCard.firstFrame;
            }
        }   

           ctx1.strokeStyle='gold'
           ctx1.strokeRect(mouseX,mouseY,64,64)
            ctx1.drawImage(
                selectedCard.image,
                selectedCard.eachWidth * selectedCard.frameX, 0,
                selectedCard.eachWidth, selectedCard.eachHeight,
                mouseX, mouseY-10,
                selectedCard.width, selectedCard.height
            );
        
        
    }
}



