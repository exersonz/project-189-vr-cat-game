AFRAME.registerComponent("feed", {
    init: function () {
      this.handleKeyPress();

      // initializing the lastKeyPressTime property
      this.lastKeyPressTime = null;

      // declaring a variable to hold reference to the interval
      this.meowSoundInterval = null;
      this.angryMeowSoundInterval = null;

      setInterval(() => {
        if(this.lastKeyPressTime !== null){
            var currentTime = Date.now();
            var elapsedTime = currentTime - this.lastKeyPressTime;

            // defining threshold duration in milliseconds
            var threshold = 120000;

            // checking if elapsed time > threshold
            if(elapsedTime > threshold){                
                if(!this.angryMeowSoundInterval){
                    this.angryMeowSoundInterval = setInterval(this.angryMeow, 5000);
                }

                document.querySelector("#upset_kitty").setAttribute("visible", true);
                document.querySelector("#main_kitty").setAttribute("visible", false);
            }
            else{
                document.querySelector("#upset_kitty").setAttribute("visible", false);
                document.querySelector("#main_kitty").setAttribute("visible", true);  
            }
        }
      }, 1000);
    },
    handleKeyPress: function () {
      let debounceTimeout = null;
      const debounceDelay = 800;
  
      window.addEventListener("keydown", (e) => {
        if (e.key === "t") {
          if (!debounceTimeout) {
            this.feed();
            debounceTimeout = setTimeout(() => {
              debounceTimeout = null;
            }, debounceDelay);

            // updating the lastKeyPressTime with current time
            this.lastKeyPressTime = Date.now();
            console.log("last key press time: ", this.lastKeyPressTime);

            this.meowSoundInterval = setInterval(this.meow, 5000);
          }
        }
        else if(e.key === "p" || e.key === "g"){
            clearInterval(this.meowSoundInterval);
            this.meowSoundInterval = null;
            console.log("SOUND REMOVEDDDDDDD");
        }
      });
    },
    feed: function () {
      var kittyTreat = document.createElement("a-entity");
      kittyTreat.setAttribute("geometry", {
        primitive: "sphere",
        radius: 0.05,
      });
      kittyTreat.setAttribute("material", "color", "#8f6d50");
      kittyTreat.setAttribute("position", { x: 0, y: 1, z: -0.8 });
  
      var camera = document.querySelector("#camera").object3D;
  
      // getting camera direction as Three.js vector
      var direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
  
      // setting velocity and its direction
      kittyTreat.setAttribute("velocity", direction.multiplyScalar(-5));
  
      var mainScene = document.querySelector("#mainScene");
  
      // setting kitty treat as a dynamic body
      kittyTreat.setAttribute("dynamic-body", {
        shape: "sphere",
        mass: "0",
      });
  
      // adding collide event with kitty treat
      kittyTreat.addEventListener("collide", (e) => {
        this.removeTreat(e);
      });
  
      mainScene.appendChild(kittyTreat);
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
            element.removeEventListener("collide", this.removeTreat.bind(this));

            // playing meow sound effect
            this.meow();

            // removing treats from scene
            var scene = document.querySelector("#mainScene");
            scene.removeChild(element);
        }
    },
    meow: function(){
        var sound = new Howl({
            src: ['./assets/meow.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.5
        });

        sound.play();
    },
    angryMeow: function(){
        var sound = new Howl({
            src: ['./assets/angry_meow.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.5
        });
        sound.play();
    }
});

AFRAME.registerComponent("pet", {
    init: function(){
        // initializing the lastKeyPressTime property
        this.lastKeyPressTime = null;

        this.meowSoundInterval = null;
        this.angryMeowSoundInterval = null;

        setInterval(() => {
            if(this.lastKeyPressTime !== null){
                var currentTime = Date.now();
                var elapsedTime = currentTime - this.lastKeyPressTime;
                console.log("elasped time: ", elapsedTime);

                // defining threshold duration in milliseconds
                var threshold = 120000;

                // checking if elapsed time > threshold
                if(elapsedTime > threshold){
                    if(!this.angryMeowSoundInterval){
                        this.angryMeowSoundInterval = setInterval(this.angryMeow, 8000);
                    }

                    document.querySelector("#upset_kitty").setAttribute("visible", true);
                    document.querySelector("#main_kitty").setAttribute("visible", false);
                }
                else{
                    document.querySelector("#upset_kitty").setAttribute("visible", false);
                    document.querySelector("#main_kitty").setAttribute("visible", true);  
                }
            }
        }, 1000);

        window.addEventListener("keydown", (e) => {
            if(e.key === "p" && document.querySelector("#pet").getAttribute("material").color === "#2a79f7"){
                this.lastKeyPressTime = Date.now();

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

                this.meowSoundInterval = setInterval(this.meow, 5000);
            }
            else if(e.key === "g" && document.querySelector("#groom").getAttribute("material").color === "#2a79f7"){
                clearInterval(this.meowSoundInterval);
                this.meowSoundInterval = null;
            }
            else if(e.key === "t" && !document.querySelector("#upset_kitty").getAttribute("visible")){
                clearInterval(this.meowSoundInterval);
                this.meowSoundInterval = null;
            }
        });
    },
    meow: function(){
        var sound = new Howl({
            src: ['./assets/meow.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.5
        });
        sound.play();
    },
    angryMeow: function(){
        var sound = new Howl({
            src: ['./assets/angry_meow.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.5
        });
        sound.play();
    }
});

AFRAME.registerComponent("groom", {
    init: function(){
        // initializing the lastKeyPressTime property
        this.lastKeyPressTime = null;

        this.meowSoundInterval = null;

        setInterval(() => {
            if(this.lastKeyPressTime !== null){
                var currentTime = Date.now();
                var elapsedTime = currentTime - this.lastKeyPressTime;

                // defining threshold duration in milliseconds
                var threshold = 120000;

                // checking if elapsed time > threshold
                if(elapsedTime > threshold){
                    setInterval(() => {
                        var sound = new Howl({
                            src: ['./assets/angry_meow.mp3'],
                            autoplay: false,
                            loop: false,
                            volume: 0.5
                        });
                        sound.play();
                    }, 5000);

                    document.querySelector("#upset_kitty").setAttribute("visible", true);
                    document.querySelector("#main_kitty").setAttribute("visible", false);
                }
                else{
                    document.querySelector("#upset_kitty").setAttribute("visible", false);
                    document.querySelector("#main_kitty").setAttribute("visible", true);  
                }
            }
        }, 1000);

        window.addEventListener("keydown", (e) => {
            if(e.key === "g" && document.querySelector("#groom").getAttribute("material").color === "#2a79f7"){
                this.lastKeyPressTime = Date.now();

                var brush = document.querySelector("#brush_model");

                // defining animation for moving front and back
                brush.setAttribute("animation", {
                    property: "position",
                    dur: 1000,
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
                //cursor.components.animation.play();

                // defining animation for moving front and back
                cursor.setAttribute("animation", {
                    property: "position",
                    dur: 1000,
                    from: "0 0 -1",
                    to: "0 0 -1.4",
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

                this.meowSoundInterval = setInterval(this.meow, 5000);
            }
            else if(e.key === "t" && !document.querySelector("#upset_kitty").getAttribute("visible")){
                clearInterval(this.meowSoundInterval);
                this.meowSoundInterval = null;
            }
            else if(e.key === "p" && document.querySelector("#pet").getAttribute("material").color === "#2a79f7"){
                clearInterval(this.meowSoundInterval);
                this.meowSoundInterval = null;
            }
        });
    },
    meow: function(){
        var sound = new Howl({
            src: ['./assets/meow.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.5
        });
        sound.play();
    }
});