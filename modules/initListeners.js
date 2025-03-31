import { renderListСomments } from "./renderListComments.js";
import { listСomments } from "./listComments.js";
import { inputTextComment } from "../index.js";

// Ответ на комментарий
export const initClickComment = () => {
    const commentsElements = document.querySelectorAll(".comment");
    for (const commentElement of commentsElements) {
      commentElement.addEventListener("click", () => {
        const currentComment = listСomments[commentElement.dataset.index];
        inputTextComment.value = `${currentComment.name} : ${currentComment.comment}`;
  
        renderListСomments();
      });
    }
  };
  
  //Обработчик лайка
export  const initClickLike = () => {
    const buttonLikes = document.querySelectorAll(".like-button");
    for (const buttonLike of buttonLikes) {
      buttonLike.addEventListener("click", (event) => {
        event.stopImmediatePropagation();
        const likeIndex = buttonLike.dataset.indexLike; // считываем значение дата-атрибута кнопки
        const likeComment = listСomments[likeIndex]; // перебираем индексы комментариев из списка
        likeComment.isLiked = !likeComment.isLiked; // цвет лайка
        likeComment.likes += likeComment.isLiked ? 1 : -1; // количество лайков
  
        renderListСomments();
      });
    }
  };
// удаляем последний комментарий 
  export const deleteLastComments = () => {
    const deleteButton = document.getElementById("delete-button");
  
    deleteButton.addEventListener("click", () => {
      if (listСomments.length === 0) {
        alert("Нет комментариев для удаления!");
        return;
      }
      const indexToDelete = listСomments.length - 1; // Индекс последнего комментария
      listСomments.splice(indexToDelete, 1); // Удаляем комментарий по индексу
      renderListСomments(); // Обновляем отображение комментариев
    });
  };
  deleteLastComments();