import { gridCellHeight, gridCellWidth,gameSpeed } from "./game";

const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;


const ROW_COUNT = 7;


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



// Define constants for the sprite sheet frame counts
const ZOMBIE_HURT_FRAMES =11; // Assuming 6 frames for hurt animation
const ZOMBIE_ATTACK_FRAMES = 11; // Assuming 8 frames for attack animation
const ZOMBIE_DEATH_FRAMES = 11; // Assuming 10 frames for death animation
const ZOMBIE_EXPLOSION_FRAMES = 11; // Assuming 12 frames for explosion animation

const zombieHurtImage = new Image();
zombieHurtImage.src = './images/zomievillagerhurt.png';

const zombieAttackImage = new Image();
zombieAttackImage.src = './images/zomievillagerhurt.png';

const zombieDeathImage = new Image();
zombieDeathImage.src = './images/zomievillagerhurt.png';

const zombieExplosionImage = new Image();
zombieExplosionImage.src = './images/zomievillagerhurt.png';





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
        this.speed = 0.2;
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
    enemytype: any;

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
        this.firstFrame = 1;
        this.lastFrame = 11;
        this.enemytype = enemytypes[1]; // Set the specific image/type for EnemyType2
      
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
    enemytype: any; // Assuming this is the image or type identifier

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
    enemytype: any; // Assuming this is the image or type identifier

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
    enemytype: any;
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
const rows = [64,128,192,256,320,384,448,512]; // Define Y positions of each row

const enemyTypeClasses = [
    Blade, // Assuming Blade corresponds to enemytype[0]
    zombieVillager, // Assuming zombieVillager corresponds to enemytype[1]
    Bat, // Assuming Bat corresponds to enemytype[2]
    Raven, // Assuming Raven corresponds to enemytype[3]
    Ghost // Assuming Ghost corresponds to enemytype[4]
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
        const newEnemy = new enemyTypeClasses[enemyTypeIndex](canvas1.width, rowY);

        // Push the new enemy into the enemies array
        enemies.push(newEnemy);
        
        // Adjust spawn interval dynamically
        if (spawnInterval > 1600) {
            spawnInterval -= 100; // Decrease spawn interval by 200 milliseconds
          
            
        }
    }
}


export function drawVillan() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].enemyMovement();
        enemies[i].draw();

        // Remove enemies that are off-screen or have no health
        if (enemies[i].x + enemies[i].width < 0 || enemies[i].health <= 0) {
            enemies.splice(i, 1);
            i--;
        }
    }
}
