const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;
import { villanprojectiles } from "./villans";
import { occupiedGridPositions } from "./heroes";
import { resources, heroes } from "./heroes";
import { enemies } from "./villans";
import { projectiles } from "./projectiles";
import { towers } from "./towers";
import { projectilesfortowers } from "./towers";
import { FloatingMessage, floatingmessage } from "./floatingmessage";
import { addResources } from "./heroes";
import { powerups } from "./powerup";

function showResources() {
  ctx1.fillStyle = "white";
  ctx1.font = "17px Audiowide";
  ctx1.fillText("Coins: " + resources, 0, 30);
}

export function checkCollisions() {
  for (let hero of heroes) {
    for (let enemy of enemies) {
      if (
        hero.x < enemy.x + enemy.width &&
        hero.x + hero.width > enemy.x &&
        hero.y < enemy.y + enemy.height &&
        hero.y + hero.height > enemy.y
      ) {
        enemy.isCollidingWithHero = true;
        enemy.isCollidingWithVillain = false;

        // Check if hero is moving towards the enemy
        if (
          (hero.speed > 0 && hero.x < enemy.x) ||
          (hero.speed < 0 && hero.x > enemy.x)
        ) {
          // Stop both hero and enemy
          hero.speed = 0;
          enemy.speed = 0;
          hero.state = "attacking";
          enemy.state = "attacking";
          handleCollision(hero, enemy);
        }
      }
    }
  }
}

function handleCollision(hero: any, enemy: any) {
  let heroAttack = true;

  const attackCycle = setInterval(() => {
    if (hero.health <= 0 || enemy.health <= 0) {
      clearInterval(attackCycle);
      if (hero.health <= 0) {
        hero.state = "dead";
        setTimeout(() => {
          hero.state = "dustcloud";
        }, 400);

        setTimeout(() => {
          enemy.speed = enemy.moment;
          removeEntity(heroes, hero);
          const positionString = `${hero.x},${hero.y}`;

          // Remove the hero's position from occupiedGridPositions
          occupiedGridPositions.delete(positionString);
        }, 1500);
      } else {
        hero.state = "idle";
      }
      if (enemy.health <= 0) {
        enemy.state = "dead";
        setTimeout(() => {
          enemy.state = "dustcloud";
          hero.state = "idle";
        }, 400);

        setTimeout(() => {
          hero.speed = hero.moment;
          removeEntity(enemies, enemy);
        }, 800);
      } else {
        enemy.state = "idle";
      }
    } else {
      if (heroAttack) {
        hero.state = "attacking";
        enemy.state = "hurt";
      } else {
        hero.state = "hurt";
        enemy.state = "attacking";
      }
      heroAttack = !heroAttack;
    }
  }, 700);

  const healthReduction = setInterval(() => {
    if (hero.health <= 0 || enemy.health <= 0) {
      clearInterval(healthReduction);
    } else {
      hero.health -= hero.endurance;
      enemy.health -= enemy.endurance;
    }
  }, 500);
}

export function removeEntity(array: any, entity: any) {
  console.log(entity);

  const index = array.indexOf(entity);

  if (index > -1) {
    array.splice(index, 1);

    // Check if the entity being removed is an enemy
    if (entity.type === "enemy") {
      const pointsAwarded = entity.pointsAwarded || 0;

      // Push a message to floatingmessage
      floatingmessage.push(
        new FloatingMessage(
          `+ ${pointsAwarded}`,
          canvas1.width / 2 - 10,
          canvas1.height / 2 + 50,
          50,
          1,
          "white"
        )
      );
      let pointsAudio = new Audio();
      pointsAudio.src = "./sound/resourceincrease.mp3";
      pointsAudio.play();
      pointsAudio.volume = 0.9;
      // Add resources based on pointsAwarded
      addResources(pointsAwarded);
    }
  }
}

export function collisionWithProjectile() {
  for (let enemy of enemies) {
    for (let projectile of projectiles) {
      if (
        projectile.x < enemy.x + enemy.width &&
        projectile.x + projectile.width > enemy.x &&
        projectile.y < enemy.y + enemy.height &&
        projectile.y + projectile.height > enemy.y
      ) {
        // Remove the projectile on collision
        removeEntity(projectiles, projectile);

        // Reduce enemy health
        enemy.health -= enemy.endurance;

        if (enemy.health <= 0) {
          // Set enemy state to dead
          enemy.state = "dead";
          enemy.speed = 0;

          // After some time, change state to dustcloud
          setTimeout(() => {
            enemy.state = "dustcloud";

            // Remove the enemy from the game after another delay
            setTimeout(() => {
              removeEntity(enemies, enemy);
            }, 500);
          }, 500);
        } else {
          // Set enemy to hurt state and reduce speed to zero
          enemy.state = "hurt";
          // Save the original speed
          enemy.speed = 0;

          setTimeout(() => {
            enemy.state = "idle";
            enemy.speed = enemy.moment;
          }, 500);
        }
      }
    }
  }
}

export function collisionWithRocket() {
  for (let enemy of enemies) {
    for (let powerup of powerups) {
      if (
        powerup.x < enemy.x + enemy.width &&
        powerup.x + powerup.width > enemy.x &&
        powerup.y < enemy.y + enemy.height &&
        powerup.y + powerup.height > enemy.y
      ) {
        if (powerup.type === "PowerupType1") {
          // Set enemy health to zero, but do not remove the powerup
          enemy.health = 0;
        } else if (powerup.type === "PowerupType2") {
          // Set enemy health to zero and remove the powerup
          enemy.health = 0;
          removeEntity(powerups, powerup);
        } else if (powerup.type === "PowerupType3") {
          powerup.x += enemy.width;
          enemy.health -= 20;
        }

        if (enemy.health <= 0) {
          // Set enemy state to dead
          enemy.state = "dead";
          enemy.speed = 0;

          // After some time, change state to dustcloud
          setTimeout(() => {
            enemy.state = "dustcloud";

            // Remove the enemy from the game after another delay
            setTimeout(() => {
              removeEntity(enemies, enemy);
            }, 602);
          }, 590);
        }
      }
    }
  }
}

export function checkCollisionWithTower() {
  for (let tower of towers) {
    for (let enemy of enemies) {
      if (
        tower.x < enemy.x + enemy.width &&
        tower.x + tower.width > enemy.x &&
        tower.y < enemy.y + enemy.height &&
        tower.y + tower.height > enemy.y
      ) {
        enemy.speed = 0;
        enemy.x = enemy.x;
        enemy.state = "attacking";
      }
    }
  }
}
export function checkCollisionWithProjectileFromTower() {
  for (let projectilefortower of projectilesfortowers) {
    for (let enemy of enemies) {
      if (
        projectilefortower.x < enemy.x + enemy.width &&
        projectilefortower.x + projectilefortower.width > enemy.x &&
        projectilefortower.y < enemy.y + enemy.height &&
        projectilefortower.y + projectilefortower.height > enemy.y
      ) {
        // Remove the projectile on collision
        removeEntity(projectilesfortowers, projectilefortower);

        // Reduce enemy health
        enemy.health -= enemy.endurance;

        if (enemy.health <= 0) {
          // Set enemy state to dead
          enemy.state = "dead";
          enemy.speed = 0;

          // After some time, change state to dustcloud
          setTimeout(() => {
            enemy.state = "dustcloud";

            // Remove the enemy from the game after another delay
            setTimeout(() => {
              removeEntity(enemies, enemy);
            }, 500);
          }, 500);
        } else {
          // Set enemy to hurt state and reduce speed to zero
          enemy.state = "hurt";
          // Save the original speed
          enemy.speed = 0;

          setTimeout(() => {
            enemy.state = "idle";
            enemy.speed = enemy.moment;
          }, 500);
        }
      }
    }
  }
}

export function collisionWithVillanProjectile() {
  for (let villanprojectile of villanprojectiles) {
    for (let hero of heroes) {
      if (
        hero.x < villanprojectile.x + villanprojectile.width &&
        hero.x + hero.width > villanprojectile.x &&
        hero.y < villanprojectile.y + villanprojectile.height &&
        hero.y + hero.height > villanprojectile.y
      ) {
        // Remove the projectile on collision
        removeEntity(villanprojectiles, villanprojectile);

        // Reduce enemy health
        hero.health -= hero.endurance;

        if (hero.health <= 0) {
          // Set enemy state to dead
          hero.state = "dead";
          hero.speed = 0;

          // After some time, change state to dustcloud
          setTimeout(() => {
            hero.state = "dustcloud";

            // Remove the enemy from the game after another delay
            setTimeout(() => {
              removeEntity(heroes, hero);
              const positionString = `${hero.x},${hero.y}`;

              // Remove the hero's position from occupiedGridPositions
              occupiedGridPositions.delete(positionString);
            }, 500);
          }, 500);
        } else {
          // Set enemy to hurt state and reduce speed to zero
          hero.state = "hurt";
          // Save the original speed
          hero.speed = 0;

          setTimeout(() => {
            hero.state = "idle";
            hero.speed = hero.moment;
          }, 500);
        }
      }
    }
  }
}

export { showResources };
