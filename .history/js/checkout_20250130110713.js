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

window.onload = function() {
  // Retrieve cart items from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const orderSummary = document.getElementById('order-summary');

  if (cart.length === 0) {
    orderSummary.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let totalAmount = 0;
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('order-item');
    itemElement.innerHTML = `
      <p>${item.name} - $${item.price} x ${item.quantity}</p>
    `;
    orderSummary.appendChild(itemElement);
    totalAmount += item.price * item.quantity;
  });

  const totalElement = document.createElement('div');
  totalElement.classList.add('order-total');
  totalElement.innerHTML = `<p>Total: $${totalAmount}</p>`;
  orderSummary.appendChild(totalElement);
};
