document.getElementById('checkout-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const fullName = document.getElementById('full-name').value.trim();
  const address = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value.trim();
  const postalCode = document.getElementById('postal-code').value.trim();
  const paymentMethod = document.getElementById('payment-method').value;

  if (!fullName || !address || !city || !postalCode || !paymentMethod) {
    alert('Please fill out all required fields.');
    return;
  }

  alert(`Thank you, ${fullName}! Your order has been placed successfully.`);
  window.location.href = 'index.html'; // Redirect back to homepage
});
