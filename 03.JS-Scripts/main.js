import Pokemon from './pokemon.js';
import * as productModule from './product.js';

// Llamamos a la función loadProducts() cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    try {
        productModule.loadProducts();
    } catch (error) {
        console.error('Error loading products:', error);
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = event.target.closest('.product-card');
            const productId = parseInt(productCard.dataset.productId);
            
            fetch(prodcutModule.api.baseURL)
                .then(response => response.json())
                .then(products =>{
                    const product = products.find(product => product.id === productId);
                    if(product){
                        addToCart(product);
                    }
                })
        }); 
    })
});