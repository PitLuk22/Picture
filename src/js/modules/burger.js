const burger = (triggerBurger, menuBurger) => {
    const btnElem = document.querySelector(triggerBurger),
        menuElem = document.querySelector(menuBurger);

    menuElem.style.display = 'none';

    btnElem.addEventListener('click', () => {
        if (menuElem.style.display == 'none' && window.screen.availWidth < 993) {
            menuElem.style.display = 'block';
        } else {
            menuElem.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {
        if (window.screen.availWidth > 992) {
            menuElem.style.display = 'none';
        }
    });
};

export default burger;