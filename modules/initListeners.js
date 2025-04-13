import { renderListСomments } from './renderListComments.js'
import { listСomments, updateListComments } from './listComments.js'
import { sanitizeHtml, delay } from './helpFunctions.js'
import { postComment, setName, setToken } from './api.js'
import { renderLogin } from './renderLogin.js'
import { fetchAndRenderListComments } from '../index.js'

//Добавляем новый комменатирй
export const initAddCommentListener = (renderListСomments) => {
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

        document.querySelector('.preloaderFooter').style.display = 'block'
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
                    renderListСomments()
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
                    document.querySelector('.preloaderFooter').style.display =
                        'none'
                    document.querySelector('.add-form').style.display = 'flex'
                })
        }

        // Начинаем отправку комментария
        handlePostClick()
    })
}

// // ввод комментария по нажатию на клавишу Enter
// export const enteringTextPressingKey = () => {
//     inputTextComment.addEventListener('keydown', (event) => {
//         if (event.key === 'Enter' && !event.shiftKey) {
//             event.preventDefault() // Предотвращаем переход на новую строку
//             addButton.click() // Имитация клика по кнопке "Написать"
//         }
//     })
// }
// enteringTextPressingKey()

// Ответ на комментарий
export const initClickComment = () => {
    const commentsElements = document.querySelectorAll('.comment')
    const inputTextComment = document.getElementById('comment')
    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
            const currentComment = listСomments[commentElement.dataset.index]
            inputTextComment.value = `${currentComment.name} : ${currentComment.comment}`

            renderListСomments()
        })
    }
}

//Обработчик лайка
export const initClickLike = (renderListСomments) => {
    const buttonLikes = document.querySelectorAll('.like-button')
    for (const buttonLike of buttonLikes) {
        buttonLike.addEventListener('click', (event) => {
            event.stopImmediatePropagation()

            buttonLike.classList.add('-loading-like')

            delay(2000).then(() => {
                const likeIndex = buttonLike.dataset.indexLike // считываем значение дата-атрибута кнопки
                const likeComment = listСomments[likeIndex] // перебираем индексы комментариев из списка
                likeComment.isLiked = !likeComment.isLiked // цвет лайка
                likeComment.likes += likeComment.isLiked ? 1 : -1 // количество лайков

                renderListСomments()
            })
        })
    }
}

// // // удаляем комментарий
// export const initDeleteComments = (renderListComments) => {
//     const deleteButtons = document.querySelectorAll('.delete-button')

//     deleteButtons.forEach((deleteButton) => {
//         deleteButton.addEventListener('click', (event) => {
//             event.stopImmediatePropagation()

//             const idDelete = deleteButton.dataset.id

//             deleteButton.disabled = true
//             deleteButton.textContent = 'Комментарий удаляется...'

//             deleteComment({ id: idDelete })
//                 .then(() => {
//                     return renderListComments() // Обновить список комментариев
//                 })
//                 .then(() => {
//                     deleteButton.disabled = false
//                     deleteButton.textContent = 'Удалить комментарий'
//                 })
//                 .catch((error) => {
//                     console.error('Ошибка при удалении комментария:', error)
//                     deleteButton.disabled = false
//                     deleteButton.textContent = 'Удалить комментарий'
//                 })
//         })
//     })
// }

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
