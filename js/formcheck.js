document.addEventListener("DOMContentLoaded", function () {
  const combinedForm = document.querySelector("#combined-form");

  function validateFormField(field, regex, errorMessage) {
    if (!regex.test(field.value)) {
      field.classList.add("error");
      alert(errorMessage);
      field.focus();
      return false;
    } else {
      field.classList.remove("error");
      return true;
    }
  }

  function validateForm() {
    const firstName = document.querySelector("#firstname");
    const lastName = document.querySelector("#lastname");
    const address = document.querySelector("#address");
    const cardNumber = document.querySelector("#cardNumber");
    const cardCvv = document.querySelector("#cardCvv");
    const expiryMonth = document.querySelector("#expiryMonth");
    const expiryYear = document.querySelector("#expiryYear");

    let valid = true;

    if (
      !validateFormField(
        firstName,
        /^[a-zA-Z]+$/,
        "Please enter a valid first name."
      )
    ) {
      valid = false;
    }
    if (
      !validateFormField(
        lastName,
        /^[a-zA-Z]+$/,
        "Please enter a valid last name."
      )
    ) {
      valid = false;
    }
    if (
      !validateFormField(
        address,
        /^[a-zA-Z0-9\s,.'-]+$/,
        "Please enter a valid address."
      )
    ) {
      valid = false;
    }

    if (!/^[0-9]{16}$/.test(cardNumber.value)) {
      alert("Please enter a valid 16-digit card number.");
      cardNumber.focus();
      valid = false;
    } else if (!/^[0-9]{3}$/.test(cardCvv.value)) {
      alert("Please enter a valid 3-digit CVV.");
      cardCvv.focus();
      valid = false;
    } else if (expiryMonth.value === "" || expiryYear.value === "") {
      alert("Please select the expiry month and year.");
      expiryMonth.focus();
      valid = false;
    }

    return valid;
  }

  function populateExpiryDateDropdowns() {
    const expiryMonthDropdown = document.getElementById("expiryMonth");
    const expiryYearDropdown = document.getElementById("expiryYear");

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const numberOfYears = 10;

    for (let yearOffset = 0; yearOffset < numberOfYears; yearOffset++) {
      const yearValue = currentYear + yearOffset;
      const yearOption = document.createElement("option");
      yearOption.value = yearValue;
      yearOption.textContent = yearValue;
      expiryYearDropdown.appendChild(yearOption);
    }

    for (let i = 1; i <= 12; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i < 10 ? "0" + i : i.toString();
      expiryMonthDropdown.appendChild(option);
    }
  }

  populateExpiryDateDropdowns();

  combinedForm.addEventListener("submit", function (event) {
    if (!validateForm()) {
      event.preventDefault();
    } else {
      localStorage.removeItem("cart");
      localStorage.setItem("checkout", "0");

      updateCartCount();

      clearCartDisplay();

      window.location.href = "index.html";

      event.preventDefault();
    }
  });

  function updateCartCount() {
    let cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = "0";
    }
  }

  function clearCartDisplay() {
    const cartItemsElement = document.getElementById("cart-items");
    if (cartItemsElement) {
      cartItemsElement.innerHTML = "";
    }
  }
});
