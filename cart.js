// Function to update the cart view
function updateCart() {
    // Get cart data from localStorage or initialize an empty array if no data
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let totalPrice = 0;

    // Clear the current cart view
    cartItemsContainer.innerHTML = '';

    // Loop through cart items and render them
    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        let cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" width="50" />
                <span>${item.name}</span> - $${item.price} x ${item.quantity}
            </div>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Update total price in the cart
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Function to handle item removal from the cart
function removeItemFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Remove item from cart using the index
    cart.splice(index, 1);
    
    // Update localStorage with the updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Re-render the cart after removal
    updateCart();
}

// Event listener for remove buttons (delegated to the document)
document.addEventListener('click', function (e) {
    // Check if the clicked element has the 'remove-item' class
    if (e.target && e.target.classList.contains('remove-item')) {
        // Get the index of the item to remove
        let index = e.target.getAttribute('data-index');
        
        // Call the remove function
        removeItemFromCart(index);
    }
});

// On page load, update the cart display
window.addEventListener('load', updateCart);
