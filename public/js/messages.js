document.addEventListener('DOMContentLoaded', () => {

    let erreurs = document.querySelectorAll("div#erreurs > ul > li")
    let erreurLogin = document.querySelector('#erreurLogin')
    let divErreur = document.querySelector("#divErreur")
    let instit = document.querySelector('.instit')
    let bulle = document.querySelector('.bulle')

    if (erreurLogin != null) {
        erreurLogin.innerHTML = erreurLogin.innerHTML.trim()
    }

    if (erreurs[0] != null || (erreurLogin != null && erreurLogin.innerHTML)) {
        instit.classList.remove('displayNone')
        bulle.classList.remove('displayNone')
        let message = document.createElement('div')
        message.classList.add('erreur')

        if (erreurs[0] != null) {
            erreurs.forEach(e => {
                if (e.innerHTML === 'Il y a déjà un compte avec cet email !') {
                    message.innerHTML = e.innerHTML
                }
            })
            if (message.innerHTML !== 'Il y a déjà un compte avec cet email !') {
                message.innerHTML = erreurs[0].innerHTML
            }
        } else if (erreurLogin.innerHTML === 'Bad credentials.' || erreurLogin.innerHTML === 'The presented password is invalid.') {
            message.innerHTML = 'Email ou mot de passe incorrect !!'
        }

        divErreur.appendChild(message)

        setTimeout(() => {
            instit.classList.add('displayNone')
            bulle.classList.add('displayNone')
            message.remove()
        }, 8000)

        document.addEventListener('click', () => {
            instit.classList.add('displayNone')
            bulle.classList.add('displayNone')
            message.remove()
        })
    }
})