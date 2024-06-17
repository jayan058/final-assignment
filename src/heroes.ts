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
    


    constructor(imageSrc: string, x: number, y: number, speed: number, health: number, firstFrame: number, lastFrame: number, eachWidth: number, eachHeight: number) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.health = health;
        this.frameX = firstFrame;
        this.frameY = 0;
        this.eachWidth = eachWidth;
        this.eachHeight = eachHeight;
        this.firstFrame = firstFrame;
        this.lastFrame = lastFrame;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width=64;
        this.height=64;
        this.health=health;
    }
    
  

    draw(ctx: CanvasRenderingContext2D) {
       
        ctx.fillStyle='gold'
        ctx.font='10px Arial'
        ctx.fillText(`${this.health}`,this.x+18,this.y+15)
        
        ctx.drawImage(
            this.image,
            this.eachWidth * this.frameX, 0,
            this.eachWidth, this.eachHeight,
            this.x, this.y,
            this.width, this.height
        );
      
      


      
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
    constructor(x: number, y: number) {
        super('./images/card1.png', x, y, 0, 100, 0, 5, 128,128);
    }
}

class HeroType2 extends Hero {
    constructor(x: number, y: number) {
        super('./images/card2.png', x, y, 0, 100, 0, 11, 128, 128);
    }
}

class HeroType3 extends Hero {
    constructor(x: number, y: number) {
        super('./images/hero3run.png', x, y, 0.4, 100, 0, 7, 128, 128);
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
    constructor(x: number, y: number) {
        super('./images/hero4run.png', x, y, 0.4, 100, 0, 5, 96.4, 98);
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
    constructor(x: number, y: number) {
        super('./images/hero5run.png', x, y, 0.4, 100, 0, 5, 96.4, 98);
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
const occupiedGridPositions: Set<string> = new Set();

// Function to check if a grid position is occupied
function isGridOccupied(x: number, y: number): boolean {
    const gridKey = `${x},${y}`;
    return occupiedGridPositions.has(gridKey);
}

canvas1.addEventListener('click', (event) => {
    const rect = canvas1.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    x = x - (x % 64);
    y = y - (y % 64);

    console.log(y);

    if (!selectedCard) {
        // Check if a card was clicked
        cards.forEach(card => {
            if (x >= card.x && x <= card.x + card.width && y >= card.y && y <= card.y + card.height) {
                selectedCard = card;
            }
        });
    } else {
        // Check if y is within the valid range (not in the first or last row)
        if (y >= 64 && y < 512) {
            if (selectedCard.heroClass === HeroType3 || selectedCard.heroClass === HeroType4 || selectedCard.heroClass === HeroType5 &&!isGridOccupied(x,y) ) {
                const newHero = new selectedCard.heroClass(x, y);
                heroes.push(newHero);
            } else if (!isGridOccupied(x, y)) {
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

        selectedCard = null; // Reset the selected card
    }
});




export function drawDefenders(){
  
    
        for(var i=0;i<=heroes.length-1;i++){
        heroes[i].heroMovement()
        heroes[i].draw(ctx1)
    }
}

// Schedule card addition
setTimeout(() => {
    audio.play();
    createHeroCard('./images/card4.png', 64 * 7, 0, 0, 9, 96.4, 98, HeroType4,150,'Kings Guard');
}, 15000);

setTimeout(() => {
    audio.play();
    createHeroCard(`./images/card5.png`, 64 * 8, 0, 0, 11, 96.4, 98, HeroType5,150,'Viking Hero');
}, 30000);

export let resources = 300;
export let drawHeroCardNow = false;

export function addResources(x: number) {
    resources += x;
    audio.play();

}


