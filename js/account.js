const form = document.getElementById("loginForm");
const errorMessagesDiv = document.getElementById("errorMessages");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessagesDiv.innerHTML = "";
  const requiredFields = form.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    if (field.value.trim() === "") {
      const fieldName = field.getAttribute("loginEmail");
      const errorMessage = document.createElement("p");
      errorMessage.textContent = `${fieldEmail} is required.`;
      errorMessagesDiv.appendChild(errorMessage);
    }
  });
});
