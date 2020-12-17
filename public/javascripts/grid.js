var My_grid = {
    size: 0,
    cells: [],
    kind: [],

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

