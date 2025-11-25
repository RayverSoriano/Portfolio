// Matrix Rain Effect
const canvas = document.getElementById('matrixBackground');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix characters
const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
const chars = matrixChars.split('');

const fontSize = 14;
const columns = canvas.width / fontSize;

// Array of drops - one per column
const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

// Matrix colors
const colors = ['#0f0', '#0ff', '#00ff00', '#00ffff'];
let currentColorIndex = 0;

function draw() {
  // Semi-transparent black to create fading effect
  ctx.fillStyle = 'rgba(15, 18, 25, 0.04)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = colors[currentColorIndex];
  ctx.font = `${fontSize}px monospace`;
  
  for (let i = 0; i < drops.length; i++) {
    // Random character
    const text = chars[Math.floor(Math.random() * chars.length)];
    
    // x = i * fontSize, y = value of drops[i] * fontSize
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    
    // Reset drop to top when it reaches bottom with random condition
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    
    // Move drop down
    drops[i]++;
  }
  
  // Change color occasionally
  if (Math.random() < 0.005) {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
  }
}

// Animation loop
setInterval(draw, 35);

// Handle window resize
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Recalculate columns
  const newColumns = canvas.width / fontSize;
  
  // Adjust drops array
  if (newColumns > drops.length) {
    // Add new drops
    for (let i = drops.length; i < newColumns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
  } else if (newColumns < drops.length) {
    // Remove extra drops
    drops.length = newColumns;
  }
});