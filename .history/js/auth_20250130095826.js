// js/auth.js

// Handle Registration
document.getElementById('register-form')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!name || !email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  const user = { name, email, password };
  localStorage.setItem('user', JSON.stringify(user));
  alert('Registration successful! Please login.');
  window.location.href = "login.html";
});

// Handle Login
document.getElementById('login-form')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    alert(`Welcome back, ${storedUser.name}!`);
    window.location.href = "index.html";
  } else {
    alert('Invalid email or password. Please try again.');
  }
});
