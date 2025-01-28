function login(username) {
  localStorage.setItem('user', username);
  alert('Logged in as ' + username);
}

function logout() {
  localStorage.removeItem('user');
  alert('Logged out!');
}
