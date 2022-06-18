var shroom;
function preload(){
    shroom = loadImage('assets/mushroom.png')
}

function setup(){
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent('canvas');
    imageMode(CENTER)
}

var x = y = 50
function draw(){
    clear();
    background(255)
    noStroke()
    image(shroom, x, y)
    game.update()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged(){
    x += (mouseX - x) / 5
    y += (mouseY - y) / 5
}