document.addEventListener('DOMContentLoaded', () => {

        let operation = document.querySelector('#operation')
        let reponse = document.querySelector('.reponse')
        let infoResultat = document.querySelector('#infoResultat')
        let affichageScore = document.querySelector('#affichageScore')
        let affichageNiveau = document.querySelector('#affichageNiveau')
        let niveauSuivant = document.querySelector('.niveauSuivant')
        let chrono = document.querySelector('.chrono')

        let seconde = 30

        let timer
        decompte()

        let niveau = 1
        affichageNiveau.innerHTML = 'Niveau ' + niveau

        let score = 0
        let number
        let number2
        let resultat

        lancerQuestion()

        function lancerQuestion() {

            affichageScore.innerHTML = score + ' / 5'

            switch (niveau) {
                case 1:
                    number = Math.floor(Math.random() * 10)
                    number2 = Math.floor(Math.random() * 10)
                    resultat = number + number2
                    operation.innerHTML = number + ' + ' + number2
                    break

                case 2 :
                    number = Math.floor(Math.random() * 100)
                    number2 = Math.floor(Math.random() * 10)
                    resultat = number + number2
                    operation.innerHTML = number + ' + ' + number2
                    break

                case 3 :
                    number = Math.floor(Math.random() * 10)
                    number2 = Math.floor(Math.random() * 10)
                    if (number < number2) {
                        resultat = number2 - number
                        operation.innerHTML = number2 + ' - ' + number
                    } else {
                        resultat = number - number2
                        operation.innerHTML = number + ' - ' + number2
                    }
                    break
            }

            document.addEventListener('keydown', saisie)

        }

        function passageNiveauSuivant() {
            seconde = 30
            decompte()
            score = 0
            niveauSuivant.classList.add('displayNone')
            reponse.className = "reponse"
            reponse.innerHTML = ""
            affichageNiveau.innerHTML = 'Niveau ' + niveau
            niveauSuivant.removeEventListener('click', passageNiveauSuivant)
            lancerQuestion()
        }

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

                if (score === 5) {
                    clearTimeout(timer)
                    affichageScore.innerHTML = score + ' / 5'
                    reponse.className = "bravo"
                    reponse.innerHTML = "Bravo, niveau " + niveau + " réussi !"
                    niveau++
                    niveauSuivant.classList.remove('displayNone')
                    niveauSuivant.addEventListener('click', passageNiveauSuivant)
                } else {
                    lancerQuestion()
                }
            } else {
                const num = parseInt(e.key)
                if (num >= 0 && num <= 9) {
                    reponse.innerHTML = reponse.innerHTML + num
                }
            }
        }

        function decompte() {

            timer = setTimeout(() => {
                seconde--
                if (seconde >= 0) decompte()
                else {
                    document.removeEventListener('keydown', saisie)
                    reponse.className = "bravo"
                    reponse.innerHTML = "Perdu !"

                }
            }, 1000)
            chrono.innerHTML = seconde + ' sec'
        }

    }
)