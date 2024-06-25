import { resetGame, animate } from "./game";

const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;

const buttonX = canvas1.width / 2 - 100;
const buttonY = canvas1.height / 2 - 25;
const buttonWidth = 200;
const buttonHeight = 50;

function drawGameOverScreen() {
  ctx1.fillStyle = "#333";
  ctx1.fillRect(0, 0, canvas1.width, canvas1.height);

  ctx1.font = "25px Audiowide";
  ctx1.fillStyle = "red";
  ctx1.fillText("Game Over", canvas1.width / 2 - 150, 150);

  ctx1.fillStyle = "#4CAF50"; // Restart button color
  ctx1.fillRect(buttonX, buttonY + 100, buttonWidth, buttonHeight);
  ctx1.fillStyle = "white";
  ctx1.font = "25px Audiowide";
  ctx1.fillStyle = "red";
  ctx1.fillText("Restart", buttonX + 50, buttonY + 135);

  // Add event listener for click events
  canvas1.addEventListener("click", handleGameOverScreenClick);
}

function handleGameOverScreenClick(event: MouseEvent) {
  const rect = canvas1.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Check if Restart button is clicked
  if (
    mouseX >= buttonX &&
    mouseX < buttonX + buttonWidth &&
    mouseY >= buttonY + 100 &&
    mouseY < buttonY + 100 + buttonHeight
  ) {
    resetGame();
    animate();
    removeGameOverScreenClickListener(); // Remove the event listener
  }
}

function removeGameOverScreenClickListener() {
  canvas1.removeEventListener("click", handleGameOverScreenClick);
}

export { drawGameOverScreen, buttonX, buttonY, buttonWidth, buttonHeight };
