document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("deleteAccountModal");
  const deleteAccountButton = document.getElementById("deleteAccountButton");
  const closeModalButton = modal.querySelector(".close");
  const cancelButton = modal.querySelector(".cancel-btn");

  if (deleteAccountButton && modal && closeModalButton && cancelButton) {
    deleteAccountButton.addEventListener("click", function () {
      modal.style.display = "block";
    });
    closeModalButton.addEventListener("click", function () {
      modal.style.display = "none";
    });

    cancelButton.addEventListener("click", function () {
      modal.style.display = "none";
    });
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  } else {
    console.error("Modal or Button Elements Not Found");
  }
});
