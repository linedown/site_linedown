document.addEventListener('DOMContentLoaded', () => {
    const divItems = document.getElementById('bucket-items');
    let bucketItems = JSON.parse(localStorage.getItem('bucket')) || [];
    displayBucketArticles();

    function displayBucketArticles(){
        divItems.innerHTML = '';
        if(bucketItems.length === 0){
            divItems.innerHTML = '<p><h2>Корзина пустая. :c</h2></p>';
            return;
        }

        bucketItems.forEach((elem) => {
            divItems.insertAdjacentHTML('beforeend', 
                `<ul class="article_element"><li><img src=${elem.image} width='60%'></li>
                <li><b class="article_name">${elem.name}</b></li>
                <li><b>Цвет:</b> ${elem.color}</li>
                <li><b>Цена:</b> ${elem.price} рублей</li>
                <li><button type="button" class="border-radius bucket-delete-button" data-name=${elem.name} data-color=${elem.color}>Удалить из корзины</button></li>
                </ul>`);
        });

        const deleteButtons = document.querySelectorAll('.bucket-delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', deleteFromBucket);
        });
    }

    function deleteFromBucket(e){
        const articleName = e.target.dataset.name;
        const articleColor = e.target.dataset.color;
        bucketItems = bucketItems.filter(elem => (elem.name !== articleName) && (elem.color !== articleColor));
        localStorage.setItem('bucket', JSON.stringify(bucketItems));
        displayBucketArticles();
        const addToBucketButton = Array.from(document.querySelectorAll('.bucket-button'))
        .find(button => (button.dataset.name === articleName) && (button.dataset.color === articleColor));
        if (addToBucketButton) addToBucketButton.textContent = 'Добавить в корзину';
    }
});