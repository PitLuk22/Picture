const checkTextInputs = (selector) => {
    const inputs = document.querySelectorAll(selector);

    inputs.forEach(elem => {
        elem.addEventListener('keypress', function (event) {
            if (!event.key.match(/[а-яё 0-9]/ig)) {
                event.preventDefault();
            }
        });
        // проверка на копирование и вставку англ текста
        elem.addEventListener('blur', function () {
            if (elem.value.match(/[a-z]/gi)) {
                elem.value = '';
            }
        });
    });

};

export default checkTextInputs;