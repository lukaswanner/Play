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
    let active = isActive(handarr)
    if (active[0]) {
        for (var i = 0; i < rowarr.length; i++) {
            let row = rowarr[i]
            let cells = row.getElementsByClassName("myCell")
            let activerow = isActive(cells)
            if (activerow[0]) {
                let activeCard = active[1]
                let url = "/scrabble/set/" + (activerow[1] - 1) + "/" + (i - 1) + "/" + activeCard
                // document.location.replace(url)
                test()
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


function test() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            console.log(result)
        }
    });
}


//old js code
// for (var i = 0; i < handarr.length; i++) {
//     let element = handarr[i]
//
//     element.onclick = function () {
//         return recolor(element, handarr)
//     }
//
// }


// for (var i = 0; i < cellarr.length; i++) {
//     let name = cellarr[i].className
//     let element = cellarr[i]
//     if (!name.includes("myLabel")) {
//         element.onclick = function () {
//             if (!element.classList.contains("activeDiv")) {
//                 return recolor(element, cellarr)
//             } else {
//                 return setCard()
//             }
//         }
//     }
// }