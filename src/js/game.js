class Game{
    static currentLevel = 0;
    static iniciar(){

        Player.player.style.left = `${Player.x1}px`
        Player.player.style.top = `${Player.y1}px`
        var intervalo = setInterval(() => {
            if (Binds.up == true || Binds.down == true || Binds.left == true || Binds.right == true){
                Player.canPlayerMove()
            }
        }, 1);
    }
}

Game.iniciar()