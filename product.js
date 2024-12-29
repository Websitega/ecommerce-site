// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Function to add product to the cart
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = {
        id: productId,
        name: `Product ${productId}`,
        price: (productId * 10).toFixed(2), // Example: $19.99 for Product 1, $29.99 for Product 2, etc.
        image: 'https://via.placeholder.com/250',
        quantity: 1
    };

    // Check if product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
        // Update quantity if product is already in the cart
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new product to the cart
        cart.push(product);
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to your cart.`);
}

// Attach event listeners to "Add to Cart" buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        addToCart(productId);
    });
});
