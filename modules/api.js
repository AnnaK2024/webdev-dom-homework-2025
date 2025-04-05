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
        body: JSON.stringify({
            text,
            name,
        }),
    }).then(() => {
        return fetchListComments()
    })
}
