import Pokemon from './pokemon.js';
import * as productModule from './product.js';
import * as shoppingCartModule from './shopping_cart_script.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Load products and wait for them to finish loading
    await productModule.loadProducts(productsCatalogue);

    // Now that products are loaded, we can get the buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    console.log('Buttons found:', addToCartButtons); // Debug log
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            if (!productCard) return;
            
            const productId = parseInt(productCard.dataset.productId);
            if (!productId) return;

            fetch(productModule.api.baseURL)
                .then(response => response.json())
                .then(products => {
                    const product = products.find(p => p.id === productId);
                    if (product) {
                        shoppingCartModule.addToCart(product);
                    }
                })
                .catch(error => console.error('Error adding to cart:', error));
        });
    });
});