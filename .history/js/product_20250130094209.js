// Sample product data
const productData = {
    title: "Trendy Men's Jacket",
    description: "Stylish and comfortable jacket for any occasion.",
    price: "$59.99",
    image: "assets/images/sample-product.jpg"
  };
  
  // Function to display product details dynamically
  function displayProductDetails() {
    document.getElementById('product-title').textContent = productData.title;
    document.getElementById('product-description').textContent = productData.description;
    document.getElementById('product-price').textContent = productData.price;
    document.querySelector('.product-image img').src = productData.image;
  }
  
  // Call the function when the page loads
  window.onload = displayProductDetails;
  