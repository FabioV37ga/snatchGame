class Level {
    static levels = [];
    static _ID = 0;
    id;
    paths = [];

    constructor(paths) {
        this.id = Level._ID;
        Level._ID++;

        for (let i = 0; i <= paths.length - 1; i++) {
            this.paths.push(paths[i])
            // this.createPaths(paths[i])
        }

        Level.levels.push(this)
    }

    createPaths() {
        for (let i = 0; i <= this.paths.length - 1; i++) {
            var path = this.paths[i]
            var elementoPath = $(`<div class="path">${path.id}</div>`).css({
                left: path.x1,
                top: path.y1,
                width: path.x2 - path.x1,
                height: path.y2 - path.y1,
                background: 'blue'
            })

            $(".level").append(elementoPath)
        }

    }

    removePaths() {
        console.log(this.paths)
        var paths = document.querySelectorAll(".path")
        for (let i = 0; i <= paths.length - 1; i++) {
            paths[i].remove()
        }
    }
}

var level1 = new Level(
    [
        // Quadrado central (200x200)
        new Path(410, 260, 610, 460),
        // Corredor pra cima (100x160)
        new Path(460, 100, 560, 260),
        // Campo superior (600x100)
        new Path(210, 0, 810, 100),
        // Corredor pra baixo (100x160)
        new Path(460, 460, 560, 620),
        // Campo inferior (600x100)
        new Path(210, 620, 810, 720),
        // corredor direita (310x100)
        new Path(610, 310, 920, 410),
        // campo direita (600x100)
        new Path(920, 110, 1020, 610),
        // corredor esquerda (310x100)
        new Path(100, 310, 410, 410),
        // campo esquerda (600x100)
        new Path(0, 110, 100, 630)
    ]
)

var level2 = new Level(
    [
        // Quadrado central (200x200)
        new Path(410, 260, 610, 460)
    ]
)

// Level.levels.push(level1)