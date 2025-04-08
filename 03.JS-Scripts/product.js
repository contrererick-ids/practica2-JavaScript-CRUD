export default class Product {
    constructor({ id, name, image, description, precio}) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.precio = precio;
        this.description = description;
    }

    renderProductCard(){
        const cartItem = document.createElement("div");
        cartItem.classList.add("container-fluid", "row", "justify-content-center", "align-items-center", "g-0", "cart-item");
        
        cartItem.innerHTML = `
        <div class="card product-card">
            <img src="${this.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">${this.description}</p>
                <p class="card-text fw-bold">Precio: $${this.precio}</p>
            </div>
        </div>
        `;
        return cartItem;
    }
}