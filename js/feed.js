AFRAME.registerComponent("feed", {
  schema: {
    toolState: {default: "", value: "string"},
    catState: {default: "", value: "string"}
  },
  init: function(){
    this.handleKeyPress();

    // initializing the lastKeyPressTime property
    this.lastKeyPressTime = null;

    // declaring a variable to hold reference to the interval
    this.meowSoundInterval = null;
    this.angryMeowSoundInterval = null;

    if(this.lastKeyPressTime !== null){
      var currentTime = Date.now();
      var elapsedTime = currentTime - this.lastKeyPressTime;

      // defining threshold duration in milliseconds
      var threshold = 1000;

      // checking if elapsed time > threshold
      if(elapsedTime > threshold){ 
        // updating catState when angry cat appears
        document.querySelector("#feedEntity").setAttribute("feed", {
          catState: "angry"
        });         

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
  },
  handleKeyPress: function(){
    let debounceTimeout = null;
    const debounceDelay = 800;

    window.addEventListener("keydown", (e) => {
      var press = document.querySelector("#feedEntity").getAttribute("feed")["toolState"];
      console.log("press is: ", press);
      
      if (e.key === "f" && press === "feedState") {
        console.log("feed is working");
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