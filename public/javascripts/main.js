document.getElementById("set").onclick = setCard


let handarr = document.getElementsByClassName("inHand")
let cellarr = document.getElementsByClassName("myCell")
let rowarr = document.getElementsByClassName("myRow")


for (var i = 0; i < handarr.length; i++) {
    let element = handarr[i]

    element.onclick = function () {
        return recolor(element, handarr)
    }

}

for (var i = 0; i < cellarr.length; i++) {
    let name = cellarr[i].className
    let element = cellarr[i]
    if (!name.includes("myLabel")) {
        element.onclick = function () {
            if (!element.classList.contains("activeDiv")) {
                return recolor(element, cellarr)
            } else {
                return setCard()
            }
        }
    }
}


function recolor(element, arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].classList.remove("activeDiv")
    }
    element.classList.add("activeDiv")


}

function setCard() {
    let active = isActive(handarr)
    if (active[0]) {
        for (var i = 0; i < rowarr.length; i++) {
            let row = rowarr[i]
            let cells = row.getElementsByClassName("myCell")
            activerow = isActive(cells)
            if (activerow[0]) {
                let activeCard = active[1]
                let url = "/scrabble/set/" + (activerow[1] - 1) + "/" + (i - 1) + "/" + activeCard
                document.getElementById("set").setAttribute("href", url)
                document.getElementById("set").click()
            }

        }
    } else {
        alert("No card was selected")
    }

}


function isActive(array) {
    for (var i = 0; i < array.length; i++) {
        let element = array[i]
        if (element.classList.contains("activeDiv")) {
            return [true, i]
        }
    }
    return false

}
