import { formatDate } from './helpFunctions.js'

const host = 'https://wedev-api.sky.pro/api/v2/:anna-kalinina'
const authHost = 'https://wedev-api.sky.pro/api/user'

export let token = ''
export const setToken = (newToken) => {
    token = newToken
}

export let name = ''
export const setName = (newName) => {
    name = newName
}

export const fetchListComments = (attempt = 1) => {
    return fetch(host + '/comments')
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
            forceError: false,
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

export function likesComment({ id }) {
    return fetch(`${host + '/comments'}/${id}/toggle-like`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response.json()
    })
}

// export function deleteComment({ id }) {
//     return fetch(`${host + '/comments'}/${id}`, {
//         method: 'DELETE',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     }).then((response) => {
//         if (!response.ok) {
//             throw new Error('Сетевая ошибка: ответ не был успешным');
//         }
//         return response.json();
//     });
// }

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
    })
}

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({ name: name, login: login, password: password }),
    })
}
