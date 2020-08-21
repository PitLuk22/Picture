import {
    postData
} from "../services/requests";

const forms = (state) => {

    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');

    // Только цифры в инпутах
    // noLettersInInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        thanks: 'Спасибо, скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php',
    };


    // Очищаем все инпуты
    const clearInputs = () => {
        inputs.forEach(elem => {
            elem.value = '';
        });
        upload.forEach(input => {
            input.previousElementSibling.textContent = 'Файл не выбран';
            input.parentElement.children[0].style.border = '2px dashed #c51abb';
            input.parentElement.children[0].classList.remove('complete');
        });
    };

    upload.forEach(input => {
        input.addEventListener('input', () => {

            // add image path
            let dots;
            let arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = "..." : dots = ".";
            console.log(arr);
            let name = arr[0].slice(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;

            // styling the button
            input.parentElement.children[0].style.border = '2px dashed #08ff00';
            input.parentElement.children[0].classList.add('complete');
        });
    });


    // Действия после нажатия на кпопку в форме
    form.forEach(elem => {
        elem.addEventListener('submit', (event) => {
            event.preventDefault();

            // Create block instead form
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            elem.parentNode.appendChild(statusMessage);

            // Delete form
            elem.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                elem.style.display = 'none';
            }, 400);

            // Create spinner inside statusMessage block
            const statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('status', 'animated', 'fadeInUp');
            statusMessage.append(statusImg);

            // Create textMessage inside statusMessage block
            const statusText = document.createElement('div');
            statusText.textContent = message.loading;
            statusMessage.append(statusText);

            const formData = new FormData(elem);
            if (elem.classList.contains('calc_form')) {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            // Choose our server path 
            let api = elem.closest('.popup-design') || elem.classList.contains('calc_form') ? path.designer : path.question;

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    statusText.textContent = message.thanks;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    statusText.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    elem.reset(); // очистка определнной формы
                    document.querySelector('.calc-price').textContent = 'Для расчета нужно выбрать размер картины и материал картины';
                    setTimeout(() => {
                        statusMessage.remove();
                        elem.style.display = 'block';
                        elem.classList.remove('fadeOutUp');
                        elem.classList.add('fadeInUp');
                    }, 3000);

                });
        });
    });
};

export default forms;