//function to keep everything in local scope
(function() {
    var isTransitioning;
    var kitties = document.getElementsByClassName('kitty');
    var dots = [].slice.call(document.getElementsByClassName('dot'));
    var current = 0;
    var next = 1;
    var timer;

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
            this.removeEventListener('click', clicked);
            changeState();
        })
    })

    var timer = setTimeout(changeState, 2000);

    function changeState() {
        kitties[current].addEventListener('transitionend', function transitionFunction () {
            this.removeEventListener('transitionend', transitionFunction);
            setTimeout(changeState, 5000);

            this.classList.remove('left');
            this.classList.add('right');
            });
        kitties[next].classList.remove('right');
        kitties[current].classList.add('left');
        setDot(next);
        if (current == kitties.length-1) {
            current = 0;
        } else {
            current++;
        }
        if (next == kitties.length-1) {
            next = 0;
        } else {
            next++;
        }
        isTransitioning = false;
    };
    function setDot(n) {
        for (var i = 0; dots[i]; i++) {
            dots[i].classList.remove('currentDot');
        }
        dots[n].classList.add('currentDot');
    }

})();
