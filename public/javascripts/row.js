
function inital_load() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            let grid_size = Object.keys(result.gameField.grid.cells).length
            My_grid.fill(result.gameField.grid.cells,grid_size)
            load(My_grid,grid_size)
        }
    })
}

function load(grid,grid_size) {
    console.log("im loading !!!")
    Vue.component('newapp-user', {
        data: function () {
            return {
                mygrid: grid,
                size: grid_size,
                cells: grid.cells,
                kind: grid.cellKind,
                points: point,
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
                                <div v-for="(m,index) in cells[i]" :key="m">
                                    <div v-if="m !== ''" class="myCell myCard"> 
                                        <div class="myCharacter"> {{m}} </div>
                                        <div class="myPoint"> {{points[m]}} </div>
                                    </div>
           
                                    <div v-else-if="kind[i][index] ==='n'" class="myCell normal" @click="addclick(mygrid,$event)"></div>
                                    <div v-else-if="kind[i][index] ==='d'" class="myCell double" @click="addclick(mygrid,$event)">x2</div>
                                    <div v-else-if="kind[i][index] ==='t'" class="myCell triple" @click="addclick(mygrid,$event)">x3</div>
                                         
                                </div>
                        </div>
                    </div>
                </div>`,
        methods: {
            addclick: function (grid, event) {
                if (!event.target.classList.contains("activeDiv")) {
                    return recolor(event.target, $(".myCell"))
                } else {
                    return setCard(grid)
                }
            },
        }

    });

    new Vue({
        el: '#newapp',
        data: {
            title: 'Hello World!',
        }
    });
}

$(document).ready(function () {
    console.log("Document is ready, filling grid");
    inital_load()
});


