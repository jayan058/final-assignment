const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;

import {  occupiedGridPositions} from "./heroes";
import { resources,heroes} from "./heroes";
import { enemies } from "./villans";
import { projectiles } from "./projectiles";
function showResources(){
    ctx1.fillStyle = 'gold';
   ctx1.font='20px Arial'
   ctx1.fillText('Coins: ' + resources,0,50 )
}




export function checkCollisions() {


    
    for (let hero of heroes) {
        for (let enemy of enemies) {
            if (hero.x < enemy.x + enemy.width &&
                hero.x + hero.width > enemy.x &&
                hero.y < enemy.y + enemy.height &&
                hero.y + hero.height > enemy.y) {
                    enemy.isCollidingWithHero=true;
                    enemy.isCollidingWithVillain=false

                // Check if hero is moving towards the enemy
                if ((hero.speed > 0 && hero.x < enemy.x) || (hero.speed < 0 && hero.x > enemy.x)) {
                    // Stop both hero and enemy
                    hero.speed = 0;
                    enemy.speed = 0;
                    hero.state = 'attacking';
                    enemy.state = 'attacking';
                    handleCollision(hero, enemy);
                }

                
            }

           
        }
    }
}

function handleCollision(hero:any, enemy:any) {
    let heroAttack = true;

    const attackCycle = setInterval(() => {
        if (hero.health <= 0 || enemy.health <= 0) {
            clearInterval(attackCycle);
            if (hero.health <= 0) {
                hero.state = 'dead';
                setTimeout(() => {
                    hero.state = 'dustcloud';
                    
                }, 400);  
               
                setTimeout(() => {
                  enemy.speed=enemy.moment
                 removeEntity(heroes, hero);
                 const positionString = `${hero.x},${hero.y}`;
        
                 // Remove the hero's position from occupiedGridPositions
                 occupiedGridPositions.delete(positionString);
                    
                }, 1000); // Adjust as needed
            } else {
                hero.state = 'idle';
            }
            if (enemy.health <= 0) {
                enemy.state = 'dead';
                setTimeout(() => {
                    enemy.state = 'dustcloud';
                    hero.state='idle'
                   
                }, 400);  
               
                setTimeout(() => {
                    hero.speed=hero.moment
                    removeEntity(enemies, enemy);
                }, 1000); // Adjust as needed
            }else {
                enemy.state = 'idle';
            }
        } else {
            if (heroAttack) {
                hero.state = 'attacking';
                enemy.state = 'hurt';
            } else {
                hero.state = 'hurt';
                enemy.state = 'attacking';
            }
            heroAttack = !heroAttack;
        }
    }, 500);

    const healthReduction = setInterval(() => {
        if (hero.health <= 0 || enemy.health <= 0) {
            clearInterval(healthReduction);
        } else {
            hero.health -= hero.endurance;
            enemy.health -= enemy.endurance;
        }
    }, 500);
}

export function removeEntity(array:any, entity:any) {
    const index = array.indexOf(entity);
    if (index > -1) {
        array.splice(index, 1);
    }
}

    

for (let i = 0; i < enemies.length; i++) {
    for (let j = i + 1; j < enemies.length; j++) {
        let enemy1 = enemies[i];
        let enemy2 = enemies[j];
        if (enemy1.x < enemy2.x + enemy2.width &&
            enemy1.x + enemy1.width > enemy2.x &&
            enemy1.y < enemy2.y + enemy2.height &&
            enemy1.y + enemy1.height > enemy2.y) {

            enemy1.isCollidingWithVillain = true;
            enemy2.isCollidingWithVillain = true;

            // Stop both enemies
            enemy1.speed = 0;
            enemy2.speed = 0;
            enemy1.state = 'idle';
            enemy2.state = 'idle';

            // Resume movement after a delay with speed 0.2
            setTimeout(() => {
                enemy1.speed = 0.2;
                enemy2.speed = 0.2;
            }, 1000); // Adjust delay as needed
        }
    }
}

export function collisionWithProjectile() {
    for (let enemy of enemies) {
        for (let projectile of projectiles) {
            if (projectile.x < enemy.x + enemy.width &&
                projectile.x + projectile.width > enemy.x &&
                projectile.y < enemy.y + enemy.height &&
                projectile.y + projectile.height > enemy.y) {
                
                // Remove the projectile on collision
                removeEntity(projectiles, projectile);

                // Reduce enemy health
                enemy.health -= enemy.endurance;

                if (enemy.health <= 0) {
                    // Set enemy state to dead
                    enemy.state = 'dead';
                    enemy.speed = 0;

                    // After some time, change state to dustcloud
                    setTimeout(() => {
                        enemy.state = 'dustcloud';

                        // Remove the enemy from the game after another delay
                        setTimeout(() => {
                            removeEntity(enemies, enemy);
                        }, 500); // Adjust this delay as needed for dustcloud duration
                    }, 500); // Adjust this delay as needed for dead state duration
                } else {
                    // Set enemy to hurt state and reduce speed to zero
                    enemy.state = 'hurt';
                     // Save the original speed
                    enemy.speed = 0;

                    // Restore enemy state and speed after 1 second (1000 milliseconds)
                    setTimeout(() => {
                        enemy.state = 'idle';
                        enemy.speed = enemy.moment;
                    }, 500); // Adjust the delay as needed
                }
            }
        }
    }
}



























export {showResources}