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

    static inicializar() {
        var playarea = document.querySelector("body")

        // Binds de movimentação:
        // Detecta quando usuário aperta um botão de movimentação
        playarea.addEventListener("keydown", function (e) {
            switch (e.key.toLowerCase()) {
                case 'w':
                case "ArrowUp":
                    Binds.up = true;
                    break;
                case 's':
                case "ArrowDown":
                    Binds.down = true;
                    break;
                case 'd':
                case "ArrowRight":
                    Binds.right = true;
                    break;
                case 'a':
                case "ArrowLeft":
                    Binds.left = true;
                    break;
            }
        })
        // Detecta quando usuário solta um botão de movimentação
        playarea.addEventListener("keyup", function (e) {
            switch (e.key.toLowerCase()) {
                case 'w':
                case "ArrowUp":
                    Binds.up = false;
                    break;
                case 's':
                case "ArrowDown":
                    Binds.down = false;
                    break;
                case 'd':
                case "ArrowRight":
                    Binds.right = false;
                    break;
                case 'a':
                case "ArrowLeft":
                    Binds.left = false;
                    break;
            }
        })

        playarea.addEventListener("keydown", function (e){
            if(e.keyCode == 32){
                Player.attack()
            }
            if(e.keyCode == 16){
                Player.run()
            }
            if(e.keyCode == 13){
                Enemy.alwaysCheck()
            }
        })

        playarea.addEventListener("keyup", function(e){
            if (e.keyCode == 16){
                Player.walk()
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