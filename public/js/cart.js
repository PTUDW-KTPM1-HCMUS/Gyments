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
        let totalContainer = document.querySelector(".cart-bottom-content");
        console.log(totalContainer);
        
        if(CartItems &&  productContainer){
            productContainer.innerHTML="";
            
            
            Object.values(CartItems).map(item=>{
                productContainer.innerHTML+=`
                <tr>
                    <td style="text-align: center;"><a href ="#" ><i class = "fa fa-trash" onclick="handleRemove(event)" id =${item._id}></i></a>
                        <div class="loader remove-loader" id="remove-cart-loader-${item._id}" style="display: none;"></div>
                    <td><img src = "${item.images[0]}" alt=""></td>
                    <td><h5>${item.name}</h5></td>
                    <td><h5>$${item.price}</h5></td>
                    <td><input type="number" class = "w-25 p1-1" value = "${item.inCart}"></td>
                    <td><h5>$${item.total}</h5></td>
                </tr>
                `
            });
            
        }
        if(totalContainer)
        {
            totalContainer.innerHTML="";
            totalContainer.innerHTML+=`
                <button onclick="checkOut(event)" class="custom-btn btn btn-primary">CHECK OUT</button> 
            `
        }
    }
    else{
        
    }
}
function countItem(){
    let CartItems = localStorage.getItem("productsInCart");
    CartItems = JSON.parse(CartItems);
    if(CartItems==null){
        return 0;
    }
    
    else{
        let count =0;
        Object.values(CartItems).map(item=>{
            count+=1;
        })
        return count;
    }
}
function upApi(event){  
    event.preventDefault();
    let CartItems = localStorage.getItem("productsInCart");
    CartItems = JSON.parse(CartItems);
    

        if(userID!="null"){
            if(CartItems!=null){
                try{
                    let count = countItem();
                    let check =0;
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
                             if(data.error===0){
                                
                                check+=1;
                                if(check==count)
                                {
                                    setTimeout(()=>{window.location.assign(window.location.origin+`/user/cart`);},200);
                            }
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

function handleRemove(e){
    e.preventDefault();
    if(userID!="null"){
        if (e.target.id) {
            const loader = document.getElementById(`remove-cart-loader-${e.target.id}`);
            const url = window.location.origin + `/api/product/${e.target.id}`;
    
            //display loader
            e.target.style.display = 'none';
            loader.style.display = 'block';
            console.log(url);
            fetch(url, {
                method: 'DELETE',
                body: JSON.stringify({ userID }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error === 0) {
                        console.log(data.error);
                        e.target.parentElement.parentElement.parentElement.remove();
                    }
                })
        } else {
            //deal with local storage
            e.target.parentElement.parentElement.parentElement.remove();
        }
    
    } 
    else{   
        e.target.parentElement.parentElement.parentElement.remove();
        let CartItems = localStorage.getItem("productsInCart");
        let Total = localStorage.getItem("TotalCost");
        CartItems = JSON.parse(CartItems);
        let count=0;
        let products =[];
        Object.values(CartItems).map(item=>{

            if(item._id==e.target.id){
                Total-=parseInt(item.total);
                localStorage.setItem("TotalCost",Total);
            }
            else{
                count+=parseInt(item.inCart);
                products.push(item);
            }
        });
        localStorage.removeItem("productsInCart");
        localStorage.setItem("productsInCart",JSON.stringify(products));
        localStorage.setItem("cartNumbers",count);
    }
}
function checkOut(e){
    e.preventDefault();
    if(userID!="null"){
        
        let temp=document.querySelector('.product-item');
        //temp = JSON.stringify(temp);
        console.log(temp);
        if(temp){
            window.location.assign(window.location.origin+`/user/checkout`);
        }
    }
    else{

    }
}
