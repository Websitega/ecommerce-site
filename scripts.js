// Update Cart Count
function updateCartCount() {
    const cartCount = localStorage.getItem('cartCount') || 0; // Get current cart count from localStorage
    document.getElementById('cart-count').textContent = cartCount; // Update cart count display
}

// Function to handle adding products to the cart
function addToCart(productId) {
    let cartCount = parseInt(localStorage.getItem('cartCount') || 0); // Get current cart count from localStorage
    cartCount++; // Increment cart count
    localStorage.setItem('cartCount', cartCount); // Save new count in localStorage
    alert(`Product ${productId} added to cart!`);
    updateCartCount(); // Update cart count on page
}

// Call updateCartCount when the page loads to initialize cart count
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Update cart count on page load

    // Event listeners for "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-product-id');
            addToCart(productId); // Add to cart functionality
        });
    });
});
