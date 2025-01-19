// login.js

// Default credentials
const DEFAULT_EMAIL = 'admin@gmail.com';
const DEFAULT_PASSWORD = 'admin123';

// Get form elements
const loginForm = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Add form submission handler
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get input values
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Validate credentials
  if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
    // Show success message
    showMessage('Login successful!', 'success');

    // Store login status in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Redirect to admin dashboard after short delay
    setTimeout(() => {
      window.location.href = '../../backend/index.html';
    }, 1000);
  } else {
    // Show error message
    showMessage('Invalid email or password!', 'error');

    // Clear password field
    passwordInput.value = '';
  }
});

// Function to show messages
function showMessage(message, type) {
  // Create message element
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.style.padding = '10px';
  messageDiv.style.marginTop = '10px';
  messageDiv.style.borderRadius = '5px';
  messageDiv.style.textAlign = 'center';
  messageDiv.style.opacity = '0';
  messageDiv.style.transition = 'opacity 0.3s ease-in-out';

  // Set colors based on message type
  if (type === 'success') {
    messageDiv.style.backgroundColor = '#4CAF50';
    messageDiv.style.color = 'white';
  } else {
    messageDiv.style.backgroundColor = '#f44336';
    messageDiv.style.color = 'white';
  }

  // Insert message after form
  loginForm.insertAdjacentElement('afterend', messageDiv);

  // Fade in message
  setTimeout(() => {
    messageDiv.style.opacity = '1';
  }, 10);

  // Remove message after delay
  setTimeout(() => {
    messageDiv.style.opacity = '0';
    setTimeout(() => {
      messageDiv.remove();
    }, 300);
  }, 3000);
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    window.location.href = '../pages/admin.html';
  }
});

// Add input validation and visual feedback
emailInput.addEventListener('input', function () {
  if (this.value.trim() !== '') {
    this.classList.add('border-blue-500');
  } else {
    this.classList.remove('border-blue-500');
  }
});

passwordInput.addEventListener('input', function () {
  if (this.value.trim() !== '') {
    this.classList.add('border-blue-500');
  } else {
    this.classList.remove('border-blue-500');
  }
});
