AFRAME.registerComponent("tool-clicked", {
    init: function(){
        this.toolClicked();
    },
    toolClicked: function(){
        var bathe = document.getElementById("bathe");
        bathe.addEventListener("click", function(){
            alert("THE BATHE TOOL IS CLICKED!!!!!!!")
        });
    }
});