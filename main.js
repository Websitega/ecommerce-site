// Simple cart functionality
let cart = [];

function addToCart(product) {
    cart.push(product);
    alert(`${product.name} has been added to your cart!`);
}

document.querySelectorAll('.product-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const product = {
            name: this.previousElementSibling.previousElementSibling.textContent,
            price: this.previousElementSibling.textContent
        };
        addToCart(product);
    });
});
