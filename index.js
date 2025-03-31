import { renderListСomments } from "./modules/renderListComments.js";
import { listСomments } from "./modules/listComments.js";
import { sanitizeHtml } from "./modules/helpFunctions.js";
import { formatDate } from "./modules/helpFunctions.js";

renderListСomments();

export const addButton = document.getElementById("add-button");
export const inputName = document.getElementById("name");
export const inputTextComment = document.getElementById("comment");

//Добавляем новый комменатирй
addButton.addEventListener("click", () => {
  inputName.classList.remove("error");
  if (inputName.value.trim() === "") {
    inputName.classList.add("error");
    return;
  }
  inputTextComment.classList.remove("error");
  if (inputTextComment.value.trim() === "") {
    inputTextComment.classList.add("error");
    return;
  }

  const newComments = {
    name: sanitizeHtml(inputName.value),
    data: formatDate(),
    comment: sanitizeHtml(inputTextComment.value),
    likes: 0,
    isLiked: false,
  };

  listСomments.push(newComments);
  renderListСomments();

  inputName.value = "";
  inputTextComment.value = "";
});

// ввод комментария по нажатию на клавишу Enter
export const enteringTextPressingKey = () => {
    inputTextComment.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Предотвращаем переход на новую строку
        addButton.click(); // Имитация клика по кнопке "Написать"
      }
    });
  };
  enteringTextPressingKey();
