function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if(username === "nil" && password === "123") {
    localStorage.setItem("user", username);
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error").innerText = "Invalid credentials";
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function checkAuth() {
  if(!localStorage.getItem("user")) {
    window.location.href = "index.html";
  }
}
