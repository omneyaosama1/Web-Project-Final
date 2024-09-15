document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("addProductModal");
  const btn = document.getElementById("addProductBtn");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("addProductForm");
  const productTableBody = document.getElementById("productTableBody");

  btn.onclick = function () {
    modal.style.display = "block";
  };

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData.entries());
    const nutrition = {
      energy: parseInt(formDataObject["nutrition[energy]"]) || 0,
      calories: parseInt(formDataObject["nutrition[calories]"]) || 0,
      fat: parseInt(formDataObject["nutrition[fat]"]) || 0,
      satFat: parseInt(formDataObject["nutrition[satFat]"]) || 0,
      carbohydrates: parseInt(formDataObject["nutrition[carbohydrates]"]) || 0,
      sugar: parseInt(formDataObject["nutrition[sugar]"]) || 0,
      fiber: parseInt(formDataObject["nutrition[fiber]"]) || 0,
      protein: parseInt(formDataObject["nutrition[protein]"]) || 0,
      cholesterol: parseInt(formDataObject["nutrition[cholesterol]"]) || 0,
      sodium: parseInt(formDataObject["nutrition[sodium]"]) || 0,
    };
    delete formDataObject["nutrition[energy]"];
    delete formDataObject["nutrition[calories]"];
    delete formDataObject["nutrition[fat]"];
    delete formDataObject["nutrition[satFat]"];
    delete formDataObject["nutrition[carbohydrates]"];
    delete formDataObject["nutrition[sugar]"];
    delete formDataObject["nutrition[fiber]"];
    delete formDataObject["nutrition[protein]"];
    delete formDataObject["nutrition[cholesterol]"];
    delete formDataObject["nutrition[sodium]"];
    formDataObject.nutrition = nutrition;
    console.log("Submitting form data:", formDataObject);
    try {
      const response = await fetch("/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      });

      if (response.ok) {
        const newMeal = await response.json();
        const newRow = productTableBody.insertRow();
        newRow.innerHTML = `
                    <td><img src="${newMeal.image}" alt="${newMeal.name}"></td>
                    <td>${newMeal.name}</td>
                    <td>${newMeal.description}</td>
                    <td>${newMeal.cookTime} min</td>
                    <td>${newMeal.difficulty}</td>
                    <td>
                        <button class="edit-button" onclick="openEditModal('${newMeal._id}', '${newMeal.name}', '${newMeal.description}', '${newMeal.cookTime}', '${newMeal.difficulty}', '${newMeal.image}')">
                            <i class="fas fa-pen"></i>
                        </button>
                        <form action="/products/delete/${newMeal._id}" method="POST" style="display:inline;">
                            <button type="submit" class="delete-button"><i class="fas fa-trash"></i></button>
                        </form>
                    </td>
                `;
        form.reset();
        modal.style.display = "none";
        location.reload();
      } else {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Client error:", error);
      alert("Error adding meal");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("aside .sidebar a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      navLinks.forEach((link) => link.classList.remove("active"));
      e.currentTarget.classList.add("active");
      localStorage.setItem("activeNavLink", e.currentTarget.id);
    });
  });
});
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

document.querySelectorAll(".edit-button").forEach((button) => {
  button.addEventListener("click", function () {
    const mealId = this.getAttribute("data-id");
    const nutrition = JSON.parse(this.getAttribute("data-nutrition"));
    document.getElementById("edit_mealId").value = mealId;
    document.getElementById("edit_name").value = this.getAttribute("data-name");
    document.getElementById("edit_image").value =
      this.getAttribute("data-image");
    document.getElementById("edit_cookTime").value =
      this.getAttribute("data-cooktime");
    document.getElementById("edit_difficulty").value =
      this.getAttribute("data-difficulty");
    document.getElementById("edit_description").value =
      this.getAttribute("data-description");
    document.getElementById("edit_tags").value = this.getAttribute("data-tags");
    document.getElementById("edit_preferences").value =
      this.getAttribute("data-preferences");
    document.getElementById("edit_ingredientsName").value = this.getAttribute(
      "data-ingredientsname"
    );
    document.getElementById("edit_ingPer2").value =
      this.getAttribute("data-ingper2");
    document.getElementById("edit_ingPer4").value =
      this.getAttribute("data-ingper4");
    document.getElementById("edit_instructions").value =
      this.getAttribute("data-instructions");
    document.getElementById("edit_allergens").value =
      this.getAttribute("data-allergens");
    document.getElementById("edit_utensils").value =
      this.getAttribute("data-utensils");
    document.getElementById("edit_nutrition_energy").value = nutrition.energy;
    document.getElementById("edit_nutrition_calories").value =
      nutrition.calories;
    document.getElementById("edit_nutrition_fat").value = nutrition.fat;
    document.getElementById("edit_nutrition_satFat").value = nutrition.satFat;
    document.getElementById("edit_nutrition_carbohydrates").value =
      nutrition.carbohydrates;
    document.getElementById("edit_nutrition_sugar").value = nutrition.sugar;
    document.getElementById("edit_nutrition_fiber").value = nutrition.fiber;
    document.getElementById("edit_nutrition_protein").value = nutrition.protein;
    document.getElementById("edit_nutrition_cholesterol").value =
      nutrition.cholesterol;
    document.getElementById("edit_nutrition_sodium").value = nutrition.sodium;
    document.getElementById("edit_recommendations").value = this.getAttribute(
      "data-recommendations"
    );
    document.getElementById("editProductModal").style.display = "block";
  });
});

document
  .getElementById("editProductForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const mealId = document.getElementById("edit_mealId").value;
    const formData = new FormData(this);

    fetch(`/products/update/${mealId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update meal");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          location.reload();
        }
      })
      .catch(() => console.error("Error occurred during update"));
  });

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

//Meal deletion confirmation
let deleteMealId = "";
let deleteFormAction = "";
function openDeleteModal(mealID, mealName) {
  deleteMealId = mealID;
  deleteFormAction = `/products/delete/${mealID}`;
  document.getElementById("userNameToDelete").innerText = mealName;
  document.getElementById("deleteModal").style.display = "block";
}
document.getElementById("confirmDeleteForm").onsubmit = function (e) {
  e.preventDefault();
  this.action = deleteFormAction;
  this.submit();
};
