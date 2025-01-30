document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-list");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function loadProducts() {
      fetch("data/products.json")
          .then(response => response.json())
          .then(products => {
              productContainer.innerHTML = "";
              products.forEach(product => {
                  const productElement = document.createElement("div");
                  productElement.classList.add("product");
                  productElement.innerHTML = `
                      <img src="${product.image}" alt="${product.name}" class="product-image">
                      <h3>${product.name}</h3>
                      <p>$${product.price.toFixed(2)}</p>
                      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                  `;
                  productContainer.appendChild(productElement);
              });
          })
          .catch(error => console.error("Error loading products:", error));
  }

  productContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
          const productId = e.target.getAttribute("data-id");
          fetch("data/products.json")
              .then(response => response.json())
              .then(products => {
                  const product = products.find(p => p.id == productId);
                  if (product) {
                      const existingItem = cart.find(item => item.id == product.id);
                      if (existingItem) {
                          existingItem.quantity += 1;
                      } else {
                          product.quantity = 1;
                          cart.push(product);
                      }
                      localStorage.setItem("cart", JSON.stringify(cart));
                  }
              });
      }
  });

  loadProducts();
});
