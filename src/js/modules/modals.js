function modals() {
    // Была ли нажата хоть онда кнопка?
    let btnPressed = false;

    function bindModals(triggerSelector, modalSelector, crossSelector, destroy = false) {

        const triggerModal = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(crossSelector);
        const windows = document.querySelectorAll('[data-modal]');
        const scroll = calcScroll();

        function closeAll() {
            windows.forEach(elem => {
                elem.style.display = 'none';
            });
        }

        // Кнопка
        triggerModal.forEach(elem => {
            elem.addEventListener('click', (event) => {
                if (event.target) {
                    event.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    elem.remove();
                }
                closeAll();
                openModal(modalSelector, scroll);
            });
        });

        // Крестик
        close.addEventListener('click', () => {
            closeAll();
            closeModal(modalSelector);
        });

        // Закрытие по клику на подложку
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeAll();
                closeModal(modalSelector);
            }
        });

        // Закрвтие по нажатию ESC
        window.addEventListener('keydown', function (event) {
            if (event.keyCode === 27 && getComputedStyle(modal).display !== 'none') {
                closeAll();
                closeModal(modalSelector);
            }
        });
    }

    function openModal(modalSelector, scroll) {
        const modal = document.querySelector(modalSelector);
        modal.style.display = 'block';
        modal.style.marginRight = `${scroll}px`;
        document.body.style.overflow = 'hidden';
        modal.classList.add('animated', 'fadeIn');
    }

    function closeModal(modalSelector) {
        const modal = document.querySelector(modalSelector);
        modal.style.display = 'none';
        document.body.style.overflow = '';
        modal.style.marginRight = `0px`;
    }

    // Показ модального окна со временем или нет)
    function showModalByTime(modalSelector, time, scroll) {
        setTimeout(function () {
            let display;

            document.querySelectorAll('[data-modal]').forEach(elem => {
                if (getComputedStyle(elem).display !== 'none') {
                    display = true;
                }
            });
            if (!display) {
                openModal(modalSelector, scroll);
            }
        }, time);
    }

    // Расчет ширины скролла браузера
    function calcScroll() {
        const div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.append(div);
        const scroll = div.offsetWidth - div.clientWidth;
        div.remove();

        return scroll;
    }

    function openModalByScroll(triggerSelector) {
        window.addEventListener('scroll', function () {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {

                //Здесь мы программно нажимаем на кнопку подарка
                document.querySelector(triggerSelector).click();
            }
        });
    }
    // window.pageYOffset - отвечает за то, сколоко пикслей мы уже прокрутили 
    // document.documentElement.clientHeight - отвечает за размер видимой части сайта на данный момент 
    // document.documentElement.scrollHeight - отвечает за количество пикселей всей страницы (целиком)


    bindModals('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModals('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModals('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openModalByScroll('.fixed-gift');
    // showModalByTime('.popup-consultation', 5000, calcScroll());

}

export default modals;