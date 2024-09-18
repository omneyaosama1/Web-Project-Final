document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");

  // Check the query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const formType = urlParams.get("form");

  if (formType === "login") {
    container.classList.remove("active");
  } else {
    container.classList.add("active");
  }
});

const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const signUpForm = document.getElementById("sign-up-form");
const signInForm = document.getElementById("sign-in-form");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const closeButton = document.querySelector(".close-button");
const forgotPasswordLink = document.getElementById("forgot-password");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById(
    "signup-confirm-password"
  ).value;
  const birthdate = document.getElementById("birthdate-input").value;


  const dateRegex = /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4})$/;
  if (!dateRegex.test(birthdate)) {
    showModal("Please enter a valid birthdate in DD/MM/YYYY format");
    return;
  }


  const [day, month, year] = birthdate.split("/");
  const birthdateObj = new Date(`${year}-${month}-${day}`);
  const age = calculateAge(birthdateObj);

  if (age < 18) {
    showModal("You must be at least 18 years old to sign up.");
    return;
  }


  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    showModal("All fields are required");
  } else if (!validateEmail(email)) {
    showModal("Please enter a valid email");
  } else if (password !== confirmPassword) {
    showModal("Passwords do not match");
  } else {
    signup(username, email, password, birthdate);
  }
});

function calculateAge(birthdate) {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDifference = today.getMonth() - birthdate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }
  return age;
}

function signup(username, email, password, birthdate) {
  const formType = "Signup";
  $.ajax({
    url: "/login-signup",
    type: "POST",
    data: {
      username_inp: username,
      pass_inp: password,
      email_inp: email,
      birthdate_inp: birthdate,
      form_type_inp: formType,
    },
    success: function (response) {
      if (response.success) {
        window.location.href = "/";
      } else {
        showModal("Signup failed: " + response.message);
      }
    },
    error: function (xhr, status, error) {
      showModal("Signup failed: " + xhr.responseText);
    },
  });
}

signInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (email === "" || password === "") {
    showModal("All fields are required");
  } else if (!validateEmail(email)) {
    showModal("Please enter a valid email");
  } else {
    login(email, password);
  }
});

function login(email, password) {
  const formType = "Login";
  $.ajax({
    url: "/login-signup",
    type: "POST",
    data: {
      email_inp: email,
      pass_inp: password,
      form_type_inp: formType,
    },
    success: function (response) {
      if (response.success) {
        if (response.user.userType === "Admin") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/";
        }
      } else {
        showModal("Wrong password");
      }
    },
    error: function (xhr, status, error) {
      showModal("Login failed: " + xhr.responseText);
    },
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = "block";
}

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

forgotPasswordLink.addEventListener("mouseenter", () => {
  forgotPasswordLink.style.color = "#f19f13";
});

forgotPasswordLink.addEventListener("mouseleave", () => {
  forgotPasswordLink.style.color = "#333";
});
