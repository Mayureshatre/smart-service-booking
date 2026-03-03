const API_URL = "http://localhost:5000/api/auth";

//REGISTRATION LOGIC
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Stop the page from reloading

    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const messageEl = document.getElementById("reg-message");

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // Default role is 'user'
      });

      const data = await response.json();

      if (response.ok) {
        messageEl.style.color = "green";
        messageEl.textContent =
          "Registration successful! Redirecting to login...";
        setTimeout(() => (window.location.href = "login.html"), 2000);
      } else {
        messageEl.style.color = "red";
        messageEl.textContent = data.message;
      }
    } catch (error) {
      messageEl.textContent = "Server error. Is the backend running?";
    }
  });
}

//LOGIN LOGIC
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const messageEl = document.getElementById("login-message");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // SAVE THE TOKEN AND USER INFO IN THE BROWSER!
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userName", data.user.name);

        messageEl.style.color = "green";
        messageEl.textContent = "Login successful! Redirecting...";
        setTimeout(() => (window.location.href = "index.html"), 1500);
      } else {
        messageEl.style.color = "red";
        messageEl.textContent = data.message;
      }
    } catch (error) {
      messageEl.textContent = "Server error. Is the backend running?";
    }
  });
}
