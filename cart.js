// Example cart data (replace with dynamic cart data)
const cart = [
    {
        id: 1,
        name: 'Product 1',
        price: 20.00,
        image: 'example-product.jpg'
    },
    {
        id: 2,
        name: 'Product 2',
        price: 15.00,
        image: 'example-product2.jpg'
    }
];

// Function to update the cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    document.getElementById('cart-total').textContent = `Total: $${total}`;
}

// Function to render cart items
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="Product Image">
                <div>
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
}

// Function to remove an item from the cart
function removeCartItem(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1); // Remove the item from the cart array
        renderCartItems();
        updateCartTotal();
    }
}

// Event listener for the "Remove" buttons
document.querySelector('.cart-items').addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('remove-item')) {
        const itemId = parseInt(e.target.getAttribute('data-id'));
        removeCartItem(itemId);
    }
});

// Event listener for the checkout button
document.getElementById('checkout-button').addEventListener('click', () => {
    alert('Proceeding to checkout!');
    // You can redirect to the checkout page or process the cart data here
});

// Initial rendering of the cart
renderCartItems();
updateCartTotal();
