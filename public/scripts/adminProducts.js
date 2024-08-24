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

function openEditModal(
  id,
  name,
  image,
  cookTime,
  difficulty,
  description,
  tags,
  preferences,
  ingredientsName,
  ingPer2,
  ingPer4,
  instructions,
  allergens,
  utensils,
  nutrition_energy,
  nutrition_calories,
  nutrition_fat,
  nutrition_satFat,
  nutrition_carbohydrates,
  nutrition_sugar,
  nutrition_fiber,
  nutrition_protein,
  nutrition_cholesterol,
  nutrition_sodium,
  recommendations
) {
  document.getElementById("edit-id").value = id;
  document.getElementById("edit-name").value = name;
  document.getElementById("edit-image").value = image;
  document.getElementById("edit-cookTime").value = cookTime;
  document.getElementById("edit-difficulty").value = difficulty;
  document.getElementById("edit-description").value = description;
  document.getElementById("edit-tags").value = tags;
  document.getElementById("edit-preferences").value = preferences;
  document.getElementById("edit-ingredientsName").value = ingredientsName;
  document.getElementById("edit-ingPer2").value = ingPer2;
  document.getElementById("edit-ingPer4").value = ingPer4;
  document.getElementById("edit-instructions").value = instructions;
  document.getElementById("edit-allergens").value = allergens;
  document.getElementById("edit-utensils").value = utensils;
  document.getElementById("edit-nutrition-energy").value = nutrition_energy;
  document.getElementById("edit-nutrition-calories").value = nutrition_calories;
  document.getElementById("edit-nutrition-fat").value = nutrition_fat;
  document.getElementById("edit-nutrition-satFat").value = nutrition_satFat;
  document.getElementById("edit-nutrition-carbohydrates").value =
    nutrition_carbohydrates;
  document.getElementById("edit-nutrition-sugar").value = nutrition_sugar;
  document.getElementById("edit-nutrition-fiber").value = nutrition_fiber;
  document.getElementById("edit-nutrition-protein").value = nutrition_protein;
  document.getElementById("edit-nutrition-cholesterol").value =
    nutrition_cholesterol;
  document.getElementById("edit-nutrition-sodium").value = nutrition_sodium;
  document.getElementById("edit-recommendations").value = recommendations;

  editProductModal.style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}
// Handle Edit Product form submission
editForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(editForm);
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

  try {
    const response = await fetch("/products/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    });

    if (response.ok) {
      const updatedMeal = await response.json();
      const rows = productTableBody.getElementsByTagName("tr");
      for (let row of rows) {
        if (row.getAttribute("data-id") === updatedMeal._id) {
          row.innerHTML = `
              <td><img src="${updatedMeal.image}" alt="${updatedMeal.name}"></td>
              <td>${updatedMeal.name}</td>
              <td>${updatedMeal.description}</td>
              <td>${updatedMeal.cookTime} min</td>
              <td>${updatedMeal.difficulty}</td>
              <td>
                <button class="edit-button" onclick="openEditModal('${updatedMeal._id}', '${updatedMeal.name}', '${updatedMeal.image}', '${updatedMeal.cookTime}', '${updatedMeal.difficulty}', '${updatedMeal.description}', '${updatedMeal.tags}', '${updatedMeal.preferences}', '${updatedMeal.ingredientsName}', '${updatedMeal.ingPer2}', '${updatedMeal.ingPer4}', '${updatedMeal.instructions}', '${updatedMeal.allergens}', '${updatedMeal.utensils}', '${updatedMeal.nutrition.energy}', '${updatedMeal.nutrition.calories}', '${updatedMeal.nutrition.fat}', '${updatedMeal.nutrition.satFat}', '${updatedMeal.nutrition.carbohydrates}', '${updatedMeal.nutrition.sugar}', '${updatedMeal.nutrition.fiber}', '${updatedMeal.nutrition.protein}', '${updatedMeal.nutrition.cholesterol}', '${updatedMeal.nutrition.sodium}', '${updatedMeal.recommendations}')">
                  <i class="fas fa-pen"></i>
                </button>
                <form action="/products/delete/${updatedMeal._id}" method="POST" style="display:inline;">
                  <button type="submit" class="delete-button"><i class="fas fa-trash"></i></button>
                </form>
              </td>
            `;
          break;
        }
      }
      editForm.reset();
      editModal.style.display = "none";
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    alert("Error editing meal");
  }
});
