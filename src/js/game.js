class Game {
    static currentLevel = 0;
    static iniciar() {
        Game.setLevel(Game.currentLevel)

        Player.player.style.left = `${Player.x1}px`
        Player.player.style.top = `${Player.y1}px`

        walk()
        function walk() {
            var intervaloWalk = setInterval(() => {
                if (Binds.up == true || Binds.down == true || Binds.left == true || Binds.right == true) {
                    Player.canPlayerMove()
                    if (Player.isRunning == true) {
                        run()
                        clearInterval(intervaloWalk)
                    }
                }
            }, 10);
        }
        function run() {
            var intervaloRun = setInterval(() => {
                if (Binds.up == true || Binds.down == true || Binds.left == true || Binds.right == true) {
                    Player.canPlayerMove()
                    if (Player.isRunning == false) {
                        walk()
                        clearInterval(intervaloRun)
                    }
                }
            }, 5);
        }

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

    static getTargetCurrentPaths(target) {
        // Seleciona a instância de Level referente ao Game.currentLevel
        var level = Level.levels
        for (let i = 0; i <= level.length - 1; i++) {
            if (level[i].id == Game.currentLevel) {
                level = level[i];
                break;
            }
        }

        // Marca em quais paths o jogador se encontra
        var containedPathSingular = [];
        var containedPathsHorizontal = [];
        var containedPathsVertical = [];
        var containedPathsBordersY = []
        var containedPathsBordersX = []

        // Sem overlap horizontal e vertical
        for (let i = 0; i <= level.paths.length - 1; i++) {
            if (target.x1 >= level.paths[i].x1 && target.x2 <= level.paths[i].x2) {
                if (target.y1 >= level.paths[i].y1 && target.y2 <= level.paths[i].y2) {
                    containedPathSingular.push(level.paths[i])
                }
            }
        }

        // Overlap vertical
        for (let i = 0; i <= level.paths.length - 1; i++) {
            // Vertical abaixo
            if ((target.y1 <= level.paths[i].y1 && target.y2 >= level.paths[i].y1)) {
                // Limitador horizontal
                if (target.x1 >= level.paths[i].x1 && target.x2 <= level.paths[i].x2)
                    containedPathsVertical.push(level.paths[i])
            }
            // Vertical acima
            if (target.y1 <= level.paths[i].y2 && target.y2 >= level.paths[i].y2) {
                if (target.x1 >= level.paths[i].x1 && target.x2 <= level.paths[i].x2)
                    containedPathsVertical.push(level.paths[i])
            }
        }

        // Overlap horizontal
        for (let i = 0; i <= level.paths.length - 1; i++) {
            // Horizontal a esquerda
            if (target.x1 <= level.paths[i].x2 && target.x2 >= level.paths[i].x2) {
                // Limitador vertical
                if (target.y1 >= level.paths[i].y1 && target.y2 <= level.paths[i].y2)
                    containedPathsHorizontal.push(level.paths[i])
            }
            // Horizontal a direita
            if (target.x1 <= level.paths[i].x1 && target.x2 >= level.paths[i].x1) {
                // limitador vertical
                if (target.y1 >= level.paths[i].y1 && target.y2 <= level.paths[i].y2) {
                    containedPathsHorizontal.push(level.paths[i])
                }
            }
        }

        // Overlap duplo (borda das paths)
        for (let i = 0; i <= level.paths.length - 1; i++) {
            // Caso abaixo
            if (target.y1 <= level.paths[i].y1 && target.y2 > level.paths[i].y1 && target.y2 <= level.paths[i].y2) {
                // Limitador horizontal
                if (target.x1 >= level.paths[i].x1 && target.x2 <= level.paths[i].x2)
                    containedPathsBordersY.push(level.paths[i])
            }
            // Caso acima
            if (target.y2 > level.paths[i].y2 && target.y1 < level.paths[i].y2 && target.y1 >= level.paths[i].y1) {
                // Limitador horizontal
                if (target.x1 >= level.paths[i].x1 && target.x2 <= level.paths[i].x2)
                    containedPathsBordersY.push(level.paths[i])
            }

            // Caso esquerda
            if (target.x1 <= level.paths[i].x1 && target.x2 > level.paths[i].x1 && target.x2 <= level.paths[i].x2) {
                if (target.y1 >= level.paths[i].y1 && target.y2 <= level.paths[i].y2) {
                    containedPathsBordersX.push(level.paths[i])
                }
            }
            // Caso direita
            if (target.x2 >= level.paths[i].x2 && target.x1 < level.paths[i].x2 && target.x1 >= level.paths[i].x1) {
                if (target.y1 >= level.paths[i].y1 && target.y2 <= level.paths[i].y2) {
                    containedPathsBordersX.push(level.paths[i])
                }
            }


        }
        // Tratamento dos casos duplos
        // Tratamento Y
        var menorPathBorderY = 100000;
        var priorityPathBorderY;

        for (let i = 0; i <= containedPathsBordersY.length - 1; i++) {
            if (menorPathBorderY > containedPathsBordersY[i].x2 - containedPathsBordersY[i].x1) {
                menorPathBorderY = containedPathsBordersY[i].x2 - containedPathsBordersY[i].x1
                priorityPathBorderY = containedPathsBordersY[i]
            }
        }
        // Tratamento X
        var menorPathBorderX = 100000;
        var priorityPathBorderX;

        for (let i = 0; i <= containedPathsBordersX.length - 1; i++) {
            if (menorPathBorderX > containedPathsBordersX[i].y2 - containedPathsBordersX[i].y1) {
                menorPathBorderX = containedPathsBordersX[i].y2 - containedPathsBordersX[i].y1
                priorityPathBorderX = containedPathsBordersX[i]
            }
        }
        // console.log('single')
        // console.log(containedPathSingular)
        // console.log('vertical ')
        // console.log(containedPathsVertical)
        // console.log('horizontal ')
        // console.log(containedPathsHorizontal)

        // Return

        return [containedPathSingular, containedPathsVertical, containedPathsHorizontal, priorityPathBorderY, priorityPathBorderX]

    }

    static podeMover(target, direcao) {
        var paths = Game.getTargetCurrentPaths(target)

        var walkableY = paths[3];
        var walkableX = paths[4];

        // Lista paths caminhaveis verticalmente
        var walkableVertical = paths[0].concat(paths[1]);
        // Aciciona bordas caminhaveis verticalmente, se houverem
        if (walkableX) {
            walkableVertical = walkableVertical.concat(walkableX)
        }
        // Remove paths duplicadas da lista
        walkableVertical = Array.from(
            new Map(walkableVertical.map(obj => [obj.id, obj])).values()
        );
        // Ordena paths caminhaveis verticalmente do menor y1 ao maior y1
        walkableVertical.sort((a, b) => a.y1 - b.y1);

        // Lista paths caminhaveis horizontalmente
        var walkableHorizontal = paths[0].concat(paths[2]);
        // Adiciona bordas caminhaveis horizontalmente, se houverem
        if (walkableY) {
            walkableHorizontal = walkableHorizontal.concat(walkableY)
        }
        // Remove paths duplicadas da lista
        walkableHorizontal = Array.from(
            new Map(walkableHorizontal.map(obj => [obj.id, obj])).values()
        );
        // Ordena paths caminhaveis horizontalmente do menor x1 ao maior x1
        walkableHorizontal.sort((a, b) => a.x1 - b.x1);



        switch (direcao) {

            case "up":
                var min = walkableVertical[0].y1
                if (target.y1 - 1 >= min)
                    return true
                break;

            case "down":
                var max = walkableVertical[walkableVertical.length - 1].y2
                if (target.y2 + 1 <= max)
                    return true
                break;
            case "left":
                var min = walkableHorizontal[0].x1;
                if (target.x1 - 1 >= min)
                    return true
                break;
            case "right":
                var max = walkableHorizontal[walkableHorizontal.length - 1].x2;
                if (target.x2 + 1 <= max)
                    return true
                break;
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