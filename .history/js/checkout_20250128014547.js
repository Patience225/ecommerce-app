document.addEventListener('DOMContentLoaded', () => {
  const checkoutForm = document.getElementById('checkout-form');

  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Save order to local storage (or could be saved to a server in real apps)
    const orderDetails = {
      name,
      email,
      address,
      paymentMethod,
      cart: JSON.parse(localStorage.getItem('cart')),
    };

    localStorage.setItem('order', JSON.stringify(orderDetails));

    // Clear the cart
    localStorage.removeItem('cart');

    // Redirect to thank you page
    window.location.href = 'thankyou.html';
  });
});
