AFRAME.registerComponent("pet", {
    init: function(){
        // initializing the lastKeyPressTime property
        this.lastKeyPressTime = null;

        this.meowSoundInterval = null;
        this.angryMeowSoundInterval = null;

        if(this.lastKeyPressTime !== null){
            var currentTime = Date.now();
            var elapsedTime = currentTime - this.lastKeyPressTime;
            console.log("elasped time: ", elapsedTime);

            // defining threshold duration in milliseconds
            var threshold = 1000;

            // checking if elapsed time > threshold
            if(elapsedTime > threshold){
                // updating catState when angry cat appears
                document.querySelector("#feedEntity").setAttribute("feed", {
                    catState: "angry"
                });

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

        window.addEventListener("keydown", (e) => {
            var press = document.querySelector("#feedEntity").getAttribute("feed")["toolState"];
            console.log("press is: ", press);
            if(e.key === "p" && press === "petState"){
                console.log("pet is working");
                this.lastKeyPressTime = Date.now();

                var cursor = document.querySelector("#custom_cursor_pet");
                cursor.setAttribute("position", {x: -0.2, y: 0, z: -1});

                // listening for the "animationcomplete" event
                cursor.addEventListener("animationcomplete", () => {
                    // reversing the direction when animation completes
                    cursor.setAttribute("animation", {
                        dir: cursor.getAttribute("attribute").dir === "normal" ? "reverse" : "normal"
                    });
                });

                const petCursorAnimation = cursor.components.animation;

                // unpausing pet cursor animation
                if(petCursorAnimation){
                    petCursorAnimation.play();
                    console.log("PLAY PET ANIMATION PLSSSS");
                }

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