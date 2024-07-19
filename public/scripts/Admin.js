document.querySelectorAll(".edit-button").forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "block";
  });
});

document.querySelectorAll(".close").forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "none";
  });
});

window.addEventListener("click", (event) => {
  document.querySelectorAll(".modal").forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Password display
let passwordVisible = false;
function togglePassword() {
  const passwordDisplay = document.getElementById("passwordDisplay");
  const toggleButton = document.getElementById("toggleButton");

  if (passwordVisible) {
    passwordDisplay.textContent = "•".repeat(actualPassword.length);
    toggleButton.textContent = "Show";
  } else {
    passwordDisplay.textContent = actualPassword;
    toggleButton.textContent = "Hide";
  }

  passwordVisible = !passwordVisible;
}

// Editing admin's info
document.querySelectorAll("#editForm").forEach((editForm) => {
  editForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(editForm);
    const formObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/profile/updateAdminInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });

      if (response.ok) {
        location.reload();
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error(error);
    }
  });
});

//Updating admin's password
document.querySelectorAll("#passwordForm").forEach((passwordForm) => {
  passwordForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(passwordForm);
    const formObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/profile/updateAdminPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword_inp: formObject.currentPassword,
          newPassword_inp: formObject.newPassword,
          confirmPassword_inp: formObject.confirmPassword,
        }),
      });

      if (response.ok) {
        location.reload();
      } else {
        console.error("Failed to update password");
      }
    } catch (error) {
      console.error(error);
    }
  });
});
