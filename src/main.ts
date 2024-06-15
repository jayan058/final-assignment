import {showGameScreen,showHome } from './screens.ts';
import {animate} from './game.ts'



const startButton = document.getElementById('startButton') as HTMLButtonElement;






startButton.addEventListener('click', () => {
       showGameScreen()
       animate()
});

showHome()
