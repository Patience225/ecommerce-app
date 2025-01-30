// Sample cart data (to be replaced with persistent storage later)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');

function renderCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="cart-quantity">
      </td>
      <td>$${itemTotal.toFixed(2)}</td>
      <td><button data-index="${index}" class="remove-btn">Remove</button></td>
    `;
    cartItemsContainer.appendChild(row);
  });

  cartTotalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

function updateCartStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

cartItemsContainer.addEventListener('change', (event) => {
  if (event.target.classList.contains('cart-quantity')) {
    const index = event.target.dataset.index;
    cart[index].quantity = parseInt(event.target.value);
    updateCartStorage();
    renderCart();
  }
});

cartItemsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-btn')) {
    const index = event.target.dataset.index;
    cart.splice(index, 1);
    updateCartStorage();
    renderCart();
  }
});

document.getElementById('checkout-button').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty. Add items before proceeding to checkout.');
  } else {
    window.location.href = 'checkout.html';
  }
});

renderCart();
