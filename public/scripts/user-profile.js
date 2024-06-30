document.querySelectorAll('.editButton').forEach(button => {
  button.onclick = function() {
    const modalId = this.getAttribute('data-modal');
    document.getElementById(modalId).style.display = 'block';
  };
});

document.querySelectorAll('.close').forEach(span => {
  span.onclick = function() {
    const modalId = this.getAttribute('data-modal');
    document.getElementById(modalId).style.display = 'none';
  };
});

window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
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
