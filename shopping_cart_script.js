import Pokemon from './pokemon.js';

const cartGrid = document.getElementById("shoppingCartGrid");
const cartItems = document.getElementById("shoppingCartItems");
const cartResume = document.getElementById("shoppingCartResume");

constructor CartItem({ name, image, description }) {
    this.id = id;
    this.name = name;
    this.image = image;
}

renderCartItems(){
    const cartItem = document.createElement("div");
    cartItem.classList.add("container-fluid", "row", "justify-content-center", "align-items-center", "g-0", "cart-item");
    cartItem.innerHTML = `
    <div class="card product-card">
        <img src="${this.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">${this.description}</p>
        </div>
    </div>
    `;
}