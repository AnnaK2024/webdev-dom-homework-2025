export const sanitizeHtml = (value) => {
    return value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export const formatDate = () => {
    let currentDate = new Date()
    let optionsDate = { day: '2-digit', month: '2-digit', year: '2-digit' }
    let optionsTime = { hour: '2-digit', minute: '2-digit' }
    let formattedDate = currentDate.toLocaleDateString('ru-RU', optionsDate)
    let formattedTime = currentDate.toLocaleTimeString('ru-RU', optionsTime)

    return `${formattedDate} ${formattedTime}`
}
