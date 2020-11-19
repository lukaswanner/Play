document.getElementById("set").onclick = f


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
    for (var i = 0; i < rowarr.length; i++) {
        let row = rowarr[i]
        let cells = row.getElementsByClassName("myCell")
        for (var j = 0; j < cells.length; j++) {
            if (cells[j].classList.contains("activeDiv")) {
                console.log([i - 1, j - 1])
                let activeCard = -1
                for (var t = 0; t < arr.length; t++) {
                    if (arr[t].classList.contains("activeDiv")) {
                        activeCard = t
                        break
                    }
                }
                let url = "/scrabble/set/" + (j - 1) + "/" + (i - 1) + "/" + activeCard
                document.getElementById("set").setAttribute("href", url)
                document.getElementById("set").click()
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
