let handarr = $(".inHand")
let cellarr = $(".myCell")
let rowarr = $(".myRow")

var curr_player = "A"

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

initBtns()

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
            if (data[j + 1].classList.contains("activeDiv") && value != "") {
                data[j + 1].innerHTML = ""
                var character = document.createElement("div")
                character.className = "myCharacter"
                character.innerHTML = value
                var points = document.createElement("div")
                points.className = "myPoint"
                points.innerHTML = point[value]
                data[j + 1].classList.add("myCard")
                data[j + 1].classList.add("set")
                $(".undo").removeClass("undo")
                data[j + 1].classList.add("undo")
                data[j + 1].appendChild(character)
                data[j + 1].appendChild(points)
            }
        }
    }


}

function newGrid(grid) {
    rows = $(".myRow")
    for (var i = 0; i < grid.size; i++) {
        data = rows.get(i + 1).children
        cell_value = grid.cells[i]
        for (var j = 0; j < grid.size; j++) {
            value = cell_value[j]
            if (data[j + 1].classList.contains("set")) {
                data[j + 1].classList.remove("myCard")
                data[j + 1].classList.remove("set")
                if (data[j + 1].classList.contains("triple")) {
                    data[j + 1].innerHTML = "x3"
                } else if (data[j + 1].classList.contains("double")) {
                    data[j + 1].innerHTML = "x2"
                } else {
                    data[j + 1].innerHTML = ""
                }
            }
        }
    }
}

function undoGrid(grid) {
    rows = $(".myRow")
    for (var i = 0; i < grid.size; i++) {
        data = rows.get(i + 1).children
        cell_value = grid.cells[i]
        for (var j = 0; j < grid.size; j++) {
            value = cell_value[j]
            if (data[j + 1].classList.contains("undo")) {
                data[j + 1].classList.remove("myCard")
                data[j + 1].classList.remove("set")
                if (data[j + 1].classList.contains("triple")) {
                    data[j + 1].innerHTML = "x3"
                } else if (data[j + 1].classList.contains("double")) {
                    data[j + 1].innerHTML = "x2"
                } else {
                    data[j + 1].innerHTML = ""
                }
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
            loadHand()
        }
    });
}

function loadJsonNewGrid() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            console.log(result)
            grid_size = Object.keys(result.gameField.grid.cells).length
            grid = new Grid(grid_size)
            grid.fill(result.gameField.grid.cells)
            newGrid(grid)
            loadHand()
        }
    });
}

function loadUndoGrid() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            console.log(result)
            grid_size = Object.keys(result.gameField.grid.cells).length
            grid = new Grid(grid_size)
            grid.fill(result.gameField.grid.cells)
            undoGrid(grid)
            loadHand()
        }
    });
}

function loadHand() {
    console.log(curr_player)
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            console.log(result)
            if (curr_player == "A") {
                curr_hand = result.gameField.playerList.A.hand
                handsize = Object.keys(result.gameField.playerList.A.hand).length
            } else {
                curr_hand = result.gameField.playerList.B.hand
                handsize = Object.keys(result.gameField.playerList.B.hand).length
            }
            $(".myHand").empty()
            for (var i = 0; i < handsize; i++) {
                var card = document.createElement("div")
                card.className = "myCard"
                card.classList.add("inHand")
                $(".myHand").append(card)
            }
            hand = $(".myCard.inHand")
            for (var i = 0; i < handsize; i++) {
                hand.get(i).innerHTML = ""
                var character = document.createElement("div")
                character.className = "myCharacter"
                character.innerHTML = curr_hand[i].value
                var points = document.createElement("div")
                points.className = "myPoint"
                points.innerHTML = point[curr_hand[i].value]
                hand.get(i).appendChild(character)
                hand.get(i).appendChild(points)
            }
            $("div.inHand").click(function (ev) {
                return recolor(ev.currentTarget, $(".inHand"))
            })
        }
    });


}

function loadPoints() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            $("#scoreA .playerpoint")[0].innerHTML = result.gameField.playerList.A.point
            $("#scoreB .playerpoint")[0].innerHTML = result.gameField.playerList.B.point
            $("#ncards").html("cards in stack: " + result.gameField.pile.tilepile.length)
            if (result.status != "fc") {
                if (curr_player == "A") {
                    $("#scoreA").removeClass("active")
                    $("#scoreB").addClass("active")
                    curr_player = "B"
                } else {
                    $("#scoreB").removeClass("active")
                    $("#scoreA").addClass("active")
                    curr_player = "A"
                }
            }else{
                console.log("fc status was active")
            }
        }
    })
}

function initBtns() {
    $("#new_game").click(function () {
        $.ajax({
            method: "GET",
            url: "/scrabble/new",

            success: function (result) {
                curr_player = "A"
                loadJsonNewGrid()
            }
        });
    })

    $("#switch_cards").click(function () {
        if(curr_player == "A") {
            $.ajax({
                method: "GET",
                url: "/scrabble/switch/A",

                success: function (result) {
                    loadHand()
                }
            });
        }else{
            $.ajax({
                method: "GET",
                url: "/scrabble/switch/B",

                success: function (result) {
                    loadHand()
                }
            });
        }
    })

    $("#undo").click(function () {
        $.ajax({
            method: "GET",
            url: "/scrabble/undo",
            success: function (result) {
                loadUndoGrid()
            }
        });
    })

    $("#redo").click(function () {
        $.ajax({
            method: "GET",
            url: "/scrabble/redo",

            success: function (result) {
                //todo lade
            }
        });
    })

    $("#submit").click(function () {
        $.ajax({
            method: "GET",
            url: "/scrabble/submit",

            success: function (result) {
                loadPoints()
                loadHand()
            }
        });
    })

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
}


$(document).ready(function () {
    console.log("Document is ready, filling grid");
});

