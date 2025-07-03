//Get name,price,Image
const signUp={ name:'',password:''}
function god(postToBackend){
    signUp.name=document.getElementById('username').value
    signUp.password=document.getElementById('password').value
    fetch('https://qgjgmlhvkxpbdzdamyzt.supabase.co/rest/v1/login',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnamdtbGh2a3hwYmR6ZGFteXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDEzNjcsImV4cCI6MjA2NjIxNzM2N30.cZaJ_RoUVHqKogzWuI7pzX60HZ-QfoE7pOlbohGLz7I'}
        })
        .then((response)=>{return response.json()})
        .then((data)=>{
            let found = data.find(user =>
                user.name === signUp.name
            )
            if (found) {
                alert('Username Exist');return
            } 
            if (signUp.name==='' && signUp.password===''){alert("Enter Email or Phone number & Password");return}
            postToBackend()
            location.href='login.html'
        })
}

function getDetails(postToBackend){
    document.getElementById('submit').addEventListener('click',()=>{
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

function postToBackend(){
    fetch("https://qgjgmlhvkxpbdzdamyzt.supabase.co/rest/v1/login",{
        method:'POST',
        headers: {
            'Content-Type':'application/json',
            'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnamdtbGh2a3hwYmR6ZGFteXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDEzNjcsImV4cCI6MjA2NjIxNzM2N30.cZaJ_RoUVHqKogzWuI7pzX60HZ-QfoE7pOlbohGLz7I'},
        body:JSON.stringify(signUp)})
            .then(()=>{alert('Signed up')})
            .catch(()=>{alert('Failed try again')})
}
