document.querySelectorAll(".editButton").forEach((button) => {
    button.onclick = function () {
        const modalId = this.getAttribute("data-modal");
        document.getElementById(modalId).style.display = "block";
    };
});

document.querySelectorAll(".close").forEach((span) => {
    span.onclick = function () {
        const modalId = this.getAttribute("data-modal");
        document.getElementById(modalId).style.display = "none";
    };
});

window.onclick = function (event) {
    if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
    }
};

// password display
let passwordVisible = false;
function togglePassword() {
    const passwordDisplay = document.getElementById("passwordDisplay");
    const toggleButton = document.getElementById("toggleButton");

    if (passwordVisible) {
        passwordDisplay.textContent = "*".repeat(actualPassword.length);
        toggleButton.textContent = "Show";
    } else {
        passwordDisplay.textContent = actualPassword;
        toggleButton.textContent = "Hide";
    }

    passwordVisible = !passwordVisible;
}

const editUserForm = document.getElementById("editForm");

editUserForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (
        userName === "" ||
        email === "" ||
        phoneNumber === "" ||
        address === ""
    ) {
        alert("Editing form isn't complete");
    } else {
        editUser(userName, email, phoneNumber, address);
    }
});

function editUser(userName, email, phoneNumber, address) {
    $.ajax({
        url: "/user",
        type: "POST",
        data: {
            updateType: "UserCredentials",
            userName_inp: userName,
            email_inp: email,
            phoneNumber_inp: phoneNumber,
            address_inp: address,
        },
        success: function (response) {
            if (response.success) {
                document.getElementById("editPersonalModal").style.display =
                    "none";
                window.location.href = "/user";
            } else {
                alert("user didn't update successfuly " + response.message);
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
        },
    });
}

const editUserPasswordForm = document.getElementById("editPasswordForm");

editUserPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (
        currentPassword === "" ||
        newPassword === "" ||
        confirmPassword === ""
    ) {
        alert("edit password form isn't complete");
    } else {
        editUserPassword(currentPassword, newPassword, confirmPassword);
    }
});

function editUserPassword(currentPassword, newPassword, confirmPassword) {
    $.ajax({
        url: "/user",
        type: "POST",
        data: {
            updateType: "UserPassword",
            currentPassword_inp: currentPassword,
            newPassword_inp: newPassword,
            confirmPassword_inp: confirmPassword,
        },
        success: function (response) {
            if (response.success) {
                document.getElementById("editPasswordModal").style.display =
                    "none";
                window.location.href = "/user";
            } else {
                alert("user didn't update successfully");
            }
        },
        error: function (xhr, status, error) {
            alert("Error: " + error);
        },
    });
}
