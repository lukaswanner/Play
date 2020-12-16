let grid

$.ajax({
    method: "GET",
    url: "/json",
    dataType: "json",

    success: function (result) {
        grid = new Grid(15)
        grid.fill(result.gameField.grid.cells)
        load(grid)
    }
})


function load(grid) {
    Vue.component('newapp-user', {
        data: function () {
            return {
                size: 15,
                cells: grid.cells,
                kind: grid.cellKind
            };
        },
        template: `<div> 
                    <div class="myGrid">
                        <div class="myRow">
                            <div class="myCell myLabel"></div>
                            <div v-for="(n,i) in size" class="myCell myLabel">
                                {{ n }}
                            </div> 
                            
                        </div> 
                        <div v-for="(n,i) in size" class="myRow">
                                <div class="myCell myLabel"> {{ n }}</div>
                                <div v-for="(m,index) in cells[i]">
                                    <div v-if="m !== ''" class="myCell myCard"> 
                                        <div class="myCharacter"> {{m}} </div>
                                        <div class="myPoint"> 1 </div>
                                    </div>
           
                                    <div v-else-if="kind[i][index] ==='n'" class="myCell normal" @click="addclick($event)"></div>
                                    <div v-else-if="kind[i][index] ==='d'" class="myCell double" @click="addclick($event)">x2</div>
                                    <div v-else-if="kind[i][index] ==='t'" class="myCell triple" @click="addclick($event)">x3</div>
                                         
                                </div>
                        </div>
                    </div>
                </div>`,
        methods: {
            addclick: function (event) {
                if (!event.target.classList.contains("activeDiv")) {
                    return recolor(event.target, $(".myCell"))
                } else {
                    return setCard()
                }

            }
        }

    });

    new Vue({
        el: '#newapp',
        data: {
            title: 'Hello World!',
        }
    });
}


// @for(col <- 0 until size) {
// <div class="myRow">
//         <div class="myCell myLabel">@(col + 1)</div>
// @for(row <- 0 until size) {
//     @if(grid.cell(row, col).isSet) {
//         @card(grid.cell(row, col).card, addedClass = "myCell")
//         } else {
//         @if(grid.cell(row, col).isNormal) {
//             <div class="myCell normal">@grid.cell(row, col)</div>
//             } else {
//             @if(grid.cell(row, col).isDouble) {
//                 <div class="myCell double">@grid.cell(row, col)</div>
//                 } else {
//                 <div class="myCell triple">@grid.cell(row, col)</div>
//                 }
//             }
//         }
//     }
// </div>
// }