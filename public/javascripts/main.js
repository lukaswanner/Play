document.getElementById("resize").onclick = showbutton

document.getElementById("3x3").onclick = function () {
    return resize(3)
}
document.getElementById("9x9").onclick = function () {
    return resize(9)
}

document.getElementById("15x15").onclick = function () {
    return resize(15)
}

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
                console.log([activerow[1],i])
                let activeCard = active[1]
                let url = "/scrabble/set/" + (activerow[1] - 1) + "/" + (i - 1) + "/" + activeCard
                document.location.replace(url)
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

function showbutton() {
    let buttons = document.getElementsByClassName("possibleSize")
    if (buttons[0].classList.contains("d-none")) {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("d-none")
        }
    } else {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.add("d-none")
        }
    }
}

function resize(size) {
    document.location.replace("/scrabble/resize/" + size)
    handarr = document.getElementsByClassName("inHand")
    cellarr = document.getElementsByClassName("myCell")
    rowarr = document.getElementsByClassName("myRow")

    let buttons = document.getElementsByClassName("possibleSize")
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("d-none")
    }
}