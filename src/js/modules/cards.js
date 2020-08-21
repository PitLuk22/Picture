import {
    getResources
} from '../services/requests';

const cards = (trigger, wrapperBlock) => {
    const btn = document.querySelector(trigger),
        wrapper = document.querySelector(wrapperBlock);

    // Обычный способ (без базы данных)
    // styles.forEach(elem => {
    //     elem.classList.add('animated', 'fadeInUp');
    // });
    // btn.addEventListener('click', () => {
    //     styles.forEach(elem => {
    //         elem.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
    //         elem.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //     });
    //     btn.remove();
    // });


    // С использовнаием базы данных
    btn.addEventListener('click', function () {
        getResources('http://localhost:3000/styles')
            .then(res => createCards(res))
            .catch(error => console.log(`Fatal ${error}`));

        this.remove();
    });

    function createCards(response) {
        response.forEach(({
            src,
            title,
            link
        }) => {
            let div = document.createElement('div');
            div.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
            div.innerHTML = `
            <div class=styles-block>
	 		    <img src=${src} alt>
	 		    <h4>${title}</h4>
	 		    <a href="${link}">Подробнее</a>
	 	    </div>
            `;
            wrapper.append(div);
        });
    }

};

export default cards;