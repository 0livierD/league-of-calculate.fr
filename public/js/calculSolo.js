document.addEventListener('DOMContentLoaded', () => {

        let operation = document.querySelector('#operation')
        let reponse = document.querySelector('.reponse')
        let infoResultat = document.querySelector('#infoResultat')
        let affichageScore = document.querySelector('#affichageScore')
        let affichageNiveau = document.querySelector('#affichageNiveau')
        let niveauSuivant = document.querySelector('.niveauSuivant')
        let chrono = document.querySelector('.chrono')
        let listeErreurDiv = document.querySelector('#liste-erreurs')

        let seconde = 120

        let timer
        decompte()

        let niveau = 1
        affichageNiveau.innerHTML = 'Niveau ' + niveau

        let score = 0
        let echec = 0
        let number
        let number2
        let ordreAffichage
        let resultat
        let listeErreurs = []

        lancerQuestion()

        function lancerQuestion() {

            affichageScore.innerHTML = score + ' / 15'

            // switch (niveau) {
            //     case 1:
            //         number = Math.floor(Math.random() * 10)
            //         number2 = Math.floor(Math.random() * 10)
            //         resultat = number + number2
            //         operation.innerHTML = number + ' + ' + number2
            //         break
            //
            //     case 2 :
            //         number = Math.floor(Math.random() * 100)
            //         number2 = Math.floor(Math.random() * 10)
            //         resultat = number + number2
            //         operation.innerHTML = number + ' + ' + number2
            //         break
            //
            //     case 3 :
            //         number = Math.floor(Math.random() * 10)
            //         number2 = Math.floor(Math.random() * 10)
            //         if (number < number2) {
            //             resultat = number2 - number
            //             operation.innerHTML = number2 + ' - ' + number
            //         } else {
            //             resultat = number - number2
            //             operation.innerHTML = number + ' - ' + number2
            //         }
            //         break
            // }


            switch (niveau) {
                case 1:
                    number = Math.floor(Math.random() * 5 + 1)
                    number2 = Math.floor(Math.random() * 5 + 5)
                    resultat = number * number2
                    ordreAffichage = Math.floor(Math.random() * 2)
                    if (ordreAffichage === 0) operation.innerHTML = number + ' x ' + number2
                    if (ordreAffichage === 1) operation.innerHTML = number2 + ' x ' + number
                    listeErreurs.push(operation.innerHTML)
                    break

                case 2 :
                    number = Math.floor(Math.random() * 4 + 6)
                    number2 = Math.floor(Math.random() * 4 + 6)
                    resultat = number * number2
                    ordreAffichage = Math.floor(Math.random() * 2)
                    if (ordreAffichage === 0) operation.innerHTML = number + ' x ' + number2
                    if (ordreAffichage === 1) operation.innerHTML = number2 + ' x ' + number
                    listeErreurs.push(operation.innerHTML)
                    break

                // case 3 :
                //     number = Math.floor(Math.random() * 10)
                //     number2 = Math.floor(Math.random() * 10)
                //     if (number < number2) {
                //         resultat = number2 - number
                //         operation.innerHTML = number2 + ' - ' + number
                //     } else {
                //         resultat = number - number2
                //         operation.innerHTML = number + ' - ' + number2
                //     }
                //     break
            }

            document.addEventListener('keydown', saisie)

        }

        function passageNiveauSuivant() {
            seconde = 120
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
                if (reponse.innerHTML) {
                    reponse.innerHTML = reponse.innerHTML.substring(0, (reponse.innerHTML.length - 1))
                }
            } else if (e.key === 'Enter' && reponse.innerHTML) {
                if (parseInt(reponse.innerHTML) === resultat) {
                    infoResultat.className = "fa-solid fa-thumbs-up victoire"
                    score++
                    listeErreurs.pop()
                } else {
                    infoResultat.className = "fa-solid fa-thumbs-down defaite"
                    echec++
                }

                reponse.innerHTML = ""
                document.removeEventListener('keydown', saisie)

                if (score === 15) {
                    clearTimeout(timer)
                    affichageScore.innerHTML = score + ' / 15'
                    reponse.className = "bravo"

                    for (const erreur of listeErreurs) {
                        const nouvelleDiv = document.createElement("div")
                        nouvelleDiv.innerHTML = erreur
                        nouvelleDiv.classList.add('erreur')
                        listeErreurDiv.insertAdjacentElement('afterend', nouvelleDiv)
                    }

                    listeErreurDiv.classList.remove('displayNone')
                    listeErreurs = []

                    if (niveau === 2) {
                        reponse.innerHTML = "Bravo, test " + niveau + " réussi ! Tu es champion(ne) des tables de multiplications"
                    } else {
                        reponse.innerHTML = "Bravo, niveau " + niveau + " réussi !"
                        niveau++
                        niveauSuivant.classList.remove('displayNone')
                        niveauSuivant.addEventListener('click', passageNiveauSuivant)
                    }

                } else {
                    lancerQuestion()
                }
            } else {
                const num = parseInt(e.key)
                if (num >= 0 && num <= 9 && reponse.innerHTML.length < 10) {
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
                    listeErreurs.pop()
                    for (const erreur of listeErreurs) {
                        const nouvelleDiv = document.createElement("div")
                        nouvelleDiv.innerHTML = erreur
                        nouvelleDiv.classList.add('erreur')
                        listeErreurDiv.insertAdjacentElement('afterend', nouvelleDiv)
                    }

                    listeErreurDiv.classList.remove('displayNone')
                    listeErreurs = []

                }
            }, 1000)
            chrono.innerHTML = seconde + ' sec'
        }

    }
)