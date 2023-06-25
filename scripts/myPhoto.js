async function main() {
    if (localStorage.getItem('login') == null) {
        document.location = '/pages/login.html'
    }
    const images = document.querySelector('.images')
    let data
    async function getUserPhoto(login, password) {
        const res = await fetch('http://31.129.96.64:3000/getphoto', {
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
    data = await getUserPhoto(localStorage.getItem('login'), localStorage.getItem('password'))
    if (data.user == 'null' || data.user == 'wrong password') {
        document.location = '/pages/login.html'
        return
    }
    const userPhoto = data.photos
    images.children[0].remove()
    if (!userPhoto.length) {
        images.insertAdjacentHTML('afterbegin', `
        <p>Ваша галлерея пустая</p>
        `)
        return
    }
    userPhoto.map(el => {
        const date = new Date(el.createdDate)
        images.insertAdjacentHTML('afterbegin', `
        <div class="image">
            <p>${date.toLocaleDateString()}</p>
            <img class="galleryImg" src=${el.body} alt=${el.createdDate}>
        </div>
        `)
    })

}

main()
