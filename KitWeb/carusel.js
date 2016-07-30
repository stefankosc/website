//function to keep everything in local scope
(function() {
    var isTransitioning;
    var kitties = document.getElementsByClassName('kitty');
    var dots = [].slice.call(document.getElementsByClassName('dot'));
    var current = 0;
    var next = 1;
    var timer;
    var numKitties = kitties.length;

    dots.forEach(function(dot, i) {
        dot.addEventListener('click', function clicked() {
            if (this.classList.contains('currentDot')) {
                return;
            }
            if (isTransitioning) {
                return;
            }
            clearTimeout(timer);
            next = i;
            changeState();
        })
    })

    var timer = setTimeout(changeState, 2000);

    function changeState() {

        kitties[current].addEventListener('transitionend', function transitionFunction () {
            this.removeEventListener('transitionend', transitionFunction);
            timer = setTimeout(changeState, 5000);
            console.log(timer);
            this.classList.remove('left');
            this.classList.add('right');
            });
        kitties[next].classList.remove('right');
        kitties[current].classList.add('left');
        setDot(next);
        current = next;
        next = current +1;
        if (next >= numKitties) {
            next = 0;
        };
        console.log(next);


        isTransitioning = false;
    };
    function setDot(n) {
        for (var i = 0; dots[i]; i++) {
            dots[i].classList.remove('currentDot');
        }
        dots[n].classList.add('currentDot');
    }

})();
