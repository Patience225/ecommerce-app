document.addEventListener("DOMContentLoaded", function () {
  const authForm = document.getElementById("authForm");
  const authMessage = document.getElementById("authMessage");

  if (authForm) {
    authForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const action = document.getElementById("authAction").value;

      if (action === "login") {
        loginUser(email, password);
      } else {
        registerUser(email, password);
      }
    });
  }
});

function registerUser(email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    showMessage("User already exists. Please login.", "error");
    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Registration successful. You can now log in.", "success");
}

function loginUser(email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  
  const user = users.find((user) => user.email === email && user.password === password);
  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    showMessage("Login successful! Redirecting...", "success");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } else {
    showMessage("Invalid email or password.", "error");
  }
}

function showMessage(message, type) {
  if (!authMessage) return;
  authMessage.textContent = message;
  authMessage.className = type;
}
