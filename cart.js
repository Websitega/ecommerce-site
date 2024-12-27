document.addEventListener('DOMContentLoaded', function () {
    // Get the cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Function to display the cart items
    function displayCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        let total = 0;
        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <h4>${item.name}</h4>
                <p>Price: $${item.price}</p>
            `;
            cartItemsContainer.appendChild(itemElement);
            
            total += parseFloat(item.price);
        });

        totalPriceElement.textContent = total.toFixed(2);
    }

    // Display the cart items on page load
    displayCartItems();
});
