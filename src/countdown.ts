import { currentWave } from "./game";
export let waveStartTime = Date.now(); // Start time of the current wave

const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;

export function waveCountdown(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  // Draw the countdown timer on the canvas
  ctx.fillStyle = "gold";
  ctx.font = "50px MedievalSharp";
  if (currentWave >= 3) {
    ctx1.fillText(`Game Over`, canvas1.width / 2 - 300, canvas1.height / 2);
    return;
  }
  ctx.fillText(
    ` Seige Wave ${currentWave} incoming get ready `,
    canvas.width / 2 - 300,
    canvas.height / 2
  );
}
