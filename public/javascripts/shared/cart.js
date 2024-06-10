export function addToCart(productId) {
    fetch(`/products/add-to-cart/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Log the response to the console
        alert(data); // Optionally alert the user
        // Optionally, update the UI here (e.g., show a message or update the cart icon)
    })
    .catch(error => console.error('Error:', error));
}

// ## NOT DONE
export function removeFromCart(productId) {
    fetch(`/cart/remove-from-cart/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert(data)
        window.location.href = '/cart';
    })
    .catch(error => console.error('Error:', error));
}
