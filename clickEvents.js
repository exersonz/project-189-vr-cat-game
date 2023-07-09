AFRAME.registerComponent("cursor-listener", {
    init: function(){
       var el = this.el;
       el.addEventListener("click", function(){
           alert("THE " + el.getAttribute("id").toUpperCase() + " IS CLICKED!");
       });
    }
});