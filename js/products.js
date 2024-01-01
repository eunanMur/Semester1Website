function updateCartCount() {
  let cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    let total = localStorage.getItem("checkout") || "0";
    cartCountElement.textContent = total;
  }
}


function addToCart(event) {
  event.preventDefault();

  let productId = event.target.getAttribute("data-productid");
  let cartItems = JSON.parse(localStorage.getItem("cart")) || {};

  if (cartItems[productId]) {
    cartItems[productId].quantity++;
  } else {
    cartItems[productId] = {
      quantity: 1,
      name: event.target.getAttribute("data-productname"),
      price: parseFloat(event.target.getAttribute("data-productprice")),
    };
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));

  let total = Object.values(cartItems).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  localStorage.setItem("checkout", total);

  updateCartCount();
}

function attachAddToCartEventListeners() {
  document.querySelectorAll(".addtocart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}


document.addEventListener("DOMContentLoaded", function () {
  const productListing = document.getElementById("product-listing");

  fetch("json/homepage.json")
    .then((response) => response.json())
    .then((jsonData) => {
      jsonData.products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("col-md-4", "mb-3");

        productCard.innerHTML = `
          <div class="card">
            <img src="${product.img_src}" alt="${product.img_alt}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${product.product_name}</h5>
              <p class="card-text">${product.desc}</p>
              <p class="card-price">€${product.price.toFixed(2)}</p>
              <p class="card-price-before">€${product.price_before.toFixed(2)}</p>
              <button class="btn btn-primary addtocart" 
                data-productid="${product.product_id}" 
                data-productname="${product.product_name}" 
                data-productprice="${product.price}">Add to Cart</button>
            </div>
          </div>
        `;

        productListing.appendChild(productCard);
      });
      attachAddToCartEventListeners();
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });

  updateCartCount();
});
