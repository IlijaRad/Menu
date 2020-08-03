class Product {
    constructor(name, price, description, image, category) {
        this.name = name
        this.price = price
        this.description = description
        this.image = image
        this.category = category
    }

    createProduct() {
        return `
        <div class="product">
                <img src="${this.image}" alt="${this.name}"  class="product__image ${this.category}">
                <div class="product__info">
                    <div class="product__info__name">
                        ${this.name}
                    </div>
                    <div class="product__info__price">
                        ${this.price}
                    </div>
                    <div class="product__info__desc">
                        ${this.description}
                    </div>
                </div>
        </div> 
        `
    }
}

let mojito = new Product("Mojito", 6.99, "Mojito is a cocktail that consists of five ingredients: white rum, sugar, lime juice, soda water and mint.", "mojito.jpg", "drink")

document.getElementById('products').insertAdjacentHTML("afterbegin", mojito.createProduct());
document.getElementById('products').insertAdjacentHTML("afterbegin", mojito.createProduct());
document.getElementById('products').insertAdjacentHTML("afterbegin", mojito.createProduct());
document.getElementById('products').insertAdjacentHTML("afterbegin", mojito.createProduct());
