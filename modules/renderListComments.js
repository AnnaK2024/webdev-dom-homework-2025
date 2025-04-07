import { initClickComment, initClickLike } from './initListeners.js'
import { listСomments } from './listComments.js'

// Функция рендеринга массива
export const renderListСomments = () => {
    const app = document.getElementById('app')
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

    const appHtml = `
      <style>
          .error {
              background-color: #eab1f9;
          }
          .hidden {
              display: none;
          }
      </style>
      <div class="container">
          <div id="loader" class="preloader">
              <p class="preloader-text">
                  подождите, комментарии загружаются...
              </p>
          </div>

          <ul id="list" class="comments"> ${listСommentsHtml} </ul>
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
                      data-id="${index}"
                  >
                      Удалить последний коментарий
                  </button>
              </div>
          </div>
          
          <div class="preloaderFooter hidden">
              Комментарий добавляется......
          </div>
      </div>
    `
    app.innerHTML = appHtml

    initClickLike(renderListСomments)
    initClickComment()
}
