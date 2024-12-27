// Function to update cart count in the navigation
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = cart.length;
    document.getElementById("cart-count").textContent = cartCount;
}

// Function to add a product to the cart
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product is already in cart
    let productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        // If the product is already in the cart, increase the quantity
        cart[productIndex].quantity += 1;
    } else {
        // If it's a new product, add it to the cart
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1
        });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Function to load the cart items on the cart page
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsDiv = document.getElementById("cart-items");
    let cartTotal = 0;

    // Clear the previous cart items
    cartItemsDiv.innerHTML = "";

    // Loop through the cart and display each item
    cart.forEach(item => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <p>${item.name}</p>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
        `;

        cartItemsDiv.appendChild(itemDiv);

        cartTotal += item.price * item.quantity;
    });

    // Update total price
    document.getElementById("cart-total").textContent = cartTotal.toFixed(2);
}

// Event listener for the "Add to Cart" buttons on product pages
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        let productId = button.getAttribute("data-product-id");
        let productName = button.getAttribute("data-product-name");
        let productPrice = button.getAttribute("data-product-price");

        addToCart(productId, productName, productPrice);
    });
});

// Load the cart when the cart page is opened
if (window.location.pathname.includes("cart.html")) {
    loadCart();
}
