const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;

canvas1.height = 576;
canvas1.width = 1344;

const gridCellWidth = 64;
const gridCellHeight = 64;

class Gridcell {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = gridCellWidth;
    this.height = gridCellHeight;
  }

  draw() {
    const hoverImage = new Image();
    hoverImage.src = './images/hovertile.png'; // Replace with the path to your image

hoverImage.onload = () => {
 
  ctx1.drawImage(hoverImage,this.x,this.y,this.width,this.height)
};
  }
}



function drawGridAtMousePosition(event: MouseEvent) {
  const rect = canvas1.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const gridX = Math.floor(mouseX / gridCellWidth) * gridCellWidth;
  const gridY = Math.floor(mouseY / gridCellHeight) * gridCellHeight;


  if (gridY === 0 || gridY >= canvas1.height - gridCellHeight) {
    return;
  }
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height); // Clear the canvas before each redraw

  for (let x = 0; x < canvas1.width; x += gridCellWidth) {
    const gridCell = new Gridcell(x, gridY);
    gridCell.draw();
  }


  for (let y = 64; y < canvas1.height-gridCellHeight; y += gridCellHeight) {
    const gridCell = new Gridcell(gridX, y);
    gridCell.draw();
  }
}



canvas1.addEventListener('mousemove', drawGridAtMousePosition);

export { animate };




function animate() {
  requestAnimationFrame(animate);
}

animate();
