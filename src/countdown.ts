import { currentWave } from "./game";
export let waveStartTime = Date.now(); // Start time of the current wave

export function waveCountdown(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  // Draw the countdown timer on the canvas
  ctx.fillStyle = "gold";
  ctx.font = "50px Audiowide";

  if (currentWave <= 3) {
    ctx.fillText(
      `Siege Wave ${currentWave} incoming get ready`,
      canvas.width / 2 - 350,
      canvas.height / 2 + 60
    );
  } else {
    ctx.fillText(
      "Kill them all!",
      canvas.width / 2 - 200,
      canvas.height / 2 + 100
    );
  }
}
