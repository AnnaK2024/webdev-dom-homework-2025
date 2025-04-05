import { renderListСomments } from './renderListComments.js'
import { listСomments, updateListComments } from './listComments.js'
import { sanitizeHtml, delay } from './helpFunctions.js'
import { postComment } from './api.js'

export const addButton = document.getElementById('add-button')
export const inputName = document.getElementById('name')
export const inputTextComment = document.getElementById('comment')

//Добавляем новый комменатирй
export const initAddCommentListener = (renderListСomments) => {
    addButton.addEventListener('click', () => {
        inputName.classList.remove('error')
        if (inputName.value.trim() === '') {
            inputName.classList.add('error')
            return
        }
        inputTextComment.classList.remove('error')
        if (inputTextComment.value.trim() === '') {
            inputTextComment.classList.add('error')
            return
        }

        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComment(
            sanitizeHtml(inputTextComment.value),
            sanitizeHtml(inputName.value),
        ).then((data) => {
            document.querySelector('.form-loading').style.display = 'none'
            document.querySelector('.add-form').style.display = 'flex'

            updateListComments(data)
            renderListСomments()

            addButton.disabled = false
            addButton.textContent = 'Написать'

            inputName.value = ''
            inputTextComment.value = ''
        })
    })
}

// ввод комментария по нажатию на клавишу Enter
export const enteringTextPressingKey = () => {
    inputTextComment.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault() // Предотвращаем переход на новую строку
            addButton.click() // Имитация клика по кнопке "Написать"
        }
    })
}
enteringTextPressingKey()

// Ответ на комментарий
export const initClickComment = () => {
    const commentsElements = document.querySelectorAll('.comment')
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
