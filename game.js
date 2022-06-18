

class Game {
    constructor(state='home'){
        this.state = state
        this.gameObjects = [];

        this.mouse = new Vec2(0,0);
        this.mouseDown = false;
        this.draggedEntity = null;
        this.selectionRadius = 20;

        this.gravity = new Vec2(0,0.2);
	    this.friction = 0.99;
	    this.groundFriction = 0.8;

        this.gameObjects.push(new Mushroom(40, 40));
    }

    bounds(particle) {
		if (particle.pos.y > this.height-1)
			particle.pos.y = this.height-1;
		
		if (particle.pos.x < 0)
			particle.pos.x = 0;

		if (particle.pos.x > this.width-1)
			particle.pos.x = this.width-1;
	}

    update() {
        for(let gameObject of this.gameObjects) {
            gameObject.update();
        }

        let mouse = new Vec2(mouseX, mouseY);

        var i, j, c;

        for (c in this.gameObjects) {
            for (i in this.gameObjects[c].particles) {
                var particles = this.gameObjects[c].particles;
                
                // calculate velocity
                var velocity = particles[i].pos.sub(particles[i].lastPos).scale(this.friction);
            
                // ground friction
                if (particles[i].pos.y >= this.height-1 && velocity.length2() > 0.000001) {
                    var m = velocity.length();
                    velocity.x /= m;
                    velocity.y /= m;
                    velocity.mutableScale(m*this.groundFriction);
                }
            
                // save last good state
                particles[i].lastPos.mutableSet(particles[i].pos);
            
                // gravity
                particles[i].pos.mutableAdd(this.gravity);
            
                // inertia  
                particles[i].pos.mutableAdd(velocity);
            }
        }
        
        // handle dragging of entities
        if (this.draggedEntity)
            this.draggedEntity.pos.mutableSet(mouse);
            
        let step = deltaTime;
        // relax
        var stepCoef = 1/step;
        for (c in this.gameObjects) {
            var constraints = this.gameObjects[c].constraints;
            for (i=0;i<step;++i)
                for (j in constraints)
                    constraints[j].relax(stepCoef);
        }
        
        // bounds checking
        for (c in this.gameObjects) {
            var particles = this.gameObjects[c].particles;
            for (i in particles)
                this.bounds(particles[i]);
        }
    }

    mouseDownHandler(e) {
		this.mouseDown = true;
		var nearest = this.nearestEntity();
		if (nearest) {
			this.draggedEntity = nearest;
		}
	};
	
	mouseUpHandler(e) {
		this.mouseDown = false;
		this.draggedEntity = null;
	};

    nearestEntity() {
        var c, i;
        var d2Nearest = 0;
        var entity = null;
        var constraintsNearest = null;
        
        // find nearest point
        for (c in this.gameObjects) {
            var particles = this.gameObjects[c].particles;
            for (i in particles) {
                var d2 = particles[i].pos.dist2(this.mouse);
                if (d2 <= this.selectionRadius*this.selectionRadius && (entity == null || d2 < d2Nearest)) {
                    entity = particles[i];
                    constraintsNearest = this.gameObjects[c].constraints;
                    d2Nearest = d2;
                }
            }
        }
        
        // search for pinned constraints for this entity
        for (i in constraintsNearest)
            if (constraintsNearest[i] instanceof PinConstraint && constraintsNearest[i].a == entity)
                entity = constraintsNearest[i];
        
        return entity;
    }

    draw() {
        for(let gameObject of this.gameObjects) {
            gameObject.draw();
        }
    }
}

var game = new Game()