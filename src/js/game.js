class Game {
    static currentLevel = 0;
    static iniciar() {
        Game.setLevel(Game.currentLevel)

        Player.player.style.left = `${Player.x1}px`
        Player.player.style.top = `${Player.y1}px`
        var intervalo = setInterval(() => {
            if (Binds.up == true || Binds.down == true || Binds.left == true || Binds.right == true) {
                Player.canPlayerMove()
            }
        }, 1);

        // Teste (Troca de fases)
        document.querySelector("body").addEventListener("keydown", function (e) {
            if (e.key == 'p') {
                Game.currentLevel = Game.currentLevel + 1 <= Level.levels.length - 1 ? Game.currentLevel + 1 : Game.currentLevel

                if (document.querySelectorAll(".path").length > 0) {
                    for (let i = 0; i <= Level.levels.length - 1; i++) {
                        if (Level.levels[i].id == Game.currentLevel) {
                            Game.removeLevelPaths(Level.levels[i])
                        }
                    }
                }
                Game.setLevel(Game.currentLevel)
            }
            else if (e.key == 'o') {
                Game.currentLevel = Game.currentLevel - 1 >= 0 ? Game.currentLevel - 1 : Game.currentLevel

                if (document.querySelectorAll(".path").length > 0) {
                    for (let i = 0; i <= Level.levels.length - 1; i++) {
                        if (Level.levels[i].id == Game.currentLevel) {
                            Game.removeLevelPaths(Level.levels[i])
                        }
                    }
                }
                Game.setLevel(Game.currentLevel)
            }
        })
    }

    static setLevel(level) {
        for (let i = 0; i <= Level.levels.length - 1; i++) {
            if (Level.levels[i].id == level) {
                Game.createLevelPaths(Level.levels[i])
            }
        }
    }

    static createLevelPaths(level) {
        level.createPaths()
    }

    static removeLevelPaths(level) {
        level.removePaths()
    }
}

Game.iniciar()