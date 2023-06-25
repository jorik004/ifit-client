const push = document.querySelector('.push')
const mainDiv = document.querySelector('main')
if (localStorage.getItem('login') == null) {
    document.location = '/pages/login.html'
}

async function main() {
    const res = await fetch('http://31.129.96.64:3000/adminpanel', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: localStorage.getItem('login'),
            password: localStorage.getItem('password'),
            isCheck: false
        })
    })

    const data = await res.json()
    if (data.admin == 'null') {
        push.children[0].textContent = 'Такого пользователя не существует!'
        push.style.background = 'lightcoral'
        push.classList.add('push-active')
        setTimeout(() => {
            push.classList.remove('push-active')
            document.location = '/pages/login.html'
        }, 3000);
        return
    }
    else if (data.admin == 'wrong password') {
        push.children[0].textContent = 'Неверный пароль'
        push.style.background = 'lightcoral'
        push.classList.add('push-active')
        setTimeout(() => {
            push.classList.remove('push-active')
            document.location = '/pages/login.html'
        }, 3000);
        return
    }

    mainDiv.insertAdjacentHTML('afterbegin', `
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
        if (!photos.length) {
            usersInfoDiv.insertAdjacentHTML('afterbegin', `
                <p>Пусто</p>`)
            return
        }
        photos.map(el => {
            usersInfoDiv.insertAdjacentHTML('afterbegin', `
            <img src=${el.body}>
        `)
        })
    })
}

main()
