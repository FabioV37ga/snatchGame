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
    movingEnabled = true;
    health;
    attackCooldown = false;

    constructor(type, x1, y1) {
        this.id = Enemy._ID;
        Enemy._ID++

        this.type = type

        this.x1 = x1;
        this.y1 = y1;
        this.x2 = this.x1 + 35;
        this.y2 = this.y1 + 50;

        this.health = 3

        this.createEnemy()
        Enemy.enemies.push(this)
    }

    static alwaysCheck() {
        /* Método responsável por constantemente verificar se existe um player nas proximidades dessa
        instância de Enemy
        */
        var intervalo = setInterval(() => {
            for (let i = 0; i <= Enemy.enemies.length - 1; i++) {
                if (Enemy.enemies[i].movingEnabled == true) {
                    var check = Enemy.enemies[i].checkForPlayer()
                    if (check) {
                        // console.log("id: " + i + " -> " + true + ',' + check)
                        Enemy.enemies[i].canEnemyMove(check[0])
                        Enemy.enemies[i].canEnemyMove(check[1])
                    }
                }
            }
        }, 20);
    }

    createEnemy() {
        // Método responsável por criar o elemento referente a essa instância de Enemy
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
        // Método responsável por verificar se o inimigo pode se movimentar numa direção num quadrante
        switch (direction) {
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
        // Campo de visão do inimigo
        var sightX1 = this.x1 - 150
        var sightY1 = this.y1 - 150
        var sightX2 = this.x2 + 150
        var sightY2 = this.y2 + 150

        var rangeX1 = this.x1
        var rangeY1 = this.y1;
        var rangeX2 = this.x2
        var rangeY2 = this.y2;

        var self = this;

        function checkX() {
            var playerPositionX;
            // Retorna a posição do player em referência ao inimigo (Contained, esquerda ou direita)
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
                        // Player está dentro do range do hit do inimigo
                        if ((Player.x1 >= rangeX1 && Player.x1 <= rangeX2) ||
                            Player.x2 >= rangeX1 && Player.x2 <= rangeX2) {
                            if ((Player.y1 >= rangeY1 && Player.y1 <= rangeY2) ||
                                Player.y2 >= rangeY1 && Player.y2 <= rangeY2) {
                                // console.log("Enemy.hit")
                                self.attack()
                            }
                        }
                        return [playerPositionX, checkY()[1]]
                    }
            }

            // Player está na divisa horizontalmente a direita do inimigo
            if (Player.x1 <= sightX2 && Player.x2 > sightX2 && Player.x1 >= sightX1) {
                if (checkY())
                    if (checkY()[0] == true) {
                        return [playerPositionX, checkY()[1]]
                    }
            }

            // Player está na divisa horizontalmente a esquerda do inimigo
            if (Player.x2 >= sightX1 && Player.x1 < sightX1 && Player.x2 <= sightX2) {
                if (checkY())
                    if (checkY()[0] == true) {
                        return [playerPositionX, checkY()[1]]
                    }
            }
        }

        function checkY() {
            var playerPositionY;
            // Retorna a posição do player em referência ao inimigo (Contained, abaixo, ou acima)
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
        // Método responsável por mover o inimigo
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
                this.faceDirection("right")
                this.enemyElement.style.left = this.x1 + 'px'
                break;
            case "right":
                this.x1 += 1
                this.x2 = this.x1 + 45
                this.faceDirection("left")
                this.enemyElement.style.left = this.x1 + 'px'
                break;
        }
    }
    faceDirection(direction) {
        // Método responsável por trocar visualmente a direção onde o inimigo está olhando
        switch (direction) {
            case "right":
                this.enemyElement.classList.remove("playerLeft")
                this.enemyElement.classList.add("playerRight")
                break;
            case "left":
                this.enemyElement.classList.remove("playerRight")
                this.enemyElement.classList.add("playerLeft")
                break;
        }
    }

    hurt(direction) {
        // Audio de hurt
        var audio = new Audio("src/sound/bone.mp3")
        audio.volume = 0.08
        audio.play()

        this.health--

        // Inimigo sendo atacado pela direita
        if (direction == "right") {
            // Desabilita a movimentação do inimigo
            this.movingEnabled = false;
            // Adiciona animação do inimigo sendo atacado (Jogado para o lado)
            this.enemyElement.classList.add("enemyHitRight")
            // Adiciona animação do inimigo sendo atacado (Ficando vermelho)
            this.enemyElement.style.backgroundImage = 'url(src/img/skeleton_hurt.gif)'

            // Depois de .3s (Tempo da animação), retorna os estados visuais originais 
            setTimeout(() => {
                this.enemyElement.style.backgroundImage = 'url(src/img/skeleton.gif)'
                this.enemyElement.classList.remove("enemyHitRight")
            }, 300);
            // Depois de .5s (Tempo de recuperação do inimigo), habilita movimentação novamente
            setTimeout(() => {
                this.movingEnabled = true;
            }, 500);
        }
        // Inimigo sendo atacado pela esquerda
        if (direction == "left") {
            // Desabilita a movimentação do inimigo
            this.movingEnabled = false;
            // Adiciona animação do inimigo sendo atacado (Jogado pro lado)
            this.enemyElement.classList.add("enemyHitLeft")
            // Adiciona animação do inimigo sendo atacado (Ficando vermelho)
            this.enemyElement.style.backgroundImage = 'url(src/img/skeleton_hurt.gif)'

            // Depois de .3s (Tempo da animação), retorna os estados visuais originais
            setTimeout(() => {
                this.enemyElement.style.backgroundImage = 'url(src/img/skeleton.gif)'
                this.enemyElement.classList.remove("enemyHitLeft")
            }, 300);
            // Deopis de .5s (Tempo de recuperação do inimigo), habilita a movimentação novamente
            setTimeout(() => {
                this.movingEnabled = true;
            }, 500);
        }
        // Ao final das animações, verifica a vida dessa instância, se for 0, o inimigo morre
        setTimeout(() => {
            if (this.health == 0) {
                this.die()
            }
        }, 300);
    }

    die() {
        // Método responsável por eliminar inimigo
        console.log(`#${this.id} die`)
        this.enemyElement.remove()

        for (let i = 0; i <= Enemy.enemies.length - 1; i++) {
            if (Enemy.enemies[i].id == this.id) {
                Enemy.enemies.splice(i, 1)
            }
        }
    }

    attack() {
        if (this.attackCooldown == false) {
            this.movingEnabled = false;
            this.attackCooldown = true;
            console.log(`#${this.id} is charging a hit`)
            setTimeout(() => {
                console.log(`#${this.id} tried to hit`)
                this.enemyElement.style.border = '1px solid red'
                setTimeout(() => {
                    this.movingEnabled = true;
                    this.attackCooldown = false
                    this.enemyElement.style.border = '0'
                }, 100);
            }, 800);

        }
    }
}


var skeleton1 = new Enemy('skeleton', 470, 350)
var skeleton2 = new Enemy('skeleton', 770, 350)