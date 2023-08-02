const [userInput, emailInput, passwordInput, passwordConfirmInput] = document.querySelectorAll('.input-group input')

const verification = {
    user: false,
    email: false,
    password: false,
    passwordConfirm: false
}

userInput.addEventListener('input', checkUser)
function checkUser() {
    const value = userInput.value.trim()
    if (value.length >= 3) {
        showResult({ index: 0, result: true })
        verification.user = true
    } else {
        showResult({ index: 0, result: false })
        verification.user = false
    }
}

emailInput.addEventListener('input', checkEmail)
function checkEmail() {
    const value = emailInput.value
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(value)) {
        showResult({ index: 1, result: true })
        verification.email = true
    } else {
        showResult({ index: 1, result: false })
        verification.email = false
    }
}

passwordInput.addEventListener('input', checkPassword)
function checkPassword() {
    const value = passwordInput.value
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    if (passwordRegex.test(value)) {
        showResult({ index: 2, result: true })
        verification.password = true
        if (value.length < 8) { addLines(1) }
        if (value.length >= 8 && value.length < 10) { addLines(2) }
        if (value.length >= 10) { addLines(3) }
    } else {
        showResult({ index: 2, result: false })
        verification.password = false
        addLines(0)
    }
}

passwordConfirmInput.addEventListener('input', checkPasswordConfirm)
function checkPasswordConfirm() {
    if (passwordConfirmInput.value === passwordInput.value) {
        showResult({ index: 3, result: true })
        verification.passwordConfirm = true
    } else {
        showResult({ index: 3, result: false })
        verification.passwordConfirm = false
    }
}

let lock = false
const form = document.querySelector('form')
const container = document.querySelector('.container')
form.addEventListener('submit', handleSubmit)
function handleSubmit(e) {
    e.preventDefault()
    const { user, email, password, passwordConfirm } = verification
    if (user && email && password && passwordConfirm) {
        alert('Données envoyées avec succés.')
        form.reset()
        addLines(0)
        icons.forEach(icon => icon.style.display = 'none')
    } else {
        if (lock) return
        lock = true
        container.classList.add('shake')
        setTimeout(() => {
            container.classList.remove('shake')
            lock = false
        }, 400)
    }
}

const lines = document.querySelectorAll('.lines div')
function addLines(number) {
    if (number === 0) { lines.forEach(line => line.style.backgroundColor = '#000') }
    number === 1 ? lines[0].style.backgroundColor = '#cf5914' : lines[0].style.backgroundColor = '#000'
    number === 2 ? lines[1].style.backgroundColor = '#fdeb50' : lines[1].style.backgroundColor = '#000'
    number === 3 ? lines[2].style.backgroundColor = '#14e214' : lines[2].style.backgroundColor = '#000'
}

const icons = document.querySelectorAll('.icone-verif')
const msgError = document.querySelectorAll('.error-msg')
function showResult({ index, result }) {
    if (result) {
        icons[index].style.display = 'block'
        icons[index].src = 'ressources/check.svg'
        if (msgError[index]) { msgError[index].style.display = 'none' }
    } else {
        icons[index].style.display = 'block'
        icons[index].src = 'ressources/error.svg'
        if (msgError[index]) { msgError[index].style.display = 'block' }
    }
}