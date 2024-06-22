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
  
      try {
        console.log("Submitting form data:", formDataObject); // Log the form data
  
        const response = await fetch("/api/meals", {
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
            <td>${newMeal.name}</td>
            <td>${newMeal.image}</td>
            <td>${newMeal.cookTime}</td>
            <td>${newMeal.difficulty}</td>
            <td>${newMeal.description}</td>
            <td>${newMeal.tags}</td>
            <td>${newMeal.preferences.join(", ")}</td>
            <td>${newMeal.ingredientsName.join(", ")}</td>
            <td>${newMeal.ingPer2.join(", ")}</td>
            <td>${newMeal.ingPer4.join(", ")}</td>
            <td>${newMeal.instructions.join(", ")}</td>
            <td>${newMeal.allergens.join(", ")}</td>
            <td>${newMeal.utensils.join(", ")}</td>
            <td>${newMeal.nutrition.energy}</td>
            <td>${newMeal.nutrition.calories}</td>
            <td>${newMeal.nutrition.fat}</td>
            <td>${newMeal.nutrition.satFat}</td>
            <td>${newMeal.nutrition.carbohydrates}</td>
            <td>${newMeal.nutrition.sugar}</td>
            <td>${newMeal.nutrition.fiber}</td>
            <td>${newMeal.nutrition.protein}</td>
            <td>${newMeal.nutrition.cholesterol}</td>
            <td>${newMeal.nutrition.sodium}</td>
            <td>${newMeal.recommendations.join(", ")}</td>
          `;
          form.reset();
          modal.style.display = "none";
        } else {
          const errorData = await response.json();
          console.error("Server error response:", errorData); // Log server error
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Client error:", error); // Log client error
        alert("Error adding meal");
      }
    });
  });
  document.getElementById('addProductBtn').addEventListener('click', function() {
    openModal('addProductModal');
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function openEditModal(id, name, description, cookTime, difficulty, image) {
    document.getElementById('editProductId').value = id;
    document.getElementById('editProductName').value = name;
    document.getElementById('editProductDescription').value = description;
    document.getElementById('editProductDuration').value = cookTime;
    document.getElementById('editProductDifficulty').value = difficulty;
    document.getElementById('editProductImage').value = image;
    openModal('editProductModal');
}