import { listComments, updateListComments } from './listComments'
import { sanitizeHtml, delay } from './helpFunctions'
import {
    deleteComment,
    likesComment,
    postComment,
    setName,
    setToken,
} from './api.js'
import { renderLogin } from './renderLogin.js'
import { fetchAndRenderListComments } from '../index.js'

//Добавляем новый комменатирй
export const initAddCommentListener = (renderListComments) => {
    const addButton = document.getElementById('add-button')
    const inputName = document.getElementById('name')
    const inputTextComment = document.getElementById('comment')

    addButton.addEventListener('click', (event) => {
        event.stopImmediatePropagation()

        // Убираем ошибки из полей ввода
        inputName.classList.remove('error')
        inputTextComment.classList.remove('error')

        // Проверка имени
        if (inputName.value.trim() === '') {
            inputName.classList.add('error')
            return
        }

        // Проверка текста комментария
        if (inputTextComment.value.trim() === '') {
            inputTextComment.classList.add('error')
            return
        }

        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        const maximumNumberAttempts = 3

        // Функция для отправки комментария с повторными попытками
        const handlePostClick = (attempt = 0) => {
            if (attempt >= maximumNumberAttempts) {
                console.error(
                    'Достигнуто максимальное количество попыток отправки комментария.',
                )
                alert('Не удалось отправить комментарий. Попробуйте позже.')
                return
            }

            postComment(
                sanitizeHtml(inputTextComment.value),
                sanitizeHtml(inputName.value),
            )
                .then((data) => {
                    updateListComments(data)
                    renderListComments()
                    inputName.value = ''
                    inputTextComment.value = ''
                })
                .catch((error) => {
                    if (error.message === 'Failed to fetch') {
                        alert('Нет интернета, попробуйте еще раз.')
                        handlePostClick(attempt + 1)
                    } else if (error.message === 'Сервер упал') {
                        alert('Ошибка сервера. Повторяем попытку...')
                        handlePostClick(attempt + 1)
                    } else if (error.message === 'Вы допустили ошибку') {
                        alert('Вы ввели в одно из полей менее трех символов.')
                        inputName.classList.add('error')
                        inputTextComment.classList.add('error')

                        setTimeout(() => {
                            inputName.classList.remove('error')
                            inputTextComment.classList.remove('error')
                        }, 3000)
                    }
                })
                .finally(() => {
                    document.querySelector('.form-loading').style.display =
                        'none'
                    document.querySelector('.add-form').style.display = 'flex'
                })
        }

        handlePostClick()
    })
}

// // ввод комментария по нажатию на клавишу Enter
export const enteringTextPressingKey = () => {
    const addButton = document.getElementById('add-button')
    const inputTextComment = document.getElementById('comment')

    inputTextComment.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault() // Предотвращаем переход на новую строку
            addButton.click() // Имитация клика по кнопке "Написать"
        }
    })
}

// Ответ на комментарий
export const initClickComment = () => {
    const commentsElements = document.querySelectorAll('.comment')
    const inputTextComment = document.getElementById('comment')

    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
            const index = commentElement.dataset.index
            console.log(`Clicked comment index: ${index}`) // Проверяем индекс
            const currentComment = listComments[index]

            if (currentComment) {
                inputTextComment.value = `${currentComment.name} : ${currentComment.comment}`
            } else {
                console.warn(`No comment found at index ${index}`) // Если комментарий не найден
            }
        })
    }
}

export const initClickLike = (renderListComments) => {
    const buttonLikes = document.querySelectorAll('.like-button')
    for (const buttonLike of buttonLikes) {
        buttonLike.addEventListener('click', (event) => {
            event.stopImmediatePropagation()

            buttonLike.classList.add('-loading-like')

            delay(2000).then(() => {
                const likeIndex = buttonLike.dataset.indexLike

                // Проверка на валидность индекса
                if (likeIndex <= 0 || likeIndex >= listComments.length) {
                    console.error('Некорректный индекс лайка:', likeIndex)
                    return
                }

                const likeComment = listComments[likeIndex]

                // Проверка наличия id
                if (!likeComment || !likeComment.hasOwnProperty('id')) {
                    console.error('ID комментария отсутствует:', likeComment)
                    return
                }

                likeComment.isLiked = !likeComment.isLiked
                likeComment.likes += likeComment.isLiked ? 1 : -1


                // Вызываем API для сохранения статуса лайка на сервере
                likesComment(likeComment.id)
                    .then(() => {
                        renderListComments() // Обновляем отображение комментариев
                    })
                    .catch((error) => {
                        console.error(
                            'Ошибка при обновлении статуса лайка на сервере:',
                            error,
                        )
                    })
            })
        })
    }
}

// Проверяем наличие токена при загрузке страницы
window.addEventListener('load', () => {
    const userToken = localStorage.getItem('userToken')
    const userName = localStorage.getItem('userName')

    if (userToken) {
        // Устанавливаем токен и имя пользователя
        setToken(userToken)
        setName(userName)
        // Загружаем комментарии или другую необходимую информацию
        fetchAndRenderListComments()
    }
})

export const exitCurrentSession = () => {
    const buttonExit = document.querySelector('.exit-form-button')

    buttonExit.addEventListener('click', () => {
        // Удаляем токен и имя пользователя из локального хранилища
        localStorage.removeItem('userToken')
        localStorage.removeItem('userName')

        // Сбрасываем токен и имя пользователя в приложении
        setToken(null)
        setName(null)
        renderLogin()
    })
}
