// Отправляем данные на сервер
const postData = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        body: data
    });
    console.log(url);
    return await res.text();
};

const getResources = async (url) => {
    let res = await fetch(url);
    console.log(url);

    if (!res.ok) {
        throw new Error(`Could not fatch: ${url}, status: ${res.status}`);
    }
    return await res.json();
};

const getPrice = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error('Could not calc!');
    }

    return res.json();
};


export {
    postData,
    getResources,
    getPrice
};