// js/cart.js

// Sample cart data
const cartItems = [
    {
      id: 1,
      title: "Men's Belted Overcoat",
      price: 199.99,
      image: "assets/images/mens-belted-overcoat.jpg",
      quantity: 1
    },
    {
      id: 2,
      title: "Women's Bubble Hem Dress",
      price: 149.99,
      image: "assets/images/womens-bubble-hem-dress.jpg",
      quantity: 2
    }
  ];
  
  // Function to display cart items
  function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
  
    cartItems.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
  
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <h2 class="cart-item-title">${item.title}</h2>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
      `;
  
      cartItemsContainer.appendChild(cartItemElement);
    });
  
    updateCartTotal();
  }
  
  // Function to update cart total
  function updateCartTotal() {
    const cartTotalElement = document.getElementById('cart-total');
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalElement.textContent = total.toFixed(2);
  }
  
  // Initialize cart display
  window.onload = displayCartItems;
  