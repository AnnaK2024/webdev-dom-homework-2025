import { fetchListComments } from './modules/api.js'
import { initAddCommentListener } from './modules/initlisteners.js'
import { updateListComments } from './modules/listComments.js'
import { renderListСomments } from './modules/renderListComments.js'

document.querySelector('.comments').innerHTML =
    'Пожалуйста, подождите, комментарии загружаются...'

fetchListComments().then((data) => {
    updateListComments(data)
    renderListСomments()
})

initAddCommentListener(renderListСomments)
