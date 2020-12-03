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
    return recolor(ev.currentTarget, $(".inHand"))
})


$(".myCell").not(".myLabel").click(function (ev) {
    if (!ev.currentTarget.classList.contains("activeDiv")) {
        return recolor(ev.currentTarget, $(".myCell"))
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
        for (let i = 0; i < $(".myRow").length; i++) {
            let row = $(".myRow").get(i)
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
    for (let i = 0; i < array.length; i++) {
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
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("d-none")
        }
    } else {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.add("d-none")
        }
    }
}

function resize(size) {
    document.location.replace("/scrabble/resize/" + size)

    let buttons = document.getElementsByClassName("possibleSize")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("d-none")
    }
}

class Grid {

    constructor(size) {
        this.size = size
        this.cells = []
    }

    fill(json) {
        let data = []
        for (let j = 0; j < this.size; j++) {
            for (let i = 0; i < this.size; i++) {
                data[i] = json[i][j].value
            }
            this.cells[j] = data
            data = []
        }
    }


}

function updateGrid(grid) {
    let rows = $(".myRow")
    for (let i = 0; i < grid.size; i++) {
        let data = rows.get(i + 1).children
        let cell_value = grid.cells[i]
        for (let j = 0; j < grid.size; j++) {
            let value = cell_value[j]
            if (value !== "") {
                if (data[j + 1].classList.contains("double")) {
                    data[j + 1].innerHTML = ""
                    data[j + 1].classList.add("double")
                } else if (data[j + 1].classList.contains("triple")) {
                    data[j + 1].innerHTML = ""
                    data[j + 1].classList.add("triple")
                } else {
                    data[j + 1].innerHTML = ""
                }
                let character = document.createElement("div")
                character.className = "myCharacter"
                character.innerHTML = value
                let points = document.createElement("div")
                points.className = "myPoint"
                points.innerHTML = point[value]
                data[j + 1].classList.add("myCard")
                data[j + 1].classList.add("set")
                $(".undo").removeClass("undo")
                $(".redo").removeClass("redo")
                data[j + 1].classList.add("undo")
                data[j + 1].appendChild(character)
                data[j + 1].appendChild(points)
            }
        }
    }


}

function newGrid(grid) {
    let rows = $(".myRow")
    for (let i = 0; i < grid.size; i++) {
        let data = rows.get(i + 1).children
        for (let j = 0; j < grid.size; j++) {
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
    let rows = $(".myRow")
    for (let i = 0; i < grid.size; i++) {
        let data = rows.get(i + 1).children
        for (let j = 0; j < grid.size; j++) {
            if (data[j + 1].classList.contains("undo")) {
                data[j + 1].classList.remove("myCard")
                data[j + 1].classList.remove("set")
                data[j + 1].classList.add("redo")
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

function redoGrid(grid) {
    let rows = $(".myRow")
    for (let i = 0; i < grid.size; i++) {
        let data = rows.get(i + 1).children
        let cell_value = grid.cells[i]
        for (let j = 0; j < grid.size; j++) {
            let value = cell_value[j]
            if (data[j + 1].classList.contains("redo")) {
                data[j + 1].innerHTML = ""
                let character = document.createElement("div")
                character.className = "myCharacter"
                character.innerHTML = value
                let points = document.createElement("div")
                points.className = "myPoint"
                points.innerHTML = point[value]
                data[j + 1].classList.add("myCard")
                data[j + 1].classList.add("set")
                $(".undo").removeClass("undo")
                $(".redo").removeClass("redo")
                data[j + 1].classList.add("undo")
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
            let grid_size = Object.keys(result.gameField.grid.cells).length
            let grid = new Grid(grid_size)
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
            let grid_size = Object.keys(result.gameField.grid.cells).length
            let grid = new Grid(grid_size)
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
            let grid_size = Object.keys(result.gameField.grid.cells).length
            let grid = new Grid(grid_size)
            grid.fill(result.gameField.grid.cells)
            undoGrid(grid)
            loadHand()
        }
    });
}

function loadRedoGrid() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            console.log(result)
            let grid_size = Object.keys(result.gameField.grid.cells).length
            let grid = new Grid(grid_size)
            grid.fill(result.gameField.grid.cells)
            redoGrid(grid)
            loadHand()
        }
    });
}

function loadHand() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            console.log(result)
            let curr_hand
            let hand_size
            if (result.status === "pA" || result.status === "fc") {
                curr_hand = result.gameField.playerList.A.hand
                hand_size = Object.keys(result.gameField.playerList.A.hand).length
            } else {
                curr_hand = result.gameField.playerList.B.hand
                hand_size = Object.keys(result.gameField.playerList.B.hand).length
            }
            $(".myHand").empty()
            for (let i = 0; i < hand_size; i++) {
                let card = document.createElement("div")
                card.className = "myCard"
                card.classList.add("inHand")
                $(".myHand").append(card)
            }
            let hand = $(".myCard.inHand")
            for (let i = 0; i < hand_size; i++) {
                hand.get(i).innerHTML = ""
                let character = document.createElement("div")
                character.className = "myCharacter"
                character.innerHTML = curr_hand[i].value
                let points = document.createElement("div")
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
            if (result.status !== "fc") {
                if (result.status === "pA" || result.status === "fc") {
                    $("#scoreA").removeClass("active")
                    $("#scoreB").addClass("active")
                } else {
                    $("#scoreB").removeClass("active")
                    $("#scoreA").addClass("active")
                }
            } else {
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

            success: function () {
                loadJsonNewGrid()
            }
        });
    })

    $("#switch_cards").click(function () {
        $.ajax({
            method: "GET",
            url: "/json",
            dataType: "json",

            success: function (result) {
                if (result.status === "pA" || result.status === "fc") {
                    $.ajax({
                        method: "GET",
                        url: "/scrabble/switch/A",

                        success: function () {
                            loadHand()
                        }
                    });
                } else {
                    $.ajax({
                        method: "GET",
                        url: "/scrabble/switch/B",

                        success: function () {
                            loadHand()
                        }
                    });
                }
            }
        })
    })

    $("#undo").click(function () {
        $.ajax({
            method: "GET",
            url: "/scrabble/undo",
            success: function () {
                loadUndoGrid()
            }
        });
    })

    $("#redo").click(function () {
        $.ajax({
            method: "GET",
            url: "/scrabble/redo",

            success: function () {
                loadRedoGrid()
            }
        });
    })

    $("#submit").click(function () {
        $.ajax({
            method: "GET",
            url: "/scrabble/submit",

            success: function () {
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

function connectWebSocket() {
    var websocket = new WebSocket("ws://localhost:9000/websocket");
    websocket.setTimeout = 1000

    websocket.onopen = function () {
        console.log("Connected to Websocket");
    }

    websocket.onclose = function (code) {
        console.log(code)
        console.log('Connection with Websocket Closed!');
    };

    websocket.onerror = function (error) {
        console.log('Error in Websocket Occured: ' + error);
    };

    websocket.onmessage = function (e) {
        if (typeof e.data === "string") {
            let res = JSON.parse(e.data)
            console.log(res)
            if (res.Event === "CardsChanged()") {
                console.log("CARDS CHANGED")
                loadHand()
            } else if (res.Event === "InvalidEquation()" || res.Event === "ButtonSet()") {
                alert("Equation is not valid!")
                let grid_size = Object.keys(res.gameField.grid.cells).length
                let grid = new Grid(grid_size)
                grid.fill(res.gameField.grid.cells)
                updateGrid(grid)
                loadHand()
            } else if (res.Event === "GameFieldChanged()") {
                console.log("FIELD CHANGED")
                let grid_size = Object.keys(res.gameField.grid.cells).length
                let grid = new Grid(grid_size)
                grid.fill(res.gameField.grid.cells)
                updateGrid(grid)
                loadHand()
            }
        }
    };
}


$(document).ready(function () {
    console.log("Document is ready, filling grid");
    initBtns()
    connectWebSocket()
});

