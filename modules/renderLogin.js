import { fetchAndRenderListComments } from '../index'
import { login, setName, setToken } from './api'
import { renderRegistration } from './renderRegistration'

export const renderLogin = () => {
    const container = document.querySelector('.container')
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
    container.innerHTML = loginHTML

    document.querySelector('.registry').addEventListener('click', () => {
        renderRegistration()
    })

    const loginEl = document.querySelector('#login-input')
    const passwordEl = document.querySelector('#password-input')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        login(loginEl.value, passwordEl.value)
            .then((response) => {
                if (response.status === 400) {
                    throw new Error("Неверный логин или пароль");
                }
                return response.json()
            })
            .then((data) => {
                localStorage.setItem('userToken', data.user.token)
                localStorage.setItem('userName', data.user.name)
                
                setToken(data.user.token)
                setName(data.user.name)
                fetchAndRenderListComments()
            })
            .catch((error) => {
                if (error.message === 'Неверный логин или пароль') {
                    alert('Неверный логин или пароль')
                }
            })
    })
}
