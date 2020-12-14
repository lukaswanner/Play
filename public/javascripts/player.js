let current_player = "A"


// function loadJson() {
//     $.ajax({
//         method: "GET",
//         url: "/json",
//         dataType: "json",
//
//         success: function (result) {
//         }
//     });
// }

let player = new Vue({
    el: "#current_player",
    data: {
        message: current_player
    },
    methods:{
        updatePlayer() {
            this.message = current_player
        }
    }
})

$("#SetPlayerA").click(function () {
   current_player = "A"
    player.updatePlayer()
    loadHand()
})


$("#SetPlayerB").click(function () {
    current_player = "B"
    player.updatePlayer()
    loadHand()
})

