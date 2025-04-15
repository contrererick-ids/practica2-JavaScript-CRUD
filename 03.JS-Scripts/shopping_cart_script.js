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
                            <p class="cart-item-text">${Intl.NumberFormat("es-MX",{style: "currency", currency: "MXN"}).format(this.price)}</p>
                            <p class="cart-item-text">Cantidad: ${this.quantity}</p>
                            <p class="cart-item-text">Subtotal: ${Intl.NumberFormat("es-MX",{style: "currency", currency: "MXN"}).format(this.price * this.quantity)}</p>
                        </div>
                    </div>
                    <button class="btn btn-primary increase-item-quantity" data-product-id="${this.id}">+</button>
                    <button class="btn btn-primary decrease-item-quantity" data-product-id="${this.id}">-</button>
                    <button class="btn btn-primary remove-from-cart" data-product-id="${this.id}">Eliminar</button>
                </div>
            </div>
        `;

        // Guardamos los botones para remover productos del carrito en una variable
        const removeButton = cartItemContainer.querySelector('.remove-from-cart');
        // Agregamos un EventListener a la variable para que los botones manden a llamar la función para remover
        removeButton.addEventListener('click', () => removeFromCart(this.id));
        
        // Guardamos los botones para incrementar la cantidad de un producto en una variable
        const increaseButton = cartItemContainer.querySelector('.increase-item-quantity');
        // Agregamos un EventListener a la variable para que los botones manden a llamar la función para incrementar
        increaseButton.addEventListener('click', () => increaseItemQuantity(this.id));
        
        // Guardamos los botones para incrementar la cantidad de un producto en una variable
        const decreaseButton = cartItemContainer.querySelector('.decrease-item-quantity');
        // Agregamos un EventListener a la variable para que los botones manden a llamar la función para incrementar
        decreaseButton.addEventListener('click', () => decreaseItemQuantity(this.id));
        
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

    // Guardamos el botón para regresar a la página de productos en una variable
    const backToCatalogueButton = shoppingCartGrid.querySelector('.back-to-catalogue-btn');
    // Agregamos un EventListener al botón para que el botón mande a llamar la función para regresar a la página de productos
    backToCatalogueButton.addEventListener('click', goBackToCatalogue);

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

//Función para aumentar la cantidad de un producto en el carrito de compras
function increaseItemQuantity(productId) {
    try{
        //Guardamos el carrito actual del localStorage en una variable, si no existe, asignamos un arreglo vacío
        let currentCartItems = JSON.parse(localStorage.getItem('shoppingCartLocalStorage') || '[]');
        //Buscamos el producto en el carrito con el ID especificado
        const productToUpdate = currentCartItems.find(item => item.id === productId);
        //Si encontramos el producto, incrementamos su cantidad en 1
        if (productToUpdate) {
            productToUpdate.quantity += 1;
            //Actualizamos el carrito en el localStorage con el carrito actualizado
            localStorage.setItem('shoppingCartLocalStorage', JSON.stringify(currentCartItems));
            //Volvemos a cargar el carrito de compras
            loadShoppingCart(); 
        } else {
            // Si no encontramos el producto, mostramos un mensaje de error en la consola
            console.error('Product not found in the cart'); 
            alert('Error no se pudo aumentar la cantidad del producto.');
        }
    } catch (error) {
        // En caso de que haya un error al aumentar la cantidad del producto, mostramos un mensaje de error en la consola
        console.error('Product not found in the cart'); 
            alert('Error no se pudo aumentar la cantidad del producto.');
    }
}

//Función para disminuir la cantidad de un producto en el carrito de compras
function decreaseItemQuantity(productId) {
    try{
        //Guardamos el carrito actual del localStorage en una variable, si no existe, asignamos un arreglo vacío
        let currentCartItems = JSON.parse(localStorage.getItem('shoppingCartLocalStorage') || '[]');
        //Buscamos el producto en el carrito con el ID especificado
        const productToUpdate = currentCartItems.find(item => item.id === productId);
        //Si encontramos el producto, disminuimos su cantidad en 1
        if (productToUpdate) {
            productToUpdate.quantity -= 1;
            if (productToUpdate.quantity <= 0) {
                currentCartItems = currentCartItems.filter(item => item.id !== productId);
            }
            //Actualizamos el carrito en el localStorage con el carrito actualizado
            localStorage.setItem('shoppingCartLocalStorage', JSON.stringify(currentCartItems));
            //Volvemos a cargar el carrito de compras
            loadShoppingCart(); 
        } else {
            // Si no encontramos el producto, mostramos un mensaje de error en la consola
            console.error('Product not found in the cart'); 
            alert('Error no se pudo disminuir la cantidad del producto.');
        }
    } catch (error) {
        // En caso de que haya un error al disminuir la cantidad del producto, mostramos un mensaje de error en la consola
        console.error('Product not found in the cart'); 
            alert('Error no se pudo disminuir la cantidad del producto.');
    }
}

//Función para regresar a la página de productos cuando el carritoe está vacío
function goBackToCatalogue() {
    // Primero validamos el dominio en el que estamos para definir el path a utilizar
    const isGitHubPages = window.location.hostname.includes('github.io');
    const path = isGitHubPages ? '/practica2-JavaScript-CRUD/' : '/';
    // Window location href nos permite redireccionar a la página que le asignemos (tiene que ser un path válido)
    window.location.href = path + 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Cargar el carrito si estamos en la página del carrito
    if (shoppingCartGrid) {
        loadShoppingCart();
    }
});

// Exportamos las funciones para que puedan ser utilizadas en otros archivos
export { loadShoppingCart, addToCart};