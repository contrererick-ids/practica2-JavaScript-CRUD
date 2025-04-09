//Definición de la URL de la API
const URL = '../04.JSON-LocalStorage/products.json';

// Definimos una variabale que apunta a "productsCatalogue" dónde se cargarán los productos en el index.html
const productsCatalogue = document.getElementById("productsCatalogue");

// Función para cargar los productos en el contenedor "productsCatalogue" usando el método renderCard() de la clase Product
async function loadProducts() {
    // Limpiamos el contenedor de productos para asegurarnos que no se dupliquen los productos al cargar la página de nuevo
    productsCatalogue.innerHTML = "";
    
    // Hacemos un request a la API
    try {
        const response = await fetch(URL);
        const data = await response.json();
        
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
            <div class="col">
                <div class="card product-card">
                    <img src="${this.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${this.name}</h5>
                        <div class="card-product-info row justify-content-between">
                            <p class="card-text">${this.description}</p>
                            <p class="card-product-price">${this.price," MXN"}</p>
                        </div>
                        <div class="d-flex justify-content-evenly card-buttons">
                            <a href="#" class="btn  btn-secondary see-more-button">Ver más</a>
                            <button class="btn btn-primary save-product"><i class="bi bi-heart"></i></button>
                            <button class="btn btn-primary add-to-cart"><i class="bi bi-cart-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div> 
            `;
            
        return card;
    }
}

loadProducts();