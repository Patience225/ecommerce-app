document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
      fetch("data/products.json")
          .then(response => response.json())
          .then(products => {
              const product = products.find(item => item.id == productId);
              if (product) {
                  displayProductDetails(product);
              } else {
                  console.error("Product not found");
              }
          })
          .catch(error => console.error("Error fetching product details:", error));
  }
});

function displayProductDetails(product) {
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;
  document.getElementById("add-to-cart").addEventListener("click", () => addToCart(product.id));
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find(item => item.id === productId);
  
  if (existingProduct) {
      existingProduct.quantity += 1;
  } else {
      fetch("data/products.json")
          .then(response => response.json())
          .then(products => {
              const product = products.find(item => item.id === productId);
              if (product) {
                  cart.push({ ...product, quantity: 1 });
                  localStorage.setItem("cart", JSON.stringify(cart));
                  alert("Product added to cart!");
              }
          });
  }
}
