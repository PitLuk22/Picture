import modals from './modules/modals';
import slider from './modules/slider';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import cards from './modules/cards';
import calc from './modules/calc';
import filter from './modules/filter';
import pictureFrame from './modules/pictureFrame';
import accordion from './modules/accordion';
import burger from './modules/burger';
import scrolling from './modules/scrolling';
import dragAndDrop from './modules/dragAndDrop';
// import $ from 'jquery';
// import 'jquery-mask-plugin';


window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let state = {
        promo: false
    };

    modals();
    slider('.main-slider-item', 'vertical');
    slider('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    forms(state);
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
    cards('.button-styles', '#styles .row');
    calc('#size', '#material', '#options', '#promocode', '.calc-price', state);
    filter();
    pictureFrame('.sizes-block');
    accordion('.accordion-heading');
    burger('.burger', '.burger-menu');
    scrolling('.pageup');
    dragAndDrop();
    // $("input[name='phone']").mask("+7 (999) 999-99-99");

});