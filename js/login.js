function login(event) {
  event.preventDefault();

  const email = document.getElementById("getEmail").value;
  const password = document.getElementById("getPassword").value;

  const registeredEmail = localStorage.getItem("registeredEmail");
  const registeredPassword = localStorage.getItem("registeredPassword");

  if (email === registeredEmail && password === registeredPassword) {
    alert("Login successful!");
    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "index.html";
  } else {
    alert("Incorrect email or password. Please check your details.");
  }
}
var form = document.getElementById("login-form");
form.addEventListener("submit", login);
