// Product Search and Filter
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const categoryFilter = document.getElementById('category-filter');
const productGrid = document.querySelector('.products-grid');

// Example Product Data (to be replaced with real product fetching logic)
const products = [
  { name: "Men's Casual Shirt", category: "men", price: "$25" },
  { name: "Women's Summer Dress", category: "women", price: "$30" },
  { name: "Men's Leather Jacket", category: "men", price: "$75" },
  { name: "Women's Handbag", category: "accessories", price: "$50" }
];

// Check if the user is logged in
window.onload = function() {
  const userProfile = document.getElementById('user-profile');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    userProfile.innerHTML = `
      <span>Welcome, ${currentUser.username}</span>
      <a href="logout.html">Logout</a>
    `;
  } else {
    userProfile.innerHTML = `<a href="login.html">Login</a>`;
  }
};


// Render Products
function displayProducts(filteredProducts) {
  productGrid.innerHTML = ''; // Clear existing products
  if (filteredProducts.length === 0) {
    productGrid.innerHTML = '<p>No products found.</p>';
    return;
  }
  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: ${product.price}</p>
    `;
    productGrid.appendChild(productCard);
  });
}

// Initial Display
displayProducts(products);

// Handle Search
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
});

// Handle Category Filter
categoryFilter.addEventListener('change', () => {
  const selectedCategory = categoryFilter.value;
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);
  displayProducts(filteredProducts);
});
