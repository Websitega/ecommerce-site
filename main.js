document.addEventListener('DOMContentLoaded', function () {
    // Function to update the cart count
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        document.getElementById('cart-count').textContent = cart.length;
    }

    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.dataset.productId;
            const productName = this.dataset.productName;
            const productPrice = this.dataset.productPrice;
            
            // Create product object
            const product = {
                id: productId,
                name: productName,
                price: productPrice
            };

            // Get the cart from localStorage (or initialize it if it's empty)
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Add the product to the cart array
            cart.push(product);

            // Save the updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update cart count
            updateCartCount();
        });
    });

    // Update cart count on page load
    updateCartCount();
});
