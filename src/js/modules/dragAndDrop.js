const dragAndDrop = () => {

    const uploads = document.querySelectorAll('[name="upload"]');

    // Cancelling the default behavior
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        uploads.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Make notification when we drag file ON the field
    ['dragenter', 'dragover'].forEach(eventName => {
        uploads.forEach(input => {
            input.addEventListener(eventName, () => highLight(input), false);
        });
    });

    function highLight(item) {
        item.parentElement.children[0].textContent = '';
        item.parentElement.children[0].classList.add('drop');
    }

    // Make notification when we drag the file FROM the field
    ['dragleave', 'drop'].forEach(eventName => {
        uploads.forEach(input => {
            input.addEventListener(eventName, () => unhighLight(input), false);
        });
    });

    function unhighLight(item) {
        item.parentElement.children[0].textContent = 'Загрузить фотографию';
        item.parentElement.children[0].classList.remove('drop');
    }

    // Note the path of image
    uploads.forEach(input => {
        input.addEventListener('drop', (event) => {
            // get files name
            input.files = event.dataTransfer.files;

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


};
export default dragAndDrop;