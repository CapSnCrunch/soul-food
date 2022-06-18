var shroom;
function preload(){
    shroom = loadImage('assets/mushroom-2.png')
}

function setup(){
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent('canvas');
    imageMode(CENTER)
}

var x = y = 50;
var dragging = false;
function draw(){
    clear();
    background(255);
    noStroke();
    image(shroom, x, y);
    game.update();
    if (dragging){        
        x += (mouseX - x) / 5
        y += (mouseY - y) / 5
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
    dragging = true;
}

function mouseReleased(){
    dragging = false;
}