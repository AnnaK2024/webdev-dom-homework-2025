import { fetchListComments } from './modules/api.js'
import { updateListComments } from './modules/listComments.js'
import { renderListСomments } from './modules/renderListComments.js'

export const fetchAndRenderListComments = () => {
    fetchListComments().then((data) => {
        updateListComments(data)
        renderListСomments()
    })
}

fetchAndRenderListComments()
