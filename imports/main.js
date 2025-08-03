import { username } from './username.js';

import { password } from './password.js';

document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("username");
  const passInput = document.getElementById("password");

  function checkLogin() {
    const user = userInput.value;
    const pass = passInput.value;

    if (user === username && pass === password) {
      window.location.href = "login.html";
    }
  }

  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkLogin();
  });
  passInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkLogin();
  });
});
