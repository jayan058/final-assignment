import { resetGame, animate } from "./game";
const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;

const buttonX = canvas1.width / 2 - 100;
const buttonY = canvas1.height / 2 - 25;
const buttonWidth = 200;
const buttonHeight = 50;

function drawGameWonScreen() {
  ctx1.fillStyle = "#333";
  ctx1.fillRect(0, 0, canvas1.width, canvas1.height);

  ctx1.font = "40px Audiowide";
  ctx1.fillStyle = "green";
  ctx1.fillText(
    "GOOD JOB DEFENDING THE TOWER YOU DID IT",
    canvas1.width / 2 - 550,
    100
  );

  ctx1.fillStyle = "red"; // Restart button color
  ctx1.fillRect(buttonX + 500, buttonY + 300, buttonWidth, buttonHeight);
  ctx1.font = "25px Audiowide";
  ctx1.fillStyle = "white";
  ctx1.fillText("Restart", buttonX + 550, buttonY + 330);

  // Add event listener for click events
  canvas1.addEventListener("click", handleGameWonScreenClick);
}

function handleGameWonScreenClick(event: MouseEvent) {
  const rect = canvas1.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Check if Restart button is clicked
  if (
    mouseX >= buttonX + 550 &&
    mouseX < buttonX + buttonWidth + 550 &&
    mouseY >= buttonY + 300 &&
    mouseY < buttonY + 300 + buttonHeight
  ) {
    resetGame();
    animate();
    removeGameWonScreenClickListener(); // Remove the event listener
  }
}

function removeGameWonScreenClickListener() {
  canvas1.removeEventListener("click", handleGameWonScreenClick);
}

export { drawGameWonScreen };
