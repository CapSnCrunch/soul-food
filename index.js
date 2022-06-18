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
<<<<<<< HEAD
    background(200);
    noStroke();
=======
    background(255)
    noStroke()
    image(shroom, x, y)
    game.update()
>>>>>>> ef033118c4bc43611a1d92c8172265e1113497e0
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged(){
    x += (mouseX - x) / 5
    y += (mouseY - y) / 5
}