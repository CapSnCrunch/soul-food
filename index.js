
function setup(){
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent('canvas');
    imageMode(CENTER)
}

let scaleFactor = 1;
function draw(){
    clear();
    background(0)
    translate(windowWidth/2, windowHeight/2);
    scale(scaleFactor);
    image(imageMap.get("background"), 0, 0);
    translate(-windowWidth/2, -windowHeight/2);
    noStroke()
    fill(255,0,0)
    ellipse(mouseX, mouseY, 10, 10)
    //image(shroom, x, y)
    game.update()
    game.draw()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    scaleFactor = Math.min(windowWidth/imageMap.get("background").width, windowHeight/imageMap.get("background").height);
}
windowResized