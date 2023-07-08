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
        })
    }
});

/*
AFRAME.registerComponent("add-image", {
    init: async function(){
        var toolsContainer = document.querySelector("#toolsContainer");
        var assets = await this.getAsset();

        assets.map(asset => {
            // creating hand, feed, bathe, and groom images
            var image = document.createElement("a-image");
            image.setAttribute("id", asset.id);
            image.setAttribute("src", asset.image_url);
            image.setAttribute("position", asset.geometry.position);
            image.setAttribute("width", asset.geometry.width);
            image.setAttribute("height", asset.geometry.height);
            image.setAttribute("tool-clicked", {});
            toolsContainer.appendChild(image);
        });
    },
    getAsset: async function(){
        return await firebase
        .firestore()
        .collection("images")
        .get()
        .then(snap => {
            return snap.docs.map(doc => doc.data());
        })
    }
});*/