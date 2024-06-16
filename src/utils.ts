const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;


import { resources } from "./heroes";

function showResources(){
    ctx1.fillStyle = 'gold';
   ctx1.font='20px Arial'
   ctx1.fillText('Coins: ' + resources,0,50 )
}






export {showResources}