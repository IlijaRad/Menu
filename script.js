let categories = ["Dishes", "Salads", "Drinks", "Desserts"]

function createCategories(){
    let html = '<div id="buttons">';
    categories.forEach((item) => {
        html += `<button class="btn ${item}">${item}</button>`
    })
    html+= '</div>';
    return html;
}

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
                        $${this.price}
                    </div>
                    <div class="product__info__desc">
                        ${this.description}
                    </div>
                </div>
        </div> 
        `
    }
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

let products=[];
readTextFile("data.json", function(text){
    var data = JSON.parse(text);
    let x = data.product;
    x.forEach((item) => {
        let p = new Product(item.name, item.price, item.desc, "./pictures/" + item.image, item.category);
        products.push(p);
    })
});


let mojito = new Product("Mojito", 6.99, "Mojito is a cocktail that consists of five ingredients: white rum, sugar, lime juice, soda water and mint.", "mojito.jpg", "Drinks");

let oldFashioned = new Product("Old Fashioned", 8.99, "Old fashioned is made with rye or bourbon, a sugar cube, Angostura bitters, a thick cube of ice, and an orange twist delivers every time.", "old_fashioned.jpg", "Drinks");

let capricciosa = new Product("Capricciosa", 14.99, "Pizza capricciosa is a style of pizza in Italian cuisine prepared with mozzarella cheese, Italian baked ham, mushroom, artichoke and tomato.", "capricciosa.jpg", "Dishes")

let caesar = new Product("Caesar", 7.49, "A Caesar salad is a green salad of romaine lettuce and croutons dressed with lemon juice, olive oil, egg, Worcestershire sauce, anchovies, garlic, Dijon mustard, Parmesan cheese, and black pepper.", "caesar.jpg", "Salads")

let blancmange = new Product("Blancmange", 9.99, "Blancmange is a sweet dessert commonly made with milk or cream and sugar thickened with rice flour, gelatin, corn starch or Irish moss, and often flavoured with almonds.", "blancmange.jpg", "Desserts")

let carbonara = new Product("Carbonara", 19.99, "Carbonara is an Italian pasta dish made with egg, hard cheese, cured pork, and black pepper. The dish arrived at its modern form, with its current name, in the middle of the 20th century.", "carbonara.jpg", "Dishes");


function generateProducts(products){
    document.getElementById('buttons').insertAdjacentHTML("afterend", '<div id="products"></div>');
    products.forEach((item) => {
        document.getElementById('products').insertAdjacentHTML("beforeend", item.createProduct());
    })
}

document.getElementById('title').insertAdjacentHTML('afterend', createCategories());


setTimeout(() => generateProducts(products), 2000);


function addButtonEvents() {
    let arr = Array.prototype.slice.call(document.getElementsByClassName("btn")) 

    arr.forEach((item) => {
        item.addEventListener("click", () => {
            arr.forEach((item)=> {
                if (event.target != item)item.classList.remove("active");
            })
            let productList;
            document.getElementById("products").remove();
            if (!event.target.classList.contains("active")){
                let category = event.target.className;
                productList = products.filter((i) => category.includes(i.category));
            } else {   
                productList = products;
            }
            event.target.classList.toggle("active");
            generateProducts(productList);
        })
    })
}
addButtonEvents();