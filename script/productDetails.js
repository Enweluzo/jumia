if (!JSON.parse(sessionStorage.getItem('loggedIn'))){location.href='/Frontend/login.html'}
let retreve=JSON.parse( sessionStorage.getItem('data'));
document.querySelector('.product-image-div').innerHTML=retreve.imgg;
document.querySelector('.product-top-name').innerHTML=retreve.name;
