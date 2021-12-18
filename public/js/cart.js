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
    let CartCost = parseInt(localStorage.getItem("TotalCost"));
    if(!CartCost){
        CartCost = 0;
    }
    let SubCost=0;
    let Shipping =0;
    if(CartItems!=null)
        SubCost= parseInt(CartCost)+30;
        Shipping = 30;
    CartItems = JSON.parse(CartItems);
    if(userID=="null")
    {
        let productContainer = document.querySelector(".product-container");
        let totalContainer = document.querySelector(".total");
        if(CartItems &&  productContainer){
            productContainer.innerHTML="";
            totalContainer.innerHTML="";
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
            totalContainer.innerHTML+=`
            <div class = "cart-bottom-content">
                <h5>CART TOTAL</h5>
                <div id ="total-container">
                    <div class="d-flex justify-content-between" >
                        <h6>Subtotal</h6>
                        <p>$${CartCost}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h6>Shipping</h6>
                        <p>$${Shipping}</p>
                    </div>
                    <hr class="second-hr"> 
                    <div class="d-flex justify-content-between">
                        <h6>Total</h6>
                        <p>$${SubCost}</p>
                    </div>
                    <button class = "cart-button checkout ml-auto">CHECK OUT</button>
                </div>        
            </div>
            `
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
                            console.log(data.error);
                             if(data.error===0||data.error===1){
                            //     setTimeout(()=>{
                            //         window.location.assign(window.location.origin+`/user/cart`);
                            //     },200);
                                window.location.assign(window.location.origin+`/user/cart`);
                            }
                            
                        })
                    
                    });
                    localStorage.clear(); 
                    
                }catch(err){
                    console.log(err);

                };        
                
            }   
            else{
                window.location.assign(window.location.origin+`/user/cart`);
            }
        }
        else{
            window.location.assign(window.location.origin+`/user/cart`);
        } 
    
}

displayCart();

