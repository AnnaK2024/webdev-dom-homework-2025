import { formatDate, sanitizeHtml } from './helpFunctions.js'

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
                    data: formatDate(comment.data),
                    comment: sanitizeHtml(comment.text),
                    likes: comment.likes,
                    isLiked: false,
                }
            })
            return getComments
        })
}
