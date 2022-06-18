function setup(){
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent('canvas');
}

function draw(){
    clear();
    background(200);
    noStroke();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}