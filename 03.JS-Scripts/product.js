//Definición de la API
export class API {
    constructor() {
        // Validamos que el dominio de la página actual incluya "github.io" para determinar si estamos en GitHub Pages o en un entorno local
        const isGitHubPages = window.location.hostname.includes('github.io');
        
        // Definimos la URL a utilizar para la API dependiendo si estamos en GitHub Pages o en un entorno local
        this.baseURL = isGitHubPages 
            ? '/practica2-JavaScript-CRUD/04.JSON-LocalStorage/products.json'
            : '../04.JSON-LocalStorage/products.json';
    }
    
    async getAll() {
        try {
            const response = await fetch(this.baseURL);
            if (!response.ok) throw new Error('Error al obtener datos');
            return response.json();
        } catch (error) {
            console.error("Error en getAll:", error);
            return [];
        }
    }

    async create(data) {
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return response.json();
        } catch (error) {
            console.error("Error en create:", error);
        }
    }

    async update(id, data) {
        try {
            const response = await fetch(`${this.baseURL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return response.json();
        } catch (error) {
            console.error("Error en update:", error);
        }
    }

    async delete(id) {
        try {
            await fetch(`${this.baseURL}/${id}`, { method: 'DELETE' });
        } catch (error) {
            console.error("Error delete:", error);
        }
    }
}
// Exportamos una variable "api" que contiene una instancia de la clase API para poder usarla en otros archivos
export const api = new API();

// Función para cargar los productos en el contenedor "productsCatalogue" usando el método renderCard() de la clase Product
async function loadProducts(productsCatalogue) {
    // Limpiamos el contenedor de productos para asegurarnos que no se dupliquen los productos al cargar la página de nuevo
    productsCatalogue.innerHTML = "";
    
    // Hacemos un request a la API
    try {
        const data = await api.getAll();
        
        // Recorremos los productos de data y los cargamos en el contenedor con renderCard()
        for (const product of data) {
            const productObj = new Product(product);
            productsCatalogue.appendChild(productObj.renderCard());
        }
        
        //En caso de que haya un error, lo mostramos en la consola
    } catch (error) {
        console.error("Error in loadProducts: ", error);
    }
}
// Exportamos también nuestra función loadProducts() para poder usarla en otros archivos
export { loadProducts };

// Definición de la clase Product
export default class Product {
    // Constructor de la clase Product
    constructor({ id, name, image, description, price}) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
    }

    // Método para renderizar la tarjeta del producto
    renderCard() {
        const card = document.createElement("div");
        card.classList.add("col");

        card.innerHTML = `
            <div class="card product-card" data-product-id="${this.id}">
                <img src="${this.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${this.name}</h5>
                    <div class="card-product-info row justify-content-between">
                        <p class="card-text">${this.description}</p>
                        <p class="card-product-price">$${this.price} MXN</p>
                    </div>
                    <div class="d-flex justify-content-evenly card-buttons">
                        <a href="#" class="btn  btn-secondary see-more-button">Ver más</a>
                        <button class="btn btn-primary save-product"><i class="bi bi-heart"></i></button>
                        <button class="btn btn-primary add-to-cart"><i class="bi bi-cart-plus"></i></button>
                    </div>
                </div>
            </div> 
            `;
            
        return card;
    }
}