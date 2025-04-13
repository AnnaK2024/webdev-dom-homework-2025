import { fetchAndRenderListComments } from '../index.js'
import { registration, setName, setToken } from './api.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')
    const loginHTML = `
    <div class="add-form">
        <div class="add-form-input-reg">
            <input
                type="text"
                id="name-input"
                class="inputNam"
                placeholder="Введите имя"
                required
            />
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
        <button class="add-form-button-main button-main " type="submit"> Зарегистрироваться </button>
        <u class="add-form-button-link entry"> Войти </u>
    </div>
 `
    container.innerHTML = loginHTML

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin()
    })

    const nameEl = document.querySelector('#name-input')
    const loginEl = document.querySelector('#login-input')
    const passwordEl = document.querySelector('#password-input')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        registration(nameEl.value, loginEl.value, passwordEl.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                localStorage.setItem('userToken', data.user.token)
                localStorage.setItem('userName', data.user.name)

                setToken(data.user.token)
                setName(data.user.name)
                fetchAndRenderListComments()
            })
    })
}
