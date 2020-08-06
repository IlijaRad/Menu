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

let products = [];
let productList = [];
let categories =[];
let productsPerPage = 10;

function readJSON(file, callback) {
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

let parseJSON = new Promise(function(resolve, reject) {
    readJSON("data.json", function(text){
        var data = JSON.parse(text);
        let x = data.product;
        x.forEach((item) => {
            let p = new Product(item.name, item.price, item.desc, "./pictures/" + item.image, item.category);
            products.push(p);
        })
        let cat = data.category;
        cat.forEach((item) => {
            categories.push(item);
        })
        productList = products;
        resolve();
    })
});

function generateProducts(products, perPage, start, end){
    document.getElementById('catButtons').insertAdjacentHTML("afterend", '<div id="products"></div>');
    for (i = start; i < end; i++) {
        if (i >= products.length) break;  
        document.getElementById('products').insertAdjacentHTML("beforeend", products[i].createProduct());
    }
}

function generateCatButtons(){
    let html = '';
    categories.forEach((item) => {
        html += `<button class="btn ${item}">${item}</button>`
    })
    document.getElementById('catButtons').insertAdjacentHTML('afterbegin', html);
}

function generatePageButtons(productList, perPage, active){
    let count = Math.ceil(productList.length / perPage);
    if (count < 2) return -1;
    let html = '<div id="pageButtons">';
    let i;
    for (let i = 1; i <= count; i++){
        if (i >= 5) break;
        if (i == active) html += `<button class="btn active">${i}</button>`;
        else html += `<button class="btn">${i}</button>`
    }
    html += '</div>'
    document.getElementById('products').insertAdjacentHTML('afterend', html);
    return 1;
}

function addCatButtonEvents() {
    let arr = Array.prototype.slice.call(document.getElementById('catButtons').getElementsByClassName("btn"));
    arr.forEach((item) => {
        item.addEventListener("click", () => {
            arr.forEach((item)=> {
                if (event.target != item)item.classList.remove("active");
            })
            document.getElementById("products").remove();
            if (document.getElementById("pageButtons")!=undefined) document.getElementById("pageButtons").remove();
            
            if (!event.target.classList.contains("active")){
                let category = event.target.className.slice(4);
                productList = products.filter((i) => category === i.category);
            } else {   
                productList = products;
            }
            event.target.classList.toggle("active");
            generateProducts(productList, productsPerPage, 0, productsPerPage);
             if (generatePageButtons(productList, productsPerPage, 1) != -1) addPageButtonEvents();     
        })
    })
}

function addPageButtonEvents(){
    let arr = Array.prototype.slice.call(document.getElementById('pageButtons').getElementsByClassName('btn'));
    for (let i = 0; i < arr.length; i++){
        arr[i].addEventListener("click", () => {
            for (let j = 0; j < arr.length; j++) arr[j].classList.remove("active");
            event.target.classList.add("active");
            document.getElementById("products").remove();
            let page = i + 1;
            let start = productsPerPage * (page - 1);
            let end = start + productsPerPage;
            generateProducts(productList, productsPerPage, start, end);
        })
    }
}

parseJSON.then( () => {
    generateCatButtons();
    generateProducts(productList, productsPerPage, 0, productsPerPage);
    generatePageButtons(productList, productsPerPage, 1);
}
).then(() => {
    addCatButtonEvents();
    addPageButtonEvents();
})