let elLoginForm = document.querySelector(".login-form")
let elLoginBtn = elLoginForm.querySelector("button")


const registerData = JSON.parse(localStorage.getItem("registerData"))


elLoginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const data = {
        login:e.target.login.value,
        password:e.target.password.value
    }
    
    
    if(registerData){
        if(data.login == registerData.newUserLogin && data.password == registerData.newUserPassword){
            elLoginBtn.innerHTML = `
            <img class="mx-auto" src="./images/loading.gif" alt="loading" width="54" height="54">
        `
            localStorage.setItem("login-data", JSON.stringify(data))
            elLoginBtn.classList.remove("py-[13px]")
            setTimeout(() => location.pathname ="../../admin.html",1000)
            e.target.reset()
        }
        else{
            alert("You got problem with Login or Password")
            e.target.reset()
            
        }
    }
    else{
        if(data.login == "mohirjon" && data.password == "123"){
            elLoginBtn.innerHTML = `
            <img class="mx-auto" src="./images/loading.gif" alt="loading" width="54" height="54">
        `
            localStorage.setItem("login-data", JSON.stringify(data))
            elLoginBtn.classList.remove("py-[13px]")
            setTimeout(() => location.pathname ="../../admin.html",1000)
            e.target.reset()
        }
        else{
            alert("You got problem with Login or Password")
            e.target.reset()
        }
    }
})