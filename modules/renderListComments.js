import { token } from './api.js'
import {
    initAddCommentListener,
    initClickComment,
    initClickLike,
} from './initListeners.js'
import { listСomments } from './listComments.js'
import { renderLogin } from './renderLogin.js'

// Функция рендеринга массива
export const renderListСomments = () => {
    const container = document.querySelector('.container')
    const listСommentsHtml = listСomments
        .map((comments, index) => {
            return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comments.name}</div>
          <div>${comments.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comments.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comments.likes}</span>
            <button class="like-button ${
                comments.isLiked ? '-active-like' : ''
            }" data-index-like="${index}"></button>
          </div>
        </div>
      </li>`
        })
        .join('')

    //добавление нового комментария    
    const containerCommentsHtml = `
          <div class="add-form hidden">
              <input
                  id="name"
                  type="text"
                  class="add-form-name"
                  placeholder="Введите ваше имя"
              />
              <textarea
                  id="comment"
                  type="textarea"
                  class="add-form-text"
                  placeholder="Введите ваш коментарий"
                  rows="4"
              ></textarea>
              <div class="add-form-row">
                  <button id="add-button" class="add-form-button">
                      Написать
                  </button>
              </div>
              <div class="add-form-row">
                  <button
                      id="delete-button"
                      class="delete-form-button"
                      > Удалить коментарий
                  </button>
              </div>
          </div>
          <div class="preloaderFooter hidden">
              Комментарий добавляется......
          </div>
      </div>
    `
    const linkToLoginText = `чтобы отправить комментарий, <span class= "link-login"> войдите </span> `

    const baseHtml = `
      <ul id="list" class="comments"> ${listСommentsHtml}
      ${token ? containerCommentsHtml : linkToLoginText} </ul>
    `
    container.innerHTML = baseHtml

    if (token) {
        initClickLike(renderListСomments)
        initClickComment()
        // initDeleteComments()
        initAddCommentListener(renderListСomments)
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }
}

// document.getElementById('delete-button').addEventListener('click', () => {
//     if (listComments.length > 0) {
//         listComments.pop() // Удаляем последний комментарий
//         renderListComments() // Перерисовываем список комментариев
//     } else {
//         alert('Нет комментариев для удаления!') // Уведомление, если комментариев нет
//     }
// })
