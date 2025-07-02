class Player {
    static x1 = 550;
    static y1 = 380;
    static x2 = Player.x1 + 45;
    static y2 = Player.y1 + 60;
    static attackCooldown = false;
    static isRunning = false;
    static facingDirection = 'left';

    static player = document.querySelector(".player")

    static canPlayerMove() {
        if (Binds.up == true && Binds.down == false) {
            if (Game.podeMover(this, "up") == true) {
                Player.move("up")
            }
        }

        if (Binds.down == true && Binds.up == false) {
            if (Game.podeMover(this, "down") == true) {
                Player.move("down")
            }
        }

        if (Binds.left == true && Binds.right == false) {
            if (Game.podeMover(this, "left") == true) {
                Player.move("left")
            }
        }

        if (Binds.right == true && Binds.left == false) {
            if (Game.podeMover(this, "right") == true) {
                Player.move("right")
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

    static run() {
        Player.isRunning = true;
    }

    static walk() {
        Player.isRunning = false;
    }

    static faceDirection(direction) {
        switch (direction) {
            case "right":
                Player.player.classList.remove("playerLeft")
                Player.player.classList.add("playerRight")
                Player.facingDirection = 'right'
                break;
            case "left":
                Player.player.classList.remove("playerRight")
                Player.player.classList.add("playerLeft")
                Player.facingDirection = 'left'
                break;
        }
    }

    static attack() {
        var sword = document.querySelector(".sword")
        var audio = new Audio("src/sound/swoosh.mp3")
        audio.currentTime = 0.15
        audio.volume = 0.35

        if (Player.attackCooldown == false) {
            Player.attackCooldown = true

            checkPlayerHit(Player.facingDirection)
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

        function checkPlayerHit(direction) {
            for (let i = 0; i <= Enemy.enemies.length - 1; i++) {
                switch (direction) {
                    case 'right':
                        if (Enemy.enemies[i].x2 >= Player.x1) {
                            if (Enemy.enemies[i].x1 - 15 <= Player.x2 && Enemy.enemies[i].x2 >= Player.x2) {
                                if (Enemy.enemies[i].y1 < Player.y2 && Enemy.enemies[i].y2 > Player.y1){
                                    Enemy.enemies[i].hurt("right")
                                }
                            }
                        }
                        break;
                    case 'left':
                        if (Enemy.enemies[i].x1 <= Player.x2) {
                            if (Enemy.enemies[i].x2 + 15 >= Player.x1 && Enemy.enemies[i].x1 <= Player.x1) {
                                if (Enemy.enemies[i].y1 < Player.y2 && Enemy.enemies[i].y2 > Player.y1){
                                    Enemy.enemies[i].hurt("left")
                                }
                            }
                        }
                        break;
                }
            }

        }
    }
    static hurt(){
        console.log("Player has been hit")
    }
}
