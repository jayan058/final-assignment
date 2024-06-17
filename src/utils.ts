const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;


import { resources,heroes} from "./heroes";
import { enemies } from "./villans";

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

                // Check if hero is moving towards the enemy
                if ((hero.speed > 0 && hero.x < enemy.x) || (hero.speed < 0 && hero.x > enemy.x||hero.speed==0)) {
                    hero.speed = 0;
                    enemy.speed = 0;
                }
            }
        }
    }
}





export function checkCollisionsBetweenHeroes(){
    for (let i = 0; i < heroes.length; i++) {
        for (let j = i + 1; j < heroes.length; j++) {
            let hero = heroes[i];
            let hero1 = heroes[j];
            
            if (hero.x < hero1.x + hero1.width &&
                hero.x + hero.width > hero1.x &&
                hero.y < hero1.y + hero1.height &&
                hero.y + hero.height > hero1.y) {
                hero.speed = 0;
                hero1.speed = 0;
            }
        }
    }
}

export function checkCollisionsBetweenenemies() {
    for (let i = 0; i < enemies.length; i++) {
        for (let j = i + 1; j < enemies.length; j++) {
            let villain = enemies[i];
            let villain1 = enemies[j];
            
            if (villain.x < villain1.x + villain1.width &&
                villain.x + villain.width > villain1.x &&
                villain.y < villain1.y + villain1.height &&
                villain.y + villain.height > villain1.y) {
                villain.speed = 0;
                villain1.speed = 0;
            }
        }
    }
}









export {showResources}