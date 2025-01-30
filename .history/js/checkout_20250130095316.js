// js/checkout.js

document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const paymentMethod = document.getElementById('payment-method').value;

  if (!name || !email || !address || !paymentMethod) {
    alert('Please fill in all fields before completing your purchase.');
    return;
  }

  // Process the checkout
  alert(`Thank you for your purchase, ${name}! Your order has been successfully placed.`);
  window.location.href = "index.html"; // Redirect to homepage after checkout
});
