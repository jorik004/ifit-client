const form = document.forms[0]
const main = document.querySelector('main')


form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3000/adminpanel', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: form.login.value,
            password: form.password.value
        })
    })

    const data = await res.json()
    form.parentElement.remove()

    main.insertAdjacentHTML('afterbegin', `
    <div class="panel">
    <div class="users">

    </div>

    <div class="users-info">
        <p>Пусто</p>
    </div>
</div>
    `)
    const usersDiv = document.querySelector('.users')
    let usersInfoDiv = document.querySelector('.users-info')
    let photos = []
    data.data.map(el => {
        usersDiv.insertAdjacentHTML('afterbegin', `
            <p>${el.login}</p>
        `)
    })

    usersDiv.addEventListener('click', e => {
        usersInfoDiv = document.querySelector('.users-info')
        if (e.target == usersDiv) return
        for (let i = 0; i < usersDiv.children.length; i++) {
            usersDiv.children[i].classList.remove('active')
        }
        e.target.classList.add('active')
        data.data.map(el => {
            if (e.target.innerText == el.login) {
                photos = el.photos
            }
        })
        // for (let i = 0; i < usersInfoDiv.children.length; i++) {
        //     usersInfoDiv.children[i].remove()
        // }
        usersInfoDiv.remove()
        usersDiv.insertAdjacentHTML('afterend', `
            <div class="users-info"></div>
        `)
        usersInfoDiv = document.querySelector('.users-info')
        photos.map(el => {
            usersInfoDiv.insertAdjacentHTML('afterbegin', `
            <img src=${el.body}>
        `)
        })
    })
})