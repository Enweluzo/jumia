if (!JSON.parse(sessionStorage.getItem('loggedIn'))){location.href='/Frontend/login.html'}
let data;
async function wait(){
  try {let array=await fetch("https://qgjgmlhvkxpbdzdamyzt.supabase.co/rest/v1/product",
    {
        method:'GET',
        headers: {
            'Content-Type':'application/json',
            'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnamdtbGh2a3hwYmR6ZGFteXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDEzNjcsImV4cCI6MjA2NjIxNzM2N30.cZaJ_RoUVHqKogzWuI7pzX60HZ-QfoE7pOlbohGLz7I'
        },
    }
  )
  data= await array.json()
  //remove loading icon when done
  document.querySelector('.bounce-wrapper').style.display='none'
  document.querySelector('.body').style.display='block'
  document.querySelector('.no-internet').style.display='none'
    }catch(er){
    if(er){
        console.log(er);
    document.querySelector('.no-internet').style.display='flex'
    document.querySelector('.bounce-wrapper').style.display='none'
    document.querySelector('.body').style.display='none'}
  }
  GenerateProductHtml(data)
  nextStep()
}
wait()
let a=''
let b=''
let html=''
//Generate product html
function GenerateProductHtml(data){
    data.forEach((pro ,index)=>{
        html=`<div class="main edit-inner" >
                <div class="pic-div"><img style="width: 100%;height: 100%; object-fit: contain;" src="${pro.productImage}" alt=""></div>
                <div class="name">${pro.productName}</div>
                <div class="price">&#8358 <span class="getprice">${(pro.productPrice/10).toFixed(1)}</span></div>
                    <div class="but">
                        <button class="add" 
                        data-product-name="${pro.productName}"
                        data-product-image="${pro.productImage}"
                        data-product-price="${(pro.productPrice/10).toFixed(1)}"
                        >Add to Cart</button>
                    </div>
            </div>`
        if(index<6){a=a+html}else {b=b+html}
    })
    document.querySelector('.common-js-top').innerHTML=a
    document.querySelector('.common-js').innerHTML=b
}

//for product detail page&Add to cart
function nextStep(){
    //for product detail page
    function productDetailPage(){
    document.querySelectorAll('.main').forEach(function(doc){
            let detail={
                name:doc.querySelector('.name').innerHTML,
                imgg:doc.querySelector('.pic-div').innerHTML,
                price:doc.querySelector('.getprice').innerHTML,
            }
        doc.querySelector('.pic-div').onclick=function(){
            
            sessionStorage.setItem('data',JSON.stringify(detail))
            location.href='product-detail.html'
        }
    })}
    productDetailPage()

    //Add to cart
    function addToCart(){
    let gottenDataSave = JSON.parse(sessionStorage.getItem('added-cart'))||[];
    let add=0
            function cartDisplay(){
            add=0
            let loopedadd=JSON.parse(sessionStorage.getItem('added-cart'))
            loopedadd.forEach((loop)=>{
            add+=loop.cartQuantity})
            if (add===0){document.getElementById('cart').innerHTML=''}else{
            document.getElementById('cart').innerHTML=add}
            }
    document.querySelectorAll('.add').forEach(function(button){
        button.onclick=function nn(){
            //get data from data set
        let group={
            name:button.dataset.productName,
            image:button.dataset.productImage,
            price:button.dataset.productPrice,
            cartQuantity:1
        }
        let match=gottenDataSave.find((cart)=>cart.name===group.name)
        if (match){match.cartQuantity++}else{
        gottenDataSave.push(group)}
        sessionStorage.setItem('added-cart' ,JSON.stringify(gottenDataSave))
        //add to cart display
        cartDisplay()
    }})
    cartDisplay()
    }
addToCart()
}

