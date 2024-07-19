function printWarning(elementID, message) {
  document.getElementById(elementID).innerHTML = message;
}

function showBox() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";

  const feedbackContent = document.getElementById("feedbackContent");
  feedbackContent.style.display = "block";
  feedbackContent.style.zIndex = "1000";
}

function showTextArea(event) {
  const feedbackForm = document.getElementById("feedback");
  feedbackForm.style.display = "block";
  const buttons = document.querySelectorAll(".choice");
  buttons.forEach((button) => {
    button.classList.remove("selected");
  });
  event.target.classList.add("selected");
}
function exitFeedback() {
  const feedbackContent = document.getElementById("feedbackContent");
  feedbackContent.style.display = "none";

  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
}
function showFeedbackForm() {
  const feedbackForm = document.getElementById("feedback");
  feedbackForm.style.display =
    feedbackForm.style.display === "none" ? "block" : "none";
}
function feedbackInput(form) {
  var review = form.review.value.trim();
  var reviewErr = document.getElementById("reviewErr");

  if (review === "") {
    printWarning("reviewErr", "Please enter your opinion before submitting");
    return false;
  } else {
    var regEx = /^[a-zA-Z0-9\s\-_,.!?()'"$@]+$/;
    if (!regEx.test(review)) {
      printWarning(
        "reviewErr",
        "Please enter a valid review (letters, numbers, and spaces only)"
      );
      return false;
    } else {
      printWarning("reviewErr", "");

      fetch('/feedback/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ feedback: review })
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          printWarning("reviewErr", data.message);
        } else {
          alert("Feedback submitted successfully!");
          form.review.value = "";
          exitFeedback();
        }
      })
      .catch(error => {
        printWarning("reviewErr", "An error occurred while submitting your feedback.");
      });

      return false;
    }
  }
}