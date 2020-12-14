

let cells = [1,2,3,4,5]

Vue.component('vue_row', {
    data: {
        items: cells,
        message: "help",
    },
    template:'<div :key="index" v-for="(item, index) in this.items"> help</div>'

})

new Vue({ el: '#components-demo' })