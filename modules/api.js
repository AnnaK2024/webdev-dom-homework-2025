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
                    date: comment.date,
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

// удаляем последний комментарий
export const deleteLastComments = () => {
    const deleteButton = document.getElementById('delete-button')
    for (const deleteEl of deleteButton) {
        deleteEl.addEventListener('click', (event) => {
            event.stopImmediatePropagation()
            const idDelete = deleteEl.dataset.id

            fetch

        })
    }
deleteLastComments()