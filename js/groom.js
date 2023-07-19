AFRAME.registerComponent("groom", {
    init: function(){
        // initializing the lastKeyPressTime property
        this.lastKeyPressTime = null;

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

        window.addEventListener("keydown", (e) => {
            var press = document.querySelector("#feedEntity").getAttribute("feed")["toolState"];
            console.log("press is: ", press);
            if(e.key === "g" && press === "groomState"){
                console.log("groom is working????")
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

                var cursor = document.querySelector("#custom_cursor_groom");
                cursor.setAttribute("visible", true);

                // reversing direction when animation is complete
                cursor.addEventListener("animationcomplete", () => {
                    cursor.setAttribute("animation", {
                        dir: cursor.getAttribute("attribute").dir === "normal" ? "reverse" : "normal"
                    });
                });

                const groomCursorAnimation = cursor.components.animation;
                const brushAnimation = brush.components.animation;

                if(groomCursorAnimation){
                    groomCursorAnimation.play();
                    console.log("PLAY GROOM ANIMATION PLSSSS");
                }
                if(brushAnimation){
                    brushAnimation.play();
                }

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