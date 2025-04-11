import Pokemon from './pokemon.js';
import * as productModule from '../03.JS-Scripts/product.js';
import * as shoppingCartModule from '../03.JS-Scripts/shopping_cart_script.js';

// Definimos una variabale que apunta a "productsCatalogue" dónde se cargarán los productos en el index.html
export const productsCatalogue = document.getElementById("productsCatalogue");

document.addEventListener('DOMContentLoaded', () => {
    productModule.loadProducts(productsCatalogue);
});