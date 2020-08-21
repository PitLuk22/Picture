const pictureFrame = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    const showPicture = (block) => {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -4) + '-1.png';
        block.querySelectorAll('p:not(.sizes-hit)').forEach(elem => {
            elem.style.display = 'none';
        });
    };
    const hidePicture = (block) => {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -6) + '.png';
        block.querySelectorAll('p:not(.sizes-hit)').forEach(elem => {
            elem.style.display = 'block';
        });
    };

    blocks.forEach(elem => {
        elem.addEventListener('mouseover', () => {
            showPicture(elem);
        });
    });
    blocks.forEach(elem => {
        elem.addEventListener('mouseout', () => {
            hidePicture(elem);
        });
    });
};

export default pictureFrame;