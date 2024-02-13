const logoutBtn = document.getElementById("logout");
const wlcSpan = document.querySelector("h1 span");
const localUsers = JSON.parse(localStorage.getItem("users"));

const currentUser = localUsers?.find((user) => user.signed) ?? undefined;
if (!localUsers || !currentUser) {
  location.assign("./login.html");
}

wlcSpan.innerText = currentUser.username;

logoutBtn.addEventListener("click", () => {
  localUsers.forEach((user) => (user.signed = false));
  localStorage.setItem("users", JSON.stringify(localUsers));
  location.assign("./login.html");
});
