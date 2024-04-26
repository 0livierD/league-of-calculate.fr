document.addEventListener('DOMContentLoaded', () => {

    let operation = document.querySelector('#operation')
    let reponse = document.querySelector('#reponse')
    let infoResultat = document.querySelector('#infoResultat')

    let score = 0

    function lancerQuestion() {

        let number = Math.floor(Math.random() * 10)
        let number2 = Math.floor(Math.random() * 10)

        let resultat = number + number2

        operation.innerHTML = number + ' + ' + number2

        function saisie(e) {
            if (e.key === 'Backspace') {
                if (reponse != null) {
                    reponse.innerHTML = reponse.innerHTML.substring(0, (reponse.innerHTML.length - 1))
                }
            } else if (e.key === 'Enter') {
                if (parseInt(reponse.innerHTML) === resultat) {
                    infoResultat.className = "fa-solid fa-thumbs-up victoire"
                    score++
                } else {
                    infoResultat.className = "fa-solid fa-thumbs-down defaite"
                }
                reponse.innerHTML = ""
                document.removeEventListener('keydown', saisie)
                lancerQuestion()

            } else if (score === 5) {
                console.log('gagné')
                document.removeEventListener('keydown', saisie)
            } else {
                const num = parseInt(e.key)
                if (num >= 0 && num <= 9) {
                }
            }
        }

        document.addEventListener('keydown', saisie)
    }

    lancerQuestion()


})