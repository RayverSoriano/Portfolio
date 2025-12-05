// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navUl.classList.toggle('show');
      menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navUl.classList.remove('show');
        menuToggle.classList.remove('active');
      });
    });
  }
  
  // Contact form handling
  const messageForm = document.getElementById('messageForm');
  
  if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // In a real application, you would send this data to a server
      // For now, we'll just show a success message
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
      
      // Reset the form
      messageForm.reset();
      
      // Reset labels
      const labels = messageForm.querySelectorAll('label');
      labels.forEach(label => {
        label.style.top = '15px';
        label.style.fontSize = '16px';
        label.style.color = '#aaa';
      });
    });
  }
  
  // Add floating label effect
  const formGroups = document.querySelectorAll('.form-group');
  
  formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    
    // Check if input has value on page load
    if (input.value) {
      const label = group.querySelector('label');
      label.style.top = '-20px';
      label.style.fontSize = '14px';
      label.style.color = '#00ffff';
    }
    
    // Add focus/blur events
    input.addEventListener('focus', function() {
      const label = this.parentElement.querySelector('label');
      label.style.top = '-20px';
      label.style.fontSize = '14px';
      label.style.color = '#00ffff';
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        const label = this.parentElement.querySelector('label');
        label.style.top = '15px';
        label.style.fontSize = '16px';
        label.style.color = '#aaa';
      }
    });
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active navigation link highlighting
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');
  
  function highlightNavLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavLink);
  
  // Add fade-in animation for elements on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);
  
  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Add CSS for fade-in animation
  const style = document.createElement('style');
  style.textContent = `
    section {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
});