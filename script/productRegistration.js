//Get name,price,Image
    const newProduct={ 
    productImage:'',
    productName:'',
    productPrice:0
}
function god(postToBackend){
    newProduct.productImage=document.getElementById('productImage').value
    newProduct.productName=document.getElementById('productName').value
    newProduct.productPrice=(document.getElementById('productPrice').value)*10
    if (newProduct.productName===''){alert("Name can't be empty");return}
        else if(newProduct.productName.length<20){alert("Name To Short");return};
    if (newProduct.productImage===''){alert("Add image");return};
    if (newProduct.productPrice<=1000){alert("Price Must Be above 100");return}
    postToBackend()
}

function getDetails(postToBackend){
    document.getElementById('register-button').addEventListener('click',()=>{
        god(postToBackend)
    })
    document.addEventListener('keydown',(event)=>{
        if (event.key==='Enter'){
            god(postToBackend)
        }
    })
}
getDetails(postToBackend)

//post to backeend
async function postToBackend(){
    try {await fetch("https://qgjgmlhvkxpbdzdamyzt.supabase.co/rest/v1/product",{
        method:'POST',
        headers: {
            'Content-Type':'application/json',
            'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnamdtbGh2a3hwYmR6ZGFteXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDEzNjcsImV4cCI6MjA2NjIxNzM2N30.cZaJ_RoUVHqKogzWuI7pzX60HZ-QfoE7pOlbohGLz7I'
        },
        body:JSON.stringify(newProduct)})
            document.querySelector('.body').style.display='flex'
            document.querySelector('.next').style.display='none'
            document.getElementById('productName').value=''
            document.getElementById('productPrice').value=''
            document.getElementById('productImage').value=''
        }
            
            catch{ alert('Failed try again')}
}