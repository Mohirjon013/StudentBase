
let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")

function handleAddStudent(){
    elModalWrapper.classList.remove("scale-0")
}

elModalWrapper.addEventListener("click", function(e){
    if(e.target.id == "wrapper"){
    elModalWrapper.classList.add("scale-0")

    }
})