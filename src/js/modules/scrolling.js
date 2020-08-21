const scrolling = (triggerSelector) => {
    const upElem = document.querySelector(triggerSelector);

    let start = false;
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            start = true;
            upElem.classList.add('animated', 'fadeInRightBig');
            upElem.classList.remove('fadeOutRightBig');
        } else if (document.documentElement.scrollTop < 1650 && start) {
            upElem.classList.add('fadeOutRightBig');
            upElem.classList.remove('fadeInRightBig');
        }

    });

    // Scrolling with Request Animated Frame

    // [href^="#"] - means that we want to search all elements which start with '#' 
    const links = document.querySelectorAll('[href^="#');
    let speed = 0.4;

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            if (this.hash !== '') {
                // Number of flipped pixels  (for cross-browser)
                let widthTop = Math.round(document.body.scrollTop || document.documentElement.scrollTop);
                // Get hash like this or this.href.match(/#.+/g);
                let hash = this.hash;
                // Get element to scroll and its pixels to border top 
                let toBlock = document.querySelector(hash).getBoundingClientRect().top;
                let start = null;

                // start animation
                const step = (time) => {

                    // Check our first cycle
                    if (start === null) {
                        start = time;
                    }
                    // Correction speed on long distance
                    if (toBlock > 6000) {
                        speed = 0.08;
                    } else if (toBlock > 3000 && toBlock < 6000) {
                        speed = 0.2;
                    }

                    let progress = time - start;
                    // эта переменная отвечает за количество пикселей на которое нам надо пролистать в течение этой анимации
                    let r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));

                    document.documentElement.scrollTo(0, r);

                    if (r !== widthTop + toBlock) {
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash;
                    }
                };

                requestAnimationFrame(step);
            }
        });
    });


    // Pure js scrolling

    // const element = document.documentElement,
    //       body = document.body;

    // const calcScroll = () => {
    //     upElem.addEventListener('click', function(event) {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         if (this.hash !== '') {
    //             event.preventDefault();
    //             let hashElement = document.querySelector(this.hash),
    //                 hashElementTop = 0;

    //             while (hashElement.offsetParent) {
    //                 hashElementTop += hashElement.offsetTop;
    //                 hashElement = hashElement.offsetParent;
    //             }

    //             hashElementTop = Math.round(hashElementTop);
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // };

    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1,
    //         prevScrollTop,
    //         speed;

    //     if (to > from) {
    //         speed = 30;
    //     } else {
    //         speed = -30;
    //     }

    //     let move = setInterval(function() {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         if (
    //             prevScrollTop === scrollTop ||
    //             (to > from && scrollTop >= to) ||
    //             (to < from && scrollTop <= to)
    //         ) {
    //             clearInterval(move);
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //         } else {
    //             body.scrollTop += speed;
    //             element.scrollTop += speed;
    //             prevScrollTop = scrollTop;
    //         }
    //     }, timeInterval);
    // };

    // calcScroll();

};

export default scrolling;