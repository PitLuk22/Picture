const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(btn => {
        btn.addEventListener('click', function (e) {

            if (!this.classList.contains('active-style')) {
                btns.forEach(elem => {
                    elem.classList.remove('active-style');
                    elem.nextElementSibling.classList.remove('active-content');
                    elem.nextElementSibling.style.maxHeight = '0px';
                });
            }
            this.classList.add('active-style');
            this.nextElementSibling.classList.add('active-content');

            this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';

        });
    });
};

export default accordion;