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
                        <img src="${product.img_src}" alt="${
          product.img_alt
        }" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${product.product_name}</h5>
                            <p class="card-text">${product.desc}</p>
                            <p class="card-price">€${product.price.toFixed(
                              2
                            )}</p>
                            <p class="card-price-before">€${product.price_before.toFixed(
                              2
                            )}</p>
                            <button class="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                `;

        productListing.appendChild(productCard);
      });
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });
});
