const gameScreen = document.getElementById('gameScreen') as HTMLElement;
const homeScreen = document.getElementById('homeScreen') as HTMLElement;

function showGameScreen(): void {
    homeScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
   
}





function showHome(): void {
    homeScreen.style.display = 'flex';
    gameScreen.style.display = 'none';
   
}




export {showGameScreen,showHome}