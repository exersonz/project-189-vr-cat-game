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

        // variable to store the current active tool
        let activeTool;
        const cursor = document.querySelector("#custom_cursor");
        const cursorAnimation = cursor.components.animation;

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
                    // pausing previous active tool's animation (if any)
                    if(activeTool && activeTool !== clickedButtonId){
                        const previousButton = document.querySelector(`#${activeTool}`);
                        console.log("previous button: ", previousButton);
                        previousButton.setAttribute("material", {
                            color: "#84a98a",
                            opacity: 0.6
                        });

                        if(activeTool === "pet" || activeTool === "groom" || activeTool === "feed"){
                            // pausing cursor animation
                            if(cursorAnimation){
                                cursorAnimation.pause();
                            }
                        }
                    }

                    // setting new active tool
                    activeTool = clickedButtonId;
                    console.log("active tool: ", activeTool);

                    // handling individual tool interactions
                    if(clickedButtonId === "feed"){
                        var iconUrl = "https://raw.githubusercontent.com/exersonz/vr-cat-game-assets/main/food.png";
                        swal({
                            text: "Press 't' to feed kitty treats!",
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

                        const cursor = document.querySelector("#custom_cursor");
                        cursor.setAttribute("position", {x: 0, y: 0, z: -1});
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

                        const cursor = document.querySelector("#custom_cursor");
                        cursor.setAttribute("position", {x: 0, y: 0, z: -1});
                        cursor.setAttribute("pet", {});
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
                    }
                    else if(clickedButtonId === "feed" || clickedButtonId === "pet"){
                        cursor.setAttribute("position", {x: 0, y: 0, z: -1});

                        const brushAnimation = brush.components.animation;
                        if(brushAnimation){
                            brushAnimation.pause();
                        }
                    }
                }
            }
        });
    }
});