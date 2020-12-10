var test =  new Vue({
    el: "#test",
    data: {
        message: "Hello World"
    },
    methods: {
        submit: function () {
            this.message = "yeah"
        }
    }
})


let cards = new Vue({
    el: ".myHand"
})