
function setup(){
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent('canvas');
    imageMode(CENTER);
    windowResized();
}

let scaleFactor = 1;
function draw(){
    clear();
    background(0)
    
    translate(windowWidth/2, windowHeight/2);
    scale(scaleFactor);
    image(imageMap.get("background"), 0, 0);

    game.update()
    game.draw()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    scaleFactor = Math.min(windowWidth/imageMap.get("background").width, windowHeight/imageMap.get("background").height);
}

function mousePressed() {
    game.mousePressed((mouseX - windowWidth/2)/scaleFactor, (mouseY - windowHeight/2)/scaleFactor);
}

function mouseReleased() {
    game.mouseReleased((mouseX - windowWidth/2)/scaleFactor, (mouseY - windowHeight/2)/scaleFactor);
}

function mouseDragged() {
    game.mousePressed((mouseX - windowWidth/2)/scaleFactor, (mouseY - windowHeight/2)/scaleFactor);
}
