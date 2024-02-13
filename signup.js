const email = document.getElementById("email");
const password = document.getElementById("password");
const username = document.getElementById("username");
const submitBtn = document.querySelector("form > button");
const feedback = document.getElementById("feedback");
const localUsers = JSON.parse(localStorage.getItem("users")) ?? [];

const currentUser = localUsers?.find((user) => user.signed) ?? undefined;
if (currentUser) location.assign("./index.html");

function validateEmail() {
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (pattern.test(email.value)) return true;
}
function validateUsername() {
  const pattern = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  if (pattern.test(username.value)) return true;
}
function validatePassword() {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (pattern.test(password.value)) return true;
}

email.addEventListener("input", () => {
  if (validateEmail()) {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
  } else {
    email.classList.remove("is-valid");
    email.classList.add("is-invalid");
  }
});

username.addEventListener("input", () => {
  if (validateUsername()) {
    username.classList.remove("is-invalid");
    username.classList.add("is-valid");
  } else {
    username.classList.remove("is-valid");
    username.classList.add("is-invalid");
  }
});

password.addEventListener("input", () => {
  if (validatePassword()) {
    password.classList.remove("is-invalid");
    password.classList.add("is-valid");
  } else {
    password.classList.remove("is-valid");
    password.classList.add("is-invalid");
  }
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!username.value || !email.value || !password.value) {
    feedback.classList.replace("text-success", "text-danger");
    feedback.innerText = "All inputs are required";
  } else if (validateEmail() && validatePassword() && validateUsername()) {
    if (localUsers?.find((user) => user.username === username.value)) {
      feedback.classList.replace("text-success", "text-danger");
      feedback.innerText = "Username already exists";
    } else if (localUsers?.find((user) => user.email === email.value)) {
      feedback.classList.replace("text-success", "text-danger");
      feedback.innerText = "Email already exists";
    } else {
      const newUser = { username: username.value, email: email.value, password: password.value, signed: false };
      localUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(localUsers));
      feedback.classList.replace("text-danger", "text-success");
      feedback.innerHTML = `<b>Account created!</b> Redirecting to Login page...`;
      setTimeout(() => {
        location.assign("./login.html");
      }, 2000);
    }
  }
});
