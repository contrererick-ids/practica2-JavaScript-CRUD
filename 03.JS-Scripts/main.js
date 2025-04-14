import Pokemon from './pokemon.js';
import * as productModule from './product.js';
import * as shoppingCartModule from './shopping_cart_script.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productsCatalogue = document.getElementById('productsCatalogue');
    if (!productsCatalogue) return;

    // Esperamos a que productModule.loadProducts() se complete
    await productModule.loadProducts(productsCatalogue);

    // Agregamos los event listeners a los botones
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    console.log('Buttons found:', addToCartButtons.length);
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            try {
                const productCard = event.target.closest('.product-card');
                if (!productCard) return;
                
                const productId = parseInt(productCard.dataset.productId);
                if (!productId) return;

                const response = await fetch(productModule.api.baseURL);
                const products = await response.json();
                const product = products.find(p => p.id === productId);
                
                if (product) {
                    shoppingCartModule.addToCart(product);
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        });
    });
});