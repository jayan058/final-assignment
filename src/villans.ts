import { gridCellHeight, gridCellWidth,gameSpeed } from "./game";

const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;

const ROW_HEIGHT = 64;
const ROW_COUNT = 7;


let enemytypes:any=[]
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
        super(x, y, gridCellWidth - 10, gridCellHeight - 10); // Adjust width and height if needed
        this.speed = 0.2;
        this.health = 100;
        this.pointsAwarded = this.health;
        this.frameX = 0;
        this.frameY = 0;
        this.eachWidth = 213;
        this.eachHeight = 213;
        this.firstFrame = 0;
        this.lastFrame = 8;
        this.enemytype = enemytypes[0]; // Set the specific image/type for EnemyType1
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
        console.log(this);
      ctx1.fillStyle = 'gold';
        ctx1.font = '10px Arial';
        ctx1.fillText(this.health.toString(), this.x + 15, this.y );
        ctx1.drawImage(this.enemytype, this.eachWidth * this.frameX, 0, this.eachWidth, this.eachHeight, this.x, this.y, this.width, this.height);
    }
}

// Define more enemy types similarly
class Worm extends Enemy {
    speed: number;
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
        super(x, y, gridCellWidth - 10, gridCellHeight - 10); // Adjust width and height if needed
        this.speed = 0.2;
        this.health = 120;
        this.pointsAwarded = this.health;
        this.frameX = 0;
        this.frameY = 0;
        this.eachWidth = 229;
        this.eachHeight = 171;
        this.firstFrame = 0;
        this.lastFrame = 5;
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
        console.log("draw");
        
        ctx1.fillStyle = 'gold';
        ctx1.font = '10px Arial';
        ctx1.fillText(this.health.toString(), this.x + 20, this.y );
        ctx1.drawImage(this.enemytype, this.eachWidth * this.frameX, 0, this.eachWidth, this.eachHeight, this.x, this.y, this.width, this.height);
    }
}


class Bat extends Enemy {
    speed: number;
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
        super(x, y, gridCellWidth, gridCellHeight - 10); // Adjust width and height if needed
        this.speed = 0.2;
        this.health = 100;
        this.pointsAwarded = this.health;
        this.frameX = 0;
        this.frameY = 0;
        this.eachWidth = 266;
        this.eachHeight = 188;
        this.firstFrame = 0;
        this.lastFrame = 4;
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
        console.log(this);
      ctx1.fillStyle = 'gold';
        ctx1.font = '10px Arial';
        ctx1.fillText(this.health.toString(), this.x + 15, this.y );
        ctx1.drawImage(this.enemytype, this.eachWidth * this.frameX, 0, this.eachWidth, this.eachHeight, this.x, this.y, this.width, this.height);
    }
}


class Raven extends Enemy {
    speed: number;
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
        super(x, y, gridCellWidth, gridCellHeight - 10); // Adjust width and height if needed
        this.speed = 0.2;
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
        console.log(this);
      ctx1.fillStyle = 'gold';
        ctx1.font = '10px Arial';
        ctx1.fillText(this.health.toString(), this.x + 15, this.y );
        ctx1.drawImage(this.enemytype, this.eachWidth * this.frameX, 0, this.eachWidth, this.eachHeight, this.x, this.y, this.width, this.height);
    }
}

class Ghost extends Enemy {
    speed: number;
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
        super(x, y, gridCellWidth - 10, gridCellHeight - 10); // Adjust width and height if needed
        this.speed = 0.2;
        this.health = 120;
        this.pointsAwarded = this.health;
        this.frameX = 0;
        this.frameY = 0;
        this.eachWidth = 261;
        this.eachHeight = 209;
        this.firstFrame = 0;
        this.lastFrame = 5;
        this.enemytype = enemytypes[4]; // Set the specific image/type for EnemyType2
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
        console.log("draw");
        
        ctx1.fillStyle = 'gold';
        ctx1.font = '10px Arial';
        ctx1.fillText(this.health.toString(), this.x + 20, this.y );
        ctx1.drawImage(this.enemytype, this.eachWidth * this.frameX, 0, this.eachWidth, this.eachHeight, this.x, this.y, this.width, this.height);
    }
}

console.log(Blade);


let enemies: Enemy[] = [];
let spawnInterval = 5000; // Initial spawn interval in milliseconds
let spawnRows = [64]; // Initial rows from which enemies can spawn

// Function to spawn enemies from multiple rows over time
function spawnEnemiesFromMultipleRows() {
    setInterval(() => {
        // Randomly select rows to spawn enemies from
        const randomRowIndices = getRandomRowIndices(spawnRows.length);

        // Randomly select an enemy type to spawn
        const randomEnemyType = Math.floor(Math.random() * 5); // Adjust based on number of enemy types

        // Spawn enemies from selected rows
        randomRowIndices.forEach(index => {
            const randomRow = spawnRows[index];
            switch (randomEnemyType) {
                case 0:
                    enemies.push(new Blade(canvas1.width, randomRow));
                    break;
                case 1:
                    enemies.push(new Worm(canvas1.width, randomRow));
                    break;
                case 2:
                    enemies.push(new Bat(canvas1.width, randomRow));
                    break;    
                case 3:
                    enemies.push(new Raven(canvas1.width, randomRow));
                    break;
                case 4:
                    enemies.push(new Ghost(canvas1.width, randomRow));
                    break;                    
            }
        });

        // Increase difficulty over time
        increaseDifficulty();
    }, spawnInterval);
}

// Function to randomly select row indices based on current available rows
function getRandomRowIndices(rowCount: number): number[] {
    const randomIndexCount = Math.floor(Math.random() * rowCount) + 1;
    const randomIndices: number[] = [];
    for (let i = 0; i < randomIndexCount; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * rowCount);
        } while (randomIndices.includes(randomIndex));
        randomIndices.push(randomIndex);
    }
    return randomIndices;
}

// Function to increase difficulty (spawn frequency and number of rows)
function increaseDifficulty() {
    // Decrease spawn interval (increase spawn frequency)
    spawnInterval -= 300;
    
    // Add more rows gradually (up to ROW_COUNT)
    if (spawnRows.length < ROW_COUNT) {
        let newRowY = ROW_HEIGHT * (spawnRows.length + 1);
        spawnRows.push(newRowY);
    }
}

// Start spawning enemies
spawnEnemiesFromMultipleRows();



export function drawVillan() {
    for (let i = 0; i < enemies.length; i++) {   
         enemies[i].draw();
        enemies[i].enemyMovement();
    
    }
   
}
