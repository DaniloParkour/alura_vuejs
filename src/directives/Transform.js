import Vue from "vue";

//Create a directive with a Global View Object (v-directiveName)
Vue.directive('rotate-transform', {

    //The "el" is the element reference that the directive is associated
    bind(el, binding, vnode) {

        let current = 0;
        let increm = 90;
        let anima = false;
        let animTime = 0.5;

        //v-rotate-transform="{ increment: 20, animation: true, animationTime: 0.2 }"
        
        el.addEventListener('dblclick', function() {
        if(binding.value) {
            increm = binding.value.increment;
            anima = binding.value.animation;
            animTime = binding.value.animationTime;
        }

        current += increm;

        if(anima) {
            this.style.transition = this.style.transition = `transform ${animTime}s`;
            console.log("Animated! " + animTime + " seconds.");
        }

        this.style.transform = `rotate(${current}deg)`;

      });
    }

});