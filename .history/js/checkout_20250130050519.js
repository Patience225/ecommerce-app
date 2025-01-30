document.addEventListener("DOMContentLoaded", function () {
  displayCartItems();
  document.getElementById("checkoutForm").addEventListener("submit", processCheckout);
});

function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartItems");
  const totalAmount = document.getElementById("totalAmount");
  let total = 0;

  cartContainer.innerHTML = "";
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <p>${item.name} - $${item.price} x ${item.quantity}</p>
    `;
    cartContainer.appendChild(cartItem);
    total += item.price * item.quantity;
  });
  totalAmount.textContent = `Total: $${total.toFixed(2)}`;
}

function processCheckout(event) {
  event.preventDefault();
  
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

  if (!name || !address || !paymentMethod) {
    alert("Please fill in all required fields.");
    return;
  }

  localStorage.removeItem("cart");
  alert("Order placed successfully!");
  window.location.href = "thankyou.html";
}
