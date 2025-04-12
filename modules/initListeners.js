import { renderListСomments } from './renderListComments.js'
import { listСomments, updateListComments } from './listComments.js'
import { sanitizeHtml, delay } from './helpFunctions.js'
import { postComment } from './api.js'

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
//     const deleteButton = document.getElementById('delete-button')

//     for (const deleteEl of deleteButton) {
//         deleteEl.addEventListener('click', (event) => {
//             event.stopImmediatePropagation()
//             const idDelete = deleteEl.dataset.id

//             deleteEl.disabled = true
//             deleteEl.textContent = 'Комментарий удаляется...'

//             deleteComment({ idDelete })
//                 .then(() => {
//                     return renderListСomments()
//                 })
//                 .then(() => {
//                     deleteEl.disabled = false
//                     deleteEl.textContent = 'Удалить комментарий'
//                 })
//             renderListComments()    
//         })
//     }
// }

