class Player {
    static x1 = 550;
    static y1 = 380;
    static x2 = Player.x1 + 45;
    static y2 = Player.y1 + 60;
    static attackCooldown = false;
    static isRunning = false;
    static facingDirection = 'left';
    static hurtState = 0;
    static health = 50
    static damage = 10
    static stamina = 100
    static isAlive = true;

    static player = document.querySelector(".player")

    static spawn() {
        // Controle lógico da stamina
        var intervaloStamina = setInterval(() => {
            if (Player.isRunning == true) {
                if ((Binds.up == true || Binds.down == true || Binds.left == true || Binds.right == true)) {
                    Player.stamina -= Player.stamina > 0 ? 2 : 0
                    setStaminaBar(Player.stamina)
                }
            } else {
                Player.stamina += Player.stamina < 100 ? 0.5 : 0
                setStaminaBar(Player.stamina)
            }
        }, 25);
        // Controle visual da stamina
        function setStaminaBar(value) {
            Player.player.children[1].children[0].style.width = `${value}%`
        }
    }

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
                                if (Enemy.enemies[i].y1 < Player.y2 && Enemy.enemies[i].y2 > Player.y1) {
                                    Enemy.enemies[i].hurt("right", Player.damage)
                                }
                            }
                        }
                        break;
                    case 'left':
                        if (Enemy.enemies[i].x1 <= Player.x2) {
                            if (Enemy.enemies[i].x2 + 15 >= Player.x1 && Enemy.enemies[i].x1 <= Player.x1) {
                                if (Enemy.enemies[i].y1 < Player.y2 && Enemy.enemies[i].y2 > Player.y1) {
                                    Enemy.enemies[i].hurt("left", Player.damage)
                                }
                            }
                        }
                        break;
                }
            }

        }
    }
    static hurt(damage) {
        // console.log("Player has been hit")
        if (Player.hurtState == 0 && Player.isAlive == true) {
            Player.health -= damage

            Player.hurtState = 1
            var animationFrame = 0;
            Player.player.backgroundImage = `url(src/img/playerHurt/mageHurt0.png)`
            var intervaloAnimacao = setInterval(() => {
                console.log(animationFrame)

                if (animationFrame <= 3) {
                    Player.player.style.backgroundImage = `url(src/img/playerHurt/mageHurt${animationFrame}.png)`
                }
                if (animationFrame == 4) {
                    Player.player.style.backgroundImage = "url(src/img/mage.gif)"
                    Player.hurtState = 0
                    clearInterval(intervaloAnimacao)
                }
                animationFrame++
                if (Player.health == 0) {
                    clearInterval(intervaloAnimacao)
                    Player.die()
                }
            }, 200);
        }
    }

    static die() {
        console.log("Player.die()")
        Player.isAlive = false
        Player.player.style.backgroundImage = ""
    }


}
