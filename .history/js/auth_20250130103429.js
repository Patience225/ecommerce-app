// Register user
document.getElementById('register-form')?.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  if (users.some(user => user.email === email)) {
    alert('User already exists! Please login.');
  } else {
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! You can now login.');
    window.location.href = 'login.html';
  }
});

// Login user
document.getElementById('login-form')?.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    alert(`Welcome back, ${user.username}!`);
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'index.html';
  } else {
    alert('Invalid email or password.');
  }
});
