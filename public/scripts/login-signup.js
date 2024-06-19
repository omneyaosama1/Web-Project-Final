document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    container.classList.add("active"); // Add "active" class by default
});

const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const signUpForm = document.getElementById("sign-up-form");
const signInForm = document.getElementById("sign-in-form");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const closeButton = document.querySelector(".close-button");
const favoriteColor = document.getElementById("favorite-color");
const favoriteColorLabel = document.getElementById("favorite-color-label");
const forgotPasswordLink = document.getElementById("forgot-password");

signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById(
        "signup-confirm-password"
    ).value;
    const birthdate = document.getElementById("birthdate-input").value;

    if (
        username === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === "" ||
        birthdate === ""
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


function signup(username, email, password, birthdate) {
    // fetch("/signup", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ username, email, password, birthdate })
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //     if (data.success) {
    //         showModal("Signup successful");
    //     } else {
    //         showModal(data.message);
    //     }
    // })
    // .catch((error) => {
    //     showModal("Error signing up");
    //     console.error("Error:", error);
    // });

    $.ajax({
        url: '/login-signup',
        type: 'POST',
        data: {
            username_inp: username, 
            pass_inp: password, 
            email_inp: email, 
            birthdate_inp: birthdate
        },
        success: function(response) {
            alert("kolo tmam"); // This will alert only if the request is successful
        },
        error: function(xhr, status, error) {
            alert("din omak"); // This will alert only if the request fails
        }
    });
    
}

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

favoriteColor.addEventListener("change", (event) => {
    favoriteColorLabel.textContent = event.target.value;
});

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
    forgotPasswordLink.style.color = "#333"; // Reset color on mouse leave
});

forgotPasswordLink.addEventListener("mousedown", (event) => {
    event.preventDefault();
    showModalWithDropdown();
});

function showModalWithDropdown() {
    const forgotPasswordModal = document.getElementById(
        "forgot-password-modal"
    );
    forgotPasswordModal.style.display = "block";

    const closeButton = forgotPasswordModal.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
        forgotPasswordModal.style.display = "none";
    });

    const confirmColorButton = document.getElementById("confirm-color");
    confirmColorButton.addEventListener("click", () => {
        const chosenColor = document.getElementById("chosen-color").value;
        const favoriteColorLabel = document.getElementById(
            "favorite-color-label"
        );
        favoriteColorLabel.textContent = chosenColor;
        forgotPasswordModal.style.display = "none";
    });
}

// Add an event listener to the confirm button
document.getElementById("confirm-button").addEventListener("click", () => {
    closeModal();
});

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

function login(email, password) {
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                showModal("Login successful");
            } else {
                showModal(data.message);
            }
        })
        .catch((error) => {
            showModal("Error logging in");
            console.error("Error:", error);
        });
}

