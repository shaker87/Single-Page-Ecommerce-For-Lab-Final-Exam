let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if (!productsInCart) {
    productsInCart = [];

}

function showAlert(title, message) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success', // You can use 'success', 'error', 'warning', 'info', or 'question'
      confirmButtonText: 'Close'
    });
  }



const products = document.querySelectorAll('.product');
const parentElement = document.querySelector('#shp__cart__wrap');
const totalPrice = document.querySelector('#total__price');
const showTotal = document.querySelector('.total');
const showTotalCost = document.querySelector('#total__cost');
const shoppingCartMenu = document.getElementById("shopping__cart__menu")
const shoppingCartSidebar = document.getElementById("shopping__cart")
const closeShoppingCart = document.getElementById("offsetmenu__close__btn")
const checkOutButton = document.querySelector('.shp__checkout')

shoppingCartMenu.addEventListener('click', function(){
    shoppingCartSidebar.classList.add("open__shopping__cart")
})

closeShoppingCart.addEventListener('click', function(){
    shoppingCartSidebar.classList.remove("open__shopping__cart")
})


const cartProductCount = function () {
    return productsInCart.length

}


const countTheSumPrice = function () { // 4
    let sum = 0;
    productsInCart.forEach(item => {
        sum += item.price;
    });
    return sum;
}


function updateProductsInCart(product) { // 2
    console.log('product :>> ', product);
    showAlert('Successfully add to cart!',product['name'])
    
    for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == product.id) {
            productsInCart[i].count += product.count;
            productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            return;
        }
    }
    productsInCart.push(product);
   
}

const updateShoppingCartHTML = function () {

    localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));

    if (productsInCart.length > 0) {
        let result = productsInCart.map(product => {
            return `
                <div class="shp__single__product">
                    <div class="shp__pro__thumb">
                        <a href="#">
                            <img src=${product.image} alt="product images">
                        </a>
                    </div>
                    <div class="shp__pro__details">
                        <h2><a href="product-details.html">${product.name}</a></h2>
                        <span class="quantity">QTY: ${product.count}</span>
                        <span class="shp__price">$${product.price}</span>
                    </div>
                    <div class="shp__pro__incr__decr"> 
                        <button class="decrement" data-product-id=${product.id} style="border: 1px solid gray; padding: 0px 5px;"> - </button>
                        <span class="quantityValue">${product.count}</span>
                        <button class="increment" data-product-id=${product.id} style="border: 1px solid gray; padding: 0px 5px;"> + </button>
                    </div>
                    <div class="remove__btn">
                        <a href="#" title="Remove this item"><i class="fa fa-times remove_item" id="remove__item" data-product-id=${product.id}></i></a>
                    </div>
                </div>`
        });
        parentElement.innerHTML = result.join('');
        document.querySelector('.shp__checkout').classList.remove('hidden');
        totalPrice.innerHTML = '$' + countTheSumPrice();
        showTotalCost.innerHTML = '$' + countTheSumPrice();
        showTotal.innerHTML = cartProductCount();
     

    }
    else {
        parentElement.innerHTML = `<div style="text-align:center">
        <h4 class="empty" style="margin-bottom:30px">Your shopping cart is empty</h4>
        </div>`;

        document.querySelector('.shp__checkout').classList.add('hidden');

        totalPrice.innerHTML = '$0.00';
        showTotalCost.innerHTML = '$0.00';
        showTotal.innerHTML = cartProductCount();
        
    }
}

products.forEach(item => {   // 1
    item.addEventListener('click', (e) => {
    
        if (e.target.classList.contains('add_cart_btn')) {
            const productID = e.target.dataset.productId;
            // console.log('productID', productID)
            const productName = item.querySelector('.product_name').innerHTML.trim();
            const productPrice = item.querySelector('.base_price').innerHTML;
            const productImage = item.querySelector('img').src;
            let product = {
                name: productName,
                image: productImage,
                id: productID,
                count: 1,
                price: +productPrice,
                basePrice: +productPrice,
            }

            updateProductsInCart(product);
            updateShoppingCartHTML();

        }

    });

});



parentElement.addEventListener('click', (e) => {
    console.log('click',)
    const isPlusButton = e.target.classList.contains('increment');
    const isMinusButton = e.target.classList.contains('decrement');
    const productRemove = e.target.classList.contains('remove_item');

    if (isPlusButton || isMinusButton) {
        for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id == e.target.dataset.productId) {
                if (isPlusButton) {
                    productsInCart[i].count += 1
                    console.log('productsInCart[i]', productsInCart[i])
                }
                else if (isMinusButton) {
                    productsInCart[i].count -= 1
                }
                productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

            }
            if (productsInCart[i].count <= 0) {
                productsInCart.splice(i, 1);
            }
        }
        updateShoppingCartHTML();
        
    }

    if (productRemove) {
        updateShoppingCartHTML();
        for (let i = 0; i < productsInCart.length; i++) {
            let id = e.target.dataset.productId
            if (productsInCart[i].id == e.target.dataset.productId) {
                if (productRemove) {
                    productsInCart.splice(i, 1);
                }

            }
        }

        updateShoppingCartHTML();
    }
});

checkOutButton.addEventListener('click', function(){
    shoppingCartSidebar.classList.remove("open__shopping__cart");
    productsInCart.splice(0,productsInCart.length)
    localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
    updateShoppingCartHTML()
    showAlert('Successfully checkout and place order', 'Order has been placed')

})



updateShoppingCartHTML()