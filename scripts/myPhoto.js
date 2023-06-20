async function main() {
    const images = document.querySelector('.images')
    const error = document.querySelector('.error')
    const form = document.forms[0]
    let data
    async function getUserPhoto(login, password) {
        const res = await fetch('http://193.168.49.62:3000/getphoto', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login,
                password
            })
        })
        const data = await res.json()
        return data
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        form.submit.disabled = true
        const login = form.login.value
        const password = form.password.value
        data = await getUserPhoto(login, password)
        form.submit.disabled = false
        if (data.user == 'null') {
            error.insertAdjacentHTML('afterbegin', `
        <p>Такого пользователя не существует</p>
        `)
            if (error.children[1]) error.children[1].remove()
            return
        }
        else if (data.user == 'wrong password') {
            error.insertAdjacentHTML('afterbegin', `
        <p>Неправильный пароль</p>
        `)
            if (error.children[1]) error.children[1].remove()
            return
        }
        const userPhoto = data.photos
        if (!userPhoto.length) {
            error.insertAdjacentHTML('afterbegin', `
        <p>Ваша галлерея пустая</p>
        `)
            if (error.children[1]) error.children[1].remove()
            images.children[0].remove()
            return
        }
        if (error.children[1]) error.children[1].remove()
        images.children[0].remove()
        userPhoto.map(el => {
            images.insertAdjacentHTML('afterbegin', `
        <img class="galleryImg" src=${el.body} alt=${el.body}>
        `)
        })
    })

}

main()
