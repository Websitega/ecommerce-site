// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart box (displayed in the UI)
function updateCart() {
    // Update cart count on the page
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;

    // Display cart items in the cart box
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

// Function to add item to the cart
function addToCart(productId, productName, productPrice) {
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex !== -1) {
        // If the product is already in the cart, update its quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If the product is not in the cart, add it
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1
        });
    }

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart UI
    updateCart();
}

// Event listener for add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId);
        const productName = e.target.dataset.productName;
        const productPrice = e.target.dataset.productPrice;

        // Add product to the cart
        addToCart(productId, productName, productPrice);
    });
});

// Initialize the cart UI when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});
