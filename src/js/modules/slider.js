const slider = (slides, direction, btnPrev, btnNext) => {
    let slideIndex = 1,
        paused;
    const items = document.querySelectorAll(slides);

    function showSlide(n) {
        if (n > items.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(elem => {
            elem.style.display = 'none';
            elem.classList.add('animated');
        });

        items[slideIndex - 1].style.display = 'block';
    }

    showSlide(slideIndex);

    try {
        const prev = document.querySelector(btnPrev),
            next = document.querySelector(btnNext);

        prev.addEventListener('click', function () {
            slideIndex -= 1;
            showSlide(slideIndex);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });
        next.addEventListener('click', function () {
            slideIndex += 1;
            showSlide(slideIndex);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });
    } catch (e) {}

    function activateAnimation() {
        if (direction == 'vertical') {
            paused = setInterval(() => {
                slideIndex += 1;
                showSlide(slideIndex);
                items[slideIndex - 1].classList.add('zoomInDown');
            }, 5000);
        } else {
            paused = setInterval(() => {
                slideIndex += 1;
                showSlide(slideIndex);
                items[slideIndex - 1].classList.remove('slideInLeft');
                items[slideIndex - 1].classList.add('slideInRight');
            }, 4000);
        }
    }

    activateAnimation();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });

};

export default slider;