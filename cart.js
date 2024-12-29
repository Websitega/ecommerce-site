// Function to render cart items
function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: <span class="quantity">${item.quantity}</span></p>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    updateCartTotal();
}

// Function to update the total price
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    document.getElementById('cart-total').textContent = `Total: $${total}`;
}

// Function to remove an item from the cart
function removeCartItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id); // Remove the item with the matching ID
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    renderCartItems(); // Re-render the cart
}

// Event listener for "Remove" buttons
document.querySelector('.cart-items').addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('remove-item')) {
        const itemId = parseInt(e.target.getAttribute('data-id'));
        removeCartItem(itemId);
    }
});

// Event listener for checkout
document.getElementById('checkout-button').addEventListener('click', () => {
    alert('Proceeding to checkout!');
    // Add checkout functionality here
});

// Initial rendering of cart items
renderCartItems();
