
const adminData = JSON.parse(localStorage.getItem("more-data"))
console.log(adminData);


let elSingleWrapper = document.querySelector(".single-wrapper")
function renderSinglePage(arr){
    arr.forEach(item => {
        elSingleWrapper.innerHTML = `
            <div class="py-[20px]  border-b-[2px] border-b-[#E5E5E5]">
                <strong class="font-bold text-[22px]">${item.name.toUpperCase()}</strong>
            </div>
            <div class="w-[590px] mt-[40px] flex justify-between pl-[22px] pr-[15px] pt-[15px] bg-white rounded-xl">
                <div class="flex items-center gap-[50px] my-[30px]">
                    <img class="rounded-[15px] object-cover" src="${item.img}" alt="user-pic" width="220" height="220">
                    <ul class="space-y-[12px]">
                        <li>
                            <span class="block font-semibold text-[12px] text-[#ACACAC]">Name:</span>
                            <p class="font-medium text-[16px] -mt-1">${item.name}</p>
                        </li>
                        <li>
                            <span class="block font-semibold text-[12px] text-[#ACACAC]">Email:</span>
                            <p class="font-medium text-[16px] -mt-1">${item.email}</p>
                        </li>
                        <li>
                            <span class="block font-semibold text-[12px] text-[#ACACAC]">Phone:</span>
                            <p class="font-medium text-[16px] -mt-1">${item.number}</p>
                        </li>
                        <li>
                            <span class="block font-semibold text-[12px] text-[#ACACAC]">Date admission:</span>
                            <p class="font-medium text-[16px] -mt-1">${item.date}</p>
                        </li>
                    </ul>
                </div>
                <img class="h-[80px]" src="./images/single-img.png" alt="single" width="11" height="81">
            </div>
        `
    });
}
renderSinglePage(adminData)








// back start 
function handlePageBack(){
    location.pathname = "./admin.html"
}
// back end


// user name start
const userName = JSON.parse(localStorage.getItem("login-data"))
let elUserFullName = document.querySelector(".user-name")
elUserFullName.textContent = userName.login.toUpperCase()
// user name start 


// Log Out start 
function handleLogOutBtn(){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.classList.add("w-[550px]")
    elModalInner.classList.add("mt-[95px]")
    
    elModalInner.innerHTML = `
        <h2 class="text-center mt-3 font-bold text-[20px] text-lime-600">Do you want to log out ?</h2>
        <div class="flex items-center justify-between">
            <button onclick="handleCancelLogBtn()" class="w-[48%] mt-8 py-2 block bg-amber-400 text-white rounded-xl cursor-pointer hover:opacity-60 duration-400 text-[20px]" type="submit">Cancel</button>
            <button onclick="handleSureLogOutBtn()" class="w-[48%] mt-8 py-2 block bg-amber-400 text-white rounded-xl cursor-pointer hover:opacity-60 duration-400 text-[20px]" type="submit">Yes</button>
        </div>
    `
}
function handleCancelLogBtn(){
    elModalWrapper.classList.add("scale-0")
    
}
function handleSureLogOutBtn(){
    localStorage.clear()
    location.pathname = "/"
}
// Log Out start 

// person img start 
let elPersonChoosenInput = document.querySelector(".person-choosen-input")
let elPersonChoosenImg = document.querySelector(".person-choosen-img")

if(elPersonChoosenInput){
    elPersonChoosenInput.addEventListener("change", (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        
        reader.onload = (event) => {
            const base64 = event.target.result
            localStorage.setItem("admin-img", base64)
            elPersonChoosenImg.src = base64
        }
        
        reader.readAsDataURL(file)
    })
}

const savedImg = localStorage.getItem("admin-img")
if(savedImg) {
    elPersonChoosenImg.src = savedImg
}
// person img end