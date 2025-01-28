let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items-container');
  const totalPriceElement = document.getElementById('total-price');

  // Function to display cart items
  function displayCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>$${item.price.toFixed(2)}</p>
          <input type="number" value="${item.quantity}" min="1" class="item-quantity" data-id="${item.id}">
          <button class="remove-item" data-id="${item.id}">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
      total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);
  }

  // Event listener for changing quantity
  cartItemsContainer.addEventListener('input', event => {
    if (event.target.classList.contains('item-quantity')) {
      const id = parseInt(event.target.dataset.id);
      const newQuantity = parseInt(event.target.value);
      const item = cart.find(item => item.id === id);
      if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
      }
    }
  });

  // Event listener for removing items from the cart
  cartItemsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('remove-item')) {
      const id = parseInt(event.target.dataset.id);
      cart = cart.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart();
    }
  });

  // Display the cart when page loads
  displayCart();
});

let products = []; // Load from products.json
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load cart from localStorage
function loadCart() {
    const cartContainer = document.querySelector('.cart-container');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Quantity: 
                <input type="number" value="${item.quantity}" onchange="updateCart(${product.id}, this.value)">
            </p>
            <button onclick="removeFromCart(${product.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Update cart item quantity
function updateCart(productId, quantity) {
    cart = cart.map(item =>
        item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
    );
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

loadCart();
