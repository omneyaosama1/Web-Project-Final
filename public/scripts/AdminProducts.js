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

      // Log the form data for debugging
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
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('aside .sidebar a');

  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          // Remove active class from all links
          navLinks.forEach(link => link.classList.remove('active'));
          // Add active class to the clicked link
          e.currentTarget.classList.add('active');
          // Save the active link to local storage
          localStorage.setItem('activeNavLink', e.currentTarget.id);
      });
  });
});
