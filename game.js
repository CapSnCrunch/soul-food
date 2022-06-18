class Game {
    constructor(state='home'){
        this.state = state
    }

    update(){
        fill(0)
        rect(0, 0, 50, 50)
    }
}

var game = new Game()