let elRegisterForm = document.querySelector(".register-form")
let elRegisterBtn = elRegisterForm.querySelector("button")


elRegisterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const newData = {
        newUserLogin:e.target.login.value,
        newUserPassweord:e.target.password.value
    }
    console.log(newData);
    
    
    localStorage.setItem("registerData", JSON.stringify(newData))
    elRegisterBtn.innerHTML = `
        <img class="mx-auto" src="./images/loading.gif" alt="loading" width="54" height="54">
    `
    elRegisterBtn.classList.remove("py-[13px]")
    setTimeout(() => location.pathname ="/",1000)
    e.target.reset()
})