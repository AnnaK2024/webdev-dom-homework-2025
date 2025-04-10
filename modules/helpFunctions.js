export const sanitizeHtml = (value) => {
    return value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export const formatDate = (dateString) => {
    let currentDate = new Date(dateString)
    let optionsDate = { day: '2-digit', month: '2-digit', year: '2-digit' }
    let optionsTime = { hour: '2-digit', minute: '2-digit' }
    let formattedDate = currentDate.toLocaleDateString('ru-RU', optionsDate)
    let formattedTime = currentDate.toLocaleTimeString('ru-RU', optionsTime)

    return `${formattedDate} ${formattedTime}`
}

export function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

// document.addEventListener('DOMContentLoaded', () => {
//     // Скрываем лоадер
//     document.querySelector('.preloader').classList.add('hidden')
//     // Показываем элемент app
//     document.getElementById('app').classList.remove('hidden')
// })
