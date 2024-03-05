let basket = JSON.parse(localStorage.getItem("data")) || [] ;

//購物車加總顯示
let cartTotal = () => {
    let cartAmount = document.getElementById("cart-amount");
    let itemAmount = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
    cartAmount.innerText = itemAmount;
}

cartTotal();

//購物車

let openCart = () => {
    document.querySelector('#switch').checked = false;
    let cartPage = document.getElementById("cart-page");
    cartPage.style.transform = "translateX(0%)";
}

let closeCart = () => {
    let cartPage = document.getElementById("cart-page");
    cartPage.style.transform = "translateX(100%)";
}

let cartTotle = document.getElementById("cart-total");
let shoppingCart = document.getElementById("shopping-cart");

let generateCartItem = () => {
    
    if (basket.length !== 0){
        //cart not empty
        return shoppingCart.innerHTML = basket.map((x) => {
            let {id , item} = x;//物件解構賦值變數
            let search = projectDataList.find((y) => y.id === id) || [];
            //此頁面沒有定義id所以需要在下面多加上id定義
            return `
            <div id="${id}" class="cart-item">
                <img src=${search.img} alt="">
                <div class="cart-info">
                    <p class="cart-info-title">${search.project}</p>
                    <div class="price">
                        <p>$ ${search.price} x ${item} = ${search.price * item}</p>
                    </div>
                </div>
                <i onclick="removeItem(${id})" class="bi bi-trash"></i>
            </div>
            `
        }).join("")
    }
    else {
        //cart empty
        cartTotle.innerHTML = ``;
        shoppingCart.innerHTML = `
        <div class="no-item"><h4>購物車是空的唷</h4></div>
        `;
    }
}

generateCartItem();
// console.log(document.getElementById("project01"))
let removeItem = (id) => {
    let productItem = id;
    //移除物件
    basket = basket.filter((x) => x.id !== productItem.id);
    generateCartItem();
    cartTotal();
    
    localStorage.setItem("data", JSON.stringify(basket));
}

let totalPrice = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let {id, item} = x;
            let search = projectDataList.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y ,0);

        cartTotle.innerHTML = `
        Total : $ ${amount}
        `
    }
    else {
        return;
    }
}

totalPrice();

let clearCart = () => {
    basket = [];
    generateCartItem();
    cartTotal();    
    localStorage.setItem("data", JSON.stringify(basket)); 
}


let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userPassword = document.getElementById("userPassword");

function doChange() {
    localStorage.setItem(this.name,this.value);
}

userName.onkeyup = doChange;
userEmail.onkeyup = doChange;
userPassword.onkeyup = doChange;

function readAndShow() {
    if(localStorage["user-name"]) {
        document.getElementById("userName").value = localStorage["user-name"];
    }
    if(localStorage["user-email"]) {
        document.getElementById("userEmail").value = localStorage["user-email"];
    }
    if(localStorage["user-password"]) {
        document.getElementById("userPassword").value = localStorage["user-password"];
    }
}

window.onload = readAndShow;

document.getElementById("login-btn").addEventListener("click", () => {
    if (localStorage["user-name"] && localStorage["user-password"] && localStorage["user-email"]) {
        window.location.assign("../index/index.html");
        confirm("登入成功");
    }
    else {
        alert("登入失敗");
    }
})

document.forms[0].onsubmit = () => {localStorage.clear();};
