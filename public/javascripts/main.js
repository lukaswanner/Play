$("#resize").click(showbutton)

$("#3x3").click(function () {
    return resize(3)
})
$("#9x9").click(function () {
    return resize(9)
})

$("#15x15").click(function () {
    return resize(15)
})


let handarr = $(".inHand")
let cellarr = $(".myCell")
let rowarr = $(".myRow")

const point = {
    "=": 1,
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 3,
    "1": 1,
    "2": 1,
    "3": 2,
    "4": 2,
    "5": 3,
    "6": 2,
    "7": 4,
    "8": 2,
    "9": 2,
    "0": 1
}

$("div.inHand").click(function (ev) {
    return recolor(ev.currentTarget, handarr)
})


$(".myCell").not(".myLabel").click(function (ev) {
    if (!ev.currentTarget.classList.contains("activeDiv")) {
        return recolor(ev.currentTarget, cellarr)
    } else {
        return setCard()
    }
})


function recolor(element, arr) {
    arr.removeClass("activeDiv")
    element.classList.add("activeDiv")
}

function setCard() {
    let active = isActive($(".inHand"))
    if (active[0]) {
        for (var i = 0; i < rowarr.length; i++) {
            let row = rowarr[i]
            let cells = row.getElementsByClassName("myCell")
            let activerow = isActive(cells)
            if (activerow[0]) {
                let activeCard = active[1]
                let url = "/scrabble/set/" + (activerow[1] - 1) + "/" + (i - 1) + "/" + activeCard
                $.ajax({
                    method: "GET",
                    url: url,
                    success: function () {
                        loadJson()
                    }
                });
                console.log(activeCard)
                $(".inHand").get(activeCard).remove()
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
    rowarr = document.getElementsByClassName("myCol")

    let buttons = document.getElementsByClassName("possibleSize")
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("d-none")
    }
}

class Grid {

    constructor(size) {
        this.size = size
        this.cells = []
    }

    fill(json) {
        var data = []
        for (var j = 0; j < this.size; j++) {
            for (var i = 0; i < this.size; i++) {
                data[i] = json[i][j].value
            }
            this.cells[j] = data
            data = []
        }
    }


}

function updateGrid(grid) {

    rows = $(".myRow")
    for (var i = 0; i < grid.size; i++) {
        data = rows.get(i + 1).children
        cell_value = grid.cells[i]
        for (var j = 0; j < grid.size; j++) {
            value = cell_value[j]
            console.log(data[j + 1])
            if (data[j + 1].classList.contains("activeDiv")) {
                var character = document.createElement("div")
                character.className = "myCharacter"
                character.innerHTML = value
                var points = document.createElement("div")
                points.className = "myPoint"
                points.innerHTML = point[value]
                data[j + 1].classList.add("myCard")
                data[j + 1].appendChild(character)
                data[j + 1].appendChild(points)
            }
        }
    }


}


function loadJson() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            console.log(result)
            grid_size = Object.keys(result.gameField.grid.cells).length
            grid = new Grid(grid_size)
            grid.fill(result.gameField.grid.cells)
            updateGrid(grid)
        }
    });
}


$(document).ready(function () {
    console.log("Document is ready, filling grid");
    //loadJson();
});

