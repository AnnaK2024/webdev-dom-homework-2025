import { formatDate } from './helpFunctions.js'

const host = 'https://wedev-api.sky.pro/api/v1/:anna-kalinina'

export const fetchListComments = () => {
    return fetch(host + '/comments')
        .then((response) => {
            return response.json()
        })
        .then((responseData) => {
            const getComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: formatDate(comment.date),
                    comment: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })
            return getComments
        })
}

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        body: JSON.stringify({
            text,
            name,
            forceError: false,
        }),
    })
        .then((response) => {
            if (response.status === 500) throw new Error('Ошибка сервера')
        })
        .then((response) => {
            if (response.status === 400) throw new Error('Неверный запрос')
        })
        .then((response) => {
            if (response.status !== 201) throw new Error('Неизвестная ошибка')
            return response.json()
        })
        .then(() => {
            return fetchListComments()
        })
}

// // удаляем последний комментарий
// export const initDeleteLastComments = () => {
//     const deleteButton = document.getElementById('delete-button')

//     for (const deleteEl of deleteButton) {
//         deleteEl.addEventListener('click', (event) => {
//             event.stopImmediatePropagation()
//             const idDelete = deleteEl.dataset.id

//             fetch(host + '/comments}' + ${idDelete}, {
//                 method: 'DELETE',
//             }).then((response) => {
//                 return response.json()
//             }).then((data) => {
//                 updateListComments(data.comments)
//                 renderListСomments()
//             })
//         })
//     }
// }
// initDeleteLastComments();
