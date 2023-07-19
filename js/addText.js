var text = {
    "0": {
        value: "Fun fact: Cats can jump 5 times their own height. Impressive, right?"
    },
    "1": {
        value: "Tip: Keep your cat cool when temperatures rise!"
    },
    "2": {
        value: "Care tip: Ensure the water you provide to your cat is fresh and clean and that there's always enough for them to stay hydrated!"
    },
    "3": {
        value: "Cat fact: These little feline friends usually sleep around an average of 15 hours per day. It must be awesome to live like a cat!"
    },
    "4": {
        value: "Pet tip: Keep kitty pretty by grooming regularly. It also creates some bonding time as well!"
    }
};

AFRAME.registerComponent("add-text", {
    init: function(){
        // getting a random text value after time delay
        setInterval(this.addText, 5000);
    },
    addText: function(){
        const textEl = document.querySelector("#textContainer");

        // convert dictionary object to an array of values
        var textArray = Object.values(text);

        // generating a random index within the range of the array length
        var randomIndex = Math.floor(Math.random() * textArray.length);

        // getting randomly selected text value
        var randomTextValue = textArray[randomIndex].value;

        textEl.setAttribute("text", {
            value: randomTextValue,
            font: "dejavu",
            width: 0.25,
            color: "#000",
            wrapCount: "20"
        });

        textEl.setAttribute("position", {x: -0.3, y: 0, z: -0.5});
        textEl.setAttribute("visible", true);
    }
});