let current_player = "A"

let player = new Vue({
    el: "#current_player",
    data: {
        message: current_player
    },
    methods:{
        updatePlayer(player) {
            this.message = player
        }
    }
})

$("#SetPlayerA").click(function () {
   current_player = "A"
    player.updatePlayer(current_player)
    loadHand()
})


$("#SetPlayerB").click(function () {
    current_player = "B"
    player.updatePlayer(current_player)
    loadHand()
})


export default current_player
