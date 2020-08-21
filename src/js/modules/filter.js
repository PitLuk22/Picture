const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        no = document.querySelector('.portfolio-no'),
        markAll = wrapper.querySelectorAll('.all');

    const typeFilter = (selector) => {
        const cards = wrapper.querySelectorAll(selector);

        // remove all elements
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });
        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        // add certain elements on page
        if (cards.length > 0) {
            cards.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        } else {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    };

    // Tabs realization
    menu.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.tagName == 'LI') {
            items.forEach(elem => {
                elem.classList.remove('active');
            });
            target.classList.add('active');
            const selector = target.classList[0];
            typeFilter(`.${selector}`);
        }
    });
};

export default filter;