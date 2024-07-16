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
    window.location.href = "/feedback/display"; // Ensure it matches your route
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const feedbackLink = document.getElementById("profileLink");

  feedbackLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/profile";
  });
});
