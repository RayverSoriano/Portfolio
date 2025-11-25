// contact.js
document.addEventListener('DOMContentLoaded', function() {
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
      label.style.fontSize = '12px';
      label.style.color = '#00ffff';
    }
    
    // Add focus/blur events
    input.addEventListener('focus', function() {
      const label = this.parentElement.querySelector('label');
      label.style.top = '-20px';
      label.style.fontSize = '12px';
      label.style.color = '#00ffff';
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        const label = this.parentElement.querySelector('label');
        label.style.top = '10px';
        label.style.fontSize = '16px';
        label.style.color = '#aaa';
      }
    });
  });
});