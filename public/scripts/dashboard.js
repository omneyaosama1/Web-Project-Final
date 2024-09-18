document.addEventListener("DOMContentLoaded", (event) => {
  // Menu Chart
  const menuCtx = document.getElementById("menuChart").getContext("2d");
  const menuChart = new Chart(menuCtx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [325, 75],
          backgroundColor: ["#FF6384", "#EEEEEE"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      cutoutPercentage: 80,
      rotation: -Math.PI / 2,
      tooltips: { enabled: false },
      hover: { mode: null },
      animation: {
        animateRotate: true,
        duration: 2000,
      },
    },
  });

  // Revenue Chart
  const revenueCtx = document.getElementById("revenueChart").getContext("2d");
  const revenueChart = new Chart(revenueCtx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [425, 75],
          backgroundColor: ["#36A2EB", "#EEEEEE"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      cutoutPercentage: 80,
      rotation: -Math.PI / 2,
      tooltips: { enabled: false },
      hover: { mode: null },
      animation: {
        animateRotate: true,
        duration: 2000,
      },
    },
  });

  // Orders Chart
  const ordersCtx = document.getElementById("ordersChart").getContext("2d");
  const ordersChart = new Chart(ordersCtx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [415, 85],
          backgroundColor: ["#FFCE56", "#EEEEEE"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      cutoutPercentage: 80,
      rotation: -Math.PI / 2,
      tooltips: { enabled: false },
      hover: { mode: null },
      animation: {
        animateRotate: true,
        duration: 2000,
      },
    },
  });

  // Customers Chart
  const customersCtx = document
    .getElementById("customersChart")
    .getContext("2d");
  const customersChart = new Chart(customersCtx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [985, 15],
          backgroundColor: ["#4BC0C0", "#EEEEEE"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      cutoutPercentage: 80,
      rotation: -Math.PI / 2,
      tooltips: { enabled: false },
      hover: { mode: null },
      animation: {
        animateRotate: true,
        duration: 2000,
      },
    },
  });

  // Daily Revenue Chart
  const dailyRevenueCtx = document
    .getElementById("dailyRevenueChart")
    .getContext("2d");
  const dailyRevenueChart = new Chart(dailyRevenueCtx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Daily Revenue",
          data: [120, 150, 180, 200, 170, 190, 220],
          fill: true,
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderWidth: 2,
          pointBackgroundColor: "#36A2EB",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#36A2EB",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return "$" + tooltipItem.yLabel + "K";
          },
        },
      },
    },
  });
});

var addUserModal = document.getElementById("addUserModal");
var editUserModal = document.getElementById("editUserModal");

// Get the button that opens the add user modal
var addUserBtn = document.getElementById("addUserBtn");

// When the user clicks the button, open the add user modal
addUserBtn.onclick = function () {
  addUserModal.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == addUserModal) {
    addUserModal.style.display = "none";
  }
  if (event.target == editUserModal) {
    editUserModal.style.display = "none";
  }
};

var addUserForm = document.querySelector("#addUserForm");
var errorMessageDiv = document.createElement("div");
errorMessageDiv.id = "error-message";
addUserForm.prepend(errorMessageDiv);

addUserForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(addUserForm);
  const formDataObj = Object.fromEntries(formData.entries());
  errorMessageDiv.textContent = "";

  try {
    const response = await fetch("/usersAdmin/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    });
    const contentType = response.headers.get("content-type");
    let result;
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      throw new Error("Server returned an unexpected response.");
    }

    if (!response.ok) {
      throw new Error(result.message || "Error adding user");
    }

    errorMessageDiv.textContent = "";
    closeModal("addUserModal");
    setTimeout(() => {
      location.reload();
    }, 300);
  } catch (error) {
    errorMessageDiv.textContent = error.message;
    errorMessageDiv.style.color = "red";
    errorMessageDiv.style.padding="0px 400px";
  }
});

// Function to open the edit user modal and populate the form
function openEditModal(
  id,
  name,
  email,
  userType
  // password,
  // address,
  // phoneNumber,
  // birthdate
) {
  document.getElementById("editUserId").value = id;
  document.getElementById("editName").value = name;
  document.getElementById("editEmail").value = email;
  document.getElementById("editUserType").value = userType;
  // document.getElementById("editPassword").value = password;
  // document.getElementById("editAddress").value = address;
  // document.getElementById("editPhoneNumber").value = phoneNumber;
  // document.getElementById("editBirthdate").value = birthdate;

  editUserModal.style.display = "block";
}

// Function to close the modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  var searchInput = document.querySelector('input[placeholder="Search..."]');
  var userRows = document.querySelectorAll("tbody tr");

  searchInput.addEventListener("input", function () {
    var searchTerm = searchInput.value.toLowerCase();

    userRows.forEach(function (row) {
      var userName = row
        .querySelector("td:nth-child(1)")
        .textContent.toLowerCase();
      if (userName.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});

//User deletion confirmation
let deleteUserId = "";
let deleteFormAction = "";
function openDeleteModal(userId, userName) {
  deleteUserId = userId;
  deleteFormAction = `/usersAdmin/delete/${userId}`;
  document.getElementById("userNameToDelete").innerText = userName;
  document.getElementById("deleteModal").style.display = "block";
}
document.getElementById("confirmDeleteForm").onsubmit = function (e) {
  e.preventDefault();
  this.action = deleteFormAction;
  this.submit();
};
