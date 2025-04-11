import Pokemon from './pokemon.js';
import * as productModule from './03.JS-Scripts/product.js';
import { addToCart } from './03.JS-Scripts/shopping_cart_script.js';

document.addEventListener('DOMContentLoaded', () => {
    productModule.loadProducts();

    // Agregar event listeners a los botones de "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    console.log(addToCartButtons); // Agrega esta línea para verificar si se están obteniendo los botones correctamente
    
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
                        addToCart(product);
                    }
                })
                .catch(error => console.error('Error al agregar al carrito:', error));
        });
    });
});