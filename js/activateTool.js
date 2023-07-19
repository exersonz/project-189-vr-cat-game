AFRAME.registerComponent("activate-tool", {
    // specifying the dependency on create-buttons component to ensure it's initalized before "add-tool" component
    dependencies: ["create-buttons"],
    init: function(){
        this.changeAction();
    },
    changeAction: function(){
        // retrieving the child nodes of the toolsContainer and converting them into an array using Array.from()
        // filter() filters out only the elements (nodes of type Node.ELEMENT_NODE) to ensure only button entities are included
        const cameraEl = document.querySelector("#camera");
        const buttons = Array.from(cameraEl.children).filter((node) => node.nodeType === Node.ELEMENT_NODE);
        console.log("button array: ", buttons);

        // listening for key press event on document
        document.addEventListener("keydown", function(event){
            // getting the lowercase value of pressed key
            const key = event.key.toLowerCase();

            // this object associates the specific keys with corresponding buttons
            const idMapping = {
                1: "feed",
                2: "pet",
                3: "groom"
            }

            // checking if pressed key is present in idMapping object using hasOwnProperty()
            if(idMapping.hasOwnProperty(key)){
                const clickedButtonId = idMapping[key];
                console.log("clicked button id: ", clickedButtonId);

                // using some() array method on buttons array to check if any button has the same id as clicked button id
                if(buttons.some((button) => button.getAttribute("id") === clickedButtonId)){
                    // handling individual tool interactions
                    if(clickedButtonId === "feed"){
                        var iconUrl = "https://raw.githubusercontent.com/exersonz/vr-cat-game-assets/main/food.png";
                        swal({
                            text: "Press 'f' to feed kitty treats!",
                            icon: iconUrl,
                            buttons: {
                                cancel: "Got it!"
                            },
                            closeOnClickOutside: false
                        });

                        document.querySelector("#feed").setAttribute("material", {
                            color: "#2a79f7",
                            opacity: 0.6
                        });
                        document.querySelector("#pet").setAttribute("material", {
                            color: "#84a98a",
                            opacity: 0.6
                        });
                        document.querySelector("#groom").setAttribute("material", {
                            color: "#84a98a",
                            opacity: 0.6
                        });

                        document.querySelector("#cat_food_model").setAttribute("visible", true);
                        document.querySelector("#main_kitty").setAttribute("static-body", {});
                        document.querySelector("#brush_model").setAttribute("visible", false);

                        const petCursor = document.querySelector("#custom_cursor_pet");
                        const groomCursor = document.querySelector("#custom_cursor_groom");
                        const feedCursor = document.querySelector("#custom_cursor");

                        // using the feed components toolState all across my other functions so don't be confused
                        // using feedEntity doesn't mean it only applies to feed!!!
                        var feedEntity = document.querySelector("#feedEntity").getAttribute("feed");
                        console.log(feedEntity);
                        document.querySelector("#feedEntity").setAttribute("feed", {
                            toolState: "feedState"
                        });
                        var currentToolState = document.querySelector("#feedEntity").getAttribute("feed")["toolState"];
                        console.log("tool state when 1 is pressed: ", currentToolState);
                        
                        var currentCatState = document.querySelector("#feedEntity").getAttribute("feed")["catState"];
                        console.log("cat state: ", currentCatState);

                        if(currentToolState === "feedState"){
                            feedCursor.setAttribute("visible", true);
                            groomCursor.setAttribute("visible", false);
                            petCursor.setAttribute("visible", false);

                            const petCursorAnimation = petCursor.components.animation;
                            const groomCursorAnimation = groomCursor.components.animation;

                            const brush = document.querySelector("#brush_model");
                            const brushAnimation = brush.components.animation;

                            // pausing pet cursor animation
                            if(petCursorAnimation){
                                petCursorAnimation.pause();
                                console.log("PAUSE PET ANIMATION PLSSSS");
                            }
                            if(groomCursorAnimation){
                                groomCursorAnimation.pause();
                                console.log("PAUSE GROOM ANIMATION PLSSSS");
                            }
                            if(brushAnimation){
                                brushAnimation.pause();
                            }
                        }
                    }
                    else if(clickedButtonId === "pet"){
                        var iconUrl = "https://raw.githubusercontent.com/exersonz/vr-cat-game-assets/main/pet.png";
                        swal({
                            text: "Press 'p' to pet kitty!",
                            icon: iconUrl,
                            buttons: {
                                cancel: "Got it!"
                            },
                            closeOnClickOutside: false
                        });
                        
                        document.querySelector("#pet").setAttribute("material", {
                            color: "#2a79f7",
                            opacity: 0.6
                        });
                        document.querySelector("#feed").setAttribute("material", {
                            color: "#84a98a",
                            opacity: 0.6
                        });
                        document.querySelector("#groom").setAttribute("material", {
                            color: "#84a98a",
                            opacity: 0.6
                        });

                        document.querySelector("#cat_food_model").setAttribute("visible", false);
                        document.querySelector("#brush_model").setAttribute("visible", false);

                        const groomCursor = document.querySelector("#custom_cursor_groom");
                        const feedCursor = document.querySelector("#custom_cursor");
                        const petCursor = document.querySelector("#custom_cursor_pet");
                        petCursor.setAttribute("pet", {});

                        var feedEntity = document.querySelector("#feedEntity").getAttribute("feed");
                        console.log(feedEntity);
                        document.querySelector("#feedEntity").setAttribute("feed", {
                            toolState: "petState"
                        });
                        var currentToolState = document.querySelector("#feedEntity").getAttribute("feed")["toolState"];
                        console.log("tool state when 2 is pressed: ", currentToolState);

                        var currentCatState = document.querySelector("#feedEntity").getAttribute("feed")["catState"];
                        console.log("cat state: ", currentCatState);

                        if(currentToolState === "petState"){
                            feedCursor.setAttribute("visible", false);
                            groomCursor.setAttribute("visible", false);
                            petCursor.setAttribute("visible", true);

                            const groomCursorAnimation = groomCursor.components.animation;
                            const petCursorAnimation = petCursor.components.animation;

                            const brush = document.querySelector("#brush_model");
                            const brushAnimation = brush.components.animation;

                            if(petCursorAnimation){
                                petCursorAnimation.pause();
                                console.log("PAUSE PET ANIMATION PLSSSS");
                            }
                            if(groomCursorAnimation){
                                groomCursorAnimation.pause();
                                console.log("PAUSE GROOM ANIMATION PLSSSS");
                                groomCursor.setAttribute("position", {x: 0, y: 0, z: -1});
                            }
                            if(brushAnimation){
                                brushAnimation.pause();
                            }
                        }
                    }
                    else if(clickedButtonId === "groom"){
                        var iconUrl = "https://raw.githubusercontent.com/exersonz/vr-cat-game-assets/main/groom.png";
                        swal({
                            text: "Press 'g' to groom kitty! ",
                            icon: iconUrl,
                            buttons: {
                                cancel: "Got it!"
                            },
                            closeOnClickOutside: false
                        });
                        document.querySelector("#groom").setAttribute("material", {
                            color: "#2a79f7",
                            opacity: 0.6
                        });
                        document.querySelector("#feed").setAttribute("material", {
                            color: "#84a98a",
                            opacity: 0.6
                        });
                        document.querySelector("#pet").setAttribute("material", {
                            color: "#84a98a",
                            opacity: 0.6
                        });

                        document.querySelector("#cat_food_model").setAttribute("visible", false);

                        const brush = document.querySelector("#brush_model");
                        brush.setAttribute("rotation", {x: 15, y: 0, z: 180});
                        brush.setAttribute("groom", {});
                        brush.setAttribute("visible", true);

                        const petCursor = document.querySelector("#custom_cursor_pet");
                        const groomCursor = document.querySelector("#custom_cursor_groom");
                        const feedCursor = document.querySelector("#custom_cursor");

                        var feedEntity = document.querySelector("#feedEntity").getAttribute("feed");
                        console.log(feedEntity);
                        document.querySelector("#feedEntity").setAttribute("feed", {
                            toolState: "groomState"
                        });
                        var currentToolState = document.querySelector("#feedEntity").getAttribute("feed")["toolState"];
                        console.log("tool state when 3 is pressed: ", currentToolState);

                        if(currentToolState === "groomState"){
                            feedCursor.setAttribute("visible", false);
                            petCursor.setAttribute("visible", false);
                            groomCursor.setAttribute("visible", true);

                            const petCursorAnimation = petCursor.components.animation;
                            const groomCursorAnimation = groomCursor.components.animation;

                            // pausing pet cursor animation
                            if(petCursorAnimation){
                                petCursorAnimation.pause();
                                console.log("PAUSE PET ANIMATION PLSSSS");
                                petCursor.setAttribute("position", {x: -0.2, y: 0, z: -1});
                            }
                            if(groomCursorAnimation){
                                groomCursorAnimation.pause();
                                console.log("PAUSE GROOM ANIMATION PLSSSS");
                                groomCursor.setAttribute("position", {x: 0, y: 0, z: -0.8});
                            }
                        }
                    }
                }
            }

            var currentCatState = document.querySelector("#feedEntity").getAttribute("feed")["catState"];
            console.log("cat state: ", currentCatState);

            if(currentCatState === "angry"){
                feedCursor.setAttribute("visible", true);
                groomCursor.setAttribute("visible", false);
                petCursor.setAttribute("visible", false);

                const petCursorAnimation = petCursor.components.animation;
                const groomCursorAnimation = groomCursor.components.animation;

                const brush = document.querySelector("#brush_model");
                const brushAnimation = brush.components.animation;

                // pausing pet cursor animation
                if(petCursorAnimation){
                    petCursorAnimation.pause();
                    console.log("PAUSE PET ANIMATION PLSSSS");
                }
                if(groomCursorAnimation){
                    groomCursorAnimation.pause();
                    console.log("PAUSE GROOM ANIMATION PLSSSS");
                }
                if(brushAnimation){
                    brushAnimation.pause();
                }

                swal("Oh no, kitty has become angry!", {
                   buttons: {
                       cancel: true
                   } 
                });
            }
        });
    }
});