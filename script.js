// Get all inputs
const form = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const strengthBar = document.getElementById('strengthBar');
const successAlert = document.getElementById('successAlert');

// Error spans
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Show/hide password toggle
document.getElementById('showPassword').addEventListener('change', function () {
  password.type = this.checked ? 'text' : 'password';
  confirmPassword.type = this.checked ? 'text' : 'password';
});

// Realtime password strength bar
password.addEventListener('input', function () {
  const value = password.value;
  let strength = 0;
  if (value.length >= 8) strength += 25;
  if (/[A-Z]/.test(value)) strength += 25;
  if (/\d/.test(value)) strength += 25;
  if (/[\W]/.test(value)) strength += 25;

  strengthBar.style.width = strength + '%';
  strengthBar.className = 'progress-bar';

  if (strength < 50) {
    strengthBar.classList.add('bg-danger');
  } else if (strength < 75) {
    strengthBar.classList.add('bg-warning');
  } else {
    strengthBar.classList.add('bg-success');
  }
});

// Validate form
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent actual submission

  // Reset all errors
  nameError.textContent = '';
  emailError.textContent = '';
  phoneError.textContent = '';
  passwordError.textContent = '';
  confirmPasswordError.textContent = '';
  successAlert.classList.add('d-none');

  let valid = true;

  // Name validation
  if (fullName.value.trim().length < 5) {
    nameError.textContent = 'Name must be at least 5 characters';
    valid = false;
  }

  // Email validation
  if (!email.value.includes('@')) {
    emailError.textContent = 'Enter a valid email address';
    valid = false;
  }

  // Phone validation
  if (phone.value === '1234567890' || !/^\d{10}$/.test(phone.value)) {
    phoneError.textContent = 'Enter a valid 10-digit phone number';
    valid = false;
  }

  // Password validation
  if (
    password.value.toLowerCase() === 'password' ||
    password.value.toLowerCase() === fullName.value.toLowerCase() ||
    password.value.length < 8
  ) {
    passwordError.textContent = 'Password is not strong or uses common words';
    valid = false;
  }

  // Confirm password match
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.textContent = 'Passwords do not match';
    valid = false;
  }

  // If all valid, show success
  if (valid) {
    successAlert.classList.remove('d-none');
    form.reset();
    strengthBar.style.width = '0%';
  }
});
