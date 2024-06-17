// HeroCard.ts
const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;

import { gridCellHeight, gridCellWidth,gameSpeed } from "./game";

const card1={
    x:64*4,
    y:0,
    width:64,
    height:64,
    image1:'./images/card1.png',
    frameX : 0,
    frameY : 0,
    eachWidth:128,
    eachHeight: 128,
    firstFrame:0,
    lastFrame:21,

}

const card2={
    x:64*5,
    y:0,
    width:64,
    height:64,
    image2:'./images/card2.png',
    frameX : 0,
    frameY : 0,
    eachWidth:128,
    eachHeight: 128,
    firstFrame:0,
    lastFrame:11,


}


const card3={
    x:64*6,
    y:0,
    width:64,
    height:64,
    image3:'./images/card3.png',
    frameX : 0,
    frameY : 0,
    eachWidth:128,
    eachHeight: 128,
    firstFrame:0,
    lastFrame:18,


}

var image1 = new Image();
image1.src = card1.image1;
var image2 = new Image();
image2.src = card2.image2;
var image3 = new Image();
image3.src = card3.image3;

export function chooseHero() {
    ctx1.strokeRect(card1.x,card1.y,card1.width,card1.height)
    ctx1.fillStyle='purple'
    ctx1.fillRect(card1.x,card1.y,card1.width,card1.height)
    if (gameSpeed % 15 === 0) {
        if (card1.frameX < card1.lastFrame) {
            card1.frameX += 1;
        } else {
            card1.frameX = card1.firstFrame;
        }
    }
    ctx1.drawImage(image1, card1.eachWidth * card1.frameX, 0, card1.eachWidth, card1.eachHeight, card1.x, card1.y, card1.width, card1.height);
    ctx1.strokeRect(card2.x,card2.y,card2.width,card2.height)
    ctx1.fillRect(card2.x,card2.y,card2.width,card2.height);
    if (gameSpeed % 15 === 0) {
        if (card2.frameX < card2.lastFrame) {
            card2.frameX += 1;
        } else {
            card2.frameX = card2.firstFrame;
        }
    }
    ctx1.drawImage(image2, card2.eachWidth * card2.frameX, 0, card2.eachWidth, card2.eachHeight, card2.x, card2.y, card2.width, card2.height);
    ctx1.strokeRect(card3.x,card3.y,card3.width,card3.height)
    ctx1.fillRect(card3.x,card3.y,card3.width,card3.height);
    if (gameSpeed % 15 === 0) {
        if (card3.frameX < card3.lastFrame) {
            card3.frameX += 1;
        } else {
            card3.frameX = card3.firstFrame;
        }
    }
    ctx1.drawImage(image3, card3.eachWidth * card3.frameX, 0, card3.eachWidth, card3.eachHeight, card3.x, card3.y, card3.width, card3.height);
    
}



export let resources=300;



export let drawHeroCardnNow=false
// Define the base HeroCard class







export  function addResources(x:number){
 resources=resources+x
 const audio = new Audio();
 audio.src='./sound/resouce-increase.mp3' 
 audio.play();
console.log(audio);



}

