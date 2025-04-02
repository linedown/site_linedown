function loadCategory(url, id){
    fetch(url).then(resp => {
        if(!resp.ok) throw new Error(`Статус ошибки: ${resp.status}`);
        return resp.text();
    }).then(categoryHtml => {
        document.getElementById(id).innerHTML = categoryHtml;
        const linkRelCss = document.createElement('link');
        linkRelCss.href = '../includes/category.css';
        linkRelCss.rel = 'stylesheet';
        document.head.appendChild(linkRelCss);
    }).catch(e => {
        console.error('Ошибка загрузки: ', e);
    })
}

function loadButtons(){
    fetch('../includes/btnnavigation.html').then(resp => {
        if(!resp.ok) throw new Error(`Статус ошибки: ${resp.status}`);
        return resp.text();
    }).then(btnsHtml => {
        document.getElementById('wrapper').innerHTML = btnsHtml;
        const linkRelCss = document.createElement('link');
        linkRelCss.href = '../includes/btns.css';
        linkRelCss.rel = 'stylesheet';
        document.head.appendChild(linkRelCss);
    }).catch(e => {
        console.error('Ошибка загрузки: ', e);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let categoryPromise;
    if(document.getElementById('categoryMan') != null) categoryPromise = loadCategory('../includes/categoryMan.html', 'categoryMan');
    else categoryPromise = loadCategory('../includes/categoryAccessories.html', 'categoryAccessories');
    const buttonPromise = loadButtons();
    Promise.all([categoryPromise, buttonPromise]).then(() => {
        console.info("Успешная загрузка категорий и кнопок");
    })
    .catch(e => {
        console.error("Ошибка загрузки: ", e);
    })
})