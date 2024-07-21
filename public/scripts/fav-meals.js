window.addEventListener("scroll", function () {
    var navbar = document.querySelector(".nav-bar");
    if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", function () {
        const mealId = this.getAttribute("data-id");
        const mealItem = this.closest(".meal-item");
        const modal = document.getElementById("myModal");
        modal.style.display = "block";

        const confirmButton = modal.querySelector(".confirm");
        const cancelButton = modal.querySelector(".cancel");

        confirmButton.onclick = function () {
            $.ajax({
                url: `/user/favoriteMeals`,
                type: "DELETE",
                data: JSON.stringify({ mealID: mealId }),
                contentType: "application/json",
                success: function (response) {
                    mealItem.remove();
                    modal.style.display = "none";
                },
                error: function (xhr) {
                    alert("Failed to delete meal: " + xhr.responseText);
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
    });
});
