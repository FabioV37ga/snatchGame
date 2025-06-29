class Player {
    static x1 = 550;
    static y1 = 380;
    static x2 = Player.x1 + 45;
    static y2 = Player.y1 + 60;
    static attackCooldown = false;

    static player = document.querySelector(".player")

    static getPlayerCurrentPaths() {
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
            if (Player.x1 >= level.paths[i].x1 && Player.x2 <= level.paths[i].x2) {
                if (Player.y1 >= level.paths[i].y1 && Player.y2 <= level.paths[i].y2) {
                    containedPathSingular.push(level.paths[i])
                }
            }
        }

        // Overlap vertical
        for (let i = 0; i <= level.paths.length - 1; i++) {
            // Vertical abaixo
            if ((Player.y1 <= level.paths[i].y1 && Player.y2 >= level.paths[i].y1)) {
                // Limitador horizontal
                if (Player.x1 >= level.paths[i].x1 && Player.x2 <= level.paths[i].x2)
                    containedPathsVertical.push(level.paths[i])
            }
            // Vertical acima
            if (Player.y1 <= level.paths[i].y2 && Player.y2 >= level.paths[i].y2) {
                if (Player.x1 >= level.paths[i].x1 && Player.x2 <= level.paths[i].x2)
                    containedPathsVertical.push(level.paths[i])
            }
        }

        // Overlap horizontal
        for (let i = 0; i <= level.paths.length - 1; i++) {
            // Horizontal a esquerda
            if (Player.x1 <= level.paths[i].x2 && Player.x2 >= level.paths[i].x2) {
                // Limitador vertical
                if (Player.y1 >= level.paths[i].y1 && Player.y2 <= level.paths[i].y2)
                    containedPathsHorizontal.push(level.paths[i])
            }
            // Horizontal a direita
            if (Player.x1 <= level.paths[i].x1 && Player.x2 >= level.paths[i].x1) {
                // limitador vertical
                if (Player.y1 >= level.paths[i].y1 && Player.y2 <= level.paths[i].y2) {
                    containedPathsHorizontal.push(level.paths[i])
                }
            }
        }

        // Overlap duplo (borda das paths)
        for (let i = 0; i <= level.paths.length - 1; i++) {
            // Caso abaixo
            if (Player.y1 <= level.paths[i].y1 && Player.y2 > level.paths[i].y1 && Player.y2 <= level.paths[i].y2) {
                // Limitador horizontal
                if (Player.x1 >= level.paths[i].x1 && Player.x2 <= level.paths[i].x2)
                    containedPathsBordersY.push(level.paths[i])
            }
            // Caso acima
            if (Player.y2 > level.paths[i].y2 && Player.y1 < level.paths[i].y2 && Player.y1 >= level.paths[i].y1) {
                // Limitador horizontal
                if (Player.x1 >= level.paths[i].x1 && Player.x2 <= level.paths[i].x2)
                    containedPathsBordersY.push(level.paths[i])
            }

            // todo:
            // Caso esquerda
            if (Player.x1 <= level.paths[i].x1 && Player.x2 > level.paths[i].x1 && Player.x2 <= level.paths[i].x2) {
                if (Player.y1 >= level.paths[i].y1 && Player.y2 <= level.paths[i].y2) {
                    containedPathsBordersX.push(level.paths[i])
                }
            }
            // Caso direita
            if (Player.x2 >= level.paths[i].x2 && Player.x1 < level.paths[i].x2 && Player.x1 >= level.paths[i].x1) {
                if (Player.y1 >= level.paths[i].y1 && Player.y2 <= level.paths[i].y2) {
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

    static canPlayerMove() {
        if (Binds.up == true && Binds.down == false) {
            if (podeMover("up") == true) {
                Player.move("up")
            }
        }

        if (Binds.down == true && Binds.up == false) {
            if (podeMover("down") == true) {
                Player.move("down")
            }
        }

        if (Binds.left == true && Binds.right == false) {
            if (podeMover("left") == true) {
                Player.move("left")
            }
        }

        if (Binds.right == true && Binds.left == false) {
            if (podeMover("right") == true) {
                Player.move("right")
            }
        }

        function podeMover(direcao) {
            var paths = Player.getPlayerCurrentPaths()

            var walkableY = paths[3]
            var walkableX = paths[4]

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
                    if (Player.y1 - 1 >= min)
                        return true
                    break;

                case "down":
                    var max = walkableVertical[walkableVertical.length - 1].y2
                    if (Player.y2 + 1 <= max)
                        return true
                    break;
                case "left":
                    var min = walkableHorizontal[0].x1;
                    if (Player.x1 - 1 >= min)
                        return true
                    break;
                case "right":
                    var max = walkableHorizontal[walkableHorizontal.length - 1].x2;
                    if (Player.x2 + 1 <= max)
                        return true
                    break;
            }
        }


    }

    static move(direction) {
        // console.log(Player.posX)
        switch (direction) {
            case "up":
                Player.y1 -= 1
                Player.y2 = Player.y1 + 60
                Player.player.style.top = `${Player.y1}px`
                break;
            case "down":
                Player.y1 += 1
                Player.y2 = Player.y1 + 60
                Player.player.style.top = `${Player.y1}px`
                break;
            case "left":
                Player.x1 -= 1
                Player.x2 = Player.x1 + 45
                Player.player.style.left = `${Player.x1}px`
                Player.faceDirection("left")
                break;
            case "right":
                Player.x1 += 1
                Player.x2 = Player.x1 + 45
                Player.player.style.left = `${Player.x1}px`
                Player.faceDirection("right")
                break;
        }

    }

    static faceDirection(direction) {
        switch (direction) {
            case "right":
                Player.player.classList.remove("playerLeft")
                Player.player.classList.add("playerRight")
                break;
            case "left":
                Player.player.classList.remove("playerRight")
                Player.player.classList.add("playerLeft")
                break;
        }
    }

    static attack() {
        var sword = document.querySelector(".sword")
        var audio = new Audio("src/img/attack/swoosh.mp3")
        audio.currentTime = 0.15
        audio.volume = 0.35

        if (Player.attackCooldown == false) {
            Player.attackCooldown = true
            console.log("attack")

            var index = 0;
            var intervalo = setInterval(() => {
                audio.play()
                if (index <= 4) {
                    sword.style.backgroundImage = `url(src/img/attack/attack${index}.png)`
                    index++
                } else {
                    sword.style.backgroundImage = ""
                    Player.attackCooldown = false
                    clearInterval(intervalo)
                }
            }, 40);
        }
    }
}
