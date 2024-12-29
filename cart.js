// cart.js

// Function to load cart items from localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Clear the cart display before adding items
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    // Loop through each item in the cart and display it
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="remove-item" data-product-id="${item.id}">Remove</button>
        `;

        cartItemsContainer.appendChild(itemElement);

        // Calculate the total price
        totalPrice += item.price * item.quantity;
    });

    // Update the total price in the cart
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to remove an item from the cart
function removeItemFromCart(event) {
    if (event.target.classList.contains('remove-item')) {
        const productId = event.target.getAttribute('data-product-id');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const updatedCart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        loadCart(); // Reload the cart after removing an item
    }
}

// Event listener to handle item removal
document.getElementById('cart-items').addEventListener('click', removeItemFromCart);

// Call loadCart when the page loads
window.addEventListener('load', loadCart);
