// Particles Background Effect
const canvas = document.getElementById('particlesBackground');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = `rgba(0, 255, 255, ${Math.random() * 0.5 + 0.1})`;
    this.glow = Math.random() * 2 + 1;
    this.connections = [];
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Bounce off walls
    if (this.x > canvas.width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = canvas.width;
    }
    
    if (this.y > canvas.height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = canvas.height;
    }
    
    // Gentle floating motion
    this.speedX += (Math.random() - 0.5) * 0.05;
    this.speedY += (Math.random() - 0.5) * 0.05;
    
    // Limit speed
    const maxSpeed = 2;
    const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
    if (speed > maxSpeed) {
      this.speedX = (this.speedX / speed) * maxSpeed;
      this.speedY = (this.speedY / speed) * maxSpeed;
    }
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    
    // Add glow effect
    ctx.shadowBlur = this.glow;
    ctx.shadowColor = '#00ffff';
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Draw connections
    if (this.connections.length > 0) {
      ctx.beginPath();
      for (const other of this.connections) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          // Calculate opacity based on distance
          const opacity = 1 - (distance / 100);
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
}

// Create particles
const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Animation loop
function animate() {
  // Clear with semi-transparent black for trailing effect
  ctx.fillStyle = 'rgba(15, 18, 25, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Update connections
  for (let i = 0; i < particles.length; i++) {
    particles[i].connections = [];
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        particles[i].connections.push(particles[j]);
      }
    }
  }
  
  // Update and draw particles
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  requestAnimationFrame(animate);
}

// Start animation
animate();

// Handle window resize
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Reposition particles to stay within new bounds
  particles.forEach(particle => {
    particle.x = Math.random() * canvas.width;
    particle.y = Math.random() * canvas.height;
  });
});

// Mouse interaction
let mouse = {
  x: null,
  y: null,
  radius: 100
};

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('mouseout', function() {
  mouse.x = undefined;
  mouse.y = undefined;
});

// Optional: Add interactivity on mouse move
function handleMouse() {
  if (mouse.x && mouse.y) {
    particles.forEach(particle => {
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        particle.speedX += (dx / distance) * force * 0.5;
        particle.speedY += (dy / distance) * force * 0.5;
      }
    });
  }
}

// Update animation loop to include mouse interaction
const originalAnimate = animate;
function animateWithMouse() {
  handleMouse();
  originalAnimate();
}

// Replace original animation with mouse-enabled version
animate = animateWithMouse;