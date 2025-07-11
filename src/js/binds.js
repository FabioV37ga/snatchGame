class Binds {

    /* 
    Binds: arrowup      || w
            arrowdown   || s
            arrowleft    || a
            arrowright   || d 
    
    */

    static up = false;
    static down = false;
    static right = false;
    static left = false;
    static run = false

    static inicializar() {
        var playarea = document.querySelector("body")

        // Binds de movimentação:
        // Detecta quando usuário aperta um botão de movimentação
        playarea.addEventListener("keydown", function (e) {
            switch (e.key) {
                case 'W':
                case 'w':
                case "ArrowUp":
                    Binds.up = true;
                    break;
                case 'S':
                case 's':
                case "ArrowDown":
                    Binds.down = true;
                    break;
                case 'D':
                case 'd':
                case "ArrowRight":
                    Binds.right = true;
                    break;
                case 'A':
                case 'a':
                case "ArrowLeft":
                    Binds.left = true;
                    break;
            }
        })
        // Detecta quando usuário solta um botão de movimentação
        playarea.addEventListener("keyup", function (e) {
            switch (e.key) {
                case 'W':
                case 'w':
                case "ArrowUp":
                    Binds.up = false;
                    break;
                case 'S':
                case 's':
                case "ArrowDown":
                    Binds.down = false;
                    break;
                case 'D':
                case 'd':
                case "ArrowRight":
                    Binds.right = false;
                    break;
                case 'A':
                case 'a':
                case "ArrowLeft":
                    Binds.left = false;
                    break;
            }
        })

        playarea.addEventListener("keydown", function (e) {
            if (e.keyCode == 32) {
                Player.attack()
            }
            if (e.keyCode == 16) {
                Player.run()
                Binds.run == true
            }
            if (e.keyCode == 13) {
                Enemy.alwaysCheck()
            }
        })

        playarea.addEventListener("keyup", function (e) {
            if (e.keyCode == 16) {
                Player.walk()
                Binds.run == false
            }
        })

        // Log dos estados de movimentação de acordo com as teclas pressionadas
        // playarea.addEventListener("keypress", () => {
        //     console.clear()
        //     console.log(`log
        //         up: ${Binds.up}
        //         down: ${Binds.down}
        //         right: ${Binds.right}
        //         left: ${Binds.left}
        //         `)
        // })
    }
}

Binds.inicializar()