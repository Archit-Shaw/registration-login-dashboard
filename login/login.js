const f = document.getElementById('loginForm');

document.getElementById("togglePwd").addEventListener("click", function () {
  const pwdInput = document.getElementById("password");
  const isPassword = pwdInput.getAttribute("type") === "password";
  pwdInput.setAttribute("type", isPassword ? "text" : "password");
  this.classList.toggle("active");
});

f.addEventListener('submit', e => {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const u = users.find(u => u.email === f.email.value.trim());

  document.getElementById('errEmail').style.display = 'none';
  document.getElementById('errPassword').style.display = 'none';

  if (!u) {
    document.getElementById('errEmail').textContent = 'Email not registered';
    document.getElementById('errEmail').style.display = 'block';
    return;
  }

  if (u.password !== f.password.value) {
    document.getElementById('errPassword').textContent = 'Wrong password';
    document.getElementById('errPassword').style.display = 'block';
    return;
  }

  sessionStorage.setItem('loggedInUser', u.email);
  window.location.href = "../dashboard/dashboard.html"; // Correct path
});
