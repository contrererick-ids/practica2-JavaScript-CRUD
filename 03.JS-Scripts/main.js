import Pokemon from './pokemon.js';
import * as productModule from './product.js';

// Llamamos a la función loadProducts() cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    try {
        productModule.loadProducts();
    } catch (error) {
        console.error('Error loading products:', error);
    }
});