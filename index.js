import { initAddCommentListener } from './modules/initlisteners.js'
import { listСomments, updateListComments } from './modules/listComments.js'
import { renderListСomments } from './modules/renderListComments.js'

initAddCommentListener()

fetch('https://wedev-api.sky.pro/api/v1/:anna-kalinina/comments', {
    method: 'GET',
})
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        updateListComments(data.comments)
        console.log(data)
        renderListСomments(listСomments)
    })
