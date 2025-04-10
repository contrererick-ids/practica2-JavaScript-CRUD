import * as prodcutModule from './product.js';

// Definimos una variable que apunta a "shoppingCartGrid" dónde se cargarán los productos del carrito de compras en el shoppingCart.html
const shoppingCartGrid = document.getElementById('shoppingCartGrid');

// Función para cargar el carrito de compras
async function loadShoppingCart() {
    // Obtenemos el carrito de compras del localStorage
    const shoppingCartLocalStorage = localStorage.getItem('shoppingCartLocalStorage');
    // Validamos primero si existe el carrito en localStorage
    if (!shoppingCartLocalStorage || JSON.parse(shoppingCartLocalStorage).length === 0) {
        shoppingCartGrid.innerHTML = `
        <div class="emptyCart">
            <h2 class="emptyCartTitle">No hay nada aquí aún.</h2>
            <h2>Encuéntrate con tu par ideal</h2>
            <button class="btn btn-primary back-to-catalogue-btn"><i class="bi bi-cart"></i></button>
        </div>
        `;
        return;
    }

    // Limpiamos el carrito de compras para asegurarnos que no se dupliquen los productos al cargar la página de nuevo
    shoppingCartGrid.innerHTML = '';

    // Convertimos el string en un objeto JSON para poder recorrerlo con el ciclo for
    shoppingCartLocalStorage = JSON.parse(shoppingCartLocalStorage);
    // Recorremos el carrito de compras
    for (const product of shoppingCartLocalStorage) {
        // Creamos un objeto Product con los datos del producto
        const cartItem = new cartItem(product);
        // Renderizamos el producto en el carrito de compras
        shoppingCartGrid.appendChild(cartItem.renderItem());
    }
}

// Exportamos la función loadShoppingCart para poder ser utilizada en otros archivos de la aplicación
export { loadShoppingCart };

// Función para añadir un producto al carrito de compras
function addToCart(product) {
    // Obtenemos el carrito de compras del localStorage
    const shoppingCartLocalStorage = localStorage.getItem('shoppingCartLocalStorage');
    // Si no existe el carrito en localStorage, lo creamos con un array vacío
    shoppingCartLocalStorage = shoppingCartLocalStorage ? JSON.parse(shoppingCartLocalStorage) : [];

    // Validamos primero si existe el carrito en localStorage
    if (!shoppingCartLocalStorage || JSON.parse(shoppingCartLocalStorage).length === 0) {
        shoppingCartLocalStorage = '[]';
    }

    shoppingCartLocalStorage = JSON.parse(shoppingCartLocalStorage);

    const existingProduct = shoppingCartLocalStorage.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;  
    } else {
        shoppingCartLocalStorage.push({product, quantity: 1});
    }

    localStorage.setItem('shoppingCartLocalStorage', JSON.stringify(shoppingCartLocalStorage));
    alert('Producto añadido al carrito');
}

export class cartItem {
    constructor({ id, name, image, description, price, quantity }) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
    } 

    renderItem() {
        const cartItem = document.createElement('div');
        cartItem.classList.add('container-fluid p-0 m-0','shoppingCartItems');

        cartItem.innerHTML = `
            <div class="row">
                <div class="col">
                    <img src="${this.image}" class="card-img-top" alt="${this.name}">
                </div>
                <div class="d-block">
                    <h5 class="card-title">${this.name}</h5>
                    <p class="card-text">${this.description}</p>
                    <p class="card-text">$${this.price}</p>
                    <p class="card-text">Cantidad: ${this.quantity}</p>
                    <button class="btn btn-primary" onclick="removeFromCart(${this.id})">Eliminar</button>
                </div>
            </div>
        `;

        return cartItem;
    }
}

// Esperamos a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    if (shoppingCartGrid) {
        loadShoppingCart();
    } else {
        console.error('Shopping cart grid element not found');
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