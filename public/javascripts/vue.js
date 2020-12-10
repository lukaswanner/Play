let currHand = [{text: "None", Points: "0"}]
let currPlayer = "A"
for (let index = 1; index < 9; index++) {
    currHand.push({text: index, Points: "Points: " + index})
}

var app = new Vue({
    el: "#app",
    data: {
        message: currPlayer
    }
})

var card = new Vue({
    el: "#card",
    data: {
        list: [1,2,3,4,5,6]
    }
})
