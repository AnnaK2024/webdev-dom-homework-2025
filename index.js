import { fetchListComments } from './modules/api.js'
import { updateListComments } from './modules/listComments.js'
import { renderListСomments } from './modules/renderListComments.js'

const loaderElement = document.querySelector('.loader')
loaderElement.innerHTML =
    '<span class="loader-text"> Загрузка комментариев...</span>'

// Функция для скрытия лоадера
const hideLoader = () => {
    loaderElement.style.display = 'none'
}

export const fetchAndRenderListComments = () => {
    fetchListComments()
        .then((data) => {
            updateListComments(data)
            renderListСomments()
            hideLoader() // Скрываем лоадер после завершения загрузки
        })
        .catch((error) => {
            console.error('Ошибка при загрузке комментариев:', error)
            loaderElement.innerHTML =
                'Не удалось загрузить комментарии. Попробуйте еще раз.'
            // Можно добавить логику для скрытия лоадера здесь, если нужно
        })
}

// Запускаем загрузку комментариев
fetchAndRenderListComments()
