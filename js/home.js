window.updateCartCount = updateCartCount;

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

function renderProducts(products) {
  const container = document.querySelector(".product-row");
  container.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    if (products[i]) {
      const product = products[i];
      container.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="product-card">
                        <img class="product-image" src="${product.img_src}" alt="${product.img_alt}" />
                        <div class="product-details">
                            <h5 class="product-name">${product.product_name}</h5>
                            <p class="product-price">€${product.price}</p>
                            <p class="price-before">Was €${product.price_before}</p>
                            <a href="#" class="btn btn-primary addtocart" 
                                data-productid="${product.product_id}" 
                                data-productname="${product.product_name}" 
                                data-productprice="${product.price}">Add to Cart</a>
                        </div>
                    </div>
                </div>`;
    }
  }

  attachAddToCartEventListeners();
}


document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  fetch("json/homepage.json")
    .then((response) => response.json())
    .then((data) => renderProducts(data.products))
    .catch((error) => console.error("Error loading products:", error));
});
