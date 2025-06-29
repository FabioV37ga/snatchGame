class Player {
    static x1 = 550;
    static y1 = 380;
    static x2 = Player.x1 + 45;
    static y2 = Player.y1 + 60;
    static attackCooldown = false;

    static player = document.querySelector(".player")



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
            var paths = Game.getTargetCurrentPaths(Player)

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
