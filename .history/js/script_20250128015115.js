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

