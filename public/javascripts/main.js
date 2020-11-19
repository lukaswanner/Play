//document.getElementById("resizebtn").addEventListener("click",resize)

document.getElementById("resizebtn").onclick = resize

let arr = document.getElementsByClassName("inHand")
let cellarr = document.getElementsByClassName("myCell")
let rowarr = document.getElementsByClassName("myRow")


for (var i = 0; i < arr.length; i++) {
    let element = arr[i]

    element.onclick = function () {
        return recolor(element, arr)
    }

}

for (var i = 0; i < cellarr.length; i++) {
    let name = cellarr[i].className
    let element = cellarr[i]
    if (!name.includes("myLabel")) {
        cellarr[i].onclick = function () {
            return recolor(element, cellarr)
        }
    }
}

for (var i = 0; i < rowarr.length; i++) {
    let name = rowarr[i].className
}

function recolor(element, arr) {
    console.log(element)
    for (var i = 0; i < arr.length; i++) {
        arr[i].classList.remove("activeDiv")
    }
    element.classList.add("activeDiv")


}

function getPosition() {

}