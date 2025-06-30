class Enemy {
    static enemies = [];
    static _ID = 0;
    id;
    type;
    x1;
    y1;
    x2;
    y2;
    enemyElement;

    constructor(type, x1, y1) {
        this.id = Enemy._ID;
        Enemy._ID++

        this.type = type

        this.x1 = x1;
        this.y1 = y1;
        this.x2 = this.x1 + 35;
        this.y2 = this.y1 + 50;

        this.createEnemy()
        Enemy.enemies.push(this)
    }

    static alwaysCheck() {
        var intervalo = setInterval(() => {
            for (let i = 0; i <= Enemy.enemies.length - 1; i++) {
                var check = Enemy.enemies[i].checkForPlayer()
                if (check) {
                    // console.log("id: " + i + " -> " + true + ',' + check)
                    Enemy.enemies[i].canEnemyMove(check[0])
                    Enemy.enemies[i].canEnemyMove(check[1])
                }
            }
        }, 20);
    }

    createEnemy() {
        var elementoEnemy = $(`<div value="${this.id}" class="enemy ${this.type}">${this.id}</div>`).css({
            left: this.x1,
            top: this.y1,
            width: this.x2 - this.x1,
            height: this.y2 - this.y1
        })

        $(".player").after(elementoEnemy)
        var elementoHtml = document.querySelectorAll(".enemy")
        this.enemyElement = elementoHtml[elementoEnemy.length - 1]
    }

    canEnemyMove(direction) {
        switch (direction) {
            // Player acima, mover acima
            case "above":
                if (Game.podeMover(this, "up") == true) {
                    this.move("up")
                }
                break;
            case "below":
                if (Game.podeMover(this, "down") == true) {
                    this.move("down")
                }
                break;
            case "right":
                if (Game.podeMover(this, "right") == true) {
                    this.move("right")
                }
                break;
            case "left":
                if (Game.podeMover(this, "left") == true) {
                    this.move("left")
                }
                break;
        }
    }

    checkForPlayer() {
        var sightX1 = this.x1 - 150
        var sightY1 = this.y1 - 150
        var sightX2 = this.x2 + 150
        var sightY2 = this.y2 + 150

        var self = this;

        function checkX() {
            var playerPositionX;
            if ((Player.x1 <= self.x1 || Player.x2 >= self.x2) ||
                Player.x1 < self.x1 && Player.x2 > self.x2) {
                playerPositionX = 'contained'
            }
            if (Player.x1 > self.x1) {
                playerPositionX = 'right'
            }
            if (Player.x2 < self.x2) {
                playerPositionX = 'left'
            }



            // Player está completamente no campo de visão do inimigo horizontalmente
            if (Player.x1 >= sightX1 && Player.x2 <= sightX2) {
                if (checkY())
                    if (checkY()[0] == true) {
                        // console.log(playerPositionX, checkY()[1])
                        return [playerPositionX, checkY()[1]]
                    }
            }

            // Player está na divisa horizontalmente a direita do inimigo
            if (Player.x1 <= sightX2 && Player.x2 > sightX2 && Player.x1 >= sightX1) {
                if (checkY()[0] == true) {
                    return [playerPositionX, checkY()[1]]
                }
            }

            // Player está na divisa horizontalmente a esquerda do inimigo
            if (Player.x2 >= sightX1 && Player.x1 < sightX1 && Player.x2 <= sightX2) {
                if (checkY()[0] == true) {
                    return [playerPositionX, checkY()[1]]
                }
            }
        }

        function checkY() {
            var playerPositionY;
            if ((Player.y1 == self.y1 || Player.y2 == self.y2) ||
                Player.y1 < self.y1 && Player.y2 > self.y2) {
                playerPositionY = 'contained'
            }
            if (Player.y1 > self.y1) {
                playerPositionY = 'below'
            }
            if (Player.y2 < self.y2) {
                playerPositionY = 'above'
            }


            // Player está completamente dentro do campo de visão, verticalmente.
            if (Player.y1 >= sightY1 && Player.y2 <= sightY2) {
                return [true, playerPositionY]
            }
            // Player está com o pé dentro do campo de visão, mas a cabeça fora
            if (Player.y2 >= sightY1 && Player.y1 <= sightY1 && Player.y2 <= sightY2) {
                return [true, playerPositionY]
            }
            // Player está com a cabeça dentro do campo de visão, mas o pé fora
            if (Player.y1 <= sightY2 && Player.y2 <= sightY2 && Player.y1 >= sightY1) {
                return [true, playerPositionY]
            }
        }
        return checkX()
    }

    move(direction) {
        // console.log(direction)
        switch (direction) {
            case "up":
                this.y1 -= 1
                this.y2 = this.y1 + 60
                this.enemyElement.style.top = this.y1 + 'px'
                break;
            case "down":
                this.y1 += 1
                this.y2 = this.y1 + 60
                this.enemyElement.style.top = this.y1 + 'px'
                break;
            case "left":
                this.x1 -= 1
                this.x2 = this.x1 + 45
                this.enemyElement.style.left = this.x1 + 'px'
                break;
            case "right":
                this.x1 += 1
                this.x2 = this.x1 + 45
                this.enemyElement.style.left = this.x1 + 'px'
                break;
        }
    }
}


var skeleton1 = new Enemy('skeleton', 470, 350)
var skeleton2 = new Enemy('skeleton', 770, 350)