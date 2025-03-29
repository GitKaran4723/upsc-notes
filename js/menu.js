const toggleBtn = document.getElementById("menuToggle");
const menuIcon = document.getElementById("menuIcon");
const mobileMenu = document.getElementById("mobileMenu");

let menuOpen = false;
toggleBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    mobileMenu.classList.remove("hide", "hidden");
    mobileMenu.classList.add("show");
    menuIcon.classList.replace("fa-bars", "fa-times");
  } else {
    mobileMenu.classList.remove("show");
    mobileMenu.classList.add("hide");
    menuIcon.classList.replace("fa-times", "fa-bars");
    setTimeout(() => mobileMenu.classList.add("hidden"), 300);
  }
});
