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

// Filter products based on search query
function filterProducts(query) {
  const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
  );
  displayProducts(filteredProducts);
}

document.querySelector('#search-input').addEventListener('input', function () {
  filterProducts(this.value);
});

function addReview(productId, rating, comment) {
  const product = products.find(p => p.id === productId);
  if (!product.reviews) product.reviews = [];
  product.reviews.push({ rating, comment });

  localStorage.setItem('products', JSON.stringify(products));
  alert('Review added!');
}

let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function addToWishlist(productId) {
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert('Added to Wishlist!');
    } else {
        alert('Already in Wishlist');
    }
}

