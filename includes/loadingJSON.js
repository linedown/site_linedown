document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const articles = document.getElementById('articles');
        const categoryInnerCheckboxes = document.querySelectorAll('input[name="category_inner"]');
        const colorCheckboxes = document.querySelectorAll('input[name="color"]');
        const category = document.URL.includes('woman.html') ? "woman" : 
            (document.URL.includes('man.html') ? "man" : "accessories");
        let articlesArray = [];
        const searchButton = document.getElementById('search-button');
        
        function loadJSON(){
            fetch('../includes/data.json')
            .then(resp => {
                if(!resp.ok) throw new Error(`Статус ошибки: ${resp.status}`);
                return resp.json();
            })
            .then(jsonData => {
                articlesArray = jsonData;
                renderArticles(articlesArray);
            })
            .catch(e => {
                console.error("Ошибка загрузки: ", e);
                articles.innerHTML = "<b>Ошибка загрузки данных</b>";
            }
        )
        }

        function renderArticles(articlesRender){
            articles.innerHTML = '';
            if(articlesRender.length === 0){
                articles.innerHTML = "<h2><b>По данному фильтру товаров не найдено</b></h2>";
                return;
            }

            articlesRender.forEach(elem => {
                if(elem.category_main === category){
                    articles.insertAdjacentHTML('beforeend', 
                        `<ul class="article_element"><li><img src=${elem.src} width='60%'></li>
                        <li><b class="article_name">${elem.name}</b></li>
                        <li><b>Цвет:</b> ${elem.color}</li>
                        <li><b>Цена:</b> ${elem.price} рублей</li>
                        <li><button type="button" class="border-radius bucket-button" 
                        data-image=${elem.src} data-name="${elem.name}" data-color=${elem.color}
                        data-price=${elem.price}>Добавить в корзину</button></li>
                        </ul>`)
                }
            })
        }

        function filterArticles(){
            const innerCategories = Array.from(categoryInnerCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
            console.log(innerCategories);

            const colors = Array.from(colorCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
            console.log(colors);

            let filteredArticles = articlesArray;

            if(innerCategories.length > 0) filteredArticles = filteredArticles
            .filter(elem => innerCategories.includes(elem.category_inner));

            if(colors.length > 0) filteredArticles = filteredArticles
            .filter(elem => colors.includes(elem.color));

            renderArticles(filteredArticles);
        }
        
        searchButton.addEventListener('click', filterArticles)
        loadJSON();
    }, 57)
})