

// modal
let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")

// Tbody
let Tbody = document.querySelector(".table-tbody")



let total = JSON.parse(localStorage.getItem("admin-data")) || []

// add student start
function handleAddStudent(){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.classList.add("w-[700px]")
    elModalInner.innerHTML = `
        <form class="add-form modal-form py-4" autocomplete="off">
            <label>
                <input type="file" class="choosen-input hidden">
                <img class="choosen-img mx-auto rounded-lg cursor-pointer" src="./images/empty-img.png" alt="empty-img" width="200">
            </label>
    
            <div class="mt-8">
                <div class="flex items-center justify-between">
                    <label class="w-[48%]">
                        <span class="text-[18px] font-medium inline-block mb-3">Name:</span>
                        <input class="w-full bg-amber-400 !text-black placeholder:!text-white p-3 rounded-lg outline-none focus:shadow  focus:shadow-amber-700" type="text" placeholder="Enter name" name="username" autocomplete="off" required>
                    </label>
                    <label class="w-[48%]">
                        <span class="text-[18px] font-medium inline-block mb-3">Email:</span>
                        <input class="w-full bg-amber-400 !text-black placeholder:!text-white p-3 rounded-lg  outline-none focus:shadow  focus:shadow-amber-700" type="email" placeholder="Enter email" name="email" autocomplete="off" required>
                    </label>
                </div>
                <div class="flex items-center justify-between mt-5">
                    <label class="w-[48%]">
                        <span class="text-[18px] font-medium inline-block mb-3">Phone:</span>
                        <input class="w-full bg-amber-400 !text-black placeholder:!text-white p-3 rounded-lg  outline-none focus:shadow  focus:shadow-amber-700" type="tel" placeholder="Enter phone number" name="phoneNumber" autocomplete="off" required>
                    </label>
                    <label class="w-[48%]">
                        <span class="text-[18px] font-medium inline-block mb-3">Date:</span>
                        <input class="w-full bg-amber-400 !text-black placeholder:!text-white p-3 rounded-lg  outline-none focus:shadow focus:shadow-amber-700" type="date" placeholder="Enter date" name="date" autocomplete="off" required>
                    </label>
                </div>
                <div class="flex items-center justify-between mt-5">
                    <label class="w-[48%]">
                        <span class="text-[18px] font-medium inline-block mb-3">Phone:</span>
                        <input class="w-full bg-amber-400 !text-black placeholder:!text-white p-3 rounded-lg  outline-none focus:shadow focus:shadow-amber-700" type="tel" placeholder="Enter phone number" name="enrolNumber" autocomplete="off" required>
                    </label>
                </div>
                <button class="add-btn w-full mt-8 py-2 block bg-amber-400 text-white rounded-xl cursor-pointer  text-[20px]" type="submit">Submit</button>
            </div>
        </form>
    `
    
    let elForm = document.querySelector(".add-form")
    let elAddBtn = document.querySelector(".add-btn")
    
    let elChoosenInput = document.querySelector(".choosen-input")
    let elChoosenImg = document.querySelector(".choosen-img")
    
    elChoosenInput.addEventListener("change", (e) => {
        elChoosenImg.src = URL.createObjectURL(e.target.files[0])
    })
    
    // form submit 
    elForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const data = {
            id:total.length ? total[total.length - 1].id + 1 : 1,
            img:elChoosenImg.src,
            name:e.target.username.value,
            email:e.target.email.value,
            number:e.target.phoneNumber.value,
            date:e.target.date.value,
            enrol:e.target.enrolNumber.value
            
        }
        
        
        total.push(data)
        elAddBtn.innerHTML = `
            <img class="mx-auto" src="./images/loading.gif" alt="loading" width="46" height="46">
        `
        elAddBtn.classList.remove("py-2")
        setTimeout(() => {
            renderData(total)
            elModalWrapper.classList.add("scale-0")
        },600)
        localStorage.setItem("admin-data", JSON.stringify(total))
        
    })
}
// add student end


// renderData start
function renderData(arr){
    Tbody.innerHTML = ""
    arr.forEach((item, index) => {
        let elTr = document.createElement("tr")
        elTr.className = "overflow-hidden"
        
        elTr.innerHTML = `
            <td class="flex items-center gap-3 p-[15px] rounded-l-[16px] bg-white">
                <img onerror="this.src='./images/ppl-img.png'" class="person-img rounded-lg" src="${item.img ? item.img : "./images/ppl-img.png"}" alt="ppl-img" width="65" height="55">
                <p class="text-[14px]">${item.name[0].toUpperCase() + item.name.substring(1)}</p>
            </td>
            <td class="text-center bg-white">
                <p class="text-[14px]">${item.email}</p>
            </td>
            <td class="text-center bg-white">
                <p class="text-[14px]">${item.number}</p>
            </td>
            <td class="text-center bg-white">
                <p class="text-[14px]">${item.enrol}</p>
            </td>
            <td class="text-center bg-white">
                <p class="text-[14px]">${
        (() => {const [year,month,day] = item.date.split("-")
            return `${month}/${day}/${year}`})()
        }</p>
            </td>
            <td class="text-right align-middle p-2 pr-[20px] bg-white rounded-r-[16px]">
                <button onclick="handleMoreBtn(${item.id})" class="inline-flex hover:scale-125 duration-300 mr-[14px] cursor-pointer" type="button">
                    <img src="./images/more-icon.svg" alt="More options" width="19.5" height="4.5">
                </button>
                <button onclick="handleUpdateBtn(${item.id})" class="inline-flex hover:scale-125 duration-300 mr-[14px] cursor-pointer" type="button">
                    <img src="./images/edit-icon.svg" alt="Edit" width="19" height="19">
                </button>
                <button onclick="handleDeleteBtn(${item.id})" class="delete-btn inline-flex hover:scale-125 duration-300 cursor-pointer" type="button">
                    <img  src="./images/delete-icon.svg" alt="Delete" width="16" height="18">
                </button>
            </td>
        `
        Tbody.append(elTr)
    })
}
renderData(total)
// renderData end


// More fucn start 
function handleMoreBtn(id){
    const filteredMoreArr = total.filter(item => item.id == id)
    localStorage.setItem("more-data", JSON.stringify(filteredMoreArr))
    location.pathname = "./single.html"
    
}
// More fucn start 


// update func start 
function handleUpdateBtn(id){
    const findedUpdateObj = total.find(item => item.id == id)
    
    elModalWrapper.classList.remove("scale-0")
    elModalInner.classList.add("w-[700px]")
    elModalInner.innerHTML = `
        <form class="update-form py-4" autocomplete="off">
            <label>
                <input type="file" class="update-input hidden">
                <img onerror="handleErrorImg()" class="update-img mx-auto rounded-lg cursor-pointer" src="${findedUpdateObj.img ? findedUpdateObj.img : "./images/empty-img.png"}" alt="empty-img" width="200">
            </label>
    
            <div class="mt-8">
                <div class="flex items-center justify-between">
                    <label class="w-[48%]">
                        <span class="text-[18px] font-medium inline-block mb-3">Name:</span>
                        <input class="w-full bg-amber-400  p-3 rounded-lg  outline-none focus:shadow  focus:shadow-amber-700" type="text" placeholder="Enter name" value="${findedUpdateObj.name}" name="username" autocomplete="off" required>
                    </label>
                    <label class="w-[48%]">
                        <span class="text-[18px] font-medium inline-block mb-3">Email:</span>
                        <input class="w-full bg-amber-400  p-3 rounded-lg  outline-none focus:shadow  focus:shadow-amber-700" type="email" placeholder="Enter email" value="${findedUpdateObj.email}" name="email" autocomplete="off" required>
                    </label>
                </div>
                <div class="flex items-center justify-between mt-5">
                    <label class="w-[48%]">
                        <span class="text-[18px] font-medium inline-block mb-3">Phone:</span>
                        <input class="w-full bg-amber-400  p-3 rounded-lg  outline-none focus:shadow  focus:shadow-amber-700" type="tel" placeholder="Enter phone number" value="${findedUpdateObj.number}" name="phoneNumber" autocomplete="off" required>
                    </label>
                    <label class="w-[48%]">
                        <span class="text-[18px] font-medium inline-block mb-3">Date:</span>
                        <input class="w-full bg-amber-400 placeholder:!text-white p-3 rounded-lg  outline-none focus:shadow focus:shadow-amber-700" type="date" placeholder="Enter date" value="${findedUpdateObj.date}" name="date" autocomplete="off" required>
                    </label>
                </div>
                <div class="flex items-center justify-between mt-5">
                    <label class="w-[48%]">
                        <span class="text-[18px] font-medium inline-block mb-3">Phone:</span>
                        <input class="w-full bg-amber-400  p-3 rounded-lg  outline-none focus:shadow focus:shadow-amber-700" type="tel" placeholder="Enter phone number" value="${findedUpdateObj.enrol}" name="enrolNumber" autocomplete="off" required>
                    </label>
                </div>
                <button class="update-btn w-full mt-8 py-2 block bg-amber-400 text-white rounded-xl cursor-pointer text-[20px]" type="submit">Submit</button>
            </div>
        </form>
    `
    
    let elUpdateForm = document.querySelector(".update-form")
    let elUpdateBtn = document.querySelector(".update-btn")
    
    let elUpdateInput = document.querySelector(".update-input")
    let elUpdateImg = document.querySelector(".update-img")
    
    elUpdateInput.addEventListener("change", (e) => {
        elUpdateImg.src = URL.createObjectURL(e.target.files[0])
    })
    
    elUpdateForm.addEventListener("submit", (e) => {
        e.preventDefault()
        findedUpdateObj.img = elUpdateImg.src
        findedUpdateObj.name = e.target.username.value
        findedUpdateObj.email = e.target.email.value
        findedUpdateObj.date = e.target.date.value
        findedUpdateObj.number = e.target.phoneNumber.value
        findedUpdateObj.enrol = e.target.enrolNumber.value
        
        elUpdateBtn.innerHTML = `
            <img class="mx-auto" src="./images/loading.gif" alt="loading" width="46" height="46">
        `
        elUpdateBtn.classList.remove("py-2")
        setTimeout(() => {
            renderData(total)
            elModalWrapper.classList.add("scale-0")
        },600)
        localStorage.setItem("admin-data", JSON.stringify(total))
    })
    
}
function handleErrorImg(){
    let elUpdateImg = document.querySelector(".update-img")
    elUpdateImg.src = "./images/empty-img.png"
}
// update func end 


// delete func start
function handleDeleteBtn(id){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.classList.add("w-[550px]")
    elModalInner.classList.add("mt-[95px]")
    
    elModalInner.innerHTML = `
        <h2 class="text-center mt-3 font-bold text-[20px] text-amber-900">Do you want to delete it ?</h2>
        <div class="flex items-center justify-between">
            <button onclick="handleCancelBtn()" class="w-[48%] mt-8 py-2 block bg-amber-400 text-white rounded-xl cursor-pointer hover:opacity-60 duration-400 text-[20px]" type="submit">Cancel</button>
            <button onclick="handleSureDeleteBtn(${id})" class="w-[48%] mt-8 py-2 block bg-amber-400 text-white rounded-xl cursor-pointer hover:opacity-60 duration-400 text-[20px]" type="submit">Delete</button>
        </div>
    `
}
function handleCancelBtn(){
    elModalWrapper.classList.add("scale-0")
    elModalInner.classList.remove("w-[550px]", "mt-[95px]")
}
function handleSureDeleteBtn(id){
    const findedDeleteObj = total.findIndex(item => item.id == id)
    total.splice(findedDeleteObj, 1)
    renderData(total)
    elModalWrapper.classList.add("scale-0")
    localStorage.setItem("admin-data", JSON.stringify(total))
    
}
// delete func end 


// modal close start
elModalWrapper.addEventListener("click", function(e){
    if(e.target.id == "wrapper"){
        elModalWrapper.classList.add("scale-0")
    }
})
// modal close end

// search start 
let elStudentSearch = document.querySelector(".student-search")
elStudentSearch.addEventListener("keyup", function(e){
    const searchValue = e.target.value.toLowerCase()
    const totalFiltered = total.filter(item => item.name.toLowerCase().includes(searchValue) || item.number.includes(searchValue))
    renderData(totalFiltered)
})
// search end

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