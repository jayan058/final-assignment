import { gridCellHeight, gridCellWidth,gameSpeed } from "./game";

const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;


const ROW_COUNT = 8;


let enemytypes:any=[]
export let enemies:any=[]
const enemy1=new Image()
enemy1.src='./images/enemy1.png'
enemytypes.push(enemy1)
const enemy2=new Image()
enemy2.src='./images/enemy2.png'
enemytypes.push(enemy2)
const enemy3=new Image()
enemy3.src='./images/enemy3.png'

enemytypes.push(enemy3)
const enemy4=new Image()
enemy4.src='./images/enemy4.png'
enemytypes.push(enemy4)
const enemy5=new Image()
enemy5.src='./images/enemy5.png'
enemytypes.push(enemy5)










// Define Villain class
class Enemy {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x =x;
        this.y = y;
        this.width = width;
        this.height = height; 
        
    }
    draw(){

    }   
    enemyMovement(){

    }
 

}



class Blade extends Enemy {
    speed: number;
    moment:number
    health: number;
    pointsAwarded: number;
    frameX: number;
    frameY: number;
    eachWidth: number;
    eachHeight: number;
    firstFrame: number;
    lastFrame: number;
    enemytype: HTMLImageElement;
    thrownBlades:any;
    lastThrowTime: number; // Timestamp of last throw
    throwInterval: number; // Minimum interval between throws
   

    constructor(x: number, y: number) {
        super(x, y, gridCellWidth-30, gridCellHeight-30);
        this.speed = 1;
        this.moment=this.speed;
        this.health = 100;
        this.pointsAwarded = this.health;
        this.frameX = 0;
        this.frameY = 0;
        this.eachWidth = 213;
        this.eachHeight = 213;
        this.firstFrame = 0;
        this.lastFrame = 8;
        this.enemytype = enemytypes[0];
        this.thrownBlades = [];
        this.lastThrowTime = 0; // Initialize last throw time to 0 (or Date.now())
        this.throwInterval = 8000;
      
    }

    enemyMovement() {
        this.x -= this.speed;
        // Other movement logic as before
        if (gameSpeed % 10 === 0) {
            if (this.frameX < this.lastFrame) {
                this.frameX += 1;
            } else {
                this.frameX = this.firstFrame;
            }
        }
    }

   

    draw() {
       

        ctx1.fillStyle = 'gold';
        ctx1.font = '10px Arial';
        ctx1.fillText(this.health.toString(), this.x + 10, this.y);

        // Draw the enemy
        ctx1.drawImage(this.enemytype, this.eachWidth * this.frameX, 0, this.eachWidth, this.eachHeight, this.x, this.y, this.width, this.height);

       

        

    }

    throwNinjaBlade() {
        const currentTime = Date.now();
        if (currentTime - this.lastThrowTime > this.throwInterval) {
            // Throw a ninja blade
            const ninjaBlade = new NinjaBlade(this.x, this.y + this.height / 2); // Adjust starting position as needed
            this.thrownBlades.push(ninjaBlade); // Store thrown blade
            
            this.lastThrowTime = currentTime; // Update last throw time
        }
}





}


class NinjaBlade {
    x: number;
    y: number;
    radius: number;
    speed: number;
    thornLength: number;
    thornCount: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 5; // Adjust the radius as needed
        this.speed = 1; // Adjust speed of the blade
        this.thornLength = 5; // Length of the thorns
        this.thornCount = 8; // Number of thorns around the circumference
    }

    update() {
        this.x -= this.speed; // Move the blade horizontally (adjust as needed)
    }

    draw() {
        ctx1.fillStyle = 'black'; // Color of the ninja blade
        ctx1.strokeStyle = 'black';
        ctx1.lineWidth = 2;

        // Draw the main circle
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx1.fill();
        ctx1.stroke();

        // Draw the thorns
        for (let i = 0; i < this.thornCount; i++) {
            const angle = (i * (2 * Math.PI)) / this.thornCount;
            const startX = this.x + this.radius * Math.cos(angle);
            const startY = this.y + this.radius * Math.sin(angle);
            const endX = this.x + (this.radius + this.thornLength) * Math.cos(angle);
            const endY = this.y + (this.radius + this.thornLength) * Math.sin(angle);
            
            ctx1.beginPath();
            ctx1.moveTo(startX, startY);
            ctx1.lineTo(endX, endY);
            ctx1.stroke();
        }
        
    }
}

// Define more enemy types similarly
class zombieVillager extends Enemy {
    speed: number;
    moment:number
    health: number;
    pointsAwarded: number;
    frameX: number;
    frameY: number;
    eachWidth: number;
    eachHeight: number;
    firstFrame: number;
    lastFrame: number;
    enemytype: HTMLImageElement;
    state: 'idle' | 'attacking' | 'hurt' | 'dead' |'dustcloud';
    attackAnimationFrames: number;
    hurtAnimationFrames: number;
    deathAnimationFrames: number;
    dustCloudAnimationFrames: number;
    attackImageSrc: string;
    hurtImageSrc: string;
    deathImageSrc: string;
    dustCloudImageSrc: string;

    // Image elements
    attackImage: HTMLImageElement;
    hurtImage: HTMLImageElement;
    deathImage: HTMLImageElement;
    dustCloudImage: HTMLImageElement;
    endurance:number
    isCollidingWithVilan:boolean;
    isCollidingWithHero:boolean;

    constructor(x: number, y: number) {
        super(x, y, gridCellWidth, gridCellHeight); // Adjust width and height if needed
        this.speed = 0.3;
        this.moment=this.speed
        this.health = 120;
        this.pointsAwarded = this.health;
        this.frameX = 0;
        this.frameY = 0;
        this.eachWidth = 900;
        this.eachHeight = 900;
        this.firstFrame = 1;
        this.lastFrame = 11;
        this.enemytype = enemytypes[1];
         // Set the specific image/type for EnemyType2
         this.attackAnimationFrames =11;
            this.hurtAnimationFrames = 11;
            this.deathAnimationFrames = 14;
            this.dustCloudAnimationFrames =4;
    
            // Load additional images
            this.attackImageSrc = './images/zomievillagerattack.png';
            this.hurtImageSrc = './images/zomievillagerhurt.png';
            this.deathImageSrc = './images/zomievillagerdeath.png';
            this.dustCloudImageSrc ='./images/mandrake-dust-cloud.png';
    
            this.attackImage = new Image();
            this.attackImage.src = this.attackImageSrc;
    
            this.hurtImage = new Image();
            this.hurtImage.src = this.hurtImageSrc;
    
            this.deathImage = new Image();
            this.deathImage.src = this.deathImageSrc;
    
            this.dustCloudImage = new Image();
            this.dustCloudImage.src = this.dustCloudImageSrc;
        this.state='idle';
        this.endurance=30    
        this.isCollidingWithVilan=false;
        this.isCollidingWithHero=false;
      
    }

   


    enemyMovement() {
      
  
        
        this.x=this.x-this.speed
        if (gameSpeed % 10 === 0) {
            // Update frameX to flap wings
            if (this.frameX < this.lastFrame) {
                this.frameX += 1;
            } else {
                this.frameX = this.firstFrame;
            }
        }
    }

    draw() {
     
     
      ctx1.fillStyle = 'gold';
        ctx1.font = '10px Arial';
        ctx1.fillText(this.health.toString(), this.x + 25, this.y+10 );
        switch (this.state) {
            case 'idle':

            if (gameSpeed % 20 === 0) {
                if (this.frameX < this.lastFrame) {
                    this.frameX += 1;
                } else {
                    this.frameX = this.firstFrame;
                }
            }
                ctx1.drawImage(
                    this.enemytype,
                    this.eachWidth * this.frameX, 0,
                    this.eachWidth, this.eachHeight,
                    this.x, this.y,
                    this.width, this.height
                );
              
                break;
            case 'attacking':

            if (gameSpeed % 25 === 0) {
                if (this.frameX < this.attackAnimationFrames) {
                    this.frameX += 1;
                } else {
                    this.frameX = this.firstFrame;
                }
            }
                ctx1.drawImage(
                    this.attackImage,
                    this.eachWidth * this.frameX, 0,
                    this.eachWidth, this.eachHeight,
                    this.x, this.y,
                    this.width, this.height
                );
              
                break;
            case 'hurt':

            if (gameSpeed % 20 === 0) {
                if (this.frameX < this.hurtAnimationFrames) {
                    this.frameX += 1;
                } else {
                    this.frameX = this.firstFrame;
                }
            }
                ctx1.drawImage(
                    this.hurtImage,
                    this.eachWidth * this.frameX, 0,
                    this.eachWidth, this.eachHeight,
                    this.x, this.y,
                    this.width, this.height
                );
              
                break;
            case 'dead':
          
           
            if (gameSpeed % 30 === 0) {
                if (this.frameX < this.deathAnimationFrames) {
                    this.frameX += 1;
                } else {
                    this.frameX = this.firstFrame;
                }
            }
                ctx1.drawImage(
                    this.deathImage,
                    this.eachWidth * this.frameX, 0,
                    this.eachWidth, this.eachHeight,
                    this.x, this.y,
                    this.width, this.height
                );
              
                break;
            case 'dustcloud':

            if (gameSpeed % 20 === 0) {
                if (this.frameX < this.dustCloudAnimationFrames) {
                    this.frameX += 1;
                } else {
                    this.frameX = this.firstFrame;
                }
            }
                ctx1.drawImage(
                    this.dustCloudImage,
                    200 * this.frameX, 0,
                    200, 179,
                    this.x, this.y,
                    this.width, this.height
                );
              
            break;
        }
    }
}


class Bat extends Enemy {
    speed: number;
    moment:number
    health: number;
    pointsAwarded: number;
    frameX: number;
    frameY: number;
    eachWidth: number;
    eachHeight: number;
    firstFrame: number;
    lastFrame: number;
    enemytype:HTMLImageElement; // Assuming this is the image or type identifier

    constructor(x: number, y: number) {
        super(x, y, gridCellWidth, gridCellHeight); // Adjust width and height if needed
        this.speed = 0.2;
        this.moment=this.speed
        this.health = 100;
        this.pointsAwarded = this.health;
        this.frameX = 0;
        this.frameY = 0;
        this.eachWidth = 900;
        this.eachHeight = 900;
        this.firstFrame = 0;
        this.lastFrame =11;
        this.enemytype = enemytypes[2]; // Set the specific image/type for EnemyType1
    }

    

    enemyMovement() {
      
  
        
        this.x=this.x-this.speed
        if (gameSpeed % 10 === 0) {
            // Update frameX to flap wings
            if (this.frameX < this.lastFrame) {
                this.frameX += 1;
            } else {
                this.frameX = this.firstFrame;
            }
        }
    }

    draw() {
    
      ctx1.fillStyle = 'gold';
        ctx1.font = '10px Arial';
        ctx1.fillText(this.health.toString(), this.x + 25, this.y+10 );
        ctx1.drawImage(this.enemytype, this.eachWidth * this.frameX, 0, this.eachWidth, this.eachHeight, this.x, this.y, this.width, this.height);
    }
}


class Raven extends Enemy {
    speed: number;
    moment:number
    health: number;
    pointsAwarded: number;
    frameX: number;
    frameY: number;
    eachWidth: number;
    eachHeight: number;
    firstFrame: number;
    lastFrame: number;
    enemytype: HTMLImageElement; // Assuming this is the image or type identifier

    constructor(x: number, y: number) {
        super(x, y, gridCellWidth-30, gridCellHeight - 30); // Adjust width and height if needed
        this.speed = 0.2;
        this.moment=this.speed
        this.health = 100;
        this.pointsAwarded = this.health;
        this.frameX = 0;
        this.frameY = 0;
        this.eachWidth = 271;
        this.eachHeight = 194;
        this.firstFrame = 0;
        this.lastFrame = 5;
        this.enemytype = enemytypes[3]; // Set the specific image/type for EnemyType1
    }

    

    enemyMovement() {
      
  
        
        this.x=this.x-this.speed
        if (gameSpeed % 10 === 0) {
            // Update frameX to flap wings
            if (this.frameX < this.lastFrame) {
                this.frameX += 1;
            } else {
                this.frameX = this.firstFrame;
            }
        }
    }

    draw() {

     
        
      ctx1.fillStyle = 'gold';
        ctx1.font = '10px Arial';
        ctx1.fillText(this.health.toString(), this.x + 10, this.y );
        ctx1.drawImage(this.enemytype, this.eachWidth * this.frameX, 0, this.eachWidth, this.eachHeight, this.x, this.y, this.width, this.height);
    }
}

class Ghost extends Enemy {
    speed: number;
    moment:number;
    health: number;
    pointsAwarded: number;
    frameX: number;
    frameY: number;
    eachWidth: number;
    eachHeight: number;
    firstFrame: number;
    lastFrame: number;
    enemytype: HTMLImageElement;
    attackInterval: number;
   

    constructor(x: number, y: number) {
        super(x, y, gridCellWidth, gridCellHeight); // Adjust width and height if needed
        this.speed = 0.2;
        this.moment=this.speed
        this.health = 120;
        this.pointsAwarded = this.health;
        this.frameX = 0;
        this.frameY = 0;
        this.eachWidth = 900;
        this.eachHeight = 900;
        this.firstFrame = 0;
        this.lastFrame = 11;
        this.enemytype = enemytypes[4]; // Set the specific image/type for EnemyType2
        this.attackInterval=20;
        
    }

    enemyMovement() {
        this.x=this.x-this.speed
        if (gameSpeed % 10 === 0) {
            // Update frameX to flap wings
            if (this.frameX < this.lastFrame) {
                this.frameX += 1;
            } else {
                this.frameX = this.firstFrame;
            }
        }
    }

    draw() {
      
     
        ctx1.fillStyle = 'gold';
        ctx1.font = '10px Arial';
        ctx1.fillText(this.health.toString(), this.x + 25, this.y+10 );
        ctx1.drawImage(this.enemytype, this.eachWidth * this.frameX, 0, this.eachWidth, this.eachHeight, this.x, this.y, this.width, this.height);
    }
}




// Adjust these constants as needed
const rows = [64,128,192,256,320,384,448,512,576]; // Define Y positions of each row

const enemyTypeClasses = [
    // Blade, // Assuming Blade corresponds to enemytype[0]
    zombieVillager, // Assuming zombieVillager corresponds to enemytype[1]
    // Bat, // Assuming Bat corresponds to enemytype[2]
    // Raven, // Assuming Raven corresponds to enemytype[3]
    // Ghost // Assuming Ghost corresponds to enemytype[4]
];
let spawnInterval = 5000; // Initial interval between enemy spawns in milliseconds
let lastSpawnTime = -spawnInterval; // Initialize last spawn time to ensure immediate spawn

export function spawnEnemy() {
    const currentTime = Date.now();
    if (currentTime - lastSpawnTime > spawnInterval) {
        lastSpawnTime = currentTime;
        
        // Randomly select a row
        const randomRowIndex = Math.floor(Math.random() * ROW_COUNT);
        const rowY = rows[randomRowIndex];

        // Randomly select an enemy type index
        const enemyTypeIndex = Math.floor(Math.random() * enemyTypeClasses.length);

        // Create new enemy instance using the selected class
        const newEnemy = new enemyTypeClasses[enemyTypeIndex](canvas1.width, rowY,);

        // Push the new enemy into the enemies array
        enemies.push(newEnemy);
        
        // Adjust spawn interval dynamically
        if (spawnInterval > 1500) {
            spawnInterval -= 100; // Decrease spawn interval by 200 milliseconds
          
            
        }
    }
}


export function drawVillan() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].enemyMovement();
        enemies[i].draw();

        // Remove enemies that are off-screen or have no health
        if (enemies[i].x + enemies[i].width < 0) {
            enemies.splice(i, 1);
            i--;
        }
    }
}
