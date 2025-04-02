import { renderListСomments } from './renderListComments.js'
import { listСomments, updateListComments } from './listComments.js'
import { sanitizeHtml } from './helpFunctions.js'
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

        postComment(
            sanitizeHtml(inputTextComment.value),
            sanitizeHtml(inputName.value),
        ).then((data) => {
            updateListComments(data)
            renderListСomments()
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
            const likeIndex = buttonLike.dataset.indexLike // считываем значение дата-атрибута кнопки
            const likeComment = listСomments[likeIndex] // перебираем индексы комментариев из списка
            likeComment.isLiked = !likeComment.isLiked // цвет лайка
            likeComment.likes += likeComment.isLiked ? 1 : -1 // количество лайков

            renderListСomments()
        })
    }
}
// удаляем последний комментарий
export const deleteLastComments = () => {
    const deleteButton = document.getElementById('delete-button')

    deleteButton.addEventListener('click', () => {
        if (listСomments.length === 0) {
            alert('Нет комментариев для удаления!')
            return
        }
        const indexToDelete = listСomments.length - 1 // Индекс последнего комментария
        listСomments.splice(indexToDelete, 1) // Удаляем комментарий по индексу
        renderListСomments() // Обновляем отображение комментариев
    })
}
deleteLastComments()
