import * as prodcutModule from './03.JS-Scripts/product.js';

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
    let cartItems = JSON.parse(localStorage.getItem('shoppingCartLocalStorage') || '[]');
    
    const existingProduct = cartItems.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        // Asegurarnos de que el producto tenga todas las propiedades necesarias
        cartItems.push({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            description: product.description,
            quantity: 1
        });
    }
    
    localStorage.setItem('shoppingCartLocalStorage', JSON.stringify(cartItems));
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
    // Cargar el carrito si estamos en la página del carrito
    if (shoppingCartGrid) {
        loadShoppingCart();
    }

    // Agregar event listeners a los botones de "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            console.log('Click sobre el botón "Agregar al carrito"'); // Para debugging
            // Encontrar la tarjeta del producto más cercana al botón
            const productCard = event.target.closest('.product-card');
            console.log('Tarjeta del producto:', productCard); // Para debugging
            if (!productCard) {
                console.error('No se encontró la tarjeta del producto');
                return;
            }
            
            // Obtener el ID del producto
            const productId = parseInt(productCard.dataset.productId);
            console.log('ID del producto:', productId); // Para debugging
            if (!productId) {
                console.error('ID de producto no válido');
                return;
            }

            // Obtener los datos del producto desde la API
            fetch(prodcutModule.api.baseURL)
                .then(response => {
                    if (!response.ok) throw new Error('Error en la respuesta de la API');
                    return response.json();
                })
                .then(products => {
                    const product = products.find(p => p.id === productId);
                    if (product) {
                        addToCart(product);
                    } else {
                        throw new Error('Producto no encontrado');
                    }
                })
                .catch(error => {
                    console.error('Error al agregar al carrito:', error);
                    alert('No se pudo agregar el producto al carrito');
                });
        });
    });
});

export { addToCart };