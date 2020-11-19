document.getElementById("resizebtn").onclick = f


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


function recolor(element, arr) {
    console.log(element)
    for (var i = 0; i < arr.length; i++) {
        arr[i].classList.remove("activeDiv")
    }
    element.classList.add("activeDiv")


}

function f() {
    if (document.getElementById("resizebtn").getAttribute("href") == "/") {
        return false
    } else {
        for (var i = 0; i < rowarr.length; i++) {
            //get the current row
            let row = rowarr[i]
            let cells = row.getElementsByClassName("myCell")
            for (var j = 0; j < cells.length; j++) {
                if (cells[j].classList.contains("activeDiv")) {
                    console.log([i - 1, j - 1])
                    document.getElementById("resizebtn").setAttribute("href","/")
                }
            }
        }
    }
}


function isActive(element, index) {
    if (element.classList.contains("active")) {
        return index
    } else {
        return -1
    }
}
