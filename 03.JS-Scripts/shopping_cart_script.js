import * as productModule from '../03.JS-Scripts/product.js';

// Definimos la clase ShoppingCartItem que representa un producto en el carrito de compras
export class ShoppingCartItem {
    constructor({ id, name, image, description, price, quantity }) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
    } 

    // Método para renderizar el producto en el carrito de compras
    renderItem() {
        const cartItemContainer = document.createElement('div');
        cartItemContainer.classList.add('container-fluid', 'p-0', 'm-0', 'shoppingCartItem');

        cartItemContainer.innerHTML = `
            <div class="d-flex cart-item-banner">
                <div class="col-6 cart-item-img">
                    <img src="${this.image}" class="card-img-top" alt="${this.name}">
                </div>
                <div class="col-6 cart-item-body">
                    <div class="cart-item-header">
                        <h3 class="card-title">${this.name}</h3>
                    </div>
                    <div class="d-flex cart-item-info">
                        <div class="col-8 cart-item-description">
                            <p class="cart-item-text">${this.description}</p>
                        </div>
                        <div class="col-4 cart-item-subtotal">    
                            <p class="cart-item-text">$${this.price}</p>
                            <p class="cart-item-text">Cantidad: ${this.quantity}</p>
                            <p class="cart-item-text">Subtotal: ${this.price * this.quantity}</p>
                        </div>
                    </div>
                    <button class="btn btn-primary decrease-quantity" data-product-id="${this.id}">+</button>
                    <button class="btn btn-primary decrease-quantity" data-product-id="${this.id}">-</button>
                    <button class="btn btn-primary remove-from-cart" data-product-id="${this.id}">Eliminar</button>
                </div>
            </div>
        `;

        // Guardamos los botones para remover productos del carrito en una variable
        const removeButton = cartItemContainer.querySelector('.remove-from-cart');
        // Agregamos un EventListener a la variable para que los botones manden a llamar la función para remover
        removeButton.addEventListener('click', () => removeFromCart(this.id));

        // Regresamos el div del producto
        return cartItemContainer;
    }
}

// Definimos una variable que apunta a "shoppingCartGrid" dónde se cargarán los productos del carrito de compras en el shoppingCart.html
const shoppingCartGrid = document.getElementById('shoppingCartGrid');

// Función para cargar el carrito de compras
async function loadShoppingCart() {
    try {
        // Definimos una variable que apunta al localStorage dónde se guardan los productos del carrito de compras en el shoppingCart.html
        const savedCartData = localStorage.getItem('shoppingCartLocalStorage');
        // Validamos si hay productos en el carrito de compras
        const cartItems = JSON.parse(savedCartData || '[]');

        // Si no hay productos en el carrito de compras, mostramos un mensaje de que el carrito está vacío
        if (!cartItems || cartItems.length === 0) {
            displayEmptyCartMessage();
            return;
        }

        // Limpiamos el contenedor del carrito de compras para evitar que se dupliquen los productos al cargar la página de nuevo
        shoppingCartGrid.innerHTML = '';
        
        // Recorremos los productos del carrito de compras y utilizamos el método renderItem en cada uno para agregarlo al contenedor del carrito de compras
        cartItems.forEach(item => {
            const cartItem = new ShoppingCartItem(item);
            shoppingCartGrid.appendChild(cartItem.renderItem());
        });
    } catch (error) {
        // En caso de que haya un error al cargar el carrito de compras, mostramos un mensaje de error en la consola
        console.error('Error loading shopping cart:', error);
        displayEmptyCartMessage();
    }
}

// Función para mostrar un mensaje indicando que el carrito está vacío
function displayEmptyCartMessage() {
    shoppingCartGrid.innerHTML = `
        <div class="emptyCart">
            <h2 class="emptyCartTitle">No hay nada aquí aún.</h2>
            <h2>Encuéntrate con tu par ideal</h2>
            <button class="btn btn-primary back-to-catalogue-btn"><i class="bi bi-cart"></i></button>
        </div>
    `;
}

// Función para agregar un producto al carrito de compras
function addToCart(product) {
    try {
        // Guardamos el carrito actual del localStorage en una variable, si no existe, asignamos un arreglo vacío
        let currentCartItems = JSON.parse(localStorage.getItem('shoppingCartLocalStorage') || '[]');
        // Verificamos si el producto ya existe en el carrito
        const existingCartItem = currentCartItems.find(item => item.id === product.id);
        
        // Si ya existe el proudcto en el carrito, incrementamos su cantidad, si no, lo agregamos al carrito
        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            currentCartItems.push({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                description: product.description,
                quantity: 1
            });
        }
        
        // Guardamos el carrito actualizado en el localStorage pasando el arreglo de productos como un string con JSON.stringify
        localStorage.setItem('shoppingCartLocalStorage', JSON.stringify(currentCartItems));
        alert('Producto añadido al carrito');
    } catch (error) {
        // En caso de que haya un error al agregar el producto al carrito, mostramos un mensaje de error en la consola
        console.error('Error adding to cart:', error);
        alert('Error al añadir el producto al carrito');
    }
}

// Función para remover un producto del carrito de compras
function removeFromCart(productId) {
    try {
        // Guardamos el carrito actual del localStorage en una variable, si no existe, asignamos un arreglo vacío
        let currentCartItems = JSON.parse(localStorage.getItem('shoppingCartLocalStorage') || '[]');
        // Filtramos el carrito actual para eliminar el producto con el ID especificado, esta línea devuelve el carrito actual sin el producto filtrado por ID
        currentCartItems = currentCartItems.filter(item => item.id !== productId);
        // Actualizamos el carrito en el localStorage con el carrito actualizado sin el producto filtrado
        localStorage.setItem('shoppingCartLocalStorage', JSON.stringify(currentCartItems));
        // Volvemos a cargar el carrito de compras
        loadShoppingCart();
    } catch (error) {
        // En caso de que haya un error al remover el producto del carrito, mostramos un mensaje de error en la consola
        console.error('Error removing item from cart:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Cargar el carrito si estamos en la página del carrito
    if (shoppingCartGrid) {
        loadShoppingCart();
    }

    // Guardamos los botones para agregar productos al carrito en una variable
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Agregamos un EventListener a cada botón para que los estos manden a llamar la función para agregar al carrito al momento de hacer click
    addToCartButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            try {
                // Guardamos el contenedor de la tarjeta del producto en una variable
                const productCard = event.target.closest('.product-card');
                if (!productCard) {
                    // Si no encotnramos el contenedor de la tarjeta del producto, lanzamos un error para que se muestre en pantalla
                    throw new Error('Product card not found');
                }
                
                // Guardamos el ID de la tarjeta del producto en una variable, si no existe, lanzamos un error para que se muestre en pantalla
                const productId = parseInt(productCard.dataset.productId);
                if (!productId) {
                    throw new Error('Invalid product ID');
                }

                // Hacemos un request a la API para obtener los productos y buscamos el producto con el ID especificado
                const response = await fetch(productModule.api.baseURL);
                const products = await response.json();
                const productToAdd = products.find(p => p.id === productId);
                
                // Si encontramos el producto, lo agregamos al carrito mandando el producto guardado en productToAdd como parámetro a la función addToCart
                if (productToAdd) {
                    addToCart(productToAdd);
                } else {
                    // Si no encontramos el producto, lanzamos un error para que se muestre en pantalla
                    throw new Error('Product not found');
                }
            } catch (error) {
                // En caso de que haya un error en el proceso de agregar al carrito, mostramos un mensaje de error en la consola
                console.error('Error in add to cart process:', error);
                alert('No se pudo agregar el producto al carrito');
            }
        });
    });
});

// Exportamos las funciones para que puedan ser utilizadas en otros archivos
export { loadShoppingCart, addToCart};