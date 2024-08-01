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
