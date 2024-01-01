function attachRemoveItemEventListeners() {
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeItem);
  });
}

function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) || {};
}

function renderCartItems() {
  const cartItems = getCartItems();
  const cartContainer = document.getElementById("cart-items");

  cartContainer.innerHTML = "";

  let totalPrice = 0;

  Object.keys(cartItems).forEach((itemId) => {
    const item = cartItems[itemId];
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
            <p>${item.name} - €${item.price} x ${item.quantity}</p>
            <button class="remove-item" data-itemid="${itemId}">Remove</button>
        `;
    cartContainer.appendChild(itemElement);

    totalPrice += item.price * item.quantity;
  });

  const totalElement = document.createElement("div");
  totalElement.innerHTML = `<strong>Total: €${totalPrice.toFixed(2)}</strong>`;
  cartContainer.appendChild(totalElement);

  attachRemoveItemEventListeners();
}

function removeItem(event) {
  event.preventDefault();

  let itemId = event.target.getAttribute("data-itemid");
  let cartItems = getCartItems();

  if (cartItems[itemId]) {
    decreaseCartCount(1);

    if (cartItems[itemId].quantity > 1) {
      cartItems[itemId].quantity--;
    } else {
      delete cartItems[itemId];
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));

    renderCartItems();
  }
}

function decreaseCartCount(quantity) {
  let total = parseInt(localStorage.getItem("checkout") || "0");
  total -= quantity;
  localStorage.setItem("checkout", total);
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", renderCartItems);
