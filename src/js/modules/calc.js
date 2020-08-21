import {
    getPrice
} from '../services/requests';

const calc = (size, material, options, promocode, price, state) => {

    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        priceBlock = document.querySelector(price);

    let sum = 0;


    const calcFunc = (event, elem, prop) => {

        getPrice('http://localhost:3000/price')
            .then(res => calcFuncWithDB(res))
            .catch(error => console.log(`Fatal ${error}`));

        function calcFuncWithDB(response) {
            elem.addEventListener(event, function () {

                sum = Math.round((+response[0][sizeBlock.value]) * (+response[1][materialBlock.value]));

                switch (elem.id) {
                    case 'size':
                        state[prop] = this.value;
                        break;
                    case 'material':
                        state[prop] = this.value;
                        break;
                    case 'options':
                        state[prop] = this.value;
                        sum += (+response[2][optionsBlock.value]);
                        break;
                    case 'promocode':
                        state[prop] = this.value.toUpperCase() == 'IWANTPOPART' ? true : false;
                        break;
                }

                let total = 'totalPrice';

                if (sizeBlock.value == '' || materialBlock.value == '') {
                    priceBlock.textContent = 'Пожалуйста, выберете резмер и материал желаемой картины!';
                } else if (promocodeBlock.value.toUpperCase() == 'IWANTPOPART') {
                    priceBlock.textContent = Math.round(sum * 0.7);
                    state[total] = Math.round(sum * 0.7);
                } else {
                    priceBlock.textContent = sum;
                    state[total] = sum;
                }
                console.log(state);
            });
        }
    };


    calcFunc('change', sizeBlock, 'size');
    calcFunc('change', materialBlock, 'material');
    calcFunc('change', optionsBlock, 'options');
    calcFunc('input', promocodeBlock, 'promo');


};

export default calc;