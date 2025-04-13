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

export const likesComment = async (id, attempt = 0) => {
    try {
        const response = await fetch(`${host}/comments/${id}/toggle-like`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        // Проверка статуса ответа
        if (!response.ok) {
            if (response.status === 500) {
                throw new Error('Сервер упал')
            }
            throw new Error(`Ошибка: ${response.status}`)
        }

        // Возвращаем данные в формате JSON
        return await response.json()
    } catch (error) {
        handleFetchError(error, attempt, id) // Обработка ошибок
    }
}

const handleFetchError = (error, attempt, id) => {
    // Проверка на отсутствие соединения
    if (error.message === 'Failed to fetch') {
        alert('Нет интернета, попробуйте еще раз.')
        if (attempt < 3) {
            setTimeout(() => {
                likesComment(id, attempt + 1) // Повторная попытка
            }, 2000) // Задержка перед повторной попыткой
        }
    } else {
        console.error('Произошла ошибка:', error.message) // Логирование других ошибок
    }
}

export const deleteComment = async (id, attempt = 0) => {
    try {
        const response = await fetch(`${host}/comments/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        // Проверка статуса ответа
        if (!response.ok) {
            throw new Error('Сетевая ошибка: ответ не был успешным')
        }

        // Возвращаем данные в формате JSON
        return await response.json()
    } catch (error) {
        handleDeleteError(error, attempt, id) // Обработка ошибок
    }
}

const handleDeleteError = (error, attempt, id) => {
    // Проверка на отсутствие соединения
    if (error.message === 'Failed to fetch') {
        alert('Нет интернета, попробуйте еще раз.')
        if (attempt < 3) {
            setTimeout(() => {
                deleteComment(id, attempt + 1) // Повторная попытка
            }, 2000) // Задержка перед повторной попыткой
        }
    } else {
        console.error('Произошла ошибка:', error.message) // Логирование других ошибок
    }
}

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
