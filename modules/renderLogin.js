import { login } from './api.js'

export const renderLogin = () => {
    const container = document.querySelector('.container')
    const loginHTML = `
    <div class="add-form">
        <div class="add-form-input">
            <input
                type="text"
                id="login-input"
                class="inputLog"
                placeholder="Введите логин"
                required
            />
            <input
                type="text"
                id="password-input"
                class="inputPas"
                placeholder="Введите пароль"
                required
            />
        </div>
        <br />
        <button class="add-form-button-main button-main " type="submit"> Войти </button>
        <u class="add-form-button-link registry"> Зарегистрироваться </u>
    </div> `

    container.innerHTML = loginHTML

    const loginEl = document.querySelector('#login-input')
    const passwordEl = document.querySelector('#password-input')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('clik', () => {
        login(loginEl.value, passwordEl.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
    })
}
