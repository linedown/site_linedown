function loadHeader(){
    fetch('../includes/header.html').then(resp => {
        if(!resp.ok) throw new Error(`Статус ошибки: ${resp.status}`);
        return resp.text();
    }).then(headerHtml => {
        document.getElementById('header').innerHTML = headerHtml;
        const linkRelCss = document.createElement('link');
        linkRelCss.href = '../includes/header.css';
        linkRelCss.rel = 'stylesheet';
        document.head.appendChild(linkRelCss);
    }).catch(e => {
        console.error('Ошибка загрузки: ', e);
    })
}

function loadFooter(){
    fetch('../includes/footer.html').then(resp => {
        if(!resp.ok) throw new Error(`Статус ошибки: ${resp.status}`);
        return resp.text();
    }).then(headerHtml => {
        document.getElementById('footer').innerHTML = headerHtml;
        const linkRelCss = document.createElement('link');
        linkRelCss.href = '../includes/footer.css';
        linkRelCss.rel = 'stylesheet';
        document.head.appendChild(linkRelCss);
    }).catch(e => {
        console.error('Ошибка загрузки: ', e);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const headPromise = loadHeader();
    const footPromise = loadFooter();
    Promise.all([headPromise, footPromise]).then(() => {
        console.info("Успешная загрузка шапки и подвала");
    }).catch(e => {
        console.error("Ошибка загрузки: ", e);
    })
})