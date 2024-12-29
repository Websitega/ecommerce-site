// Function to update the cart view
function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let totalPrice = 0;

    // Clear the current cart view
    cartItemsContainer.innerHTML = '';

    // If the cart is empty, show a message
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        // Loop through cart items and render them
        cart.forEach((item, index) => {
            totalPrice += item.price * item.quantity;

            let cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}" width="50" />
                    <span>${item.name}</span> - $${item.price.toFixed(2)} x ${item.quantity}
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    }

    // Update total price
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Function to handle item removal from the cart
function removeItemFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (index > -1 && index < cart.length) {
        cart.splice(index, 1); // Remove item from the array
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        updateCart(); // Re-render the cart
    }
}

// Event listener for remove buttons
document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('remove-item')) {
        let index = e.target.getAttribute('data-index');
        removeItemFromCart(Number(index)); // Make sure index is a number
    }
});

// On page load, update the cart display
window.addEventListener('load', updateCart);
