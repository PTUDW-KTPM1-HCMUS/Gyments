let carts =document.querySelectorAll('.p_cart');
let cart_page = document.querySelectorAll('.cart-page');
let products=[];
let temp =[];

let userID = document.getElementById('user-id').getAttribute('name');

let productIDs = document.querySelectorAll('.p_cart .detail-product-id');


for(let i =0;i<carts.length;i++){
        let tmp = productIDs[i].getAttribute('name');
        console.log("TMP: "+tmp);
        url = window.location.origin +`/api${tmp}`;
        fetch(url,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            data["inCart"]=0;
            data.price = Math.ceil(data.price-data.price*data.sale/100);
            data["total"]=Math.ceil(data.inCart*data.price);
            temp.push(data);        
        })
        
    
}


//click don hang 
for(let i =0;i<carts.length;i++){
    carts[i].addEventListener('click',function(e){
        e.preventDefault();
        let tmp = productIDs[i].getAttribute('name');
        tmp = tmp.split("/");
        let productID_ = tmp[2];
        products = temp.find(product=>product._id===productID_);

        cartNumbers(products);
        totalCost(products);
    })
}
//dem don hang 
function cartNumbers(product){
    console.log(product);
    let productsNumber = localStorage.getItem('cartNumbers');
    productsNumber = parseInt(productsNumber);

    if(productsNumber)
        localStorage.setItem('cartNumbers',productsNumber+1);
    else
    localStorage.setItem('cartNumbers',1);
    setItem(product);
}
//cai dat don hang
function setItem(product){
    let CartItems = localStorage.getItem('productsInCart');
    CartItems = JSON.parse(CartItems);
    if(CartItems!=null){
        if(CartItems[product.name]==undefined)
        {
            CartItems={
                ...CartItems,
                [product.name]:product
            }
        }
        CartItems[product.name].inCart+=1;
        CartItems[product.name].total+=CartItems[product.name].price;
    }else{
        product.inCart=1;
        product.total+=product.price;
        CartItems = {
            [product.name]:product
        }
    }
    localStorage.setItem("productsInCart",JSON.stringify(CartItems));
}
//tong don hang
function totalCost(product){
    let CartCost = localStorage.getItem("TotalCost");
    
    if(CartCost!=null){
        CartCost = parseInt(CartCost);
        localStorage.setItem("TotalCost",CartCost+product.price);
    }else{
        localStorage.setItem("TotalCost",product.price);
    }
}

function displayCart(){
    let CartItems = localStorage.getItem("productsInCart");
    CartItems = JSON.parse(CartItems);
    if(userID=="null")
    {
        let productContainer = document.querySelector(".product-container");
        
        if(CartItems &&  productContainer){
            console.log(productContainer);
            productContainer.innerHTML="";
            Object.values(CartItems).map(item=>{
                productContainer.innerHTML+=`
                <tr>
                    <td><a href ="#" ><i class = "fa fa-trash"></i></a></td>
                    <td><img src = "${item.images[0]}" alt=""></td>
                    <td><h5>${item.name}</h5></td>
                    <td><h5>$${item.price}</h5></td>
                    <td><input type="number" class = "w-25 p1-1" value = "${item.inCart}"></td>
                    <td><h5>$${item.total}</h5></td>
                </tr>
                `
            });
        }
    }
    else{
        
    }
}

function upApi(event){
    event.preventDefault();
    let CartItems = localStorage.getItem("productsInCart");
    CartItems = JSON.parse(CartItems);
    if(userID!="null"){
        if(CartItems!=null){
            try{
                Object.values(CartItems).map(item=>{
                    url = window.location.origin +`/api/product/${item._id}?quantity=${item.inCart}`;
                    fetch(url,{
                        method: 'POST',
                        body: JSON.stringify({userID}),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        
                    })
                    .catch(err => console.log(err))
                });
                localStorage.clear(); 

            }catch(err){
                console.log(err);

            };        
            
        }   
       
    }
    window.location=window.location.origin+`/user/cart`;
    console.log(window.location);
    
}

displayCart();
function loadPage(){
    console.log("ALOOOOOOOOOOOOO");
    url = window.location.origin +`/user/cart`;
    console.log("GET: "+ url);
    fetch(url,{
        method: 'GET',
        body: JSON.stringify({userID}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(res=>res.json())
}
