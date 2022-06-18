
function setup(){
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent('canvas');
    imageMode(CENTER);
    windowResized();
}

let scaleFactor = 1;
var scaledMouseX, scaledMouseY;
function draw(){
    clear();
    background(0)
    
    translate(windowWidth/2, windowHeight/2);
    scale(scaleFactor);
    image(imageMap.get("background"), 0, 0);

    fill(255,0,0);
    ellipse(scaledMouseX, scaledMouseY, 10, 10);

    game.update()
    game.draw()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    scaleFactor = Math.min(windowWidth/imageMap.get("background").width, windowHeight/imageMap.get("background").height);
}

function mousePressed() {
    scaledMouseX = (mouseX - windowWidth/2)/scaleFactor
    scaledMouseY = (mouseY - windowHeight/2)/scaleFactor
    game.mousePressed();
}

function mouseReleased() {
    scaledMouseX = (mouseX - windowWidth/2)/scaleFactor
    scaledMouseY = (mouseY - windowHeight/2)/scaleFactor
    game.mouseReleased();
}

function mouseDragged() {
    scaledMouseX = (mouseX - windowWidth/2)/scaleFactor
    scaledMouseY = (mouseY - windowHeight/2)/scaleFactor
    game.mousePressed();
}

function mouseMoved(){
    scaledMouseX = (mouseX - windowWidth/2)/scaleFactor
    scaledMouseY = (mouseY - windowHeight/2)/scaleFactor
}