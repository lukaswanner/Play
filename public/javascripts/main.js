import My_grid from "./module.js"
import current_player from "./player.js";

//todo add struct grid instead of class grid

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
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",
        success: function (result) {
            let jsonPlayer = result.status
            console.log("im here ")
            console.log(current_player)
            console.log(jsonPlayer)
            if (current_player === "A" && (jsonPlayer === "pA" || jsonPlayer === "fc")) {
                setCardcurrPlayer()
            } else if (current_player === "B" && jsonPlayer === "pB") {
                setCardcurrPlayer()
            }
        }
    });

}

function setCardcurrPlayer() {
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
    let url = "/scrabble/resize/" + size

    $.ajax({
        method: "GET",
        url: url,

        success: function () {
            let buttons = document.getElementsByClassName("possibleSize")
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.add("d-none")
            }
        }
    })
}


function updateGrid(grid) {
    let rows = $(".myRow")
    for (let i = 0; i < grid.size; i++) {
        let data = rows.get(i + 1).children
        let cell_value = grid.cells[i]
        for (let j = 0; j < grid.size; j++) {
            let value = cell_value[j]
            if (value !== "") {
                data[j + 1].innerHTML = ""
                let character = document.createElement("div")
                character.className = "myCharacter"
                character.innerHTML = value
                let points = document.createElement("div")
                points.className = "myPoint"
                points.innerHTML = grid.points[value]
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
    for (let i = 0; i < rows.length; i++) {
        let data = rows.get(i)
        rows.get(i).innerHTML = ""
        if (i < grid.size + 1) {
            for (let j = 0; j < grid.size + 1; j++) {
                if (i === 0) {
                    let cell = document.createElement("div")
                    cell.className = "myCell"
                    cell.classList.add("myLabel")
                    if (j !== 0) {
                        cell.innerHTML = j
                    }
                    data.appendChild(cell)
                } else {
                    let cell = document.createElement("div")
                    cell.className = "myCell"
                    if (j === 0) {
                        cell.classList.add("myLabel")
                        cell.innerHTML = i
                    } else {
                        if (grid.kind[i - 1][j - 1] === "t") {
                            cell.classList.add("triple")
                            cell.innerHTML = "x3"
                        } else if (grid.kind[i - 1][j - 1] === "d") {
                            cell.classList.add("double")
                            cell.innerHTML = "x2"
                        }
                    }
                    data.appendChild(cell)
                }
            }
        }
    }
    $(".myCell").not(".myLabel").click(function (ev) {
        if (!ev.currentTarget.classList.contains("activeDiv")) {
            return recolor(ev.currentTarget, $(".myCell"))
        } else {
            return setCard()
        }
    })
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
                points.innerHTML = grid.points[value]
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
            let grid_size = Object.keys(result.gameField.grid.cells).length
            My_grid.fill(result.gameField.grid.cells, grid_size)
            updateGrid(My_grid)
            loadHand(My_grid)
        }
    });
}

function loadJsonNewGrid() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            let grid_size = Object.keys(result.gameField.grid.cells).length
            My_grid.fill(result.gameField.grid.cells, grid_size)
            newGrid(My_grid)
            loadHand(My_grid)
        }
    });
}

function loadUndoGrid() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            let grid_size = Object.keys(result.gameField.grid.cells).length
            My_grid.fill(result.gameField.grid.cells, grid_size)
            undoGrid(My_grid)
            loadHand(My_grid)
        }
    });
}

function loadRedoGrid() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            let grid_size = Object.keys(result.gameField.grid.cells).length
            My_grid.fill(result.gameField.grid.cells, grid_size)
            redoGrid(My_grid)
            loadHand(My_grid)
        }
    });
}

function loadHand(grid) {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            if (current_player === "A") {
                updateHand(current_player, result, grid)
            } else if (current_player === "B") {
                updateHand(current_player, result, grid)
            }
        }
    });
}

function updateHand(Player, result, grid) {
    let curr_hand
    let hand_size
    if (Player === "A") {
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
        points.innerHTML = grid.points[curr_hand[i].value]
        hand.get(i).appendChild(character)
        hand.get(i).appendChild(points)
    }
    $("div.inHand").click(function (ev) {
        return recolor(ev.currentTarget, $(".inHand"))
    })
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
            if (result.status === "pB") {
                $("#scoreA").removeClass("active")
                $("#scoreB").addClass("active")
            } else {
                $("#scoreB").removeClass("active")
                $("#scoreA").addClass("active")
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
                let grid_size = Object.keys(result.gameField.grid.cells).length
                My_grid.fill(result.gameField.grid.cells, grid_size)
                if (current_player === "A") {
                    $.ajax({
                        method: "GET",
                        url: "/scrabble/switch/A",

                        success: function () {
                            loadHand(My_grid)
                        }
                    });
                } else {
                    $.ajax({
                        method: "GET",
                        url: "/scrabble/switch/B",

                        success: function () {
                            loadHand(My_grid)
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
            url: "/json",
            dataType: "json",

            success: function (result) {
                let grid_size = Object.keys(result.gameField.grid.cells).length
                My_grid.fill(result.gameField.grid.cells, grid_size)
                $.ajax({
                    method: "GET",
                    url: "/scrabble/submit",

                    success: function () {
                        loadPoints()
                        loadHand(My_grid)
                    }
                });
            }
        })
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
    let websocket = new WebSocket("ws://localhost:9000/websocket");
    websocket.setTimeout

    websocket.onopen = function () {
        console.log("Connected to Websocket");
    }

    websocket.onclose = function (code) {
        console.log(code)
        console.log('Connection with Websocket Closed!');
        connectWebSocket()
    };

    websocket.onerror = function (error) {
        console.log('Error in Websocket Occured: ' + error);
    };

    websocket.onmessage = function (e) {
        if (typeof e.data === "string") {
            let result = JSON.parse(e.data)
            console.log(result)
            let grid_size = Object.keys(result.gameField.grid.cells).length
            My_grid.fill(result.gameField.grid.cells, grid_size)
            if (result.Event === "CardsChanged()") {
                loadHand(My_grid)
            } else if (result.Event === "InvalidEquation()") {
                alert("Equation is not valid!")
                newGrid(My_grid)
                updateGrid(My_grid)
                loadHand(My_grid)
            } else if (result.Event === "GameFieldChanged()") {
                if (result.status === "fc") {
                    newGrid(My_grid)
                } else {
                    newGrid(My_grid)
                    updateGrid(My_grid)
                }
                loadHand(My_grid)
                loadPoints()
            } else if (result.Event === "GridSizeChanged()") {
                if (result.status === "fc") {
                    newGrid(My_grid)
                    loadHand(My_grid)
                } else {
                    newGrid(My_grid)
                    loadHand(My_grid)
                }
                loadHand(My_grid)
                loadPoints()
            }
        }
    };
}


$(document).ready(function () {
    console.log("Document is ready, filling grid");
    initBtns()
    connectWebSocket()
});


export {recolor, setCard}