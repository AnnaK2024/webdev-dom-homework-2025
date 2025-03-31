import { listСomments } from "./listComments.js";
import { initClickLike, initClickComment } from "./initlisteners.js";

// Функция рендеринга массива
export const renderListСomments = () => {
  const list = document.getElementById("list");
  const listСommentsHtml = listСomments
    .map((comments, index) => {
      return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comments.name}</div>
            <div>${comments.data}</div>
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
                comments.isLiked ? "-active-like" : ""
              }" data-index-like="${index}"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");

  list.innerHTML = listСommentsHtml;

  initClickLike();
  initClickComment();
};
