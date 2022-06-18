class Holdable {
    constructor(x, y) {
        this.pos = new Vec2(x, y);
    }

    draw() {
        fill(0);
        rect(10, 10, 20, 20);
    }
}