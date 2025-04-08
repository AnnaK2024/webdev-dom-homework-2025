import { fetchListComments } from './modules/api.js'
import { updateListComments } from './modules/listComments.js'
import { renderListСomments } from './modules/renderListComments.js'
import { renderLogin } from './modules/renderLogin.js'

window.onload = function () {
    let preloader = document.getElementById('loader')
    let form = document.querySelector('.add-form')

    fetchListComments()
        .then((data) => {
            updateListComments(data)
            renderListСomments()

            // Скрыть прелоадер
            preloader.style.display = 'none'

            // Показать форму после загрузки комментариев
            form.classList.remove('hidden')
        })
        .catch((error) => {
            // console.error('Ошибка при загрузке комментариев:', error)
            // preloader.style.display = 'none'
        })

    // fetchListComments()
}
renderListСomments()
renderLogin()