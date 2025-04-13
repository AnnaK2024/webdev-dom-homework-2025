import { name, token } from './api.js'
import {
    enteringTextPressingKey,
    exitCurrentSession,
    initAddCommentListener,
    initClickComment,
    initClickLike,
    initDeleteComments,
} from './initListeners.js'
import { listСomments } from './listComments.js'
import { renderLogin } from './renderLogin.js'

// Функция рендеринга массива
export const renderListСomments = () => {
    const container = document.querySelector('.container')

    const listСommentsHtml = listСomments
        .map((comments, index) => {
            return `
        <li class="comment" data-index="${index}">
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
      </li>
      `
        })
        .join('')

    //добавление нового комментария
    const containerCommentsHtml = `
          <div class="add-form">
              <input
                  id="name"
                  type="text"
                  class="add-form-name"
                  placeholder="Введите ваше имя"
                  readonly
                  value="${name}"
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
                  <button
                      id="exit-button"
                      class="exit-form-button"
                      > Выйти
                  </button>
              </div>
          </div>
          <div class="form-loading" style="display: none">
            <p class="form-loadingText"> Комментарий добавляется...... </p>
          </div>
      </div>
    `
    const linkToLoginText = `<p class="link"> чтобы отправить комментарий, <span class= "link-login"> войдите </span> `

    const baseHtml = `
      <ul class="comments"> ${listСommentsHtml}
      ${token ? containerCommentsHtml : linkToLoginText} </ul>
    `
    container.innerHTML = baseHtml

    if (token) {
        initClickLike(renderListСomments)
        initClickComment()
        initAddCommentListener(renderListСomments)
        exitCurrentSession()
        enteringTextPressingKey()
        initDeleteComments()
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }
}
