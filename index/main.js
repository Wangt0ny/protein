let shopPage = document.getElementById("shop");
let shopPageNew = document.getElementById("shop-new");

let basket = JSON.parse(localStorage.getItem("data")) || [] ;


//卡片生成模板
let generateCard = () => {
    return shopPage.innerHTML = projectDataList.slice(0,8).map((x) => {//slice選取projectDataList內部分物件
        let {img, project, price, id} = x;
        //從本機儲存裡找資料
        let search = basket.find((x) => x.id === id) || [];
        return `
            <div class="col-12 col-lg-3 col-md-4 col-sm-6 mb-5" id=project-id-${id}>
                <div class="item">
                    <div class="card h-100">
                        <a href="../project-page/project01.html">
                            <img class="img-fluid card-img-top" src=${img} alt="project-pic"/>
                            <div class="mycard-body">
                                <h4 class="card-title">${project}</h4>
                                <p class="card-text">$${price}</p>       
                            </div>
                        </a>
                        <div class="card-footer d-flex align-items-center justify-content-center">

                            <div class="project-btn-group">
                                <i class="bi bi-dash" onclick="decrement(${id})"></i>
                                <div id=${id} class="project-count">${search.item === undefined ? 0 : search.item}</div>
                                <i class="bi bi-plus" onclick="increment(${id})"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join("")

}
generateCard();

let generateCardNew = () => {
    return shopPageNew.innerHTML = projectDataList.slice(8,12).map((x) => {//slice選取projectDataList內部分物件
        let {img, project, price, id} = x;
        //從本機儲存裡找資料
        let search = basket.find((x) => x.id === id) || [];
        return `
            <div class="col-12 col-lg-3 col-md-4 col-sm-6 mb-5" id=project-id-${id}>
                <div class="item">
                    <div class="card h-100">
                        <a href="../project-page/project01.html">
                            <img class="img-fluid card-img-top" src=${img} alt="project-pic"/>
                            <div class="mycard-body">
                                <h4 class="card-title">${project}</h4>
                                <p class="card-text">$${price}</p>       
                            </div>
                        </a>
                        <div class="card-footer d-flex align-items-center justify-content-center">

                            <div class="project-btn-group">
                                <i class="bi bi-dash" onclick="decrement(${id})"></i>
                                <div id=${id} class="project-count">${search.item === undefined ? 0 : search.item}</div>
                                <i class="bi bi-plus" onclick="increment(${id})"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join("")

}
generateCardNew();


//增量數量函式
let increment = (id) => {
    let productItem = id;

    let search = basket.find((x) => { return x.id === productItem.id})

    if (search === undefined) {
        basket.push({
            id: productItem.id,
            item: 1,
        });
    }
    else{
        search.item += 1;
    }
    updata(productItem.id);
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
};

//減量數量函式
let decrement = (id) => {
    let productItem = id;
    
    let search = basket.find((x) => { return x.id === productItem.id})


    if (search === undefined) {
        return;
    }
    else if (search.item === 0) {
        return;
    }
    else{
        search.item -= 1;
    }
    // console.log(basket);
    updata(productItem.id);
    //移除數量為0的物件
    basket = basket.filter((x) => x.item !== 0);//回傳此條件為true的物件
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
};

//更新函式input值
let updata = (id) => {
    let search = basket.find((x) => x.id === id);
    
    if (search !== undefined) {
        document.getElementById(id).innerHTML = search.item;
    }
    else {
        document.getElementById(id).innerHTML = 0;
    }
    
    
    cartTotal();
    totalPrice();
    
    // generateCartItem();
};

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
            // console.log(search);
            return `
            <div class="cart-item">
                <img src=${search.img} alt="">
                <div class="cart-info">
                    <p class="cart-info-title">${search.project}</p>
                    <div class="price">
                        <p>$ ${search.price} x ${item} = ${search.price * item}</p>
                    </div>
                    <div class="project-btn-group">
                        <i class="bi bi-dash" onclick="decrement(${id})"></i>
                        <div class="project-count">${item}</div>
                        <i class="bi bi-plus" onclick="increment(${id})"></i>
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
    updata(productItem.id);
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
    generateCard();
    generateCardNew();
    
    localStorage.setItem("data", JSON.stringify(basket)); 
}
