// Function to render cart items
function renderCart() {
    // Get cart data from localStorage (or empty array if nothing is saved)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the cart container element where items will be displayed
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = ''; // Clear any previous items

    // If the cart is empty, display a message
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // Loop through the cart items and display them
    cart.forEach(item => {
        // Create a div element for each cart item
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');

        // Set the innerHTML for the cart item element
        cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <img src="path-to-image.jpg" alt="${item.name}" class="cart-item-img">
                <div>
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;

        // Append the cart item to the cart container
        cartContainer.appendChild(cartItemElement);
    });

    // Update cart total
    renderCartTotal();
}

// Function to render the total price of the cart
function renderCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalElement = document.querySelector('#cart-total');
    let total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to remove item from cart
function removeItemFromCart(productId) {
    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Filter out the item with the matching productId
    cart = cart.filter(item => item.id !== productId);
    
    // Store the updated cart back in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart after removing item
    renderCart();
}

// Add event listener for remove buttons
document.querySelector('.cart-items').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const productId = e.target.dataset.id;
        removeItemFromCart(productId);
    }
});

// Call the function to render cart items when the page loads
renderCart();
