let carts =document.querySelectorAll('.p_cart');
let cart_page = document.querySelectorAll('.cart-page');
let products=[];
let temp =[];

let userID = document.getElementById('user-id').getAttribute('name');

let productIDs = document.querySelectorAll('.p_cart .detail-product-id');

for(let i =0;i<carts.length;i++){
        let tmp = productIDs[i].getAttribute('name');
        
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
        
        if(CartItems &&  productContainer){
            productContainer.innerHTML="";
                   
            Object.values(CartItems).map(item=>{
                productContainer.innerHTML+=`
                <tr>
                    <td style="text-align: center;"><a href ="#" ><i class = "fa fa-trash" onclick="handleRemove(event)" id =${item._id}></i></a>
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status" id="remove-cart-loader-${item._id}" style="display: none;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <td><img src = "${item.images[0]}" alt=""></td>
                    <td><h5>${item.name}</h5></td>
                    <td><h5>$${item.price}</h5></td>
                    <td><input type="number" class = "w-25 p1-1" value = "${item.inCart}" id="input-${item._id}" min="1"></td>
                    <td><h5 id ="total-${item._id}">$${item.total}</h5></td>
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
                        
                        e.target.parentElement.parentElement.parentElement.remove();
                    }
                })
        } else {
            //deal with local storage
            e.target.parentElement.parentElement.parentElement.remove();
        }
    
    } 
    else{   
        
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

        const loader = document.getElementById(`remove-cart-loader-${e.target.id}`);
        const url = window.location.origin + `/api/product/${e.target.id}`;
        
        loader.style.display = 'block';
        e.target.style.display = 'none';
        setTimeout(()=>{
            e.target.parentElement.parentElement.parentElement.remove();
        },250);
        
    }
}
function checkOut(e){
    e.preventDefault();
    if(userID!="null"){
        
        let temp=document.querySelector('.product-item');
        //temp = JSON.stringify(temp);
        
        if(temp){
            window.location.assign(window.location.origin+`/user/checkout`);
        }
    }
    else{
        window.location.assign(window.location.origin+`/login`);
        localStorage.setItem("check",1);
        
        
    }
}


let check = localStorage.getItem("check");
if(parseInt(check)===0){
    $('#notice').modal('hide');
}
else if(parseInt(check)===1){
    let title = document.querySelector('.modal-title');
    title.innerHTML ="";
    title.innerHTML+=`Notification`;
    let content = document.querySelector('.modal-body');
    content.innerHTML="";
    content.innerHTML+=`Please login first`;
    $('#notice').modal('show');
}
else if(parseInt(check)===2){
    let title = document.querySelector('.modal-title');
    title.innerHTML ="";
    title.innerHTML+=`Notification`;
    let content = document.querySelector('.modal-body');
    content.innerHTML="";
    content.innerHTML+=`Check out successfull`;
    $('#notice').modal('show');
}

function resetCheck(){
    localStorage.removeItem("check");
}

function CheckOutSuccess(e){
    e.preventDefault();
    let address = document.querySelector("#address-control");
    
    
    let add_value = address.value;
    
    let name = document.querySelector("#name-control");
    let name_value = name.value;
    
    let phone = document.querySelector("#phone-control");
    let phone_value = phone.value;
    url = window.location.origin +`/user/checkout`;
    
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body:JSON.stringify({
            name: name_value,
            address: add_value,
            phone: phone_value,
        })
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.error===1){
            window.location.assign(window.location.origin+`/`);
            localStorage.setItem("check",2);
        }
    })
}
function load_quantity(){
    let ids = document.querySelectorAll(".fa-trash");
    for(let i = 0;i<ids.length;i++){
        let tmp = ids[i].getAttribute("id");

        let click_quantity = document.querySelector(`#input-${tmp}`);
        click_quantity.addEventListener('change',()=>{
            
            if(userID!="null"){
                url = window.location.origin +`/api/products/${tmp}?quantity=${click_quantity.value}`
                fetch(url,{
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.error!==0){
                        let total = document.querySelector(`#total-${tmp}`);
                        
                        total.innerHTML="";
                        total.innerHTML+=`${data.error}`;
                    }
                });
            }
            else{
                let CartItems = localStorage.getItem("productsInCart");
                let Total = 0;
                CartItems = JSON.parse(CartItems);
                let count=0;
                let products =[];
                let total_change =0;
                Object.values(CartItems).map(item=>{
                    
                    if(String(item._id)==String(tmp)){
                        item.inCart = parseInt(click_quantity.value);
                        item.total = Math.ceil(item.inCart*item.price);
                        count+=click_quantity.value;
                        total_change=item.total
                    }
                    else{
                        count+=item.inCart;
                    }
                    Total +=item.total;
                    products.push(item);
                });
                localStorage.removeItem("productsInCart");
                localStorage.setItem("productsInCart",JSON.stringify(products));
                localStorage.setItem("cartNumbers",count);
                localStorage.setItem("TotalCost",Total);
                let total_ui = document.querySelector(`#total-${tmp}`);
                
                total_ui.innerHTML="";
                total_ui.innerHTML+=`${total_change}`;
            }

        });
    }
}

load_quantity();

