import { name, token } from './api'
import {
    enteringTextPressingKey,
    exitCurrentSession,
    initAddCommentListener,
    initClickComment,
    initClickLike,
} from './initListeners.js'
import { listComments } from './listComments'
import { renderLogin } from './renderLogin'

// Функция рендеринга массива
export const renderListComments = () => {
    const container = document.querySelector('.container')

    const listCommentsHtml = listComments
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
      <ul class="comments"> ${listCommentsHtml}
      ${token ? containerCommentsHtml : linkToLoginText} </ul>
    `
    container.innerHTML = baseHtml

    if (token) {
        initClickLike(renderListComments)
        initClickComment()
        initAddCommentListener(renderListComments)
        exitCurrentSession()
        enteringTextPressingKey()
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }
}
