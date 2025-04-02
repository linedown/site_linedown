document.addEventListener('DOMContentLoaded', () => {
    const submit = document.getElementById('submitButton');
    submit.addEventListener('click', () => {
        const loginInput = document.getElementById('loginInput');
        const passwordInput = document.getElementById('passwordInput');
        alert(`Упс! Данный раздел находится в разработке!
            А пока сюда выведется ваш введённый логин и пароль.
            Логин: ${loginInput.value}
            Пароль: ${passwordInput.value}`);
    });
})