// Function to update the cart view
function updateCart() {
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

    // Update total price
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Function to handle item removal from the cart
function removeItemFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item from the array
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCart(); // Re-render the cart
}

// Event listener for remove buttons
document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('remove-item')) {
        let index = e.target.getAttribute('data-index');
        removeItemFromCart(index);
    }
});

// Function to handle adding item to the cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    let existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;  // Increase quantity if already exists
    } else {
        cart.push({...product, quantity: 1});  // Add new product to cart
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart in localStorage
    updateCart(); // Re-render the cart
}

// Example product object
let product = {
    id: 1,
    name: "Product Name",
    price: 10.00,
    image: "path_to_image.jpg"
};

// Call this function to add product to cart (usually triggered by a button click)
document.getElementById("add-to-cart-btn").addEventListener("click", function() {
    addToCart(product);  // Replace `product` with the actual product object when adding to cart
});

// On page load, update the cart display
window.addEventListener('load', updateCart);
