AFRAME.registerComponent("add-element", {
    init: async function(){
        var scene = document.querySelector("#mainScene");
        var assets = await this.getAsset();

        assets.map(asset => {
            // creating 3D cat model and cute room model
            var model = document.createElement("a-entity");
            model.setAttribute("id", asset.id);
            model.setAttribute("gltf-model", asset.gltf_model_url);
            model.setAttribute("position", asset.geometry.position);
            model.setAttribute("scale", asset.geometry.scale);
            model.setAttribute("visible", asset.visible);
            scene.appendChild(model);
        });
    },
    getAsset: async function(){
        return await firebase
        .firestore()
        .collection("assets")
        .get()
        .then(snap => {
            return snap.docs.map(doc => doc.data());
        });
    }
});

AFRAME.registerComponent("add-tool", {
    init: async function(){
        var actionContainer = document.querySelector("#actionContainer");
        var tools = await this.getTools();

        tools.map(tool => {
            // creating 3D cat model and cute room model
            var model = document.createElement("a-entity");
            model.setAttribute("id", tool.id);
            model.setAttribute("gltf-model", tool.gltf_model_url);
            model.setAttribute("position", tool.geometry.position);
            model.setAttribute("scale", tool.geometry.scale);
            model.setAttribute("visible", tool.visible);
            actionContainer.appendChild(model);
        });
    },
    getTools: async function(){
        return await firebase
        .firestore()
        .collection("tools")
        .get()
        .then(snap => {
            return snap.docs.map(doc => doc.data());
        });
    }
});

AFRAME.registerComponent("create-buttons", {
    init: function(){
       this.createButtons();
    },
    createButtons: function(){
        const images = [
            {
              id: "feed",
              title: "Feed",
              url: "https://raw.githubusercontent.com/exersonz/vr-cat-game-assets/main/food.png",
            },
            {
              id: "pet",
              title: "Pet",
              url: "https://raw.githubusercontent.com/exersonz/vr-cat-game-assets/main/pet.png",
            },
      
            {
              id: "groom",
              title: "Groom",
              url: "https://raw.githubusercontent.com/exersonz/vr-cat-game-assets/main/groom.png",
            }
        ];

        const camera = document.querySelector("#camera");

        var previousYPosition = 1.65;

        for(var item of images){
            const posX = 2.25;
            const posY = previousYPosition - 0.8;
            const posZ = -1.8;
            previousYPosition = posY
            const position = {x: posX, y: posY, z: posZ}

            const borderEl = this.createBorder(position, item.id);
            camera.appendChild(borderEl);

            const buttonImageEl = this.createButtomImg(item);
            borderEl.appendChild(buttonImageEl);
        }
    },
    createBorder: function(position, id){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("id", id);
        entityEl.setAttribute("geometry", {
            primitive: "ring",
            radiusInner: 0.2,
            radiusOuter: 0.25
        });
        entityEl.setAttribute("material", {
            color: "#84a98a",
            opacity: 0.6
        });
        entityEl.setAttribute("position", position);
        entityEl.setAttribute("visible", true);

        return entityEl;
    },
    createButtomImg: function(item){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("id", item.id);
        entityEl.setAttribute("geometry", {
            primitive: "circle",
            radius: 0.2
        });
        entityEl.setAttribute("scale", {x: 0.85, y: 0.85, z: 0.85});
        entityEl.setAttribute("material", {
            src: item.url,
            transparent: true,
            alphaTest: 0.5
        });
        entityEl.setAttribute("visible", true);
        return entityEl;
    }
});