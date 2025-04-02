import { fetchListComments } from './modules/api.js'
import { initAddCommentListener } from './modules/initlisteners.js'
import { updateListComments } from './modules/listComments.js'
import { renderListСomments } from './modules/renderListComments.js'

fetchListComments().then((data) => {
    updateListComments(data)
    renderListСomments()
})

initAddCommentListener(renderListСomments)
