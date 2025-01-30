document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-button");

  function getCartItems() {
      return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCartItems(cartItems) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  function updateCartDisplay() {
      const cartItems = getCartItems();
      cartItemsContainer.innerHTML = "";
      let totalPrice = 0;

      if (cartItems.length === 0) {
          cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
          totalPriceElement.textContent = "$0.00";
          checkoutButton.disabled = true;
          return;
      }

      cartItems.forEach((item, index) => {
          const cartItem = document.createElement("div");
          cartItem.classList.add("cart-item");
          cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <div class="cart-item-details">
                  <p>${item.name}</p>
                  <p>Price: $${item.price.toFixed(2)}</p>
                  <p>Quantity: <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="cart-item-quantity"></p>
                  <button class="remove-item" data-index="${index}">Remove</button>
              </div>
          `;
          cartItemsContainer.appendChild(cartItem);
          totalPrice += item.price * item.quantity;
      });

      totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
      checkoutButton.disabled = false;
  }

  cartItemsContainer.addEventListener("input", (event) => {
      if (event.target.classList.contains("cart-item-quantity")) {
          const cartItems = getCartItems();
          const index = event.target.dataset.index;
          cartItems[index].quantity = parseInt(event.target.value);
          saveCartItems(cartItems);
          updateCartDisplay();
      }
  });

  cartItemsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
          const cartItems = getCartItems();
          const index = event.target.dataset.index;
          cartItems.splice(index, 1);
          saveCartItems(cartItems);
          updateCartDisplay();
      }
  });

  checkoutButton.addEventListener("click", () => {
      window.location.href = "checkout.html";
  });

  updateCartDisplay();
});
