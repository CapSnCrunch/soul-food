

class Game {
    constructor(state='home'){
        this.state = state
        this.gameObjects = [];

        this.mouseDown = false;
        this.draggedEntity = null;
        this.selectionRadius = 200;

        this.gravity = new Vec2(0,0.2);
	    this.friction = 0.99;
	    this.groundFriction = 0.8;

        this.gameObjects.push(new Mushroom(40, 40));
    }

    bounds(particle) {

        let scaledWidth = windowWidth / scaleFactor;
        let scaledHeight = windowHeight / scaleFactor;

        if (particle.pos.y < -scaledHeight/2) // full height to allow off screen bounds
			particle.pos.y = -scaledHeight/2;

		if (particle.pos.y > scaledHeight/2)
			particle.pos.y = scaledHeight/2;
		
		if (particle.pos.x < -scaledWidth/2)
			particle.pos.x = -scaledWidth/2;

		if (particle.pos.x > scaledWidth/2)
			particle.pos.x = scaledWidth/2;
	}

    update() {
        for(let gameObject of this.gameObjects) {
            gameObject.update();
        }

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
            this.draggedEntity.pos.mutableSetToCoords(scaledMouseX, scaledMouseY);
            
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

    mousePressed() {
		this.mouseDown = true;
		var nearest = this.nearestEntity();
		if (nearest != null) {
			this.draggedEntity = nearest;
		}
	};
	
	mouseReleased() {
		this.mouseDown = false;
        if(this.draggedEntity != null) {
            console.log("not null");
        }
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
                var d2 = particles[i].pos.dist2WithCoords(scaledMouseX, scaledMouseY);
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