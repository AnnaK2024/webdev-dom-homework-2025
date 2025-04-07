export const renderLogin = () => {
    const app = document.getElementById('app')
    app.innerHTML = `
    <h1> Страница входа </h1>
    <div class="form">
        <h3 class="form-title">Форма входа</h3>
        <div class="add-form-row">
            <input
                type="text"
                id="login-input"
                class="input"
                placeholder="Введите логин"
            />
            <input
                type="text"
                id="password-input"
                class="input"
                placeholder="Введите пароль"
            />
        </div>
        <br />
        <button class="button" id="login-button"> Войти </button>
        <button class="button" id="reg-button"> Зарегистрироваться </button>
    </div> `
}
