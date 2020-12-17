const point = {
    "=": 1,
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 3,
    "1": 1,
    "2": 1,
    "3": 2,
    "4": 2,
    "5": 3,
    "6": 2,
    "7": 4,
    "8": 2,
    "9": 2,
    "0": 1
}

var My_grid = {
    size: 0,
    cells: [],
    kind: [],
    points:point,

    fill(json, size) {
        this.size = size
        let data = []
        let cellKinds = []
        for (let j = 0; j < this.size; j++) {
            for (let i = 0; i < this.size; i++) {
                data[i] = json[i][j].value
                cellKinds[i] = json[i][j].kind
            }
            this.kind[j] = cellKinds
            this.cells[j] = data
            data = []
            cellKinds = []
        }
    }
}

export default My_grid
