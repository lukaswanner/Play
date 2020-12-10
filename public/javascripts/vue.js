let currHand = [{text: "None", Points: "0"}]
for (let index = 1; index < 9; index++) {
    currHand.push({text: index, Points: "Points: " + index})
}


Vue.component('myHand', {
    template: `
        <div class="myHand">
            <div v-for="card in hand" class="inHand">
                {{card.text}}
                {{card.Points}}
            </div>  
        </div>
    `,
    data: function () {
        return {
            hand: currHand
        }
    },

})

Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})