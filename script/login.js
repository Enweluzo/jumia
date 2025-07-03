function verify(){
    const login={username:'',password:''}
    document.getElementById('submit').addEventListener('click',()=>{
        main(login)
    })
    document.addEventListener('keydown',(event)=>{
        if(event.key==='Enter'){main(login)}
    })
}

async function main(login){
    login.username=document.getElementById('username').value
    login.password=document.getElementById('password').value
    let response=await fetch('https://qgjgmlhvkxpbdzdamyzt.supabase.co/rest/v1/login',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnamdtbGh2a3hwYmR6ZGFteXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDEzNjcsImV4cCI6MjA2NjIxNzM2N30.cZaJ_RoUVHqKogzWuI7pzX60HZ-QfoE7pOlbohGLz7I'}
    })
        let next=await response.json()
        check(login,next)

}

function check(login,array) {
  let loggedIn=false
  let found = array.find(user =>
    user.name === login.username && user.password === login.password
  );

  if (found) {
    loggedIn=true
    sessionStorage.setItem('loggedIn',JSON.stringify(loggedIn))
    location.href='index.html'
  } else {
    alert('Invalid credentials.');
  }
}

verify()