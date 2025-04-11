import { fetchAndRenderListComments } from '../index.js'
import { login, setName, setToken } from './api.js'
import { renderRegistration } from './renderRegistration.js'

export const renderLogin = () => {
    const app = document.getElementById('app')
    const loginHTML = `
    <div class="add-form">
        <div class="add-form-input-log">
            <input
                type="text"
                id="login-input"
                class="inputLog"
                placeholder="Введите логин"
                required
            />
            <input
                type="password"
                id="password-input"
                class="inputPas"
                placeholder="Введите пароль"
                required
            />
        </div>
        <br />
        <button class="add-form-button-main button-main " type="submit"> Войти </button>
        <u class="add-form-button-link registry"> Зарегистрироваться </u>
    </div>
 `
    app.innerHTML = loginHTML

    document.querySelector('.registry').addEventListener('click', () => {
        renderRegistration()
    })

    const loginEl = document.querySelector('#login-input')
    const passwordEl = document.querySelector('#password-input')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        login(loginEl.value, passwordEl.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                fetchAndRenderListComments()
            })
    })
}
