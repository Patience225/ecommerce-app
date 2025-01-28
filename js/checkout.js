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

document.addEventListener('DOMContentLoaded', () => {
  const checkoutForm = document.getElementById('checkout-form');

  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    let isValid = true;

    // Form validation
    if (!name) {
      document.getElementById('name-error').textContent = "Full Name is required!";
      isValid = false;
    } else {
      document.getElementById('name-error').textContent = "";
    }

    if (!email || !validateEmail(email)) {
      document.getElementById('email-error').textContent = "Valid Email is required!";
      isValid = false;
    } else {
      document.getElementById('email-error').textContent = "";
    }

    if (!address) {
      document.getElementById('address-error').textContent = "Shipping Address is required!";
      isValid = false;
    } else {
      document.getElementById('address-error').textContent = "";
    }

    if (!paymentMethod) {
      document.getElementById('payment-error').textContent = "Please select a payment method!";
      isValid = false;
    } else {
      document.getElementById('payment-error').textContent = "";
    }

    if (isValid) {
      // Save order to local storage
      const orderDetails = {
        name,
        email,
        address,
        paymentMethod,
        cart: JSON.parse(localStorage.getItem('cart')),
      };
      localStorage.setItem('order', JSON.stringify(orderDetails));

      // Clear the cart and redirect to thank you page
      localStorage.removeItem('cart');
      window.location.href = 'thankyou.html';
    }
  });
});

// Email validation function
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}
