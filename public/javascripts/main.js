import { initializeOwlCarousel } from './shared/owlCarousel.js';
import * as cartFunctions from './shared/cart.js';

// Setting up for Owl
initializeOwlCarousel();

// Cart
document.querySelectorAll('.addToCartButton').forEach(button => {
  button.addEventListener('click', function() {
      const productId = this.dataset.productId; // Get product ID from data attribute
      cartFunctions.addToCart(productId);
  });
});

document.querySelectorAll('.removeFromCartButton').forEach(button => {
  button.addEventListener('click', function() {
      const productId = this.dataset.productId; // Get product ID from data attribute
      cartFunctions.removeFromCart(productId);
  });
});