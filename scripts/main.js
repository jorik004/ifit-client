const form = document.forms[0]
const choiceFile = document.querySelector('.choiceFile')
const choiceFile2 = document.querySelector('.choiceFile2')
const push = document.querySelector('.push')
const addingPhotoDiv = document.querySelector('.addingPhoto')
if (localStorage.getItem('login') == null) {
    document.location = '/pages/login.html'
}
let data = []

function imgToBase64(image) {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
        const res = reader.result
        data.push(res)
    })

    reader.readAsDataURL(image)
}

choiceFile.addEventListener('mouseenter', () => {
    choiceFile2.style.zIndex = '0'
    choiceFile.style.zIndex = '1'
    choiceFile.children[0].style.transition = 'all 1s ease'
    choiceFile.children[0].classList.add('choiceFileAnim')
    setTimeout(() => {
        choiceFile.children[0].style.transition = 'all 0s ease'
        choiceFile.children[0].classList.remove('choiceFileAnim')
    }, 1000)
})

choiceFile2.addEventListener('mouseenter', () => {
    choiceFile.style.zIndex = '0'
    choiceFile2.style.zIndex = '1'
    choiceFile2.children[0].style.transition = 'all 1s ease'
    choiceFile2.children[0].classList.add('choiceFileAnim')
    setTimeout(() => {
        choiceFile2.children[0].style.transition = 'all 0s ease'
        choiceFile2.children[0].classList.remove('choiceFileAnim')
    }, 1000)
})


form.dayPhoto.addEventListener('change', () => {
    data = []
    for (let i = 0; i < form.dayPhoto.files.length; i++) {
        const fileName = form.dayPhoto.files[i].name
        addingPhotoDiv.classList.add('addingPhoto-active')
        addingPhotoDiv.insertAdjacentHTML('afterbegin', `
            <p>${fileName} <img class="addingPhotoIcon" src="./images/download.png"></p>
        `)
        imgToBase64(form.dayPhoto.files[i])
        setTimeout(async () => {
            const res = await fetch('http://localhost:3000/addphoto', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: localStorage.getItem('login'),
                    password: localStorage.getItem('password'),
                    photobase64: data[i],
                    day: 'thirdDay'
                })
            })
            const resStatus = await res.json()
            if (resStatus.isAdded) {
                addingPhotoDiv.children[i].children[0].src = "./images/check.png"
                push.children[0].textContent = 'Успешно'
                push.style.background = 'lightgreen'
                push.classList.add('push-active')
                setTimeout(() => {
                    push.classList.remove('push-active')
                }, 3000);
            }
            else {
                push.children[0].textContent = 'Ошибка загрузки фото или неправильное имя пользователя!'
                push.style.background = 'lightcoral'
                push.classList.add('push-active')
                setTimeout(() => {
                    push.classList.remove('push-active')
                }, 3000);
            }
        }, 2000)
    }
})

form.weekPhoto.addEventListener('change', () => {
    data = []
    for (let i = 0; i < form.weekPhoto.files.length; i++) {
        const fileName = form.weekPhoto.files[i].name
        addingPhotoDiv.classList.add('addingPhoto-active')
        addingPhotoDiv.insertAdjacentHTML('afterbegin', `
            <p>${fileName} <img class="addingPhotoIcon" src="./images/download.png"></p>
        `)
        imgToBase64(form.weekPhoto.files[i])
        setTimeout(async () => {
            const res = await fetch('http://localhost:3000/addphoto', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: localStorage.getItem('login'),
                    password: localStorage.getItem('password'),
                    photobase64: data[i],
                    day: 'weekDay'
                })
            })
            const resStatus = await res.json()
            if (resStatus.isAdded) {
                addingPhotoDiv.children[i].children[0].src = "./images/check.png"
                push.children[0].textContent = 'Успешно'
                push.style.background = 'lightgreen'
                push.classList.add('push-active')
                setTimeout(() => {
                    push.classList.remove('push-active')
                }, 3000);
            }
            else {
                push.children[0].textContent = 'Ошибка загрузки фото или неправильное имя пользователя!'
                push.style.background = 'lightcoral'
                push.classList.add('push-active')
                setTimeout(() => {
                    push.classList.remove('push-active')
                }, 3000);
            }
        }, 2000)
    }
})

// form.addEventListener('submit', async (e) => {
//     e.preventDefault()
//     form.btnSubmit.disabled = true
//     await imgToBase64(form.photo.files[0])
//     setTimeout(async () => {
//         const res = await fetch('http://localhost:3000/addphoto', {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 login: form.login.value,
//                 photobase64: data,
//                 day: form.day.value
//             })
//         })
//         const resStatus = await res.json()
//         form.btnSubmit.disabled = false
//         if (resStatus.isAdded) {
//             push.children[0].textContent = 'Успешно'
//             push.style.background = 'lightgreen'
//             push.classList.add('push-active')
//             setTimeout(() => {
//                 push.classList.remove('push-active')
//             }, 3000);
//         }
//         else {
//             push.children[0].textContent = 'Ошибка загрузки фото или неправильное имя пользователя!'
//             push.style.background = 'lightcoral'
//             push.classList.add('push-active')
//             setTimeout(() => {
//                 push.classList.remove('push-active')
//             }, 3000);
//         }
//     }, 2000)


// })