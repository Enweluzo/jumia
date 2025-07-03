function Search(){
  //private
  let getProduct=async function (){
    let data= await fetch('https://qgjgmlhvkxpbdzdamyzt.supabase.co/rest/v1/product',
      {
        method:'GET',
        headers: {
            'Content-Type':'application/json',
            'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnamdtbGh2a3hwYmR6ZGFteXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDEzNjcsImV4cCI6MjA2NjIxNzM2N30.cZaJ_RoUVHqKogzWuI7pzX60HZ-QfoE7pOlbohGLz7I'
        },
    }
    )
    let array= await data.json()
    findMatch(array)
  }

  let findMatch=function (array){
    const searchinp=document.querySelector('.inp').value
    if (!searchinp){document.querySelector('.search-div').innerHTML='';return}
    let searcharray=array.filter((match)=>{
      const product=match.productName.toLowerCase()
      return product.includes(searchinp.toLowerCase())})
      displayOnDOM(searcharray)
  }

  let displayOnDOM=function (searcharray){
    let updatedhtml=document.querySelector('.search-div')
    let html=``
    searcharray.forEach((element ,i)=> {
      if (i<=4){
      html+=`<p class="search-item-js" 
      data-product-name="${element.productName}"
      data-product-image="${element.productImage}"
      data-product-price="${(element.productPrice/10).toFixed(1)}">
      ${element.productName}</p>`}
      else {return}
    });
    updatedhtml.innerHTML=html
    redirect()
  }

  let redirect= function (){
    document.querySelectorAll('.search-item-js').forEach((item)=>{
    item.addEventListener('click',()=>{
      let data={
        name:item.dataset.productName,
        price:item.dataset.productPrice,
        imgg:`<img style="width: 100%;height: 100%; object-fit: contain;" src="${item.dataset.productImage}" alt=""></img>`,
      }
      sessionStorage.setItem('data',JSON.stringify(data))
      location.href='/Frontend/product-detail.html'
      console.log(item.dataset)
    })
    })
  }

  //public
  this.result=function(){
    getProduct()
  }
}
let searchProducts=new Search()
document.querySelector('.inp').addEventListener('keydown',
  (event)=>{if(event.key!=='Enter'){searchProducts.result()}})
