async function main() {
    const push = document.querySelector('.push')
    const form = document.forms[0]
    let data
    async function getUser(login, password) {
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
    async function getAdmin(login, password) {
        const res = await fetch('http://31.129.96.64:3000/adminpanel', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password,
                isCheck: true
            })
        })
        return await res.json()
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        form.submit.disabled = true
        const login = form.login.value
        const password = form.password.value
        data = await getUser(login, password)
        const adminData = await getAdmin(login, password)
        form.submit.disabled = false
        console.log(adminData)
        if (adminData.admin == 'gone') {
            push.children[0].textContent = 'Добро пожаловать в систему Администратор!'
            push.style.background = 'lightgreen'
            push.classList.add('push-active')
            localStorage.setItem('login', adminData.login)
            localStorage.setItem('password', adminData.password)
            setTimeout(() => {
                push.classList.remove('push-active')
                document.location = '/pages/adminPanel.html'
            }, 3000);
            return
        }
        else if (data.user == 'null') {
            push.children[0].textContent = 'Такого пользователя не существует!'
            push.style.background = 'lightcoral'
            push.classList.add('push-active')
            setTimeout(() => {
                push.classList.remove('push-active')
            }, 3000);
            return
        }
        else if (data.user == 'wrong password') {
            push.children[0].textContent = 'Неверный пароль'
            push.style.background = 'lightcoral'
            push.classList.add('push-active')
            setTimeout(() => {
                push.classList.remove('push-active')
            }, 3000);
            return
        }
        push.children[0].textContent = 'Успешно'
        push.style.background = 'lightgreen'
        push.classList.add('push-active')
        localStorage.setItem('login', data.login)
        localStorage.setItem('password', data.password)
        setTimeout(() => {
            push.classList.remove('push-active')
            document.location = '/'
        }, 2000);
    })

}

main()
