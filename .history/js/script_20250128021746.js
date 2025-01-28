document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('product-grid');

  // Fetch products from JSON file
  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        // Create product card
        const productCard = document.createElement('div');
        productCard.classList.add('product');

        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
        `;

        productGrid.appendChild(productCard);
      });
    })
    .catch(error => console.error('Error loading products:', error));
});

// Toggle Dark Mode
const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
  displayProducts(filteredProducts);
});


// Initialize cart in local storage if not present
if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify([]));
}

document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = parseInt(event.target.dataset.id);
      const productName = event.target.dataset.name;
      const productPrice = parseFloat(event.target.dataset.price);
      const productImage = event.target.dataset.image;

      let cart = JSON.parse(localStorage.getItem('cart'));
      const productInCart = cart.find(item => item.id === productId);

      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartIcon();
    });
  });

  // Update cart icon and items
  function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
  }

  updateCartIcon();
});
