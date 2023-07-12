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

                // using some array method on buttons array to check if any button has the same id as clicked button id
                if(buttons.some((button) => button.getAttribute("id") === clickedButtonId)){
                    if(clickedButtonId === "feed"){
                        alert("Feeding tool activated. Press 't' to feed kitty some treats!");
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
                    }
                    else if(clickedButtonId === "pet"){
                        alert("Petting mode activated. Press 'p' to pet kitty!");
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
                        document.querySelector("#custom_cursor").setAttribute("pet", {});
                    }
                    else if(clickedButtonId === "groom"){
                        alert("Grooming tool activated. Press 'g' to begin grooming kitty!");
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
                        document.querySelector("#brush_model").setAttribute("visible", true);
                        document.querySelector("#brush_model").setAttribute("rotation", {x: 15, y: 0, z: 180});
                        document.querySelector("#brush_model").setAttribute("groom", {});
                    }
                }
            }
        })
    }
});