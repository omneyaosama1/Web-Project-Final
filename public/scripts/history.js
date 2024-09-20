document.querySelectorAll(".rate").forEach((button) => {
  button.addEventListener("click", function () {
    const orderId = this.closest("li")
      .querySelector("h3")
      .textContent.split("#")[1]
      .trim();
    document.getElementById("orderId").value = orderId;
    document.getElementById("ratingModal").style.display = "block";
  });
});

window.onclick = function (event) {
  if (event.target == document.getElementById("ratingModal")) {
    document.getElementById("ratingModal").style.display = "none";
  }
};

document.getElementById("ratingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const orderId = document.getElementById("orderId").value;
  const rating = document.getElementById("rating").value;

  fetch("/order/rate-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId, rating }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
        document.getElementById("ratingModal").style.display = "none";
      } else {
        alert("Error submitting rating.");
      }
    })
    .catch((error) => console.error("Error:", error));
});

document.querySelectorAll(".cancelOrder").forEach((button) => {
  button.addEventListener("click", function () {
    const orderId = this.getAttribute("data-order-id");

    const cancelModal = document.getElementById("cancelModal");
    cancelModal.style.display = "block";

    const confirmButton = document.getElementById("confirmDelete");

    confirmButton.onclick = null;

    confirmButton.onclick = function () {
      fetch(`/order/delete/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            location.reload();
          } else {
            console.error("Failed to delete:", data.message);
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to delete order.");
        });
    };

    const cancelButton = cancelModal.querySelector(".cancel");
    cancelButton.onclick = function () {
      cancelModal.style.display = "none";
    };
  });
});

window.onclick = function (event) {
  const cancelModal = document.getElementById("cancelModal");
  if (event.target == cancelModal) {
    cancelModal.style.display = "none";
  }
};
