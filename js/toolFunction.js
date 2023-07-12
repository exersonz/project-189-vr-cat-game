AFRAME.registerComponent("feed", {
    init: function(){
        this.feed();
    },
    feed: function(){
        window.addEventListener("keydown", (e) => {
            if(e.key === 't'){
                var kittyTreat = document.createElement("a-entity");
                kittyTreat.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.05
                });
                kittyTreat.setAttribute("material", "color", "#8f6d50");
                kittyTreat.setAttribute("position", {x: 0, y: 1, z: -0.8});

                var camera = document.querySelector("#camera").object3D;
                
                // getting camera direction as Three.js vector
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);

                // setting velocity and its direction
                kittyTreat.setAttribute("velocity", direction.multiplyScalar(-5));

                var mainScene = document.querySelector("#mainScene")

                // setting kitty treat as a dynamic body
                kittyTreat.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: "0"
                });

                // adding collide event with kitty treat
                kittyTreat.addEventListener("collide", (e) => {
                    this.removeTreat(e);
                });

                mainScene.appendChild(kittyTreat);
            }
        });
    },
    removeTreat: function(e){
        var element = e.detail.target.el;
        var elementHit = e.detail.body.el;

        console.log("OG ENTITY (TREAT): ", element);
        console.log("TOUCHED ENTITY (CAT): ", elementHit);

        if(elementHit.id.includes("main_kitty")){
            // impulse and point vector
            var impulse = new CANNON.Vec3(-2, 2, 1);
            var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"));

            elementHit.body.applyImpulse(impulse, worldPoint);

            // remove event listener
            element.removeEventListener("collide", this.removeTreat);

            // playing meow sound effect
            this.meow();

            // removing treats from scene
            var scene = document.querySelector("#mainScene");
            scene.removeChild(element);
        }
    },
    meow: function(){
        var sound = new Howl({
            src: ['./assets/Short-meow-sound-effect.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.5
        });

        sound.play();
    }
});

AFRAME.registerComponent("pet", {
    init: function(){
        window.addEventListener("keydown", function(e){
            if(e.key === "p"){
                // setting initial position and rotation
                var cursor = document.querySelector("#custom_cursor");

                // defining the animation for bouncing left to right in curved motion
                cursor.setAttribute("animation", {
                    property: "position",
                    dur: 2000, // duration in milliseconds
                    from: "-0.2 0 -1", // starting position
                    to: "0.2 0 -1", // end position
                    easing: "easeInOutQuad", // easing function that provides smooth acceleration and deceleration effects
                    loop: true, // looping the animation
                    dir: "alternate" // alternating direction (left to right and back)
                });

                // listening for the "animationcomplete" event
                cursor.addEventListener("animationcomplete", () => {
                    // reversing the direction when animation completes
                    cursor.setAttribute("animation", {
                        dir: cursor.getAttribute("attribute").dir === "normal" ? "reverse" : "normal"
                    });
                });
            }
        });
    },
    meow: function(){
        var sound = new Howl({
            src: ['./assets/Short-meow-sound-effect.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.5
        });

        sound.play();
    }
});

AFRAME.registerComponent("groom", {
    init: function(){
        window.addEventListener("keydown", function(e){
            if(e.key === "g"){
                var brush = document.querySelector("#brush_model");

                // defining animation for moving front and back
                brush.setAttribute("animation", {
                    property: "position",
                    from: "0 0.2 -1.7",
                    to: "0 0.2 -2.1",
                    easing: "easeInOutQuad",
                    loop: true,
                    dir: "alternate"
                });

                // reversing direction when animation is complete
                brush.addEventListener("animationcomplete", () => {
                    brush.setAttribute("animation", {
                        dir: brush.getAttribute("attribute").dir === "normal" ? "reverse" : "normal"
                    });
                });

                var cursor = document.querySelector("#custom_cursor");

                // defining animation for moving front and back
                cursor.setAttribute("animation", {
                    property: "position",
                    from: "0 0 -1",
                    to: "0 0 -1.3",
                    easing: "easeInOutQuad",
                    loop: true,
                    dir: "alternate"
                });

                // reversing direction when animation is complete
                cursor.addEventListener("animationcomplete", () => {
                    cursor.setAttribute("animation", {
                        dir: cursor.getAttribute("attribute").dir === "normal" ? "reverse" : "normal"
                    });
                });
            }
        });
    },
    meow: function(){
        var sound = new Howl({
            src: ['./assets/Short-meow-sound-effect.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.5
        });

        sound.play();
    }
});