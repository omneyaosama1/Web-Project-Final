window.addEventListener("scroll", function () {
    var navbar = document.querySelector(".nav-bar");
    if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Function to confirm deletion of a meal
function confirmDeletion(button) {
    const mealId = button.getAttribute("data-id");
    const mealItem = button.closest(".meal-item");
    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    const confirmButton = modal.querySelector(".confirm");
    const cancelButton = modal.querySelector(".cancel");

    // Clear previous event listeners
    confirmButton.onclick = null;
    cancelButton.onclick = null;

    confirmButton.onclick = function () {
        $.ajax({
            url: `/user/favoriteMeals`,  // Adjust the URL to match your backend route
            type: "DELETE",
            data: JSON.stringify({ mealID: mealId }),
            contentType: "application/json",
            success: function (response) {
                mealItem.remove();
                modal.style.display = "none";
            },
            error: function (xhr) {
                const errorResponse = JSON.parse(xhr.responseText);
                alert(`Failed to delete meal: ${errorResponse.message}`);
                modal.style.display = "none";
            },
        });
    };

    cancelButton.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

// Ensure that the event listener is properly added to all delete buttons when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", function () {
            confirmDeletion(this);
        });
    });
});

