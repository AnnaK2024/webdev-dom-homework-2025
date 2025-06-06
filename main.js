// 'use strict'

// const inputName = document.getElementById('name')
// const inputTextComment = document.getElementById('comment')
// const addButton = document.getElementById('add-button')
// const list = document.getElementById('list')

// const formatDate = () => {
//     let currentDate = new Date()
//     let optionsDate = { day: 'numeric', month: '2-digit', year: '2-digit' }
//     let optionsTime = { hour: '2-digit', minute: '2-digit' }
//     let formattedDate = currentDate.toLocaleDateString('ru-RU', optionsDate)
//     let formattedTime = currentDate.toLocaleTimeString('ru-RU', optionsTime)

//     return `${formattedDate} ${formattedTime}`
// }

// const sanitizeHtml = (value) => {
//     return value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
// }

// //Массив комментариев
// const listСomments = [
//     {
//         name: 'Глеб Фокин',
//         data: '12.02.22 12:18',
//         comment: 'Это будет первый комментарий на этой странице',
//         likes: 3,
//         isLiked: false,
//     },
//     {
//         name: 'Варвара Н.',
//         data: '13.02.22 19:22',
//         comment: 'Мне нравится как оформлена эта страница! ❤',
//         likes: 75,
//         isLiked: true,
//     },
// ]

// // Ответ на комментарий
// const initClickComment = () => {
//     const commentsElements = document.querySelectorAll('.comment')
//     for (const commentElement of commentsElements) {
//         commentElement.addEventListener('click', () => {
//             const currentComment = listСomments[commentElement.dataset.index]
//             inputTextComment.value = `${currentComment.name} : ${currentComment.comment}`

//             renderListСomments()
//         })
//     }
// }

// //Обработчик лайка
// const initClickLike = () => {
//     const buttonLikes = document.querySelectorAll('.like-button')
//     for (const buttonLike of buttonLikes) {
//         buttonLike.addEventListener('click', (event) => {
//             event.stopImmediatePropagation()
//             const likeIndex = buttonLike.dataset.indexLike // считываем значение дата-атрибута кнопки
//             const likeComment = listСomments[likeIndex] // перебираем индексы комментариев из списка
//             likeComment.isLiked = !likeComment.isLiked // цвет лайка
//             likeComment.likes += likeComment.isLiked ? 1 : -1 // количество лайков

//             renderListСomments()
//         })
//     }
// }

// // Функция рендеринга массива
// const renderListСomments = () => {
//     const listСommentsHtml = listСomments
//         .map((comments, index) => {
//             return `<li class="comment" data-index="${index}">
//         <div class="comment-header">
//           <div>${comments.name}</div>
//           <div>${comments.data}</div>
//         </div>
//         <div class="comment-body">
//           <div class="comment-text">
//             ${comments.comment}
//           </div>
//         </div>
//         <div class="comment-footer">
//           <div class="likes">
//             <span class="likes-counter">${comments.likes}</span>
//             <button class="like-button ${
//                 comments.isLiked ? '-active-like' : ''
//             }" data-index-like="${index}"></button>
//           </div>
//         </div>
//       </li>`
//         })
//         .join('')

//     list.innerHTML = listСommentsHtml

//     initClickLike()
//     initClickComment()
// }
// renderListСomments()

// //Добавляем новый комменатирй
// addButton.addEventListener('click', () => {
//     inputName.classList.remove('error')
//     if (inputName.value.trim() === '') {
//         inputName.classList.add('error')
//         return
//     }
//     inputTextComment.classList.remove('error')
//     if (inputTextComment.value.trim() === '') {
//         inputTextComment.classList.add('error')
//         return
//     }

//     const newComments = {
//         name: sanitizeHtml(inputName.value),
//         data: formatDate(),
//         comment: sanitizeHtml(inputTextComment.value),
//         likes: 0,
//         isLiked: false,
//     }

//     listСomments.push(newComments)
//     renderListСomments()

//     inputName.value = ''
//     inputTextComment.value = ''
// })

// const deleteLastComments = () => {
//     const deleteButton = document.getElementById('delete-button')

//     deleteButton.addEventListener('click', () => {
//         if (listСomments.length === 0) {
//             alert('Нет комментариев для удаления!')
//             return
//         }
//         const indexToDelete = listСomments.length - 1 // Индекс последнего комментария
//         listСomments.splice(indexToDelete, 1) // Удаляем комментарий по индексу
//         renderListСomments() // Обновляем отображение комментариев
//     })
// }
// deleteLastComments()

// // ввод комментария по нажатию на клавишу Enter
// const enteringTextPressingKey = () => {
//     inputTextComment.addEventListener('keydown', (event) => {
//         if (event.key === 'Enter' && !event.shiftKey) {
//             event.preventDefault() // Предотвращаем переход на новую строку
//             addButton.click() // Имитация клика по кнопке "Написать"
//         }
//     })
// }
// enteringTextPressingKey()
