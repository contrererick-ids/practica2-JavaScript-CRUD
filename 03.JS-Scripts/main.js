import Pokemon from './pokemon.js';
import * as productModule from './product.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        productModule.loadProducts();
    } catch (error) {
        console.error('Error loading products:', error);
    }
});