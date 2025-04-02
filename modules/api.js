const host = 'https://wedev-api.sky.pro/api/v1/:anna-kalinina/comments'

export const fetchListComments = () => {
    return fetch(host)
        .then((response) => {
            return response.json()
        })
        .then((responseData) => {
            const getComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: "18.03.2007 11:23",
                    comment: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })
            return getComments
        })
}

export const postComment = (text, name) => {
    return fetch(host, {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
        }),
    }).then(() => {
        return fetchListComments()
    })
}
