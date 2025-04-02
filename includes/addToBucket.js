document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const addButtons = document.querySelectorAll('.bucket-button');
        addButtons.forEach(button => {
            button.addEventListener('click', addToBucket);
            const articleName = button.dataset.name;
            const articleColor = button.dataset.color;
            if(inBucket(articleName, articleColor)) button.textContent = 'Удалить из корзины';
        });

        function addToBucket(e){
            const button = e.target;
            const articleImage = button.dataset.image;
            const articleName = button.dataset.name;
            const articleColor = button.dataset.color;
            const articlePrice = button.dataset.price;

            if(button.textContent === 'Добавить в корзину'){
                saveInBucketItem({
                    image: articleImage,
                    name: articleName,
                    color: articleColor,
                    price: articlePrice
                });
                button.textContent = 'Удалить из корзины';
            } else{
                removeFromBucketItem(articleName, articleColor);
                button.textContent = 'Добавить в корзину';
            }
        }

        function saveInBucketItem(article){
            let bucketItems = JSON.parse(localStorage.getItem('bucket')) || [];
            bucketItems.push(article);
            localStorage.setItem('bucket', JSON.stringify(bucketItems));
        }

        function removeFromBucketItem(articleName, articleColor){
            let bucketItems = JSON.parse(localStorage.getItem('bucket')) || [];
            bucketItems = bucketItems.filter(elem => (elem.name !== articleName) && (elem.color !== articleColor));
            localStorage.setItem('bucket', JSON.stringify(bucketItems));
        }

        function inBucket(articleName, articleColor){
            let bucketItems = JSON.parse(localStorage.getItem('bucket')) || [];
            return bucketItems.some(elem => (elem.name === articleName) && (elem.color === articleColor));
        }
    }, 69)
});