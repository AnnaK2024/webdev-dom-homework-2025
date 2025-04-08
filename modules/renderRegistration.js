export const renderRegistration = () => {
    const app = document.getElementById('app')

    app.innerHTML = `
    <h1> Страница регистрации </h1>
    <div class="form">
        <h3 class="form-title">Форма регистрации </h3>
        <div class="add-form-row">
            <input
                type="text"
                id="login-input"
                class="input"
                placeholder="Введите логин"
            />
            <input
                type="text"
                id="name-input"
                class="input"
                placeholder="Введите имя"
            />
            <input
                type="text"
                id="password-input"
                class="input"
                placeholder="Введите пароль"
            />
        </div>
        <br />
        <button class="button" id="login-button"> Зарегистрироваться </button>
    </div> `
}
