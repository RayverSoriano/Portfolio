const canvas = document.getElementById('matrixBackground');
const ctx = canvas.getContext('2d');

// Set canvas size to match its parent section
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;


// Characters to use (you can customize these)
const characters = "01<>[]{}/=+_!@#$%^&*()ABCDEFghijklmnpqrstuvXYZ";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  // Slightly fade out the previous frame
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff00"; // Matrix green
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = characters[Math.floor(Math.random() * characters.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

// Run the draw function repeatedly
setInterval(drawMatrix, 33);

// Resize canvas when window resizes
window.addEventListener("resize", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});
