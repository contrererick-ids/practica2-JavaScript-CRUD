import * as prodcutModule from './product.js';

const shoppingCart = document.getElementById('shoppingCartItems');

// Función para cargar el carrito de compras
async function loadShoppingCart() {

    // Hacemos un request a la API
    try {
        const response = await fetch(prodcutModule.URL);
        const data = await response.json();
        // Validamos que el carrito de compras no esté vacío
        if (data.length === 0) {
            // Cambiar shoppingCartItems por shoppingCartGrid y si está vacío crear un div con el mensaje de que el carrito de compras está vacío
            shoppingCart.innerHTML = '<p>El carrito de compras está vacío</p>';
            return; 
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}