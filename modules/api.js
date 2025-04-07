import { formatDate } from './helpFunctions.js'

const token = 'asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k'
const host = 'https://wedev-api.sky.pro/api/v2/:anna-kalinina'

export const fetchListComments = (attempt = 1) => {
    return fetch(host + '/comments', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер упал')
            }
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
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                alert('Нет интернета, попробуйте еще раз.')
                if (attempt < 3) {
                    // ограничение на количество попыток
                    setTimeout(() => {
                        fetchListComments(attempt + 1) // повторная попытка
                    }, 2000) // задержка перед повторной попыткой
                }
            } else {
                console.error('Произошла ошибка:', error.message)
            }
        })
}

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text,
            name,
            forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json()
            } else {
                if (response.status === 500) {
                    throw new Error('Сервер упал')
                }

                if (response.status === 400) {
                    throw new Error('Вы допустили ошибку')
                }
            }

            throw new Error('Что-то пошло не так')
        })
        .then(() => {
            return fetchListComments()
        })
}

export function deleteComment({ id }) {
    return fetch(`${host + '/comments'}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response.json()
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
