class Holdable extends VerletJS.Composite {
    constructor(x, y) {
        super();
        this.particles.push(new Particle(new Vec2(x, y)));
    }

    update() {
        
    }

    getX() {
        return this.particles[0].pos.x;
    }

    getY() {
        return this.particles[0].pos.y;
    }

    draw() {
        fill(0);
        ellipse(this.getX()-5, this.getY()-5, 10, 10);
    }
}

class Mushroom extends Holdable{
    constructor(x, y) {
        super(x, y);
    }

    draw() {
        image(imageMap.get("shroom"), this.getX(), this.getY())
    }
}