import {showGameScreen,showHome } from './screens.ts';
import {animate} from './game.ts'
var audio=new Audio()
audio.src='./sound/maintheme.mp3'



const startButton = document.getElementById('startButton') as HTMLButtonElement;






startButton.addEventListener('click', () => {
//        audio.play()
// audio.loop=true
       showGameScreen()
       animate()

});

showHome()
