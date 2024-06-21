const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx1 = canvas1.getContext('2d') as CanvasRenderingContext2D;

export function handlePause(){
    ctx1.globalAlpha = 0.5; // Set the transparency level (0.0 to 1.0)
    ctx1.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Optional: set a color with transparency
    ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
    ctx1.globalAlpha = 1.0; // Reset the transparency to default   
}

