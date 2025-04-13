import { fetchListComments } from './modules/api.js'
import { updateListComments } from './modules/listComments.js'
import { renderListСomments } from './modules/renderListComments.js'

export const fetchAndRenderListComments = (isFirstLoading) => {
    if (isFirstLoading) {
        document.querySelector('.container').innerHTML =
            `<p class="preloader" >Комментарии загружаются.....</p>`
    }
    fetchListComments().then((data) => {
        updateListComments(data)
        renderListСomments()
    })
}

fetchAndRenderListComments(true)
