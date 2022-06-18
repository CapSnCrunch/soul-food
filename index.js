
function setup(){
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent('canvas');
    imageMode(CENTER)
}

function draw(){
    clear();
    background(255)
    noStroke()
    //image(shroom, x, y)
    game.update()
    game.draw()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    game.mousePressed();
}

function mouseReleased() {
    game.mouseReleased();
}

function mouseDragged() {
    game.mousePressed();
}