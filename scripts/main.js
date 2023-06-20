const form = document.forms[0]
let data

function imgToBase64(image) {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
        const res = reader.result
        data = res
    })

    reader.readAsDataURL(image)
}


form.addEventListener('submit', async (e) => {
    e.preventDefault()
    form.btnSubmit.disabled = true
    await imgToBase64(form.photo.files[0])
    setTimeout(async () => {
        const res = await fetch('http://localhost:3000/addphoto', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: form.login.value,
                photobase64: data,
                day: form.day.value
            })
        })
        const resStatus = await res.json()
        form.btnSubmit.disabled = false
        if (resStatus.isAdded) {
            document.body.insertAdjacentHTML('afterend', `<p>Успешно</p>`)
        }
        else {
            document.body.insertAdjacentHTML('afterend', `<p>Ошибка загрузки фото или неправильное имя пользователя!</p>`)
        }
    }, 2000)


})