document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("aside .sidebar a");

  // Load the active link from local storage
  const activeLinkId = localStorage.getItem("activeNavLink");
  if (activeLinkId) {
    const activeLink = document.getElementById(activeLinkId);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Remove active class from all links
      navLinks.forEach((link) => link.classList.remove("active"));
      // Add active class to the clicked link
      e.currentTarget.classList.add("active");
      // Save the active link to local storage
      localStorage.setItem("activeNavLink", e.currentTarget.id);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const feedbackLink = document.getElementById("feedback");

  feedbackLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/feedback/display";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const profileLink = document.getElementById("profileLink");

  profileLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/profile";
  });
});


//Delete account (Script for the USER navbar)
const modal = document.getElementById("deleteAccountModal");
const btn = document.getElementById("deleteAccountButton");
const span = document.getElementsByClassName("close")[0];
const cancelBtn = document.querySelector(".cancel-btn");
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
cancelBtn.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
